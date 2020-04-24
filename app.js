class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name: </strong> ${product.name};
                    <strong>Product Price: </strong> ${product.price};
                    <strong>Product Year: </strong> ${product.year};
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `
        productList.append(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(product) {
        if (product.name === 'delete') {
            product.parentElement.parentElement.parentElement.remove(); // get main container
            this.showMessage('Product Deleted Successfully', 'info');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove(); // hide message after 3sg
        }, 3000);
    }
}

// DOM Events

document.getElementById('product-form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const interface = new UI();

    if (name === '' || price === '' || year === '') {
        interface.showMessage('Complete Fields Please', 'danger');
    } else {
        const product = new Product(name, price, year);

        interface.addProduct(product);
        interface.resetForm();
        interface.showMessage('Product Added Successfully', 'success');
    }

    e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function (e) {
    const interface = new UI();
    interface.deleteProduct(e.target); // capture item target of the interface
});