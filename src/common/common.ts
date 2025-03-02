import { simplePrompt } from "./simplePrompt/simplePrompt";

const APP_LANGUAGE = "app-language";
const USER_NAME = `quiz-user-name`;

export function getLanguage() {
  return localStorage.getItem(APP_LANGUAGE) || "en";
}
export function setLanguage(language: "en" | "ro") {
  localStorage.setItem(APP_LANGUAGE, language);
}
export function getStoredUserName() {
  return localStorage.getItem(USER_NAME) || "";
}

export async function getUserName(ask?: boolean) {
  const userName = getStoredUserName();
  if (userName && !ask) {
    return userName;
  }
  let name = (await simplePrompt("Enter you full name (firstname & lastname)", userName, "First Last")) || userName;
  name = name.trim();
  setUserName(name);
  return name;
}

export function setUserName(name: string) {
  localStorage.setItem(USER_NAME, name);
}

export function getEl<T = HTMLElement>(selector: string, parent?: HTMLElement) {
  return (parent || document).querySelector(selector) as T;
}

export function getEls<T = HTMLElement>(selector: string, parent?: HTMLElement) {
  return Array.from((parent || document).querySelectorAll(selector) as unknown as T[]);
}

export function setText(selector: string, text: string) {
  const el = getEl(selector);
  el.innerHTML = text;
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

export function download(text: string, name: string, type: string) {
  const anchor = document.createElement("a");
  anchor.className = "download-js-link";
  anchor.id = "download-html";
  anchor.innerHTML = "downloading...";
  anchor.style.display = "none";
  document.body.appendChild(anchor);

  const file = new Blob([text], { type: type });
  anchor.href = URL.createObjectURL(file);
  anchor.download = name;
  anchor.click();
  document.body.removeChild(anchor);
}
