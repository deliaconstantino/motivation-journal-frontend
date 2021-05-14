class Functionality {
  constructor () {
    this.n = 60;
  }

  static minuteSelect = document.querySelector("#timer-select-min");
  static secondSelect = document.querySelector("#timer-select-sec");
  static timerButton = document.querySelector("#timer-button"); //move to functionality

  renderTimerSelectOptions(timerSelector) {
    let options = [];
    for (let i = 0; i < this.n; i++) {
      options += `<option>${i}</option>`
    }
    timerSelector.innerHTML = options;
  }

  static addPageFunctionality() {
    Functionality.timerButton.addEventListener("click", Functionality.setTimer);
  }

  static setTimer(e) { //move to functionality class
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

  static resetEntryForm(bodyElement) { //resetEntryForm
    Functionality.minuteSelect.value = '0';
    Functionality.secondSelect.value = '0';
    clearTimeout(Entry.interval);
    Keyword.keywordBlankModal.value = "";
    bodyElement.value = "";
  }

}
