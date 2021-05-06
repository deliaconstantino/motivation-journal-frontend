class Entry {
  constructor() {

  }

  loadEntries = () => {
    fetch(baseEntriesURL)
    .then(resp => resp.json())
    .then(entries => {
      // entry class
      // console.log(entries);
      console.log("entries fetch")
    })
  }
}
