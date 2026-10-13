const NEWS_PER_PAGE = 2; 
let currentNewsPage = 1; 

//Render tin tuc
function renderNewsPage() {
    const newsContainer = document.getElementById('news-grid-container');
    const paginationContainer = document.getElementById('news-pagination');
    
    if (!newsContainer) return;

    const totalItems = allNews.length;
    const totalPages = Math.ceil(totalItems / NEWS_PER_PAGE);

    if (currentNewsPage > totalPages) currentNewsPage = totalPages;
    if (currentNewsPage < 1) currentNewsPage = 1;

    const startIndex = (currentNewsPage - 1) * NEWS_PER_PAGE;
    const endIndex = startIndex + NEWS_PER_PAGE;
    
    const newsToShow = allNews.slice(startIndex, endIndex);

    //render danh sach tin tuc
    if (newsToShow.length > 0) {
        newsContainer.innerHTML = newsToShow.map(news => `
            <article class="news-card">
                <div class="news-img">
                    <img src="${news.image}" alt="${news.title}">
                </div>
                <div class="news-info">
                    <h3 class="news-title">${news.title}</h3>
                    <div class="news-meta" style="font-size: 0.85rem; color: #888; margin-bottom: 10px;">
                        <span>📅 ${news.date}</span> | <span>✍️ ${news.author}</span>
                    </div>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <a href="news-detail.html?id=${news.id}" class="read-more">Đọc tiếp →</a>
                </div>
            </article>
        `).join('');
    } else {
        newsContainer.innerHTML = '<p>Chưa có tin tức nào.</p>';
    }

    //render cac nut phan trang
    if (paginationContainer && totalPages > 1) {
        let paginationHTML = '';

        if (currentNewsPage > 1) {
            paginationHTML += `<a href="javascript:void(0)" class="prev" onclick="changeNewsPage(${currentNewsPage - 1})">← Trước</a>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentNewsPage ? 'active' : '';
            paginationHTML += `<a href="javascript:void(0)" class="page ${activeClass}" onclick="changeNewsPage(${i})">${i}</a>`;
        }

        if (currentNewsPage < totalPages) {
            paginationHTML += `<a href="javascript:void(0)" class="next" onclick="changeNewsPage(${currentNewsPage + 1})">Sau →</a>`;
        }

        paginationContainer.innerHTML = paginationHTML;
    }
}

//Handle chuyen trang
function changeNewsPage(page) {
    currentNewsPage = page;
    renderNewsPage(); 
    
    const title = document.querySelector('.section-title');
    if (title) {
        title.scrollIntoView({ behavior: 'smooth' });
    }
}

//Render chi tiet tin tuc
function renderNewsDetail() {
    const newsDetailContainer = document.querySelector('.news-detail');
    if (!newsDetailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const newsId = parseInt(params.get('id'));
    const news = allNews.find(n => n.id === newsId);

    if (news) {
        document.title = `${news.title} - La.Douceur`;
        
        const breadcrumbSpan = document.querySelector('.breadcrumb span');
        if(breadcrumbSpan) breadcrumbSpan.innerText = news.title;

        document.getElementById('news-title').innerText = news.title;
        document.getElementById('news-date').innerText = `📅 ${news.date}`;
        document.getElementById('news-author').innerText = `👨‍🍳 Đăng bởi: ${news.author}`;
        document.getElementById('news-views').innerText = `👁️ ${news.views || '1000+ lượt xem'}`;
        document.getElementById('news-hero-image').src = news.image;
        document.getElementById('news-intro').innerText = news.excerpt;
        document.getElementById('news-content-body').innerHTML = news.content;

        renderRelatedNews(news.id);
    } else {
        newsDetailContainer.innerHTML = '<h1 class="text-center" style="margin: 50px 0;">Không tìm thấy bài viết này!</h1>';
    }
}

//Render tin tuc lien quan
function renderRelatedNews(currentId) {
    const relatedContainer = document.getElementById('related-news-container');
    if (!relatedContainer) return;

    const relatedNews = allNews.filter(n => n.id !== currentId).slice(0, 2);

    relatedContainer.innerHTML = relatedNews.map(news => `
        <div class="news-card">
            <div class="news-img">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-info">
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt.substring(0, 80)}...</p>
                <a href="news-detail.html?id=${news.id}" class="read-more">Đọc tiếp →</a>
            </div>
        </div>
    `).join('');
}
//render ttuc noi bat
function renderFeaturedNews() {
    const container = document.getElementById('featured-news-container');
    
    if (!container) return;

    const featuredNews = allNews.slice(0, 3);

    container.innerHTML = featuredNews.map(news => `
        <div class="news-card">
            <div class="news-img">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-info">
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <a href="news-detail.html?id=${news.id}" class="read-more">Đọc tiếp →</a>
            </div>
        </div> 
    `).join('');
}