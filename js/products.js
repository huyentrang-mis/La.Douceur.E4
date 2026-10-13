const params = new URLSearchParams(window.location.search);
const searchQuery = params.get('search');

let filteredProducts = [];

// Xử lý tìm kiếm ban đầu
if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    if (typeof allProducts !== 'undefined') {
        filteredProducts = allProducts.filter(p => 
            p.name.toLowerCase().includes(lowerCaseQuery)
        );
    }
} else {
    if (typeof allProducts !== 'undefined') {
        filteredProducts = [...allProducts];
    }
}

// Hien thi sao danh gia
function renderStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            // Sao vàng (đầy)
            starsHtml += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>';
        } else {
            // Sao xám (rỗng)
            starsHtml += '<i class="fa-regular fa-star" style="color: #ccc;"></i>';
        }
    }
    return starsHtml;
}


// Render trang chủ
function renderHomepage() {
    const bestSellingContainer = document.getElementById('best-selling-container');
    if (bestSellingContainer && typeof bestSellingProducts !== 'undefined') {
        bestSellingContainer.innerHTML = bestSellingProducts.map(p => createProductCard(p, false)).join('');
    }

    const newArrivalContainer = document.getElementById('new-arrival-container');
    if (newArrivalContainer && typeof newArrivalProducts !== 'undefined') {
        newArrivalContainer.innerHTML = newArrivalProducts.map(p => createProductCard(p, true)).join('');
    }
}

// Render sản phẩm gợi ý 
function renderSuggestedProducts() {
    const suggestedContainer = document.getElementById('suggested-products-container');
    if (!suggestedContainer || typeof suggestedProducts === 'undefined') return;

    suggestedContainer.innerHTML = suggestedProducts.map(product => {
        if (!product) return '';

        let displayImage = "images/logo.png";
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            displayImage = product.images[0];
        } else if (product.images) {
            displayImage = product.images; // Fallback nếu dữ liệu cũ
        } else if (product.image) {
            displayImage = product.image;
        }

        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-img">
                    <img src="${displayImage}" alt="${product.name}" class="product-img-el">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">${typeof formatCurrency === 'function' ? formatCurrency(product.price) : product.price}${product.unit || ''}</div>
                    <button class="btn add-to-cart" onclick="addToCartSuggestion(${product.id})">Thêm vào giỏ</button>
                </div>
            </div>
        `;
    }).join('');
}

// Render trang danh mục
function renderCategoryPage() {
    const categoryContainer = document.getElementById('category-product-list');
    const paginationContainer = document.getElementById('pagination-container');
    const countElement = document.querySelector('.product-count');
    const sectionTitle = document.querySelector('.section-title');

    if (!categoryContainer) return;

    if (searchQuery && sectionTitle) {
        sectionTitle.innerText = `Kết quả tìm kiếm: "${searchQuery}"`;
    }

    // Đảm bảo ITEMS_PER_PAGE đã được khai báo (nếu chưa có thì gán mặc định)
    const limit = (typeof ITEMS_PER_PAGE !== 'undefined') ? ITEMS_PER_PAGE : 8; 
    
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / limit);

    if (typeof currentCategoryPage === 'undefined') window.currentCategoryPage = 1;
    if (currentCategoryPage > totalPages) currentCategoryPage = totalPages;
    if (currentCategoryPage < 1 && totalItems > 0) currentCategoryPage = 1;

    const startIndex = (currentCategoryPage - 1) * limit;
    const endIndex = startIndex + limit;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    if (totalItems > 0) {
        if(typeof createProductCard === 'function') {
             categoryContainer.innerHTML = productsToShow.map(product => createProductCard(product, false)).join('');
        }
        
        const displayEnd = endIndex > totalItems ? totalItems : endIndex;
        if(countElement) countElement.innerText = `Hiển thị ${startIndex + 1}-${displayEnd} của ${totalItems} sản phẩm`;
    } else {
        categoryContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #666;">Không tìm thấy sản phẩm nào phù hợp!</p>';
        if(countElement) countElement.innerText = `Hiển thị 0 sản phẩm`;
    }

    if (paginationContainer) {
        let paginationHTML = '';
        if (totalPages > 1) {
            if (currentCategoryPage > 1) {
                paginationHTML += `<a href="javascript:void(0)" class="prev" onclick="changeCategoryPage(${currentCategoryPage - 1})">← Trước</a>`;
            }
            for (let i = 1; i <= totalPages; i++) {
                const activeClass = i === currentCategoryPage ? 'active' : '';
                paginationHTML += `<a href="javascript:void(0)" class="page ${activeClass}" onclick="changeCategoryPage(${i})">${i}</a>`;
            }
            if (currentCategoryPage < totalPages) {
                paginationHTML += `<a href="javascript:void(0)" class="next" onclick="changeCategoryPage(${currentCategoryPage + 1})">Sau →</a>`;
            }
        }
        paginationContainer.innerHTML = paginationHTML;
    }
}

// Xử lý chuyển trang 
function changeCategoryPage(page) {
    currentCategoryPage = page;
    renderCategoryPage();
    const title = document.querySelector('.section-title');
    if(title) title.scrollIntoView({ behavior: 'smooth' });
}

// Xử lý lọc sp
function handleFilter() {
    const categorySelect = document.getElementById('category-select');
    if (!categorySelect) return;

    const selectedCategory = categorySelect.value;

    if (selectedCategory === 'all') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => product.category === selectedCategory);
    }
    
    handleSort();
}

// Xử lý sắp xếp sp
function handleSort() {
    const sortSelect = document.getElementById('sort-select');
    const sortValue = sortSelect ? sortSelect.value : 'default';

    if (sortValue === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'name-az') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filteredProducts.sort((a, b) => a.id - b.id);
    }

    currentCategoryPage = 1; 
    renderCategoryPage();    
}

// --- Render chi tiết sản phẩm (Đã sửa lỗi) ---
function renderProductDetail() {
    const detailTitle = document.getElementById('detail-name');
    // Check for element
    if (!detailTitle) return;

    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    if (typeof allProducts === 'undefined') return;
    const product = allProducts.find(p => p.id === productId);

    if (product) {
        // 1. Hiển thị thông tin cơ bản
        let mainImage = "";
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            mainImage = product.images[0];
        } else if (product.image) {
            mainImage = product.image;
        }
        
        const imgEl = document.getElementById('detail-image');
        if(imgEl) imgEl.src = mainImage;

        document.getElementById('detail-name').innerText = product.name;
        
        const priceEl = document.getElementById('detail-price');
        if(priceEl) priceEl.innerText = (typeof formatCurrency === 'function') ? formatCurrency(product.price) : product.price;

        const breadcrumbName = document.getElementById('breadcrumb-name');
        if(breadcrumbName) breadcrumbName.innerText = product.name;

        const descText = product.description || `Bánh ${product.name} được làm từ những nguyên liệu tươi ngon nhất.`;
        
        const descElement = document.getElementById('detail-description');
        const kcalLine = (product.attributes && product.attributes.kcal100) ? `<p><strong>Năng lượng:</strong> khoảng ${product.attributes.kcal100} kcal / 100g <em>(ước tính, có thể chênh lệch theo từng mẻ bánh)</em></p>` : '';
        if(descElement) descElement.innerHTML = `<p>${descText}</p>${kcalLine}`;
        
        const tabDescElement = document.getElementById('tab-description-content');
        if(tabDescElement) tabDescElement.innerHTML = `<p>${descText}</p>${kcalLine}`;

        const tagsEl = document.getElementById('detail-tags');
        if (tagsEl && typeof renderTags === 'function') tagsEl.innerHTML = renderTags(product);
        const a = product.attributes || {};
        const setText = (id, v) => { const el = document.getElementById(id); if (el && v) el.innerText = v; };
        setText('attr-size', a.size);
        setText('attr-ingredients', a.ingredients);
        setText('attr-expire', a.expire);
        setText('tab-ingredients-content', a.ingredients ? a.ingredients + '. Không thêm đường tinh luyện.' : '');
        if (priceEl && product.unit) priceEl.innerText += product.unit;

        // Xử lý nút thêm vào giỏ
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        const qtyInput = document.getElementById('detail-quantity');
        
        if (addToCartBtn) {
            const newBtn = addToCartBtn.cloneNode(true);
            addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);
            
            newBtn.onclick = function() {
                const qty = qtyInput && qtyInput.value ? parseInt(qtyInput.value) : 1;
                // Giả sử hàm addToCart đã có
                if(typeof addToCart === 'function') addToCart(product.id, qty);
            };
        }
// Nút yêu thích
        document.addEventListener('click', function(e) {
            // Xử lý nút yêu thích
            if (e.target.closest('.favorite-btn')) {
                const btn = e.target.closest('.favorite-btn');
                const productId = btn.dataset.productId;
                const icon = btn.querySelector('i');

                if (!icon) return; // Bảo vệ nếu không có icon

                btn.classList.toggle('active');

                if (btn.classList.contains('active')) {
                    icon.className = 'fas fa-heart'; // Icon đầy
                    localStorage.setItem(`fav_${productId}`, 'true');
                } else {
                    icon.className = 'far fa-heart'; // Icon rỗng
                    localStorage.removeItem(`fav_${productId}`);
                }
            }
        });

        // 2. Hiển thị Đánh giá (Reviews) 
        const reviewsTab = document.getElementById('reviews');

        if (reviewsTab) {
            if (product.reviews && Array.isArray(product.reviews) && product.reviews.length > 0) {
                // Nếu có đánh giá
                let reviewsHtml = '<div class="review-list">';
                
                product.reviews.forEach(review => {
                    reviewsHtml += `
                        <div class="review-item">
                            <div class="review-header">
                                <strong class="review-user">${review.user}</strong>
                                <span class="review-date">${review.date}</span>
                            </div>
                            <div class="review-rating">
                                ${renderStars(review.rating)}
                            </div>
                            <p class="review-comment">${review.comment}</p>
                        </div>
                    `;
                });
                
                reviewsHtml += '</div>';
                reviewsTab.innerHTML = reviewsHtml;
            } else {
                // Nếu chưa có đánh giá
                reviewsTab.innerHTML = '<p class="no-review" style="text-align: center; padding: 20px; color: #777;">Sản phẩm này chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</p>';
            }
        }

    } else {
        // Nếu không tìm thấy sản phẩm
        const detailMain = document.querySelector('.product-detail-main');
        if(detailMain) detailMain.innerHTML = '<h2 class="text-center" style="padding:50px;">Không tìm thấy sản phẩm này!</h2>';
    }
}