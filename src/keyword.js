class Keyword {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    Keyword.all.push(this)
  }

  static all = [];
  static datalist = document.querySelector("#keyword-names");
  static filterDatalist = document.querySelector("#filter-keyword-names");
  static filterKeywordForm = document.querySelector("#keyword-filter-form");

  static renderKeywordDatalist(formID) { //TODO only add if not there rather than re-adding every time
    let options = []
    for (let i = 0; i < Keyword.all.length; i++) {
      options += `<option data-value="${Keyword.all[i].id}" value="${Keyword.all[i].name}"></option>`
      // options += `<option id="${Keyword.all[i].id}" value="${Keyword.all[i].name}"></option>`
    }
    formID.innerHTML = options;
  }
}
