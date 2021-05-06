class Quote {
  constructor(id, body, author) {
    this.id = id;
    this.body = body;
    this.author = author;
    this.quoteContainer = document.getElementById("quote-container");
  }

  render() {
      const h2 = document.createElement("H2");
      h2.innerText = this.body
      const h3 = document.createElement("H3")
      h3.innerText = `Author - ${this.author}`
      this.quoteContainer.appendChild(h2)
      this.quoteContainer.appendChild(h3)
  }


}
