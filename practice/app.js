// Week 3 Monday practice: paste each step from the slides below this line.
const helloButton = document.querySelector("#hello");
const message = document.querySelector("#message");


helloButton.addEventListener("click", function () {
    let count = 0;
    count = count + 1;
    message.textContent = "Hello, Tristan!";
});

const list = document.querySelector("#list");

function addItem(text) {
  const li = document.createElement("li");
  li.innerHTML = text;
  list.append(li);
}

addItem("first item");
addItem("second item");

const form = document.querySelector("#add-form");
const input = document.querySelector("#item");

form.addEventListener("submit", function (event) {
  //event.preventDefault();
  //console.log("You typed:", input.value);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value === "") return;

  message.textContent = "Saving...";
  saveItem(input.value, function (savedText) {
    addItem(savedText);
    message.textContent = "Saved!";
  });
  input.value = "";
});

// console.log("A");

// setTimeout(function () {
//   console.log("B");
// }, 0);

// console.log("You typed:", input.value);
// console.log("C");

function saveItem(text, whenSaved) {
  setTimeout(function () {
    whenSaved(text);
  }, 1500);
}

