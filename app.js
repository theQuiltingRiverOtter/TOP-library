const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages`;
}

function addBookToLibrary(e){
    let title = e.target.elements['book_title'].value;
    let author =  e.target.elements['book_author'].value;
    let pages =  e.target.elements['book_pages'].value;
    let hasRead = e.target.elements['hasRead'].checked;
    let book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
}

function removeBookFromLibrary(index){
    myLibrary.splice(index, 1)

}



const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 276, true);
const taleOfTWoCities = new Book("A Tale of Two Cities", "Charles Dickens", 333, false);
const lordOfTheRings = new Book("Lord of the Rings", "J.R.R. Tolkien", 600, false);
const narnia = new Book("The Lion, the Witch, and the Wardrobe", "C.S.Lewis", 400, true);
const harryPotter = new Book("Harry Potter", "J.K. Rowling", 300, true);

myLibrary.push(hobbit);
myLibrary.push(taleOfTWoCities);
myLibrary.push(lordOfTheRings);
myLibrary.push(narnia);
myLibrary.push(harryPotter);



const library = document.querySelector("#library");

function showBook(book, index){
    row = document.createElement("div");
    row.classList.add("row")
    col = document.createElement("Div");
    col.classList.add("col", "s12", "m12");
    cardPanel = document.createElement("div");
    cardPanel.classList.add("card-panel", "indigo", "lighten-3");
    cardAction = document.createElement("div");
    cardAction.dataset.id = index;
    cardAction.classList.add('card-action');
    cardAction.style.marginTop ="10px";
    deleteBtn = document.createElement("a")
    deleteBtn.addEventListener("click", (e) => {
        removeBookFromLibrary(index);
        showAllBooks();
    })
    deleteBtn.classList.add("btn-floating", "btn-small", "waves-efffect", "waves-light", "blue-grey", "darken-2", "delete")
    deleteBtn.innerHTML = `<i class="material-icons">delete</i>`
    cardAction.appendChild(deleteBtn);
    toggleRead = document.createElement("a");
    toggleRead.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("here")
            ind = index;
            book = myLibrary[ind];
            book.read = !book.read;
            showAllBooks();
    });
    toggleRead.setAttribute("id", "toggle");
    toggleRead.style.marginLeft = "20px";
    toggleRead.classList.add("btn-floating", "btn-small", "waves-efffect", "waves-light", "blue-grey", "darken-2", "toggle")
    toggleRead.innerHTML = (book.read) ? `<i class="material-icons">check_box</i>` : `<i class="material-icons">check_box_outline_blank</i>`;
    cardAction.appendChild(toggleRead);
    text = document.createElement("span");
    text.classList.add("white-text");
    text.innerText = book.info();
    cardPanel.appendChild(text);
    cardPanel.appendChild(cardAction)
    col.appendChild(cardPanel);
    row.appendChild(col);
    library.appendChild(row);
}

function showAllBooks(){
    while (library.firstChild){
        library.removeChild(library.firstChild)

    }
    for (let i = 0; i < myLibrary.length; i++){
        showBook(myLibrary[i], i);
    }
}




const form_dialog = document.querySelector("dialog");
const newBook = document.querySelector("dialog + button")
const form = document.querySelector("dialog form")

newBook.addEventListener('click', () => {
    form_dialog.showModal();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    form_dialog.close();
    addBookToLibrary(e);
    showAllBooks();

})



showAllBooks();
