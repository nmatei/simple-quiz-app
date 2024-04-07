import { getEl } from "../../common/common";

export type SelectBase = {
  id: string;
  name?: string;
  label: string;
  cls: string | string[];
  value: number | string | (number | string)[];
  options: {
    value: number | string;
    text: string;
    short?: string;
  }[];
};

export type SelectType = SelectBase & {
  onChange?: (e: Event) => void;
};

export type MultiSelectType = SelectBase & {
  onChange?: (levels: number[]) => void;
};

export function createMultiSelect({ id, name, label, cls, value, options, onChange }: MultiSelectType) {
  const values = [].concat(value) as (number | string)[];
  const el = document.createElement("details");
  el.id = id;
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
                  <input type="checkbox" name="${name}" value="${e.value}" ${
                values.includes(e.value) ? 'checked="checked"' : ""
              } />
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
      getEl("summary", el).innerHTML = shorts.join(", ");
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    updateSummary();
    el.removeAttribute("open");
    const checked = Array.from(form.querySelectorAll("input[type=checkbox]:checked")) as HTMLInputElement[];
    const levels = checked.map(input => parseInt(input.value));
    onChange(levels);
  });

  updateSummary();

  return el;
}
