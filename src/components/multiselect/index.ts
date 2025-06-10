import { getEl, getEls } from "../../common/common";

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

function getValue(form: HTMLFormElement) {
  const checked = getEls<HTMLInputElement>("input[type=checkbox]:checked", form);
  return checked.map(input => parseInt(input.value));
}

function areArraysEqual(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sorted1.every((value, index) => value === sorted2[index]);
}

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
          <button type="reset" class="small">Cancel</button>
          <button type="submit" class="small">OK</button>
        </div>
      </fieldset>
    </form>
  `;

  const form = getEl<HTMLFormElement>("form", el);
  // Variable to track current selected levels when details is opened
  let currentLevels: number[] = [];

  function updateSummary() {
    const checked = getEls<HTMLInputElement>("input[type=checkbox]:checked", form);
    if (checked.length) {
      const shorts = checked.map(input => {
        const item = options.find(o => o.value == input.value);
        return "<span>" + (item.short || item.text) + "</span>";
      });
      //getEl("summary", el).innerHTML = shorts.join(", ");
      getEl("summary", el).innerHTML = `<div class="multi-select-tags">${shorts.join(" ")}</div>`;
    }
  }

  // Track current values when details is opened
  el.addEventListener("toggle", function () {
    if (el.hasAttribute("open")) {
      currentLevels = getValue(form);
    }
  });

  form.addEventListener("reset", function (e) {
    // TODO - reset to values before open
    e.preventDefault();
    el.removeAttribute("open");
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    updateSummary();
    el.removeAttribute("open");
    const levels = getValue(form);
    if (onChange && !areArraysEqual(currentLevels, levels)) {
      onChange(levels);
    }
  });

  updateSummary();

  return el;
}
