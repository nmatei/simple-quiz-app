import { getEl } from "../common";

// TODO export as npm package?
// example:
//   https://www.npmjs.com/package/simple-dialogs

function createPromptEl(message: string, actions: string[], title = "") {
  const el = document.createElement("div");
  el.id = "custom-prompt-container";
  el.innerHTML = `
    <form id="custom-prompt">
      ${title ? `<h3 class="prompt-title">${title}</h3>` : ""}
      <label for="custom-prompt-input">${message}</label>
      <div class="actions">
        ${actions.join("")} 
      </div>
    </form>`;
  return el;
}

export async function simplePrompt(message: string, _default: string, placeholder = "") {
  return new Promise<string>(function (resolve) {
    const actions = [
      `<input type="text" id="custom-prompt-input" placeholder="${placeholder}" required>`,
      `<button type="submit">OK</button>`
    ];
    const el = createPromptEl(message, actions);
    document.body.appendChild(el);
    const input = getEl<HTMLInputElement>("#custom-prompt-input");
    input.focus();
    input.value = _default;
    getEl("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();
      const answer = input.value;
      document.body.removeChild(el);
      resolve(answer);
    });
  });
}

export async function simpleConfirm(message: string, { cancel = "Cancel", ok = "OK", focus = "no", title = "" } = {}) {
  return new Promise(function (resolve) {
    const actions = [
      '<div class="fill"></div>',
      `<button name="action" class="action-btn" type="submit" value="no">${cancel}</button>`,
      `<button name="action" class="action-btn" type="submit" value="yes">${ok}</button>`
    ];
    const el = createPromptEl(message, actions, title);
    document.body.appendChild(el);
    const input = getEl(`button[value='${focus}']`, el);
    input && input.focus();
    getEl("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();
      // @ts-ignore
      const answer = e.submitter.value;
      document.body.removeChild(el);
      resolve(answer === "yes");
    });
  });
}

export async function simpleAlert(message: string) {
  return new Promise(function (resolve) {
    const actions = [
      '<div class="fill"></div>',
      `<button name="action" class="action-btn" type="submit" value="yes">OK</button>`
    ];
    const el = createPromptEl(message, actions);
    document.body.appendChild(el);
    const input = getEl("button", el);
    input.focus();
    getEl("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();
      document.body.removeChild(el);
      resolve(true);
    });
  });
}
