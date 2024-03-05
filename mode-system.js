const calcEl = document.querySelector(`.calc`);

const darkModeButton = document.querySelector(
  `.calc .calc-header .mode-change .dark-mode`
);
const lightModeButton = document.querySelector(
  `.calc .calc-header .mode-change .light-mode`
);

let mode = localStorage.getItem(`mode`);

if (mode) {
  handleModeChange(mode);
  updateModeLS(mode);
} else {
  setModeForScheme();
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener(`change`, setModeForScheme);

darkModeButton.addEventListener(`click`, () => {
  handleModeChange(`dark`);
  updateModeLS(`dark`);
});
lightModeButton.addEventListener(`click`, () => {
  handleModeChange(`light`);
  updateModeLS(`light`);
});

function setModeForScheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    handleModeChange("dark");
  } else {
    handleModeChange("light");
  }
}

function handleModeChange(mode) {
  setFavIco(mode);
  toggleMode(mode);
}

function updateModeLS(mode) {
  localStorage.setItem(`mode`, mode);
}

function setFavIco(mode = "dark") {
  const favicon = document.querySelector(`link[rel="icon"]`);
  favicon.href =
    mode === "dark"
      ? "./images/favicon-dark.svg"
      : "./images/favicon-light.svg";
}

function toggleMode(mode = "dark") {
  calcEl.classList.remove("dark", "light");
  calcEl.classList.add(mode);
}
