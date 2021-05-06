const baseURL = "http://localhost:3000/api/v1"
const baseEntriesURL = "http://localhost:3000/api/v1/entries"
const baseQuoteURL = "http://localhost:3000/api/v1/quotes/random"
// keywords will be a class



let adapter = new Adapter(baseURL)
adapter.loadContent()
