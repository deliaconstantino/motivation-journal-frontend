class Keyword {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    Keyword.all.push(this)
  }

  static all = [];
  static datalistAddKeyword = document.querySelector("#keyword-names");
  static filterKeywordDatalist = document.querySelector("#filter-keyword-names");  //TODO, check if using?
  static filterKeywordForm = document.querySelector("#keyword-filter-form"); //TODO, check if using?
  static keywordBlankModal = document.querySelector("#keywords");
  static keywordBlankFilter = document.querySelector("#keywords-filter")

  static renderKeywordDatalist(event) {
    const datalist = event.target.parentElement.querySelector("datalist");

    if (Keyword.all.length > datalist.childElementCount) {
      for (let i = 0; i < Keyword.all.length; i++) {
        const option = document.createElement('option');
        option.value = Keyword.all[i].name;
        option.setAttribute("data-value", Keyword.all[i].id)
        datalist.appendChild(option);
      }
    }
  }


}
