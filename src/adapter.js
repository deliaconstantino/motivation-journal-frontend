class Adapter{
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  loadContent = () => {
    document.addEventListener("DOMContentLoaded", () => {
      let functionality = new Functionality();
      functionality.renderTimerSelectOptions(Functionality.minuteSelect);
      functionality.renderTimerSelectOptions(Functionality.secondSelect);
      this.loadRandomQuote();
      this.loadEntries();
      this.loadKeywordsToFrontend();
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

  loadKeywordsToFrontend = () => {
    fetch(`${this.baseURL}/keywords`)
    .then(resp => resp.json())
    .then(keyword => {
      for (const value of keyword) {
        let newKeyword = new Keyword(value.id, value.name)
        Keyword.renderKeywordDatalist();
      }

    })
  }
}
