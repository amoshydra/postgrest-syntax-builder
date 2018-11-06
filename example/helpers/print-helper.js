function printToDOM(selector, title, result) {
  const parentElement = document.querySelector(selector);
  if (!parentElement) return;

  const wrapper = document.createElement("div");
  const titleEl = document.createElement("div");
  titleEl.setAttribute("class", "heading");
  titleEl.textContent = title;
  const codeEl = document.createElement("pre");
  codeEl.innerHTML =
    typeof result === "object" ? JSON.stringify(result) : result;

  // Insert as dom
  wrapper.appendChild(titleEl);
  wrapper.appendChild(codeEl);
  parentElement.appendChild(wrapper);
}

function print(selector) {
  return function (title, result) {
    if (typeof document !== 'undefined') {
      printToDOM(selector, title, result);
    }

    // Print to console
    console.group(title + ":");
    console.log(result);
    console.groupEnd();
  };
}

if (typeof module !== 'undefined') {
  module.exports = print;
}