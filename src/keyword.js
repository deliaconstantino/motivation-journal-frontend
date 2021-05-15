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
  static keywordBlankFilter = document.querySelector("#keywords-filter")

  static renderKeywordDatalist(event) {  //TODO add a check for whether Keyword.all.length matches datalist size
    const datalist = event.target.parentElement.querySelector("datalist");

    for (let i = 0; i < Keyword.all.length; i++) {
        const option = document.createElement('option');
        option.value = Keyword.all[i].name;
        datalist.appendChild(option);
      // options += `<option data-value="${Keyword.all[i].id}" value="${Keyword.all[i].name}"></option>`
      // event.target.parentElement.querySelector("datalist").append(`<option data-value="${Keyword.all[i].id}" value="${Keyword.all[i].name}"></option>`);
    }
    console.log(datalist)
  }

}
