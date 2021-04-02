import view from "./View.js";
import icons from "url:../../img/sprite.svg"; // parcel 2
class BookmarkView extends view {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks found, find a recipe and bookmark it :)`;
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }

  _generateMarkupPreview(result) {
    return `
          
             <li class="preview">
              <a class="preview__link" href="#${result.id}">
                <figure class="preview__fig">
                  <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__name">${result.title}</h4>
                  <p class="preview__author">${result.publisher}</p>
                </div>
              </a>
           
      `;
  }
}
export default new BookmarkView();
