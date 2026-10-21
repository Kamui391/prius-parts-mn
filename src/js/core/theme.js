const STORAGE_KEY = "theme";

export function getTheme() {
  return (
    localStorage.getItem(STORAGE_KEY) ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
}

export function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";

  localStorage.setItem(STORAGE_KEY, next);
  document.documentElement.dataset.theme = next;
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
}