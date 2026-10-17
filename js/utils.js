function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
}

function createProductCard(product, isNew = false) {
    const unitText = product.unit ? product.unit : '';
    const newBadgeHTML = isNew ? '<span class="new-badge">Mới</span>' : '';

    let displayImage = "";

    if (product.images && product.images.length > 0) {
        displayImage = product.images[0]; 
    } 
    else if (product.image) {
        displayImage = product.image;
    }
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-img">
                <img src="${displayImage}" alt="${product.name}" class="product-img-el">
                ${newBadgeHTML}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${typeof renderTags === 'function' ? renderTags(product) : ''}
                <div class="product-price">${formatCurrency(product.price)}${unitText}</div>
                <a href="product-detail.html?id=${product.id}" class="btn">Xem chi tiết</a>
            </div>
        </div>
    `;
}