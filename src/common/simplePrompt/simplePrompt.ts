import { getEl } from "../common";

// TODO export as npm package?
// example:
//   https://www.npmjs.com/package/simple-dialogs

// TODO if an prompt is already open, wait for it to close before opening a new one
//   simpleAlert(`<p>First Msg?</p>`)
//   simpleAlert("Will ignore first one but will submit form");

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

// Check if submitter is supported in the current browser
// Use a safer approach to detect support that doesn't throw errors in older browsers
const isSubmitterSupported = (function () {
  try {
    // First check if SubmitEvent exists in the browser
    return typeof SubmitEvent !== "undefined";
  } catch (e) {
    return false;
  }
})();

export async function simpleConfirm(message: string, { cancel = "Cancel", ok = "OK", focus = "no", title = "" } = {}) {
  return new Promise(function (resolve) {
    const actions = [
      '<div class="fill"></div>',
      `<button name="action" class="action-btn" type="submit" value="no">${cancel}</button>`,
      `<button name="action" class="action-btn" type="submit" value="yes">${ok}</button>`
    ];
    const el = createPromptEl(message, actions, title);
    document.body.appendChild(el);

    // Track which button was clicked
    let clickedButtonValue = "no"; // Default to "no"

    // Get form
    const form = getEl("#custom-prompt", el);

    // Only add click event listeners if submitter isn't supported
    if (!isSubmitterSupported) {
      const buttons = form.querySelectorAll("button");
      buttons.forEach(button => {
        button.addEventListener("click", function () {
          clickedButtonValue = this.value;
        });
      });
    }

    // Focus the appropriate button
    const input = getEl(`button[value='${focus}']`, el);
    input && input.focus();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      let buttonValue;
      if (isSubmitterSupported && "submitter" in e) {
        // In modern browsers where SubmitEvent exists and has submitter
        const submitter = (e as any).submitter;
        buttonValue = submitter ? submitter.value : "no";
      } else {
        // In older browsers - use our tracked clickedButtonValue
        buttonValue = clickedButtonValue;
      }

      document.body.removeChild(el);
      resolve(buttonValue === "yes");
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
