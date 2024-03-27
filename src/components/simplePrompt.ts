import { getEl } from "../common/common";

export async function simplePrompt(message: string, _default: string, placeholder = "") {
  const el = document.createElement("div");
  el.id = "custom-prompt-container";
  el.innerHTML = `
    <form id="custom-prompt">
      <label for="custom-prompt-input">${message}</label>
      <div class="tbar">
        <input type="text" id="custom-prompt-input" placeholder="${placeholder}" required>
        <button type="submit">OK</button> 
      </div>
    </form>`;

  return new Promise<string>(function (resolve) {
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
