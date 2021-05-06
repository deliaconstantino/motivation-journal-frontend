class Entry {
  constructor(id, body, time_interval) {
    this.id = id;
    this.body = body;
    this.timeInterval = time_interval;
    Entry.all.push(this)
  }

  static all = [];
  static entriesContainer = document.getElementById("entries-container");

  render() {
    let p = document.createElement("p");
    // p.innerText = this.body + `   Time interval: ${this.timeInterval}`
    p.innerHTML = `
      ${this.body} <i> Time interval: ${this.timeInterval} </i>
    `
    Entry.entriesContainer.appendChild(p);
  }
}
