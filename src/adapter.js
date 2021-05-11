class Adapter{
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  loadContent = () => {
    document.addEventListener("DOMContentLoaded", () => {
      this.loadRandomQuote();
      this.loadEntries();
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
  loadEntries = () => {
    fetch(`${this.baseURL}/entries`)
    .then(resp => resp.json())
    .then(entries => {
      console.log(entries)
      Entry.createEntriesUl();
      entries.forEach(e => {
        let entry = new Entry(e.id, e.body, e.time_interval)
        entry.render();
      })
    })
  }
}
