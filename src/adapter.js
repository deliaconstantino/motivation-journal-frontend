class Adapter{
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  loadContent = () => {
    document.addEventListener("DOMContentLoaded", () => {
      this.loadRandomQuote();
      this.loadEntries();
      this.loadKeywords();
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

  loadKeywords = () => {
    fetch(`${this.baseURL}/keywords`)
    .then(resp => resp.json())
    .then(json => {
      // console.log(keywords)
      for (const key of json) {
        let newKeyword = new Keyword(k.id, k.name)
        // console.log(key)
      }
    })
  }
}
