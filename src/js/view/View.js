import icons from "url:../../img/sprite.svg"; // parcel 2
export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll(`*`));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      // update changed Attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner = function () {
    const markup = `
<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  `;
    this._parentElement.innerHTML = ``;
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  };

  addHandlerRender(handler) {
    ["hashchange", `load`].forEach((e) => window.addEventListener(e, handler));
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="err">
        <h1 class="header-2">${message}</h1>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="err">
        <h1 class="header-2">${message}</h1>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
}
