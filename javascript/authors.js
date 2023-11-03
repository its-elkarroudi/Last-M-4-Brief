
class Author {
    constructor(authorId,authorName,speciality){
        this.authorId = authorId;
        this.authorName = authorName;
        this.speciality = speciality;
    }
}


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

function restoreContents(parent,key) {
    const content = JSON.parse(localStorage.getItem(key)) || [];
    content.forEach((element) => {
        const newDiv = document.createElement("div");
        parent.appendChild(newDiv);
        newDiv.outerHTML = element;
    });
}


const addAuthor = (authorName,speciality) =>{
    const id = new Date().getTime().toString();
    authors = bringData("authors") || [];
    console.log(authors);
    const checkUnique = () =>{
        for(i = 0; i<authors.length ; i++ ){
            if(authors[i].authorName == authorName){
                return false;
            }
        }
        return true;
    }
    if(checkUnique()){
        const newAuthor = new Author(id,authorName,speciality);
        authors.push(newAuthor);
        saveData("authors",authors);
        return true;
    }
    else{
        return false;
    }    
}


const modifyAuthors = (authorName,speciality) =>{
    authors= bringData("authors");
    
    for (i=0; i < authors.length; i++ ){
        if(authors[i].authorName == authorName){
            authors[i].speciality = speciality;
        }
    }
    
    saveData("authors",authors);
}


const addAuthorBtn = document.getElementById("addAuthorBtn");
const AuthorContainer = document.getElementById("Author-container");

const deleteAuthor = (authorName) => {
    const authors = bringData("authors") || [];
    
    const authorIndex = authors.findIndex(author => author.authorName === authorName);
    
    if (authorIndex !== -1) {
        authors.splice(authorIndex, 1);
        saveData("authors", authors);
        const authorElement = document.getElementById(`author-${authorName.trim()}`);
        if (authorElement) {
            authorElement.remove();
        }
        
        saveContents(AuthorContainer, "author_list");
    }
}

addAuthorBtn.addEventListener("click", () => {
    const authorName = document.getElementById("Author-name");
    const speciality = document.getElementById("Author-speciality");
    const validationMsg = document.getElementById("authorValidation");

    if(addAuthor(authorName.value, speciality.value)){
        validationMsg.textContent = "Author added successfully";
        const authName = `author-${authorName.value}`;
        const newAuthor = document.createElement("div");
        newAuthor.setAttribute("id", authName.trim());
        newAuthor.innerHTML = `  
        <h3>01</h3>
        <h3>${authorName.value}</h3>
        <h3>${speciality.value}</h3>
        <h3>
            <button class="sp-btn delete">Delete</button>
            <button class="sp-btn modify_Author_btn">Modify</button>
        </h3>`;
        newAuthor.classList.add("Author");
        AuthorContainer.appendChild(newAuthor);
        
        const deleteButton = newAuthor.querySelector(".delete");
        deleteButton.addEventListener("click", () => {
            deleteAuthor(authorName.value);
        });

        saveContents(AuthorContainer, "author_list");
    } else {
        validationMsg.textContent = "Author Name ALREADY EXISTS!";
    }
});

const modifyAuthorForm = document.getElementById("modify_Author");


AuthorContainer.addEventListener("click", (event) =>{
   
    if (event.target.classList.contains("modify_Author_btn")){
       modifyAuthorForm.classList.add("show");
       const authorName = event.target.closest(".Author").getAttribute("id").replace("author-","");
       authors = bringData("authors") || [];
       
       const authorToModify = authors.find(author => author.authorName == authorName );
       console.log(authorToModify);
      
       const authorId = document.getElementById("authorId");
       const name = document.getElementById("authorName");  
       const speciality = document.getElementById("Speciality");
       const modifyAuthBtn = document.getElementById("modifyAuthBtn");
       const validationMsg = document.getElementById("authorValidation2");



       authorId.value = authorToModify.authorId;
       name.value = authorToModify.authorName;
       speciality.value = authorToModify.speciality;

        modifyAuthBtn.addEventListener("click", () => {
            modifyAuthors(name.value,speciality.value );
            validationMsg.textContent = "CATEGORY MODIFIED SUCCESSFULLY !";
       })


    }

})


window.addEventListener("load", () => {
    restoreContents(AuthorContainer, "author_list");
    const deleteButtons = AuthorContainer.querySelectorAll(".delete");
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
            const authorName = deleteButton.closest(".Author").id.replace("author-", "");
            deleteAuthor(authorName);
        });
    });
});



const modifyAuthform = document.getElementById("modify-form");

modifyAuthform.addEventListener("Submit" , (event) =>{
    event.preventDefault();
})