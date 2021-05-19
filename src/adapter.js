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
    fetch(baseEntriesURL)
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

  static addNewEntry = (baseEntriesURL, configObj) => {
    fetch(baseEntriesURL, configObj) //returns promise
      // upon resolution of fetch promise (2 options: successful (resolve) or unsuccessful (reject)), the resolution
      // is passed on. For successful, looks for a .then; for unsuccessful looks for a .catch
      // Note: HTTP non-2xx are not considered unsuccessful by fetch. For those, only a network error, etc. will cause the
      // fetch promise to reject to unsuccessful and look for a .catch
      // sending my json error message from backend with status that is not 200 (unprocessable entity)
      // WILL be a fetch success and look for a .then.
      .then((response) => {
        // now inside .then with the response object from fetch resolution. You can call response.ok on this object
        // and if it is a non-2xx that will return false. So on error from backend with unprocessible entity (422), this response.ok
        // returns false. So we'll use the `throw error` option in JS, which allows you to throw a custom error,
        // in this case, we want to throw the custom error message that was received from back end.
        // A `throw error` will be caught in `.catch`
        // So throw response.json() (will want the json to be parsed for custom error message)
        // calling response.json() wil return a promise that resolves with parsing of the response text as json
        // that thrown error will need then be resolved and a .then can be called on it to access the parsed json

        if (!response.ok) throw response.json();
        return response.json();
      })
      .then((json) => {
        let entry = new Entry(json.id, json.body, json.time_interval);
        entry.render();

        for (const value of json.keywords) {
          new Keyword(value.id, value.name);
        }

        Functionality.resetEntryForm();
        alert("Journal entry saved!");
      })
      .catch((jsonPromise) => {
        // need to call .then on jsonPromise in order to be able to aceess the resolution, which will be json
        jsonPromise.then((json) => {
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
