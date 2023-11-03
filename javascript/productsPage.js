
class Category {
   
    constructor(categoryId,categoryTitle,CategoryDesc){
        this.categoryId = categoryId;
        this.categoryTitle = categoryTitle;
        this.CategoryDesc = CategoryDesc;
    }

}

let categorys = [];
let books = [] ;

const filterCategoryList = document.getElementById("category-list");
const productsInfos = document.getElementById("productList")

const bringData = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

const saveData = (key,data) => {
    localStorage.setItem(key,JSON.stringify(data));
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


window.addEventListener("load" , () => {
    categorys = bringData("categorys") || [];
    books = bringData("books") || [];
    if(books.length > 0){
       books.forEach( book => {
         const displayedBook = document.createElement("div");
         displayedBook.classList.add("product");
         displayedBook.innerHTML = ` 
                            <img src="../../Administration/Assets/Img/Products/product-1.png" alt="product image" class="product_image_onclick">
                            <div class="product-info d-flex">
                                <div class="pr">
                                    <h3 class="product_title_onclick">${book.bookTitle}</h3>
                                    <h5>${book.categoryName}</h5>
                                </div>
                                <div class="price d-flex">
                                    <h5>${book.price}</h5>
                                    <button class="sp-btn-reverse">Add to cart</button>
                                </div>
                            </div>`;
        displayedBook.setAttribute("id",book.bookTitle)
        productsInfos.appendChild(displayedBook);
       })
    }  
     
    if (categorys.length > 0){
        categorys.forEach(category => {
            const categoryFilter = document.createElement("li");
            categoryFilter.innerHTML = category.categoryTitle;
            categoryFilter.setAttribute("id" , category.categoryTitle);
            categoryFilter.classList.add("filter-item");
            filterCategoryList.appendChild(categoryFilter);
        });
    }
})




filterCategoryList.addEventListener("click", (event) => { 
     if(event.target.classList.contains("filter-item")){
        productsInfos.innerHTML = ``;
        books = bringData("books");
        let booksInCategory = [];
        const categoryName = event.target.closest(".filter-item").getAttribute("id");
        for (let i = 0; i <books.length ; i++ ){
            if(books[i].categoryName == categoryName){
                booksInCategory.push(books[i]);
            }
        } 
    
       booksInCategory.forEach(book => {
            const displayedBook = document.createElement("div");
            displayedBook.classList.add("product");
            displayedBook.innerHTML = ` 
                            <img src="../../Administration/Assets/Img/Products/product-1.png" alt="product image" class="product_image_onclick">
                            <div class="product-info d-flex">
                                <div class="pr">
                                    <h3 class="product_title_onclick">${book.bookTitle}</h3>
                                    <h5>${book.categoryName}</h5>
                                </div>
                                <div class="price d-flex">
                                    <h5>${book.price}</h5>
                                    <button class="sp-btn-reverse">Add to cart</button>
                                </div>
                            </div>`;
        displayedBook.setAttribute("id",book.bookTitle)
        productsInfos.appendChild(displayedBook);
       })

     }
})
  

