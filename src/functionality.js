class Functionality {
  constructor () {
    this.n = 60;
  }

  static minuteSelect = document.querySelector("#timer-select-min");
  static secondSelect = document.querySelector("#timer-select-sec");

  renderTimerSelectOptions(timerSelector) {
    let options = [];
    for (let i = 0; i < this.n; i++) {
      options += '<option>' + i + '</option>'
    }
    timerSelector.innerHTML = options;
  }
}
