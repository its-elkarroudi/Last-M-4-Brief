class Books {
    constructor(bookId,ISBN,bookTitle,bookDesc,price,quantity,disponibility,authorName,categoryName){
        this.bookId = bookId;
        this.Isbn = ISBN;
        this.bookTitle = bookTitle;
        this.bookDesc = bookDesc;
        this.price = price;
        this.quantity = quantity;
        this.disponibility = disponibility;
        this.authorName = authorName;
        this.categoryName = categoryName;
    }
}


class Category {
   
    constructor(categoryId,categoryTitle,CategoryDesc){
        this.categoryId = categoryId;
        this.categoryTitle = categoryTitle;
        this.CategoryDesc = CategoryDesc;
    }

}

let books = [];
let categorys = [];
let authors = [];

const bringData = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

const saveData = (key,data) => {
    localStorage.setItem(key,JSON.stringify(data));
}


const saveContents = (parent,key) => {
    const content = Array.from(parent.children).map((content) => content.outerHTML);
    localStorage.setItem(key, JSON.stringify(content));
}

const addBook =(ISBN,bookTitle,bookDesc,price,quantity,disponibility,authorName,categoryName) =>{
    const id = new Date().getTime().toString();
    books= bringData("books") || [];
    const checkUnique = () => {
        for (let i = 0; i < books.length; i++) {
            if (books[i].Isbn === ISBN || books[i].bookTitle === bookTitle) {
                return false;
            }
        }
        return true; 
    }
    if(checkUnique()){
        const newBook = new Books(id,ISBN,bookTitle,bookDesc,price,quantity,disponibility,authorName,categoryName);
        books.push(newBook);
        saveData("books", books);
        return true;
    }
    else {
        return false;
    }  
}

const booksContainer = document.getElementById("products-container");

const deleteBook = (bookTitle) => {
    const books = bringData("books") || [];
    
    const bookIndex = books.findIndex(book => book.bookTitle === bookTitle);
    
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        saveData("books", books);
        const bookElement = document.getElementById(`book-${bookTitle.trim()}`);
        if (bookElement) {
            bookElement.remove();
        }
        
        saveContents(booksContainer, "books_List");
    }
}

const addCategory = (categoryTitle,categoryDesc) =>{
    const id = new Date().getTime().toString();
    categorys = bringData("categorys") || [];
    console.log(categorys);
    const checkUnique = () =>{
        for(i = 0; i<categorys.length ; i++ ){
            if(categorys[i].categoryTitle == categoryTitle){
                return false;
            }
        }
        return true;
    }
    if(checkUnique()){
        const newCategory = new Category(id,categoryTitle,categoryDesc);
        categorys.push(newCategory);
        saveData("categorys",categorys);
        return true;
    }
    else{
        return false;
    }   

}

const modifyBook = (ISBN,bookTitle,bookDesc,price,quantity,disponibility,authorName,categoryName) =>{
    books= bringData("books");
    
    for (i=0; i < books.length; i++ ){
        if(books[i].bookTitle == bookTitle){
            books[i].Isbn= ISBN;
            books[i].bookDesc = bookDesc;
            books[i].price = price ;
            books[i].quantity = quantity;
            books[i].disponibility = disponibility;
            books[i].authorName = authorName;
            books[i].categoryName = categoryName;
        }
    }
    
    saveData("books",books);
}

const modifyCategory = (categoryTitle,categoryDesc) =>{
   categorys = bringData("categorys");
   for (i = 0 ; i < categorys.length ; i++){
    if(categorys[i].categoryTitle == categoryTitle ){
        categorys[i].CategoryDesc = categoryDesc;
    }
   }
   saveData("categorys",categorys);
}

const saveContent = (parent,key) => {
    const content = Array.from(parent.children).map((content) => content.outerHTML);
    localStorage.setItem(key, JSON.stringify(content));
}

function restoreContent(parent,key) {
    const content = JSON.parse(localStorage.getItem(key)) || [];
    content.forEach((element) => {
        const newDiv = document.createElement("div");
        parent.appendChild(newDiv);
        newDiv.outerHTML = element;
    });
}


const newBookForm = document.querySelector(".addBookForm");
const addBooksForm = document.getElementById("edit_Product");
const productSection = document.getElementById("products-container");



productSection.addEventListener("click", (event) =>{
     if (event.target.classList.contains("modify_Book_btn")){
        addBooksForm.classList.add("show");
        const bookTitle = event.target.closest(".product").getAttribute("id").replace("book-","");
        books = bringData("books") || [];
        const bookToModify = books.find(book => book.bookTitle == bookTitle );
        
        const bookId = document.getElementById("book-id");
        const isbn = document.getElementById("bookIsbn2");
        const title = document.getElementById("bookTitle2");
        const price = document.getElementById("bookPrice2");
        const quantity = document.getElementById("bookQuantity2");
        const author = document.getElementById("bookAuthor2");
        const desc = document.getElementById("bookDescription2");
        const validationMsg = document.getElementById("validation2");
        const editBookBtn = document.getElementById("editBookBtn");

        bookId.value = bookToModify.bookId;
        isbn.value = bookToModify.Isbn;
        isbn.setAttribute("readonly",true);
        title.value = bookToModify.bookTitle;
        title.setAttribute("readonly",true);
        price.value = bookToModify.price;
        quantity.value = bookToModify.quantity;
        author.value = bookToModify.authorName;
        desc.value = bookToModify.bookDesc;
        validationMsg.textContent = "";

        editBookBtn.addEventListener("click" , () => {
             if(price.value !== bookToModify.price ){
                bookToModify.price = price.value;
             }
             if(quantity.value !== bookToModify.quantity ){
                bookToModify.quantity = quantity.value;
             }
             if(author.value !== bookToModify.authorName ){
                bookToModify.authorName = author.value;
             }

             if(desc.value !== bookToModify.bookDesc ){
                bookToModify.bookDesc = desc.value;
             }
             validationMsg.textContent = "book modified succesfully !";
        })


     }

})



newBookForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const isbn = document.getElementById("bookIsbn");
    const title = document.getElementById("bookTitle");
    const desc = document.getElementById("bookDescription");
    const price = document.getElementById("bookPrice");
    const quantity = document.getElementById("bookQuantity");
    const author = document.getElementById("bookAuthor");
    const validationMsg = document.getElementById("validation");
    const disponibility = true;
    const category = document.getElementById("bookCategorySelect").value;
    
    if(addBook(isbn.value,title.value,desc.value,price.value,quantity.value,disponibility,author.value,category)){
        validationMsg.textContent="Book added successfully";
        const bookName = `book-${title.value}`;
        const newBook = document.createElement("div");
        newBook.innerHTML = `<h3>${isbn.value}</h3>
                            <h3>${title.value}</h3>
                            <h3>${price.value}</h3>
                            <h3>${quantity.value}</h3>
                            <h3>
                                <button class="sp-btn delete">Delete</button>
                                <button class="sp-btn modify_Book_btn">Modify</button>
                            </h3> `
                    ;
        newBook.classList.add("product");
        newBook.setAttribute("id", bookName.trim());
        productSection.appendChild(newBook);
        const deleteButton = newBook.querySelector(".delete");
        deleteButton.addEventListener("click", () => {
            deleteCategory(title.value);
        });
        saveContent(productSection,"books_List");
    }    
    else{
        validationMsg.textContent = "ISBN OR TITLE ALREADY EXIST !";
    }
});


const editBookBtn = document.getElementById("editBookBtn");

editBookBtn.addEventListener("click", () =>{
    const isbn = document.getElementById("bookIsbn2");
    const title = document.getElementById("bookTitle2");
    const desc = document.getElementById("bookDescription2");
    const price = document.getElementById("bookPrice2");
    const quantity = document.getElementById("bookQuantity2");
    const author = document.getElementById("bookAuthor2");
    const validationMsg = document.getElementById("validation2");
    const disponibility = false;
    const category = document.getElementById("bookCategorySelect").value;

    modifyBook(isbn.value,title.value,desc.value,price.value,quantity.value,disponibility,author.value,category);
    validationMsg.textContent = "book modified successfully";
});


window.addEventListener("load",()=>{
    restoreContent(productSection,"books_List");
    productSection.addEventListener("click", (event) => {
        
        if (event.target.classList.contains("delete")) { 
            
            const bookName = event.target.closest(".product").id.replace("book-","");
            deleteBook(bookName);
        }
    });

    
    const selectCat = document.getElementById("bookCategorySelect");

    categorys = bringData("categorys");
    console.log(categorys);
    categorys.forEach(category => {
        const selectOption = document.createElement("option");
        selectOption.value = category.categoryTitle;
        selectOption.textContent = category.categoryTitle;
        selectCat.appendChild(selectOption);
    })
});
































