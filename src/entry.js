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
    let ul = document.createElement('ul');
    let li = document.createElement("li");
    // p.innerText = this.body + `   Time interval: ${this.timeInterval}`
    li.innerHTML = `
      <i> Time interval: ${this.timeInterval} </i> ${this.body}
    `
    ul.appendChild(li);
    Entry.entriesContainer.appendChild(ul);
  }
}
