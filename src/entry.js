class Entry {
  constructor(id, body, time_interval) {
    this.id = id;
    this.body = body;
    this.timeInterval = time_interval;
    Entry.all.push(this)
  }

  static all = [];
  static entriesContainer = document.getElementById("entries-container");
  static ul = document.createElement('ul');
  static newEntryForm = document.querySelector("#new-entry-form");
  static timerButton = document.querySelector("#timer-button");
  static timerSelect = document.querySelector("#timer-select");



  static createEntriesUl() {
    Entry.entriesContainer.appendChild(Entry.ul);
    Entry.newEntryForm.addEventListener("submit", Entry.createNewEntry);
    Entry.timerButton.addEventListener("click", Entry.setTimer)

  }


  render() {
    let li = document.createElement("li");
    li.innerHTML = `
      <i> Time interval: ${this.timeInterval} </i> ${this.body}
    `
    Entry.ul.appendChild(li);
  }



static interval;
static numMille;

static setTimer(e) {
  console.log(e.target);
  Entry.numMille = parseInt(Entry.timerSelect.value, 10) * 1000; // TODO: change to 60000 (1000 mille/second)
  Entry.interval = setTimeout(Entry.saveOrDeleteEntry, Entry.numMille)

}

 static createNewEntry(e) {
    e.preventDefault()
    let body = e.target.querySelector("#body");

    let data = {
      body: body.value,
      time_interval: Entry.timerSelect.value
    }

    let configObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch(`${baseEntriesURL}`, configObj)
    .then(resp => resp.json())
    .then(e => {
      console.log(e);
      let entry = new Entry(e.id, e.body, e.time_interval);
      entry.render();
      let modal = document.querySelector("#staticBackdrop");
      clearTimeout(Entry.interval);
      body.value = "";
      alert('Journal entry saved!')
    })

  }

  static saveOrDeleteEntry() {
    alert(`Your ${Entry.timerSelect.value} minute writing timer is up! Don't forget to click the 'save' button below if you'd like to keep your entry.`);
  }

}
