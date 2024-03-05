export function trapFocus(el) {
  let focusableEl = [
    ...el.querySelectorAll(
      `a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])`
    ),
  ];
  focusableEl = focusableEl.filter(
    (el) => window.getComputedStyle(el).display !== "none"
  );
  const firstFocusableEl = focusableEl[0];
  const lastFocusableEl = focusableEl[focusableEl.length - 1];
  window.addEventListener(`keydown`, function (e) {
    let activeEl = document.activeElement;
    if (e.key === `Tab`) {
      if (e.shiftKey) {
        if (activeEl === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (activeEl === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }
  });
}
