import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `${this._generateMarkupBtn("right", "next", curPage)}`;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `${this._generateMarkupBtn("left", "prev", curPage)}`;
    }

    // Other page
    if (curPage < numPages) {
      return `${this._generateMarkupBtn(
        "left",
        "prev",
        curPage
      )} ${this._generateMarkupBtn("right", "next", curPage)}`;
    }

    // Page 1, and there are no other pages
    return "";
  }

  _generateMarkupBtn(direction, classModifier, page) {
    const operator = direction === "left" ? -1 : 1;

    return `<button data-goto="${
      page + operator * 1
    }" class="btn--inline pagination__btn--${classModifier}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${direction}"></use>
            </svg>
            <span>Page ${page + operator * 1}</span>
          </button>`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goto = +btn.dataset.goto;

      handler(goto);
    });
  }
}
export default new PaginationView();
