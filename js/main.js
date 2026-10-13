document.addEventListener('DOMContentLoaded', function() {
    //Render cac phan tu trong trang
    updateHeaderCartCount();
    renderCart();
    renderHomepage();
    renderSuggestedProducts();
    renderCategoryPage();
    renderProductDetail();
    renderNewsPage();
    renderNewsDetail();
    renderFeaturedNews();

    preloadImages();
    startHeroSlideshow();
    

    //Xoa gio hang
    const clearCartBtn = document.querySelector('.clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    //Tim kiem san pham
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchBox && searchInput) {
        
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (!searchBox.classList.contains('active') || searchInput.value.trim() === "") {
                searchBox.classList.toggle('active');
                if (searchBox.classList.contains('active')) {
                    searchInput.focus();
                }
            } else {
                performSearch(searchInput.value);
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }

    function performSearch(keyword) {
        if (keyword.trim() !== "") {
            window.location.href = `category.html?search=${encodeURIComponent(keyword)}`;
        }
    }

    //Xu ly cac su kien sap xep
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', handleFilter);
    }

    //Xu ly cac tab
    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if(targetContent) targetContent.classList.add('active');
        });
    });

    // handle anh bi lag
    function preloadImages() {
    allProducts.forEach(product => {
        if (product.images && Array.isArray(product.images)) {
            product.images.forEach(imgUrl => {
                const img = new Image();
                img.src = imgUrl;
            });
        }
    });
}

    //handle hien thi anh khi hover
    document.body.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('product-img-el')) {
            const imgElement = e.target;
            const card = imgElement.closest('.product-card');
            
            if (!card) return;

            const productId = parseInt(card.getAttribute('data-id'));
            const product = allProducts.find(p => p.id === productId);
            const imgContainer = card.querySelector('.product-img'); 
            
            if (product && product.images && Array.isArray(product.images) && product.images.length > 1) {
                
                let currentIndex = 0;
                
                const currentSrc = imgElement.getAttribute('src');
                const foundIndex = product.images.findIndex(img => currentSrc.includes(img));
                if (foundIndex !== -1) currentIndex = foundIndex;

                if (imgElement.hoverInterval) clearInterval(imgElement.hoverInterval);

                imgElement.hoverInterval = setInterval(() => {

                    let nextIndex = currentIndex + 1;
                    if (nextIndex >= product.images.length) nextIndex = 0;

                    imgContainer.style.backgroundImage = `url('${product.images[nextIndex]}')`;

                    imgElement.classList.add('fade-out');

                    setTimeout(() => {
                        imgElement.src = product.images[nextIndex];

                        imgElement.style.transition = 'none';
                        imgElement.classList.remove('fade-out');

                        void imgElement.offsetWidth; 

                        imgElement.style.transition = 'opacity 0.5s ease-in-out';

                        currentIndex = nextIndex;
                    }, 500); 

                }, 2000); 
            }
        }
    });

    //handle ko hover
    document.body.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('product-img-el')) {
            const imgElement = e.target;
            const card = imgElement.closest('.product-card');
            const productId = parseInt(card.getAttribute('data-id'));
            const product = allProducts.find(p => p.id === productId);
            const imgContainer = card.querySelector('.product-img');

            if (imgElement.hoverInterval) {
                clearInterval(imgElement.hoverInterval);
                imgElement.hoverInterval = null;
            }

            if (product) {
                if(imgContainer) imgContainer.style.backgroundImage = 'none';
                
                imgElement.style.transition = 'opacity 0.3s ease-in-out'; // Trả về tốc độ thường
                imgElement.classList.remove('fade-out');

                if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                    imgElement.src = product.images[0];
                } else if (product.image) {
                    imgElement.src = product.image;
                }
            }
        }
    });
    const revealElements = document.querySelectorAll('.reveal-item');

    // Thiết lập tùy chọn cho Observer
    const revealOptions = {
        threshold: 0.15, // Khi 15% của phần tử xuất hiện trong màn hình thì kích hoạt
        rootMargin: "0px 0px -50px 0px" 
    };

    // 
    const revealOnScroll = new IntersectionObserver(function(entries, revealOnScroll) {
        entries.forEach(entry => {
            // Cuon chuot den phan tu
            if (!entry.isIntersecting) {
                return;
            } else {
                // Them class active
                entry.target.classList.add('active');
                
                //ko lap lai khi da hien thi
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    //Hien thi
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
});

    function startHeroSlideshow() {
    //Add slide show
    const sliderWrapper = document.querySelector('.slider-wrapper');

    const slides = document.querySelectorAll('.slide-img');

    if (!sliderWrapper || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    //Loop
    setInterval(() => {
        currentIndex++;

        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }

        const translateXValue = -currentIndex * 100;

        sliderWrapper.style.transform = `translateX(${translateXValue}%)`;

    }, 4000); 
}
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Lặp qua từng nút tab để gắn sự kiện click
    tabLinks.forEach(tab => {
        tab.addEventListener('click', function() {
            //Xóa class 'active' ở tất cả các tab và nội dung cũ
            tabLinks.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            //Thêm class 'active' cho tab vừa bấm
            this.classList.add('active');

            //Lấy giá trị data-tab
            const tabId = this.getAttribute('data-tab');

            // 4. Tìm phần nội dung có ID tương ứng và hiển thị nó
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

// ------------------- Signup -------------------
function signup(e){
    e.preventDefault();


    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;
    var cf_password = document.getElementById("cf-password") ? document.getElementById("cf-password").value : null;
    var email = document.getElementById("email") ? document.getElementById("email").value.trim() : null;


    // Kiểm tra username
    var usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{5,29}$/;
    if(!usernameRegex.test(username)){
        alert("Username không hợp lệ! Phải từ 6-30 ký tự, bắt đầu bằng chữ, không khoảng trắng, chỉ cho phép - hoặc _.");
        return;
    }


    // Kiểm tra mật khẩu
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if(!passwordRegex.test(password)){
        alert("Mật khẩu không hợp lệ! Phải ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
        return;
    }


    // Kiểm tra xác nhận mật khẩu
    if(cf_password && password !== cf_password){
        alert("Xác nhận mật khẩu không đúng!");
        return;
    }


    // Kiểm tra username đã tồn tại
    if(localStorage.getItem(username)){
        alert("Username đã tồn tại. Vui lòng chọn Username khác.");
        return;
    }


    // Tạo object user
    var user = {
        username: username,
        password: password,
        email: email
    };


    // Lưu vào localStorage
    localStorage.setItem(username, JSON.stringify(user));
    alert("Đăng ký thành công!");
}


// ------------------- Login -------------------
function login(e){
    e.preventDefault();


    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var rememberCheckbox = document.querySelector(".remember-forgot input[type='checkbox']");


    var username = usernameInput.value.trim();
    var password = passwordInput.value;


    // Kiểm tra username hợp lệ
    var usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{5,29}$/;
    if(!usernameRegex.test(username)){
        alert("Username không hợp lệ!");
        return;
    }


    // Kiểm tra mật khẩu rỗng
    if(password.trim() === ""){
        alert("Vui lòng nhập mật khẩu.");
        return;
    }


    // Lấy dữ liệu user từ localStorage
    var userData = localStorage.getItem(username);
    if(!userData){
        alert("Username không tồn tại.");
        return;
    }


    var user = JSON.parse(userData);


    // Kiểm tra mật khẩu
    if(user.password !== password){
        alert("Mật khẩu không đúng.");
        return;
    }


    // Remember Me
    if(rememberCheckbox.checked){
        localStorage.setItem("remember_" + username, password);
    } else {
        localStorage.removeItem("remember_" + username);
    }


    // Đăng nhập thành công
    window.location.href = "index.html";
}


// Tự động điền password khi nhập username
document.getElementById("username").addEventListener("input", function(){
    var username = this.value.trim();
    var rememberedPassword = localStorage.getItem("remember_" + username);
    var passwordInput = document.getElementById("password");
    var rememberCheckbox = document.querySelector(".remember-forgot input[type='checkbox']");


    if(rememberedPassword){
        passwordInput.value = rememberedPassword;
        rememberCheckbox.checked = true;
    } else {
        passwordInput.value = "";
        rememberCheckbox.checked = false;
    }
});




// ------------------- Forgot Password -------------------
function forgotPassword(e){
    if(e) e.preventDefault();


    var username = document.getElementById("username").value.trim();
    var emailInput = document.getElementById("email").value.trim();


    // Kiểm tra username hợp lệ
    var usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{5,29}$/;
    if(!usernameRegex.test(username)){
        alert("Username không hợp lệ!");
        return;
    }


    // Kiểm tra email hợp lệ
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailInput)){
        alert("Email không hợp lệ!");
        return;
    }


    // Lấy dữ liệu user
    var userData = localStorage.getItem(username);
    if(!userData){
        alert("Username không tồn tại.");
        return;
    }


    var user = JSON.parse(userData);


    if(user.email !== emailInput){
        alert("Email không đúng.");
        return;
    }

    alert("Your password is: " + user.password);

}


var forgotForm = document.getElementById("forgot-form");
if(forgotForm){
    forgotForm.addEventListener("submit", forgotPassword);
}


