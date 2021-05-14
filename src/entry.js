class Entry {
  constructor(id, body, time_interval) {
    this.id = id;
    this.body = body;
    this.timeInterval = time_interval;
    Entry.all.push(this);
  }

  static all = []; //?? are deleted entries automatically removed from this array?
  //?? better to use class or instance methods inside of classes? in which cases for which
  static entriesContainer = document.getElementById("entries-container");
  static ul = document.createElement("ul");
  static newEntryForm = document.querySelector("#new-entry-form");
  static exitButton = document.querySelector('#exit-button'); //move to functionality

  static interval;
  static numMille;
  static minutesString;
  static secondsString;


  static createEntriesUl() {
    Entry.ul.setAttribute("class", "set-list-image");
    Entry.entriesContainer.appendChild(Entry.ul);

    Functionality.addPageFunctionality();
    Entry.newEntryForm.addEventListener("submit", (e) => {
      Functionality.resetEntryForm(e)
      Entry.createNewEntry(e)
    });
    Entry.exitButton.addEventListener("click", Functionality.resetEntryForm) //move to functionality
    Keyword.filterKeywordForm.addEventListener("submit", (e) => { //move to functionality
      Entry.filterEntries(e);
    })
  }

  render() {
    let li = document.createElement("li");
    li.innerHTML = `
      <i> Time interval: ${this.timeInterval} </i> ${this.body}
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

    fetch(`${baseEntriesURL}/${id}`, configObj) //move fetch portion to adapter class?
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      li.remove();
    })
    .catch( () => alert("could not delete this journal entry"))
  }

  // static setTimer(e) { //move to functionality class
  //   console.log(e.target);
  //   let seconds = parseInt(Functionality.secondSelect.value, 10) * 1000;
  //   let minutes = parseInt(Functionality.minuteSelect.value, 10) * 60000;
  //   Entry.numMille = seconds + minutes;
  //   Entry.minutesString = Functionality.minuteSelect.value.padStart(2, '0');
  //   Entry.secondsString = Functionality.secondSelect.value.padStart(2, '0');
  //   console.log(Entry.numMille);
  //   if (seconds >= 1000 || minutes >= 60000) {
  //     Entry.interval = setTimeout(Entry.saveOrDeleteEntry, Entry.numMille);
  //   }
  // }

  static createNewEntry(e) {
    e.preventDefault();
    let body = e.target.querySelector("#body")

    let data = {
      body: body.value,
      time_interval: Entry.numMille / 60000,
      keywords_attributes: Keyword.keywordBlankModal.value
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
      `Your ${Entry.minutesString}:${Entry.secondsString} writing timer is up! Don't forget to click the 'save' button below if you'd like to keep your entry.`
    );
  }

  static removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }


  static filterEntries(e) {
    e.preventDefault();
    let query = e.target.querySelector("#keywords");
    let fetchURL;
    if (query.value === "") {
      fetchURL = baseEntriesURL
    } else {
      fetchURL = `${baseEntriesURL}?q=${query.value}`
    }

    fetch(fetchURL)
    .then(resp => resp.json())
    .then(entries => {
      let ul = document.querySelector(".set-list-image");
      Entry.removeAllChildNodes(ul);
      if (entries.length > 0) {
        entries.forEach(e => {
          let entry = new Entry(e.id, e.body, e.time_interval)
          entry.render();
        })
      }
        query.value = "";
    })
  }

}
