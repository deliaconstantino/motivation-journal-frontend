class Functionality {
  constructor () {
    this.n = 60;
  }

  static minuteSelect = document.querySelector("#timer-select-min");
  static secondSelect = document.querySelector("#timer-select-sec");
  static timerButton = document.querySelector("#timer-button"); // ?change name to start writing button
  static exitButton = document.querySelector('#exit-button');

  static interval;
  static numMille;
  static minutesString;
  static secondsString;

  renderTimerSelectOptions(timerSelector) {
    let options = [];
    for (let i = 0; i < this.n; i++) {
      options += `<option>${i}</option>`
    }
    timerSelector.innerHTML = options;
  }

  static addAllEventListeners() {
    Functionality.timerButton.addEventListener("click", (e) => {
      Functionality.setTimer(e);
      Keyword.renderKeywordDatalist(Keyword.datalistAddKeyword);
    });

    Entry.newEntryForm.addEventListener("submit", (e) => {
      Functionality.resetEntryForm(e)
      Entry.createNewEntry(e)
    });

    Functionality.exitButton.addEventListener("click", Functionality.resetEntryForm);

    Keyword.filterKeywordForm.addEventListener("submit", (e) => {
      Entry.filterEntries(e);
    });

    Keyword.keywordBlankModal.addEventListener("click", Keyword.renderKeywordDatalist(Keyword.filterKeywordDatalist));
  }

  static setTimer(e) {
      let seconds = parseInt(Functionality.secondSelect.value, 10) * 1000;
      let minutes = parseInt(Functionality.minuteSelect.value, 10) * 60000;
      Functionality.numMille = seconds + minutes;
      Functionality.minutesString = Functionality.minuteSelect.value.padStart(2, '0');
      Functionality.secondsString = Functionality.secondSelect.value.padStart(2, '0');

      if (seconds >= 1000 || minutes >= 60000) {
        Functionality.interval = setTimeout(Entry.saveOrDeleteEntry, Functionality.numMille);
      }
    }

  static resetEntryForm(bodyElement) {  //rename to resetTimer
    Functionality.minuteSelect.value = '0';
    Functionality.secondSelect.value = '0';
    clearTimeout(Functionality.interval);
    // Keyword.keywordBlankModal.value = ""; //this and below need to be called at a diff point resetEntryForm()
    // bodyElement.value = ""; //TODO: this is not working with the exitButton
  }

  static findHTMLandAddEventListeners() {
    Entry.ul.setAttribute("class", "set-list-image");
    Entry.entriesContainer.appendChild(Entry.ul);

    Functionality.addAllEventListeners();
  }

}
