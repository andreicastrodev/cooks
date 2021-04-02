import view from "./View.js";
import icons from "url:../../img/sprite.svg"; // parcel 2

class PaginationView extends view {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerCLick(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      let btn;
      if (e.target.classList.contains(`btn--page`)) {
        btn = e.target;
        const goToPage = +btn.dataset.goto;

        handler(goToPage);
        document
          .getElementById("content")
          .scrollIntoView({ behavior: "smooth" });
      } else return;
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );

    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--page pagination--next ml-small">Page ${
        curPage + 1
      }</button>`;
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--page pagination--prev mr-small">Page ${
        curPage - 1
      }</button>`;
    }
    // other page
    if (curPage < numPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--page pagination--prev mr-small">Page ${
        curPage - 1
      }</button>
      
      <button data-goto="${
        curPage + 1
      }" class="btn--page pagination--next ml-small">Page ${
        curPage + 1
      }</button>`;
    }

    // page 1 and there are no other pages
    return "";
  }
}

export default new PaginationView();
