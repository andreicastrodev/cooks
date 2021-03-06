import view from "./View.js";
import icons from "url:../../img/sprite.svg"; // parcel 2
import { Fractional } from "fractional";

class RecipeView extends view {
  _parentElement = document.querySelector(".popup__content");
  _overlay = document.querySelector(`.overlay`);
  _data;
  _errorMessage = `No recipe found, try another one`;
  _message = " ";
  _nav = document.querySelector(`.nav`);

  constructor() {
    super();
    this.hideWindow();
    this.removeHashOnLoad();
    this.showNav();
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn--bookmark`);
      if (!btn) return;
      handler();
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener(`click`, function (e) {
      const btn = e.target.closest(`.btn--controller`);
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) {
        handler(updateTo);
      }
    });
  }

  showNav() {
    const header = document.querySelector(`.landing`);
    const navHeight = this._nav.getBoundingClientRect().height;

    const stickyNav = function (entries) {
      const [entry] = entries;
      if (!entry.isIntersecting) this._nav.classList.add(`sticky`);
      else this._nav.classList.remove(`sticky`);
    };

    const headerObserver = new IntersectionObserver(stickyNav.bind(this), {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    });
    headerObserver.observe(header);
  }

  showWindow() {
    document.querySelector(".overlay").style.visibility = `visible`;
    document.querySelector(".overlay").style.opacity = 1;
    document.querySelector(".popup__content").style.visibility = `visible`;
    document.querySelector(".popup__content").style.opacity = 1;
  }
  hide() {
    document.querySelector(".overlay").style.visibility = `hidden`;
    document.querySelector(".overlay").style.opacity = 0;
    document.querySelector(".popup__content").style.visibility = `hidden`;
    document.querySelector(".popup__content").style.opacity = 0;
    this.contentOnExit();

  }
  hideWindow() {
    this._overlay.addEventListener(`click`, this.hide.bind(this));
    
  }

  removeHashOnLoad() {
    document.location.hash = "";
  }
  contentOnExit() {
    document.location.hash = "content";
  }
  _generateMarkup() {
    return `
            <figure class="popup__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="popup__img" />
        </figure>
        <div class="popup__title">
          <h1 class="header-2 header-2--sp mr-small">${this._data.title}</h1>
        </div>
        <div class="popup__controller">
          <div class="popup__durationBlock">
            <svg class="popup__icon popup__icon--1">
              <use href="${icons}#icon-stopwatch"></use>
            </svg>
            <span class="span-3 span-3--duration duration ml-small"
              >${this._data.cookingTime} mins</span
            >
          </div>
          <div class="popup__servingBlock">
            <svg class="popup__icon popup__icon--2">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="span-3 span-3--servings servings ml-small">${
              this._data.servings
            }</span>
            <div class="popup__btns ml-small">
              <button class="btn--add btn--controller" data-update-to="${
                this._data.servings + 1
              }">
                <svg class="popup__icon popup__icon--3">
                  <use href="${icons}#icon-plus"></use>
                </svg>
              </button>

              <button class="btn--minus btn--controller" data-update-to="${
                this._data.servings - 1
              }">
                <svg class="popup__icon popup__icon--3">
                  <use href="${icons}#icon-minus"></use>
                </svg>
              </button>
            </div>
          </div>
          <button class="btn--book btn--bookmark">
            <svg class="popup__icon popup__icon--3">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
            </svg>
          </button>
        </div>

        <div class="popup__ingredients">
          <h2 class="header-2">Ingredients</h2>
          <ul class="popup__ingredients--list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}

          </ul>
        </div>
        <div class="popup__directions">
          <a href="${
            this._data.sourceUrl
          }" target="_blank" class="btn--direction popup__btn mb-small"><span>Directions</span></a>
        </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
            <li class="popup__recipe">
              <div class="popup__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toString() : ""
              }</div>
              <div class="popup__description">${ing.unit} ${
      ing.description
    }</div>
            </li>            
            `;
  }
}

export default new RecipeView();
