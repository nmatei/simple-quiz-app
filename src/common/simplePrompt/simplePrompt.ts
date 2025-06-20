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

    // Trap focus within the prompt
    const { cleanup: cleanupFocusTrap } = trapFocus(el);

    getEl("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();
      const answer = input.value;
      document.body.removeChild(el);
      cleanupFocusTrap();
      resolve(answer);
    });
  });
}

// Helper function to trap focus within a container
function trapFocus(container: HTMLElement) {
  // Store the element that had focus before the modal was opened
  const previouslyFocused = document.activeElement;

  // Find all focusable elements within the container
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return { cleanup: () => {} };

  const firstFocusableElement = focusableElements[0] as HTMLElement;
  const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  // Handle tab key to trap focus
  function handleTabKey(e: KeyboardEvent) {
    // If shift + tab pressed and focus is on first element, move to last focusable element
    if (e.key === "Tab" && e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    }
    // If tab pressed and focus is on last element, move to first focusable element
    else if (e.key === "Tab" && !e.shiftKey) {
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  // Add event listener
  document.addEventListener("keydown", handleTabKey);

  // Return cleanup function that removes the event listener and restores focus
  return {
    cleanup: () => {
      document.removeEventListener("keydown", handleTabKey);
      if (previouslyFocused && "focus" in previouslyFocused) {
        (previouslyFocused as HTMLElement).focus();
      }
    }
  };
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
  return new Promise<boolean>(function (resolve) {
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

    // Trap focus within the prompt
    const { cleanup: cleanupFocusTrap } = trapFocus(el);

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
      cleanupFocusTrap();
      resolve(buttonValue === "yes");
    });
  });
}

export async function simpleAlert(message: string) {
  return new Promise<boolean>(function (resolve) {
    const actions = [
      '<div class="fill"></div>',
      `<button name="action" class="action-btn" type="submit" value="yes">OK</button>`
    ];
    const el = createPromptEl(message, actions);
    document.body.appendChild(el);
    const input = getEl("button", el);
    input.focus();

    // Trap focus within the prompt
    const { cleanup: cleanupFocusTrap } = trapFocus(el);

    getEl("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();
      document.body.removeChild(el);
      cleanupFocusTrap();
      resolve(true);
    });
  });
}
