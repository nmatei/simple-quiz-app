export function HtmlEditor(value = "", placeholder = "") {
  const el = document.createElement("textarea");
  el.placeholder = placeholder;
  el.value = value;
  return el;
}
