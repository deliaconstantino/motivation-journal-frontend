class Entry {
  constructor(id, body, time_interval) {
    this.id = id;
    this.body = body;
    this.timeInterval = Entry.setTimeInterval(time_interval);
    Entry.all.push(this);
  }

  static all = [];
  static entriesContainer = document.getElementById("entries-container");
  static ul = document.createElement("ul");
  static newEntryForm = document.querySelector("#new-entry-form");

  static setTimeInterval(time_interval) {
    return time_interval ? time_interval : "Free-write"
  }

  render() {
    let li = document.createElement("li");
    li.innerHTML = `
      <i> Time in Minutes - ${this.timeInterval} </i>: ${this.body}
    `;
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "delete"
    deleteButton.setAttribute("id", this.id);
    deleteButton.setAttribute("class", "btn btn-outline-warning btn-sm");
    deleteButton.addEventListener("click", this.deleteEntry);
    li.appendChild(deleteButton);
    Entry.ul.appendChild(li);
  }

  deleteEntry(e) {
    let li = e.target.parentElement;
    let id = e.target.id;
    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    };

    Adapter.fetchDeleteEntry(`${baseEntriesURL}/${id}`, configObj, li)
  }

  static createNewEntry(e) {
    e.preventDefault();
    let body = e.target.querySelector("#body")
    let time = (Functionality.numMille / 60000).toFixed(2);

    let data = {
      body: body.value,
      time_interval: time,
      keywords_attributes: {name: Keyword.keywordBlankModal.value}
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    Adapter.addNewEntry(baseEntriesURL, configObj, body)
  }

  static saveOrDeleteEntry() {
    alert(
      `Your ${Functionality.minutesString}:${Functionality.secondsString} writing timer is up! Don't forget to click the 'save' button below if you'd like to keep your entry.`
    );
  }

  static removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }

  static filterEntries(e) {
    e.preventDefault();
    let query = e.target.querySelector("#keywords-filter");
    let fetchURL;
    if (query.value === "") {
      fetchURL = baseEntriesURL
    } else {
      fetchURL = `${baseEntriesURL}?q=${query.value}`
    }

    Adapter.filterEntriesFetch(fetchURL, query);
  }

}
