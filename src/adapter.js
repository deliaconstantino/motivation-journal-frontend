class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  loadContent = () => {
    document.addEventListener("DOMContentLoaded", () => {
      let functionality = new Functionality();
      functionality.renderTimerSelectOptions(Functionality.minuteSelect);
      functionality.renderTimerSelectOptions(Functionality.secondSelect);
      this.loadRandomQuote();
      this.loadEntries();
      this.loadKeywordsToFrontend();
    });
  };

  loadRandomQuote = () => {
    fetch(`${this.baseURL}/quotes/random`)
      .then((resp) => resp.json())
      .then((json) => {
        let quote = new Quote(json.id, json.body, json.author);
        quote.render();
      });
  };

  loadEntries = () => {
    fetch(`${this.baseURL}/entries`)
      .then((resp) => resp.json())
      .then((entries) => {
        Functionality.findHTMLandAddEventListeners();
        entries.forEach((e) => {
          let entry = new Entry(e.id, e.body, e.time_interval);
          entry.render();
        });
      });
  };

  loadKeywordsToFrontend = () => {
    fetch(`${this.baseURL}/keywords`)
      .then((resp) => resp.json())
      .then((keyword) => {
        for (const value of keyword) {
          new Keyword(value.id, value.name);
        }
      });
  };

  static addNewEntry = (baseEntriesURL, configObj, bodyElement) => {
    fetch(baseEntriesURL, configObj)
      .then((response) => {
        if (!response.ok) throw response.json();
        return response.json();
      })
      .then((e) => {
        let entry = new Entry(e.id, e.body, e.time_interval);
        entry.render();

        for (const value of e.keywords) {
          new Keyword(value.id, value.name);
        }

        Functionality.resetEntryForm(e);
        alert("Journal entry saved!");
      })
      .catch((response) => {
        response.then((json) => {
          alert(json);
        });
      });
  };

  static filterEntriesFetch(fetchURL, query) {
    fetch(fetchURL)
      .then((resp) => resp.json())
      .then((entries) => {
        Entry.removeAllChildNodes(Entry.ul);
        if (entries.length > 0) {
          entries.forEach((e) => {
            let entry = new Entry(e.id, e.body, e.time_interval);
            entry.render();
          });
        }
        query.value = "";
      });
  }

  static fetchDeleteEntry(url, configObj, li) {
    fetch(url, configObj)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        li.remove();
      })
      .catch(() => alert("could not delete this journal entry"));
  }
}
