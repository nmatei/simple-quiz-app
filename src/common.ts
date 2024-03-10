const APP_LANGUAGE = "app-language";
const USER_NAME = `quiz-user-name`;

export function getLanguage() {
  return localStorage.getItem(APP_LANGUAGE) || "en";
}
export function setLanguage(language: "en" | "ro") {
  localStorage.setItem(APP_LANGUAGE, language);
}

export function getUserName(ask?: boolean) {
  const defaultName = localStorage.getItem(USER_NAME) || "";
  if (defaultName && !ask) {
    return defaultName;
  }
  let name = prompt("Enter you full name (firstname & lastname)", defaultName) || defaultName;
  name = name.trim();
  setUserName(name);
  return name;
}

export function setUserName(name: string) {
  localStorage.setItem(USER_NAME, name);
}

export function getEl(selector: string, parent?: HTMLElement) {
  return (parent || document).querySelector(selector) as HTMLElement;
}

export function setText(selector: string, text: string) {
  getEl(selector).innerHTML = text;
}

export function hideEl(selector: string) {
  getEl(selector).style.display = "none";
}

export function debounce(fn: (e: MouseEvent) => void, delay: number) {
  let timer: number | null = null; // 2️⃣ Closures
  return function (this: any) {
    // 3️⃣ context (this)
    let context = this,
      args = arguments;
    clearTimeout(timer);
    // @ts-ignore
    timer = setTimeout(function () {
      fn.apply(context, args); // 1️⃣ Callback function
    }, delay);
  };
}
