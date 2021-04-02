import view from "./View.js";
import icons from "url:../../img/sprite.svg"; // parcel 2
class ResultView extends view {
  _parentElement = document.querySelector(".content__content");
  _errorMessage = `We could not find that recipe, Please try again`;
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    return `
         <a class="content__preview" href="#${result.id}">
            <img src="${result.image}" alt="img1" class="content__img" />
            <div class="content__title">
              <h3 class="header-2 publisher">${result.title}</h3>
              <span class="span-3 title">${result.publisher}</span>
            </div>

          </a>
      `;
      
        
  }
}
export default new ResultView();
