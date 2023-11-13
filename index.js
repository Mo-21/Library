let books = [
  {
    bookName: "Harry Potter",
    bookProgress: "41",
    isRead: {
      status: "Read",
      id: "toggle",
      className: "readStatus",
    },
  },
  {
    bookName: "Game of Thrones",
    bookProgress: "342",
    isRead: {
      status: "Unread",
      id: "toggle",
      className: "unreadStatus",
    },
  },
];

//Add book array to the screen
const display = document.querySelector(".readings");
display.innerHTML = "";
addToScreen(books.length);

function addToScreen(length) {
  for (i = length - 1; i >= 0; i--) {
    display.innerHTML += `
    <div key-title="${books[i].bookName}" class="book"> 
        <div class="bookName">${books[i].bookName}</div>
        <div class="progress">Progress: ${books[i].bookProgress} </div>
        <button id="status" class="${books[i].isRead.className}">${books[i].isRead.status}</button>
        <button id="remove">Delete</button> 
    </div>
    `;
  }
}

// //Add new Book screen
const addButton = document.querySelector(".add");
const divForm = document.querySelector(".addBookScreen");

addButton.addEventListener("click", () => {
  divForm.style.display = "flex";
});

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents the default form submission behavior
});

const doneButton = document.querySelector(".closeWindow");

doneButton.addEventListener("click", () => {
  divForm.style.display = "none"; //closing form

  const newBook = {
    bookName: document.getElementById("book_name").value,
    bookProgress: document.getElementById("number_of_pages").value,
    isRead: {
      status: document.getElementById("book_status").value,
      id: "toggle",
      className:
        document.getElementById("book_status").value === "Read"
          ? "readStatus"
          : "unreadStatus",
    },
  };

  //Pushing the new book to the book array, clearing the screen, and updating it.
  books.push(newBook);
  display.innerHTML = "";
  addToScreen(books.length);
});

const deleteBook = document.querySelectorAll("#remove");

display.addEventListener("click", (event) => {
  const target = event.target;
  if (target.id === "remove") {
    const title = target.parentElement.getAttribute("key-title");

    const newBook = books.filter((book) => book.bookName !== title);

    books = newBook;
    display.innerHTML = "";
    addToScreen(books.length);
  }
});

const toggleStatus = document.querySelectorAll("#status");

display.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.id === "status") {
    const title = target.parentElement.getAttribute("key-title");
    const status = target.className;

    for (const book of books) {
      if (book.bookName === title) {
        if (status === "readStatus") {
          book.isRead.className = "unreadStatus";
          book.isRead.status = "Unread";
        } else if (status === "unreadStatus") {
          book.isRead.className = "readStatus";
          book.isRead.status = "Read";
        }
      }
    }

    display.innerHTML = "";
    addToScreen(books.length);
  }
});
