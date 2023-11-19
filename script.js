const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", window.scrollY > 0);
});


let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");


menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("open");

};

window.onscroll = () =>{
    menu.classList.remove("bx-x");
    navbar.classList.remove("open");
};

const cakes = [
    {
    name : "Red velvet",
    price : 100000,
    image : "asset/redvelvet.jpeg",
    },
    {
    name : "Chocolate Cake",
    price : 200000,
    image : "asset/chococake.jpeg",
    },
    {
    name : "Cheese Cake",
    price : 40000,
    image : "asset/cheesecake.jpeg",
    },
    {
    name : "Nastar",
    price : 50000,
    image : "asset/nastar.jpeg",
    },
    {
    name : "Ore Balls",
    price : 35000,
    image : "asset/oreoBalls.jpeg",
    },
    {
    name : "Crosiant",
    price : 20000,
    image : "asset/crosiant.jpeg",
    },
    {
    name : "Cookie",
    price : 5000,
    image : "asset/Cookie.jpeg",
    },
    {
    name : "Cup Cake",
    price : 5000,
    image : "asset/cupcake.jpeg",
    },
    {
    name : "Tiramisu Cake",
    price : 150000,
    image : "asset/tiramisu.jpeg",
    },
    {
    name : "Birthday Cake",
    price : 250000,
    image : "asset/roll_cake.jpeg",
    },
];

// menampilkan kue
function tampilanKue(){
    const cakeContainer = document.getElementById('cake-container');

    cakes.forEach(cake =>{
        const divCake = document.createElement('div');
        divCake.classList.add('pictCake')
        divCake.innerHTML = `
        <img src = "${cake.image}" alt ="${cake.name}">
        <h3>${cake.name} </h3>
        <p> Price : Rp. ${cake.price.toLocaleString()} </p>
        <label for = "${cake.name}"> Quantity : </label>
        <input type = "number" id = "${cake.name}" value = "0" min = "0">
        <button onclick = "addToCart('${cake.name}', ${cake.price})"> Add to Cart </button>
        `;
        cakeContainer.appendChild(divCake);
    });
}

// Keranjang belanja
function addToCart(name, price) {
    const quantityInput = document.getElementById(name);
    const quantity = parseInt (quantityInput.value);
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');

    const existingCartItem = [...cartList.children].find(item => item.dataset.name === name);

    // Validasi jika quantity kurang dari 1
    if (quantity <= 0 || isNaN(quantity)){
        alert('Input jumlah yang ingin dipesan')
        return;
    }

    if (existingCartItem) {
        const existingQuantity = parseInt(existingCartItem.dataset.quantity);
        existingCartItem.dataset.quantity = existingQuantity + quantity;
        existingCartItem.querySelector('.quantity').textContent = `Quantity: ${existingQuantity + quantity}`;
    } else {
        const cartItem = document.createElement('tr');
        cartItem.classList.add('cart-item');
        cartItem.dataset.name = name;
        cartItem.dataset.quantity = quantity;
        cartItem.innerHTML = `
            <td>${name}</td>
            <td class="quantity"> ${quantity} </td>
            <td class = "total-price"> ${(price * quantity).toLocaleString()} </td>
            <td> <button onclick="removeFromCart(this, ${price})">Remove</button> </td>
        `;
        cartList.appendChild(cartItem);
    }

    
    // Menghitung total harga
    const totalPrice = parseFloat(totalPriceElement.textContent);
    totalPriceElement.textContent = (totalPrice + price * quantity).toLocaleString();

    // Mengatur kembali nilai input quantity ke 1
    quantityInput.value = 1;
}

// Fungsi untuk menghapus kue dari keranjang belanja
function removeFromCart(button, price) {
    const cartItem = button.parentElement.parentElement;
    const quantity = parseInt(cartItem.dataset.quantity);
    const totalPriceElement = document.getElementById('total-price').toLocaleString();

    // Menghitung total harga
    const totalPrice = parseFloat(totalPriceElement.textContent);
    totalPriceElement.textContent = (totalPrice - price * quantity);

    // Menghapus item dari DOM
    cartItem.remove();
}

tampilanKue();

function cekPesananMinimum() {
    const cartList = document.getElementById('cart-list');

    // Mengambil semua item pesanan yang ada
    const existingItems = [...cartList.children];

    // Jika tidak ada item yang dipesan, tampilkan pesan peringatan
    if (existingItems.length === 0) {
        alert('Minimal pesan satu item sebelum melanjutkan.');
        return false;
    }
    
    return true;
}

// Fungsi untuk mengirim pesanan
function kirimPesanan() {
    const nameInput = document.getElementById('name').value.trim();
    const addressInput = document.getElementById('alamat').value.trim();

    // Validasi input nama dan alamat
    if (!nameInput || !addressInput) {
        alert('Mohon lengkapi nama dan alamat sebelum mengirim pesanan.');
        return;
    }

    const pesananMinimum = cekPesananMinimum();
    if (pesananMinimum){
        alert('Paket akan disiapkan dan dikirimkan. Terima kasih atas pesanannya. Mohon ditunggu!');
    }
}

// Mendapatkan tombol pesan sekarang
const pesanSekarangButton = document.querySelector('.sec-pesanan button');

// Menambahkan event listener ketika tombol ditekan
pesanSekarangButton.addEventListener('click', kirimPesanan);



