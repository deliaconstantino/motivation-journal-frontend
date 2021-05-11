class Entry {
  constructor(id, body, time_interval) {
    this.id = id;
    this.body = body;
    this.timeInterval = time_interval;
    Entry.all.push(this);
  }

  static all = [];
  static entriesContainer = document.getElementById("entries-container");
  static ul = document.createElement("ul");
  static newEntryForm = document.querySelector("#new-entry-form");
  static exitButton = document.querySelector('#exit-button');
  static timerButton = document.querySelector("#timer-button");
  static interval;
  static numMille;
  static minutesString;
  static secondsString;

  static createEntriesUl() {
    Entry.entriesContainer.appendChild(Entry.ul);
    Entry.timerButton.addEventListener("click", Entry.setTimer);
    Entry.newEntryForm.addEventListener("submit", () => {
      Entry.cancelTimer
      Entry.createNewEntry
    });
    Entry.exitButton.addEventListener("click", Entry.cancelTimer)
  }

  render() {
    let li = document.createElement("li");
    li.innerHTML = `
      <i> Time interval: ${this.timeInterval} </i> ${this.body}
    `;
    Entry.ul.appendChild(li);
  }

  static setTimer(e) {
    console.log(e.target);
    let seconds = parseInt(Functionality.secondSelect.value, 10) * 1000;
    let minutes = parseInt(Functionality.minuteSelect.value, 10) * 60000;
    Entry.numMille = seconds + minutes;
    Entry.minutesString = Functionality.minuteSelect.value.padStart(2, '0');
    Entry.secondsString = Functionality.secondSelect.value.padStart(2, '0');
    console.log(Entry.numMille);
    if (seconds >= 1000 || minutes >= 60000) {
      Entry.interval = setTimeout(Entry.saveOrDeleteEntry, Entry.numMille);
    }
  }

  static cancelTimer() {
    Functionality.minuteSelect.value = '0';
    Functionality.secondSelect.value = '0';
    clearTimeout(Entry.interval);
  }

  static createNewEntry(e) {
    e.preventDefault();
    let body = e.target.querySelector("#body");

    let data = {
      body: body.value,
      time_interval: Entry.numMille / 60000,
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${baseEntriesURL}`, configObj)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((e) => {
        let entry = new Entry(e.id, e.body, e.time_interval);
        entry.render();
        let modal = document.querySelector("#staticBackdrop");
        // Window.clearTimeout(Entry.interval);
        body.value = "";
        alert("Journal entry saved!");
        // TODO: clear timer
      })
      .catch(() => alert("Journal entry can't be blank"));
  }

  static saveOrDeleteEntry() {
    // TODO: Clear timeout on… many other things.
    alert(
      `Your ${Entry.minutesString}:${Entry.secondsString} writing timer is up! Don't forget to click the 'save' button below if you'd like to keep your entry.`
    );
  }
}
