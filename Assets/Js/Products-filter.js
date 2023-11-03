// document.addEventListener('DOMContentLoaded', function () {
//     const categoryListItems = document.querySelectorAll('.category-list li');
//     const products = document.querySelectorAll('.product');

//     categoryListItems.forEach((categoryItem) => {
//         categoryItem.addEventListener('click', function () {
//             const selectedCategory = categoryItem.textContent.trim();
            
            
//             // Show all products initially
//             products.forEach((product) => {
//                 product.style.display = 'block';
//             });

//             // If a category is selected, hide products that don't match the selected category
//             if (selectedCategory !== 'All') {
//                 products.forEach((product) => {
//                     const productCategory = product.getAttribute('data-category');
//                     if (productCategory !== selectedCategory) {
//                         product.style.display = 'none';
//                     }
//                 });
//             }
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    const categoryListItems = document.querySelectorAll('.category-list li');
    const products = document.querySelectorAll('.product');
    const noProductInCategory = document.getElementById('noProductInCategory');

    categoryListItems.forEach((categoryItem) => {
        categoryItem.addEventListener('click', function () {
            const selectedCategory = categoryItem.textContent.trim();
            let productsToShow = [];

            // Collect products matching the selected category
            products.forEach((product) => {
                const productCategory = product.getAttribute('data-category');
                if (selectedCategory === 'All' || productCategory === selectedCategory) {
                    productsToShow.push(product);
                }
            });

            // Hide all products and show only the matching ones
            products.forEach((product) => {
                product.style.display = 'none';
            });

            if (productsToShow.length > 0) {
                productsToShow.forEach((product) => {
                    product.style.display = 'block';
                });
                noProductInCategory.style.display = 'none'; // Hide the message
            } else {
                noProductInCategory.style.display = 'block'; // Show the message
            }
        });
    });
});