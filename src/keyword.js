class Keyword {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    Keyword.all.push(this)
  }

  static all = [];
  static datalistAddKeyword = document.querySelector("#keyword-names");
  static filterKeywordDatalist = document.querySelector("#filter-keyword-names");
  static filterKeywordForm = document.querySelector("#keyword-filter-form");
  static keywordBlankModal = document.querySelector("#keywords");

  static renderKeywordDatalist(formID) { //TODO have this render at the moment that user clicks on filter blank
    let options = []
    for (let i = 0; i < Keyword.all.length; i++) {
      options += `<option data-value="${Keyword.all[i].id}" value="${Keyword.all[i].name}"></option>`
    }
    formID.innerHTML = options;
  }

}
