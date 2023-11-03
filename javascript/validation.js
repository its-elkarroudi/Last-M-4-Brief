
class Category {
   
    constructor(categoryId,categoryTitle,CategoryDesc){
        this.categoryId = categoryId;
        this.categoryTitle = categoryTitle;
        this.CategoryDesc = CategoryDesc;
    }
}

const checkTitles = (title) => {
     const validTitle = /^[A-Za-z ]+$/;
     if(validTitle.test(title)){
        return true;
     }
     else{
        return false;
     }
}

const checkDescription = (description) => {
    const validDesc = /^[A-Za-z0-9\W]+$/
    if(validDesc.test(description)){
        return true;
    }
    else{
        return false;
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

const modifyCategorys = (categoryTitle,CategoryDesc) =>{
    categorys= bringData("categorys");
    
    for (i=0; i < categorys.length; i++ ){
        if(categorys[i].categoryTitle == categoryTitle){
            categorys[i].CategoryDesc = CategoryDesc;
        }
    }
    
    saveData("categorys",categorys);
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


function restoreContent(parent,key) {
    const content = JSON.parse(localStorage.getItem(key)) || [];
    content.forEach((element) => {
        const newDiv = document.createElement("div");
        parent.appendChild(newDiv);
        newDiv.outerHTML = element;
    });
}

const categoryItems = document.getElementById("category-items");

const deleteCategory = (categoryName) => {
    const categorys = bringData("categorys") || [];
    const categoryIndex = categorys.findIndex(category => category.categoryTitle == categoryName);
    console.log(categoryIndex);
    
    if (categoryIndex !== -1) {
        categorys.splice(categoryIndex, 1);
        saveData("categorys", categorys);
        const categoryElement = document.getElementById(`category-${categoryName.trim()}`);
        if (categoryElement) {
            categoryElement.remove();
        }
        saveContents(categoryItems,"category_List");
    }
}

const newCategoryForm = document.getElementById("addCategoryForm");


newCategoryForm.addEventListener("submit", (event) => {
    const categoryName = document.getElementById("category-name").value;
    const categoryDesc = document.getElementById("category-desc").value;
    const categoryInput = document.getElementById("category-name");
    const descInput = document.getElementById("category-desc");
    const errorMsg = document.getElementById("errorMessage");

    if(categoryName.trim() === "" || categoryDesc.trim() === ""){
        errorMsg.textContent = "Pls Fill All Informations";
        descInput.classList.add("invalid");
    }

    else{
        errorMsg.textContent = "";
    }

    const nameValidation = checkTitles(categoryName);
    
    if(!nameValidation){
        
        if(categoryInput.classList.contains("valid")){
            categoryInput.classList.remove("valid");
        }
        categoryInput.classList.add("invalid");
    }
    else{
        if(categoryInput.classList.contains("invalid")){
            categoryInput.classList.remove("invalid");
        }
        categoryInput.classList.add("valid");
    }

    const descValidation = checkDescription(categoryDesc);

    if(!descValidation){
        
        if(descInput.classList.contains("valid")){
            descInput.classList.remove("valid");
        }
        descInput.classList.add("invalid");
    }
    else{
        if(descInput.classList.contains("invalid")){
             descInput.classList.remove("invalid");
        }
        descInput.classList.add("valid");
    }
    event.preventDefault();
})

const modifyCatForm = document.getElementById("modifyCategory");

modifyCatForm.addEventListener("submit", (event) =>{
    const categoryName = document.getElementById("modifyCatName").value;
    const categoryDesc = document.getElementById("modifyCatDesc").value;
    const categoryInput = document.getElementById("modifyCatName");
    const descInput = document.getElementById("modifyCatDesc");
    const errorMsg = document.getElementById("errorMessage");

    if(categoryName.trim() === "" || categoryDesc.trim() === ""){
        errorMsg.textContent = "Pls Fill All Informations";
        descInput.classList.add("invalid");
    }

    else{
        errorMsg.textContent = "";
        
    }

    const nameValidation = checkTitles(categoryName);
    
    if(!nameValidation){
        
        if(categoryInput.classList.contains("valid")){
            categoryInput.classList.remove("valid");
        }
        categoryInput.classList.add("invalid");
    }
    else{
        if(categoryInput.classList.contains("invalid")){
            categoryInput.classList.remove("invalid");
        }
        categoryInput.classList.add("valid");
    }

    const descValidation = checkDescription(categoryDesc);

    if(!descValidation){
        
        if(descInput.classList.contains("valid")){
            descInput.classList.remove("valid");
        }
        descInput.classList.add("invalid");
    }
    else{
        if(descInput.classList.contains("invalid")){
             descInput.classList.remove("invalid");
        }
        descInput.classList.add("valid");
    }
    event.preventDefault();
})







const addCatBtn = document.getElementById("addCatBtn") ;


addCatBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    const categoryName = document.getElementById("category-name");
    const categoryDesc = document.getElementById("category-desc");
    const validationMsg = document.getElementById("validation");

   if(addCategory(categoryName.value,categoryDesc.value)){
        validationMsg.textContent="category added successfully";
        const catName = `category-${categoryName.value}`;
        const newCat = document.createElement("div");
        newCat.innerHTML = `
                    <img src="../Img/Categories/Cat-beck.png" alt="category image">
                    <div class="info">
                        <h1>${categoryName.value}</h1>
                        <div>
                            <button class="sp-btn delete">Delete</button>
                            <button class="modify_Category_btn sp-btn ">Modify</button>
                        </div>
                    </div>  `;
        newCat.classList.add("category");
        newCat.setAttribute("id", catName.trim());
        categoryItems.appendChild(newCat);
        const deleteButton = newCat.querySelector(".delete");
        deleteButton.addEventListener("click", () => {
            deleteCategory(categoryName.value);
        });
        saveContents(categoryItems,"category_List");
    }
    else{
        validationMsg.textContent="category Name already exists !";
    }
});

const modifyCategory = document.getElementById("modify_Category");

categoryItems.addEventListener("click", (event) =>{

   
    if (event.target.classList.contains("modify_Category_btn")){
       modifyCategory.classList.add("show");
       const categoryTitle = event.target.closest(".category").getAttribute("id").replace("category-","");
       categorys = bringData("categorys") || [];
       
       const catToModify = categorys.find(category => category.categoryTitle == categoryTitle );
       
       const catId = document.getElementById("catId");
       const catTitle = document.getElementById("modifyCatName");
       const description = document.getElementById("modifyCatDesc");
       const modifyCatBtn= document.getElementById("modifyCatBtn");
       const validationMsg = document.getElementById("validation4");
       catId.value = catToModify.categoryId;
       catTitle.value = catToModify.categoryTitle;
       description.value = catToModify.CategoryDesc;

       modifyCatBtn.addEventListener("click", () => {
            modifyCategorys(catTitle.value,description.value);
            validationMsg.textContent = "CATEGORY MODIFIED SUCCESSFULLY !";
       })
    }

})


window.addEventListener("load", () =>{
    restoreContent(categoryItems,"category_List");
    categoryItems.addEventListener("click", (event) => {
      
        if (event.target.classList.contains("delete")) { 
            
            const categoryName = event.target.closest(".category").id.replace("category-","");
            deleteCategory(categoryName);
        }
    });
    
    
})








