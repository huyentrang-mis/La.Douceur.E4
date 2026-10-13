//Cap nhat hien thi header
function updateHeaderCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.innerText = totalItems;
    });
}

//Cap nhat tong tien
function updateSummary(subtotal) {
    let shippingFee = 30000;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    //Logic discount
    let discount = 0;
    if (totalItems > 3) {
        discount = 15000;
    }

    //Xu ly logic freeship
    const shippingNotice = document.getElementById('shipping-notice');
    if (subtotal >= 150000) {
        shippingFee = 0;
        if(shippingNotice) shippingNotice.style.display = 'block';
    } else {
        if(shippingNotice) shippingNotice.style.display = 'none';
    }
    
    updateHeaderCartCount();

    const grandTotal = subtotal + shippingFee - discount;
    
    const elSubtotal = document.getElementById('summary-subtotal');
    const elShipping = document.getElementById('summary-shipping');
    const elDiscount = document.getElementById('summary-discount');
    const elTotal = document.getElementById('summary-total');
    const elCartCount = document.querySelector('.cart-count');

    if(elSubtotal) elSubtotal.innerText = formatCurrency(subtotal);
    if(elShipping) elShipping.innerText = formatCurrency(shippingFee);
    if(elDiscount) elDiscount.innerText = discount > 0 ? `-${formatCurrency(discount)}` : '0đ';
    if(elTotal) elTotal.innerText = formatCurrency(grandTotal > 0 ? grandTotal : 0);
    if(elCartCount) elCartCount.innerText = totalItems;
}

//Render cart
function renderCart() {
    const cartContainer = document.getElementById('cart-list-container');
    if (!cartContainer) return;

    cartContainer.innerHTML = ''; 
    let subtotal = 0;

    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const html = `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-col product">
                    <div class="product-info">
                        <div class="product-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="product-details">
                            <h3 class="product-name">${item.name}</h3>
                            <p class="product-category">${item.category}</p>
                        </div>
                    </div>
                </div>
                <div class="cart-col price">
                    <span class="product-price">${formatCurrency(item.price)}</span>
                </div>
                <div class="cart-col quantity">
                    <div class="quantity-controls">
                        <button class="qty-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" readonly>
                        <button class="qty-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-col total">
                    <span class="item-total">${formatCurrency(itemTotal)}</span>
                </div>
                <div class="cart-col action">
                    <button class="remove-btn" onclick="removeItem(${item.id})">🗑️</button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += html;
    });

    updateSummary(subtotal);
}

function saveCartToStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
}

//Them sp vao cart
function addToCart(id, quantity) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += parseInt(quantity);
    } else {
        let cartImage = "";
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            cartImage = product.images[0];
        } else {
            cartImage = product.image;
        }

        cartItems.push({
            id: product.id,
            name: product.name,
            category: product.category || "Bánh healthy", 
            price: product.price,
            image: cartImage, 
            quantity: parseInt(quantity)
        });
    }

    saveCartToStorage(); 

    updateHeaderCartCount();
    showCartToast(`Đã thêm ${quantity} × ${product.name} vào giỏ hàng`);
}

//Thay doi so luong
function updateQuantity(id, change) {
    const item = cartItems.find(p => p.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;

        saveCartToStorage();

        renderCart(); 
        updateHeaderCartCount();
    }
}

//Xoa
function removeItem(id) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (confirmDelete) {
        cartItems = cartItems.filter(p => p.id !== id);
        renderCart();
    }
    saveCartToStorage();
    updateHeaderCartCount();
}

//Them
function addToCartSuggestion(id) {
    addToCart(id, 1);
}

//Xoa toan bo gio hang
function clearCart() {
    if (cartItems.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    const confirmClear = confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng không?");
    if (confirmClear) {
        cartItems = [];
        
        saveCartToStorage();
        
        renderCart();
        updateHeaderCartCount();
        
        updateSummary(0); 
    }
}
//Check cart and go to checkout
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {

            const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            
            if (cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống! Vui lòng chọn món trước.');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }
});

// Thong bao nhe khi them vao gio (thay cho alert)
function showCartToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.setAttribute('role', 'status');
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2200);

    document.querySelectorAll('.cart-count').forEach(el => {
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
    });
}
