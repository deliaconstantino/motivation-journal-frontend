class Quote {
  constructor(id, body, author) {
    this.id = id;
    this.body = body;
    this.author = author;
  }

  static quoteContainer = document.getElementById("quote-container");

  render() {
      const h2 = document.createElement("H2");
      h2.innerText = this.body
      const h3 = document.createElement("H3")
      h3.innerText = `Author - ${this.author}`
      Quote.quoteContainer.appendChild(h2)
      Quote.quoteContainer.appendChild(h3)
  }

}
