class Functionality {
  constructor () {
    this.n = 60;
  }

  static minuteSelect = document.querySelector("#timer-select-min");
  static secondSelect = document.querySelector("#timer-select-sec");
  // static minutesString = Functionality.minuteSelect.value.padStart(2, '0');
  // static secondsString = Functionality.secondSelect.value.padStart(2, '0');

  renderTimerSelectOptions(timerSelector) {
    let options = [];
    for (let i = 0; i < this.n; i++) {
      options += `<option>${i}</option>`
    }
    timerSelector.innerHTML = options;
  }
}
