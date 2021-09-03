// const baseURL = "http://localhost:3000/api/v1"
const baseURL = `https://protected-ocean-94869.herokuapp.com/${api/v1}`
// const baseEntriesURL = "http://localhost:3000/api/v1/entries"
const baseEntriesURL = `https://protected-ocean-94869.herokuapp.com/${api/v1/entries}`

let adapter = new Adapter(baseURL)
adapter.loadContent()
