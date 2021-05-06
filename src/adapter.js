class Adapter{
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  loadContent = () => {
    document.addEventListener("DOMContentLoaded", () => {
      this.loadRandomQuote();
      let entry = new Entry();
      entry.loadEntries();
    })
  }

  loadRandomQuote = () => {
    fetch(`${this.baseURL}/quotes/random`)
    .then(resp => resp.json())
    .then(json => {
      let quote = new Quote(json.id, json.body, json.author);
      quote.render();
    })
  }





}
