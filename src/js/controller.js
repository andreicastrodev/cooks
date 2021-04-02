import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultView from "./view/resultView.js";
import bookmarkView from "./view/bookmarkView.js";
import paginationView from "./view/paginationView.js";
import animationView from "./view/animationView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (id.length === 24) {
      recipeView.renderSpinner();
      // load recipe

      await model.loadRecipe(id);
      // show the recipe
      animationView.AnimatePopups();
      animationView.AnimatePopupContent();
      // render recipe
      recipeView.render(model.state.recipe);
    }else return;
    if (!id) return;
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render Results
    resultView.render(model.getSearchResultPage());
    animationView.AnimateResults();
    // 4) render initial pagination BUTTON
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) Render NEW Results
  resultView.render(model.getSearchResultPage(goToPage));
  animationView.AnimateResults();
  // 4) render NEW pagination BUTTON
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update recipe servings in (state)
  model.updateServings(newServings);
  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1 add / remove bookmrka
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2 updte recipe view
  recipeView.update(model.state.recipe);
  // renderbookmrk
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerCLick(controlPagination);
};
init();
