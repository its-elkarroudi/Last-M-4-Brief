document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('product_search');
    const productList = document.getElementById('productList');
    const products = productList.getElementsByClassName('product');
    const noProductMessage = document.getElementById('noProductMessage');

    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.toLowerCase();
        let foundProducts = false;


        for (let product of products) {
            const productTitle = product.querySelector('.product_title_onclick').textContent.toLowerCase();

            if (productTitle.includes(searchQuery)) {
                product.style.display = 'block';
                foundProducts = true;
            } else {
                product.style.display = 'none';
            }
        }

        if (!foundProducts) {
            noProductMessage.style.display = 'block';
        } else {
            noProductMessage.style.display = 'none';
        }


    });
});