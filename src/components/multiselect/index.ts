import { getEl } from "../../common/common";

export type SelectType = {
  id: string;
  name?: string;
  label: string;
  cls: string | string[];
  value: number | string;
  options: {
    value: number | string;
    text: string;
    short?: string;
  }[];
  onChange?: (e: Event) => void;
};

export function createMultiSelect({ id, name, label, cls, value, options, onChange }: SelectType) {
  const el = document.createElement("details");
  el.classList.add(...["multi-select"].concat(cls));
  el.innerHTML = `
    <summary>${label}...</summary>
    <form>
      <fieldset>
        <legend>
          ${label}
        </legend>
        <ul>
          ${options
            .map(
              e => `
              <li>
                <label>
                  <input type="checkbox" name="${name}" value="${e.value}" ${e.value === value ? 'checked="checked"' : ""} />
                  ${e.text}
                </label>
              </li>`
            )
            .join("")}
        </ul>
        <div class="tbar">
          <div class="tfill"></div>
          <button type="submit" class="small">OK</button>
        </div>
      </fieldset>
    </form>
  `;

  const form = getEl<HTMLSelectElement>("form", el);

  function updateSummary() {
    const checked = Array.from(form.querySelectorAll("input[type=checkbox]:checked")) as HTMLInputElement[];
    if (checked.length) {
      const shorts = checked.map(input => {
        const item = options.find(o => o.value == input.value);
        return item.short || item.text;
      });
      getEl("summary", el).innerText = shorts.join(", ");
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    updateSummary();
    el.removeAttribute("open");
    //TODO onChange
  });

  updateSummary();

  return el;
}
