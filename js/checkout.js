document.addEventListener("DOMContentLoaded", function() {
    loadOrderSummary();
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    const orderItemsContainer = document.getElementById('order-items-list');
    const elSubtotal = document.getElementById('checkout-subtotal');
    const elShipping = document.getElementById('checkout-shipping');
    const elDiscount = document.getElementById('checkout-discount');
    const elTotal = document.getElementById('checkout-total');
    
    orderItemsContainer.innerHTML = '';

    let subtotal = 0;
    let totalItems = 0; 

    //Check if cart is empty
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p style="text-align:center">Chưa có sản phẩm nào</p>';
        if(elTotal) elTotal.innerText = '0đ';
        return;
    }

    cart.forEach(product => {
        const quantity = parseInt(product.quantity);
        const price = parseInt(product.price);
        const itemTotal = price * quantity;
        
        subtotal += itemTotal;
        totalItems += quantity;

        const itemHTML = `
            <div class="order-item">
                <span style="flex: 2;">${product.name} <small>(x${quantity})</small></span>
                <span style="flex: 1; text-align: right;">${itemTotal.toLocaleString('vi-VN')} VND</span>
            </div>
        `;
        orderItemsContainer.innerHTML += itemHTML;
    });

    let shippingFee = 30000;
    if (subtotal >= 150000) {
        shippingFee = 0;
    }

    let discount = 0;
    if (totalItems > 3) {
        discount = 15000;
    }

    const grandTotal = subtotal + shippingFee - discount;

    if (elSubtotal) elSubtotal.innerText = subtotal.toLocaleString('vi-VN') + ' VND';
    
    if (elShipping) {
        if (shippingFee === 0) {
            elShipping.innerText = "Miễn phí";
            elShipping.style.color = "green";
        } else {
            elShipping.innerText = shippingFee.toLocaleString('vi-VN') + ' VND';
            elShipping.style.color = "#333";
        }
    }

    if (elDiscount) {
        if (discount > 0) {
            elDiscount.innerText = `-${discount.toLocaleString('vi-VN')} VND`;
            elDiscount.style.color = "red";
        } else {
            elDiscount.innerText = "0 VND";
            elDiscount.style.color = "#333";
        }
    }

    if (elTotal) elTotal.innerText = (grandTotal > 0 ? grandTotal : 0).toLocaleString('vi-VN') + ' VND';
}

// Handle payment processing
function processPayment() {
    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();

    if(fullname === "" || phone === "" || address === "" || email === "") {
        alert("Vui lòng điền đầy đủ thông tin giao hàng!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }
    //Success message
    document.getElementById('checkout-main-area').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';

    //Reset cart
    document.getElementById('payment-form').reset();
    localStorage.removeItem('shoppingCart');

    const cartCountEls = document.querySelectorAll('.cart-count');
    cartCountEls.forEach(el => el.innerText = '0');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}