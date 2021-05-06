const baseEntriesURL = "http://localhost:3000/api/v1/entries"
const baseQuoteURL = "http://localhost:3000/api/v1/quotes/random"
// keywords will be a class

const quoteContainer = document.getElementById("quote-container");

document.addEventListener("DOMContentLoaded", () => {
  loadRandomQuote()
  loadEntries()
})

function loadRandomQuote() {
  fetch(baseQuoteURL)
  .then(resp => resp.json())
  .then(quote => {
    //put in a class
    console.log(quote)
    const h2 = document.createElement("H2");
    h2.innerText = quote.body
    const h3 = document.createElement("H3")
    h3.innerText = `Author - ${quote.author}`
    quoteContainer.appendChild(h2)
    quoteContainer.appendChild(h3)
  })
}

function loadEntries() {
  fetch(baseEntriesURL)
  .then(resp => resp.json())
  .then(entries => {
    // entry class
    // console.log(entries);
    console.log("entries fetch")
  })
}
