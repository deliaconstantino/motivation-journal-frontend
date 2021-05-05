const baseEntriesURL = "http://localhost:3000/api/v1/entries"
const baseQuoteURL = "http://localhost:3000/api/v1/quotes"

const quoteContainer = document.getElementById("quote container");

document.addEventListener("DOMContentLoaded", () => {
  loadRandomQuote()
  loadEntries()
})

function loadRandomQuote() {
  fetch(baseQuoteURL)
  .then(resp => resp.json())
  .then(quotes => {
    const index = Math.floor(Math.random() * 10);
    const h2 = document.createElement("H2");
    h2.innerText = quotes[index].body
    const h3 = document.createElement("H3")
    h3.innerText = `Author - ${quotes[index].author}`
    quoteContainer.appendChild(h2)
    quoteContainer.appendChild(h3)
  })
}

function loadEntries() {
  fetch(baseEntriesURL)
  .then(resp => resp.json())
  .then(entries => {
    // console.log(entries);
    console.log("entries fetch")
  })
}
