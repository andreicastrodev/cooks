import view from "./View.js";
import anime from "animejs/lib/anime.es.js";

class SearchView {
  _parentElement = document.querySelector(".search");
  getQuery() {
    const query = this._parentElement.querySelector(".search__input").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__input").value = "";
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();
      const section1 = document.querySelector(`.content`);
      section1.scrollIntoView({ behavior: "smooth" });


      handler();
    });
  }
}

export default new SearchView();
