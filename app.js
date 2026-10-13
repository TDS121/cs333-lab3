// Part 1: a pretend library. In Part 2 you replace fakeSearch with a real search using fetch.
const FAKE_BOOKS = [
  { key: "/works/OL893414W", title: "Dune", author_name: ["Frank Herbert"], first_publish_year: 1965 },
  { key: "/works/OL35623W", title: "Parable of the Sower", author_name: ["Octavia E. Butler"], first_publish_year: 1993 },
  { key: "/works/OL35616W", title: "Kindred", author_name: ["Octavia E. Butler"], first_publish_year: 1979 },
  { key: "/works/OL66554W", title: "Pride and Prejudice", author_name: ["Jane Austen"], first_publish_year: 1813 },
  { key: "/works/OL27513W", title: "The Fellowship of the Ring", author_name: ["J.R.R. Tolkien"], first_publish_year: 1954 },
  { key: "/works/OL1168083W", title: "Nineteen Eighty-Four", author_name: ["George Orwell"], first_publish_year: 1949 },
];

// Pretends to be a slow website: after one second it calls whenDone with the books that match
function fakeSearch(query, whenDone) {
  setTimeout(() => {
    const q = query.toLowerCase();
    const matches = FAKE_BOOKS.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author_name.some((name) => name.toLowerCase().includes(q))
    );
    whenDone(matches);
  }, 1000);
}

// Your code starts here.
const form = document.querySelector("#search-form");
const input = document.querySelector("#query");
const statusMessage = document.querySelector("#status");
const results = document.querySelector("#results");
console.log(form, input, statusMessage, results);

// Puts the books on the page, one <li> per book
function renderResults(books) {
  results.textContent = "";                       // Empty the list first so old results don't pile up
  books.forEach(function (book) {
    const li = document.createElement("li");
    li.textContent = book.title + " — " + book.author_name[0] + " (" + book.first_publish_year + ")";

    // Adds a Save button to this book's <li>
    const save = document.createElement("button");
    save.textContent = "Save";
    save.addEventListener("click", function () {
      console.log("save", book.title);
    });
    li.append(save);

    results.append(li);
  });
}

// Runs this function every time the form is submitted (Enter or the Search button)
form.addEventListener("submit", function (event) {
  event.preventDefault();                 // Stop the browser from reloading the page, which is what a form does by default
  const query = input.value;              // Read whatever the user typed into the search box
  console.log("searching for", query);

  // Tells the user something is happening while we wait
  statusMessage.textContent = "Searching...";

  // Asks the pretend library. The function we pass in runs a second later, when the books arrive
  fakeSearch(query, function (books) {
    console.log("got", books);
    renderResults(books);
    if (books.length === 0) {
      statusMessage.textContent = "No books found";   // Nothing matched, so say so instead of leaving the page blank
    } else {
      statusMessage.textContent = "";                 // The books are here, so it clears the "Searching..." message
    }
  });
});
