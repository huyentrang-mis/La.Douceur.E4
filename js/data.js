const allProducts = [
    {
        id: 1, name: "Bánh mì nguyên cám", category: "Bánh mì healthy",
        price: 65000, unit: "/ổ",
        images: ["images/NguyenCam1.jpg", "images/NguyenCam2.jpg", "images/NguyenCam3.jpg"],
        description: "Whole Wheat Bread – bánh mì bột mì nguyên cám, nhiều chất xơ, vỏ giòn ruột mềm.",
        attributes: { kcal100: 250, size: "400g", ingredients: "Bột mì nguyên cám, men, nước, muối", expire: "3 ngày" },
        reviews: [
            { user: "Sydney", rating: 5, comment: "Bánh mì thơm, ăn no lâu mà không ngán.", date: "20/12/2025" },
            { user: "Maddison", rating: 4, comment: "Vỏ giòn, ruột mềm. Mong có thêm size nhỏ.", date: "18/12/2025" }
        ]
    },
    {
        id: 2, name: "Bánh mì lúa mạch đen", category: "Bánh mì healthy",
        price: 80000, unit: "/ổ",
        images: ["images/LuaMachDen1.jpg", "images/LuaMachDen2.jpg", "images/LuaMachDen3.jpg"],
        description: "Rye Bread – vị đậm, hơi chua nhẹ, ruột chắc, hợp ăn kèm trứng và rau.",
        attributes: { kcal100: 260, size: "500g", ingredients: "Bột lúa mạch đen, bột mì nguyên cám, men, nước, muối", expire: "3 ngày" }
    },
    {
        id: 3, name: "Bánh mì đa ngũ cốc & hạt", category: "Bánh mì healthy",
        price: 60000, unit: "/ổ",
        images: ["images/NguCoc1.jpg", "images/NguCoc2.jpg", "images/NguCoc3.jpg"],
        description: "Multi-grain / Seeded Bread – nhiều loại ngũ cốc và hạt, thơm bùi, no lâu.",
        attributes: { kcal100: 270, size: "450g", ingredients: "Bột đa ngũ cốc, các loại hạt, men, nước, muối", expire: "3 ngày" }
    },
    {
        id: 4, name: "Bánh mì gluten-free / keto", category: "Bánh mì healthy",
        tags: ["keto", "gf"],
        price: 90000, unit: "/ổ",
        images: ["images/Keto1.jpg", "images/Keto2.jpg", "images/Keto3.jpg"],
        description: "Gluten-free / Keto Bread – làm từ bột hạnh nhân, không dùng bột mì, ít tinh bột.",
        attributes: { kcal100: 330, size: "350g", ingredients: "Bột hạnh nhân, bột hạt lanh, trứng, bột nở, muối", expire: "3 ngày" }
    },
    {
        id: 5, name: "Bánh mì sourdough", category: "Bánh mì healthy",
        price: 110000, unit: "/ổ",
        images: ["images/Sourdough1.jpg", "images/Sourdough2.jpg", "images/Sourdough3.jpg"],
        description: "Sourdough – bánh mì lên men tự nhiên, vị chua nhẹ, vỏ giòn ruột dai.",
        attributes: { kcal100: 260, size: "500g", ingredients: "Bột mì, men tự nhiên (sourdough), nước, muối", expire: "3 ngày" }
    },
    {
        id: 6, name: "Tart granola sữa chua & quả mọng", category: "Ngũ cốc & Granola",
        tags: ["nosugar"],
        price: 35000, unit: "/cái",
        images: ["images/TartGranola1.jpg", "images/TartGranola2.jpg", "images/TartGranola3.jpg"],
        description: "Granola Oat Tart with Yogurt & Berries – đế granola yến mạch giòn, sữa chua và quả mọng tươi.",
        attributes: { kcal100: 230, size: "1 cái", ingredients: "Granola yến mạch, sữa chua, quả mọng tươi, chất thay thế đường", expire: "1 ngày (bảo quản lạnh)" },
        reviews: [
            { user: "Ronaldo", rating: 5, comment: "Đế granola giòn, sữa chua và quả mọng rất hợp.", date: "20/12/2025" },
            { user: "Messi", rating: 5, comment: "Ít ngọt đúng ý mình.", date: "18/12/2025" }
        ]
    },
    {
        id: 7, name: "Thanh granola / protein bar", category: "Ngũ cốc & Granola",
        tags: ["protein", "nosugar"],
        price: 25000, unit: "/thanh",
        images: ["images/GranolaBar1.jpg", "images/GranolaBar2.jpg", "images/GranolaBar3.jpg"],
        description: "Granola Bar / Protein Bar – thanh ăn nhẹ giàu năng lượng, tiện mang theo.",
        attributes: { kcal100: 400, size: "45g", ingredients: "Yến mạch, các loại hạt, bột protein, chất thay thế đường", expire: "7 ngày" }
    },
    {
        id: 8, name: "Muffin chuối yến mạch", category: "Ngũ cốc & Granola",
        tags: ["nosugar"],
        price: 20000, unit: "/cái",
        images: ["images/Muffin1.jpg", "images/Muffin2.jpg", "images/Muffin3.jpg"],
        description: "Banana Oat Muffin – mềm ẩm, ngọt tự nhiên từ chuối chín, không thêm đường.",
        attributes: { kcal100: 220, size: "1 cái", ingredients: "Chuối chín, bột yến mạch, trứng, chất thay thế đường", expire: "2 ngày" }
    },
    {
        id: 9, name: "Bánh mì chuối yến mạch", category: "Bánh nướng healthy",
        tags: ["nosugar"],
        price: 75000, unit: "/ổ",
        images: ["images/ChuoiYenMach1.jpg", "images/ChuoiYenMach2.jpg", "images/ChuoiYenMach3.jpg"],
        description: "Healthy Banana Oat Bread – bánh nướng mềm ẩm từ chuối và yến mạch, hợp bữa sáng.",
        attributes: { kcal100: 220, size: "300g", ingredients: "Chuối chín, bột yến mạch, trứng, chất thay thế đường", expire: "3 ngày" }
    },
    {
        id: 10, name: "Su kem protein", category: "Bánh nướng healthy",
        tags: ["protein", "nosugar"],
        price: 65000, unit: "/hộp",
        images: ["images/SuKem1.jpg", "images/SuKem2.jpg", "images/SuKem3.jpg"],
        description: "Fit / Protein Choux Pastry – vỏ su mềm, nhân kem bổ sung protein. Hộp 4 cái.",
        attributes: { kcal100: 260, size: "Hộp 4 cái", ingredients: "Bột nguyên cám, trứng, sữa, bột protein, chất thay thế đường", expire: "1 ngày (bảo quản lạnh)" }
    },
    {
        id: 11, name: "Tart trứng yến mạch", category: "Bánh nướng healthy",
        tags: ["nosugar"],
        price: 32000, unit: "/cái",
        images: ["images/TartEgg1.jpg", "images/TartEgg2.jpg", "images/TartEgg3.jpg"],
        description: "Healthy Oat Egg Tart – vỏ tart yến mạch, nhân trứng béo nhẹ, ít ngọt.",
        attributes: { kcal100: 240, size: "1 cái", ingredients: "Bột yến mạch, trứng, sữa, chất thay thế đường", expire: "1 ngày" }
    },
    {
        id: 12, name: "Bánh chiffon hạnh nhân protein", category: "Bánh nướng healthy",
        tags: ["protein", "nosugar"],
        price: 75000, unit: "/phần",
        images: ["images/Chiffon1.jpg", "images/Chiffon2.jpg", "images/Chiffon3.jpg"],
        description: "Almond Protein Chiffon Cake – cốt chiffon bông mềm từ bột hạnh nhân, bán theo hộp hoặc miếng.",
        attributes: { kcal100: 320, size: "Hộp / miếng", ingredients: "Bột hạnh nhân, trứng, bột protein, chất thay thế đường", expire: "2 ngày" }
    },
    {
        id: 13, name: "Biscotti nguyên cám & hạt", category: "Cookie healthy",
        tags: ["nosugar"],
        price: 130000, unit: "/hũ",
        images: ["images/Biscotti1.jpg", "images/Biscotti2.jpg", "images/Biscotti3.jpg"],
        description: "Whole Wheat Biscotti with Nuts – bánh nướng hai lần giòn tan, nhiều hạt, hợp ăn kèm trà.",
        attributes: { kcal100: 420, size: "Hũ 250g", ingredients: "Bột mì nguyên cám, các loại hạt, trứng, chất thay thế đường", expire: "14 ngày" }
    },
    {
        id: 14, name: "Cookie chuối yến mạch 2 nguyên liệu", category: "Cookie healthy",
        tags: ["nosugar"],
        price: 80000, unit: "/hộp",
        images: ["images/Cookie1.jpg", "images/Cookie2.jpg", "images/Cookie3.jpg"],
        description: "2-Ingredient Banana Oat Cookie – chỉ chuối và yến mạch, không thêm đường.",
        attributes: { kcal100: 320, size: "Hộp 200g", ingredients: "Chuối chín, yến mạch", expire: "7 ngày" },
        reviews: [
            { user: "Mbappe", rating: 5, comment: "Chỉ 2 nguyên liệu mà vẫn ngon, vị chuối rất rõ.", date: "20/12/2025" },
            { user: "Lamine", rating: 4, comment: "Hơi mềm, nhưng ăn sáng rất tiện.", date: "18/12/2025" }
        ]
    },
    {
        id: 15, name: "Cookie keto bột hạnh nhân", category: "Cookie healthy",
        tags: ["keto", "gf", "nosugar"],
        price: 110000, unit: "/hộp",
        images: ["images/CookieKeto1.jpg", "images/CookieKeto2.jpg", "images/CookieKeto3.jpg"],
        description: "Keto Almond Flour Cookie – làm từ bột hạnh nhân, ít tinh bột, hợp ăn keto.",
        attributes: { kcal100: 520, size: "Hộp 150g", ingredients: "Bột hạnh nhân, trứng, bơ, chất thay thế đường", expire: "10 ngày" }
    },
    {
        id: 16, name: "Langue de chat nguyên cám", category: "Cookie healthy",
        tags: ["nosugar"],
        price: 85000, unit: "/hộp",
        images: ["images/Langue1.jpg", "images/Langue2.jpg", "images/Langue3.jpg"],
        description: "Whole Wheat Langue de Chat – bánh quy lưỡi mèo mỏng giòn từ bột mì nguyên cám.",
        attributes: { kcal100: 420, size: "Hộp 150g", ingredients: "Bột mì nguyên cám, lòng trắng trứng, bơ, chất thay thế đường", expire: "10 ngày" }
    }
];
const ITEMS_PER_PAGE = 6;
let currentCategoryPage = 1; 

// Du lieu gio hang
let cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// San pham ban chay
const byId = ids => ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
const bestSellingProducts = byId([1, 5, 6, 8, 10, 14, 15, 4]);

// Sp moi
const newArrivalProducts = byId([4, 7, 9, 11, 12, 13, 15, 16]);

// Sp goi y
const suggestedProducts = byId([3, 6, 14, 10]);

// Du lieu tin tuc
const allNews = [
    {
        id: 1,
        title: "Công thức cookie chuối yến mạch 2 nguyên liệu",
        excerpt: "Chỉ cần chuối chín và yến mạch, không thêm đường, bạn đã có mẻ cookie healthy làm trong 20 phút.",
        image: "images/news1.jpg",
        date: "20/10/2026",
        author: "Admin",
        views: "1,520 lượt xem",
        content: `
            <h2>Nguyên liệu chuẩn bị:</h2>
            <ul>
                <li>Chuối chín: 2 quả (khoảng 200g)</li>
                <li>Yến mạch cán dẹt: 150g</li>
                <li>Tùy chọn: hạt, nho khô, quế bột</li>
            </ul>
            <h2>Các bước thực hiện:</h2>
            <p><strong>Bước 1:</strong> Nghiền nhuyễn chuối trong một tô lớn.</p>
            <p><strong>Bước 2:</strong> Cho yến mạch vào, trộn đều thành hỗn hợp dẻo. Thêm hạt hoặc quế nếu thích.</p>
            <div class="news-images text-center">
                <img src="images/news-1.jpg" alt="Trộn bột cookie chuối yến mạch">
                <p class="images-caption">Hỗn hợp chuối và yến mạch sau khi trộn</p>
            </div>
            <p><strong>Bước 3:</strong> Múc từng thìa lên khay lót giấy nến, ép dẹt nhẹ.</p>
            <p><strong>Bước 4:</strong> Nướng ở 175 độ C trong 12-15 phút đến khi viền vàng nhẹ.</p>
            <h3>Mẹo nhỏ:</h3>
            <p>Chuối càng chín thì bánh càng ngọt tự nhiên, nên không cần thêm đường.</p>
        `
    },
    {
        id: 2,
        title: "Ngũ cốc nguyên cám khác gì bột mì trắng?",
        excerpt: "Tìm hiểu vì sao bánh làm từ ngũ cốc nguyên cám thường nhiều chất xơ và giúp bạn no lâu hơn.",
        image: "images/news2.jpg",
        date: "22/10/2026",
        author: "La.Douceur Team",
        views: "890 lượt xem",
        content: `
            <p>Bột mì trắng được xay bỏ phần cám và mầm, còn ngũ cốc nguyên cám giữ lại cả hạt. Vì vậy sản phẩm nguyên cám thường có hương vị đậm hơn và nhiều chất xơ hơn.</p>
            <h2>1. Nhiều chất xơ</h2>
            <p>Chất xơ giúp bạn cảm thấy no lâu hơn, hợp với người muốn kiểm soát khẩu phần ăn.</p>
            <h2>2. Đa dạng loại bột</h2>
            <p>Ngoài bột mì nguyên cám, La.Douceur còn dùng bột yến mạch, bột lúa mạch đen và bột hạnh nhân để mỗi loại bánh có hương vị và kết cấu riêng.</p>
            <div class="news-images text-center">
                <img src="images/news-2.jpg" alt="Bánh mì nguyên cám">
                <p class="images-caption">Bánh mì nguyên cám làm từ nguyên hạt</p>
            </div>
            <h2>Lưu ý:</h2>
            <p>Mỗi người có nhu cầu dinh dưỡng khác nhau. Nếu bạn có bệnh lý hoặc dị ứng (gluten, hạt, trứng, sữa), hãy hỏi bác sĩ trước khi thay đổi chế độ ăn.</p>
        `
    },
    {
        id: 3,
        title: "La.Douceur ra mắt thực đơn bánh healthy tại Đống Đa, Hà Nội",
        excerpt: "Từ nay La.Douceur chuyên bánh healthy: không thêm đường, dùng ngũ cốc nguyên cám và bột thay thế.",
        image: "images/khai-truong.png",
        date: "25/10/2026",
        author: "La.Douceur Team",
        views: "2,300 lượt xem",
        content: `
            <p>La.Douceur tại số 12 Chùa Bộc, Đống Đa, Hà Nội chính thức giới thiệu thực đơn bánh healthy với khẩu hiệu "Good Food, Better You".</p>
            <h2>Thực đơn gồm 4 nhóm:</h2>
            <ul>
                <li><strong>Bánh mì healthy:</strong> nguyên cám, lúa mạch đen, đa ngũ cốc, gluten-free/keto, sourdough.</li>
                <li><strong>Ngũ cốc & Granola:</strong> tart granola, thanh granola/protein, muffin chuối yến mạch.</li>
                <li><strong>Bánh nướng healthy:</strong> bánh mì chuối yến mạch, su kem protein, tart trứng yến mạch, chiffon hạnh nhân.</li>
                <li><strong>Cookie healthy:</strong> biscotti, cookie chuối yến mạch, cookie keto, langue de chat nguyên cám.</li>
            </ul>
            <p>Toàn bộ sản phẩm dùng nguyên liệu sạch và đường thay thế. Mời bạn ghé thử và đặt hàng online nhé!</p>
        `
    },
    {
        id: 4,
        title: "Sourdough là gì? Vì sao bánh mì lên men tự nhiên được ưa chuộng",
        excerpt: "Giải thích đơn giản về men tự nhiên, vị chua nhẹ và cách thưởng thức bánh mì sourdough.",
        image: "images/news4.jpg",
        date: "28/10/2026",
        author: "Chef Baker",
        views: "3,100 lượt xem",
        content: `
            <p>Sourdough là bánh mì dùng men tự nhiên (được nuôi từ bột và nước) thay vì men công nghiệp.</p>
            <h2>1. Hương vị đặc trưng</h2>
            <p>Quá trình lên men chậm tạo vị chua nhẹ, vỏ giòn và ruột dai, rất khác bánh mì thông thường.</p>
            <h2>2. Cách thưởng thức</h2>
            <p>Sourdough ngon nhất khi nướng lại 3-5 phút, ăn kèm trứng, bơ, phô mai hoặc rau củ.</p>
            <div class="news-images text-center">
                <img src="images/news-4.jpg" alt="Bánh mì sourdough">
                <p class="images-caption">Ổ sourdough vỏ giòn ruột dai</p>
            </div>
            <p>Chúc bạn có bữa sáng thật ngon!</p>
        `
    },
    {
        id: 5,
        title: "Đường thay thế trong làm bánh: nên hiểu thế nào cho đúng?",
        excerpt: "Đường thay thế giúp bánh bớt ngọt nhưng không có nghĩa là có thể ăn thoải mái. Cùng tìm hiểu nhé.",
        image: "images/news5.jpg",
        date: "30/10/2026",
        author: "Admin",
        views: "1,200 lượt xem",
        content: `
            <p>Các sản phẩm của La.Douceur không thêm đường tinh luyện và dùng đường thay thế. Dưới đây là vài điều nên biết:</p>
            <h2>1. Vị ngọt từ nguyên liệu tự nhiên</h2>
            <p>Chuối chín, trái cây và sữa chua giúp bánh có vị ngọt dịu mà không cần thêm đường.</p>
            <h2>2. Đường thay thế</h2>
            <p>Mỗi loại đường thay thế có độ ngọt và hậu vị khác nhau, nên công thức cần được cân chỉnh để bánh vẫn ngon.</p>
            <div class="news-images text-center">
                <img src="images/news-5.jpg" alt="Nguyên liệu làm bánh healthy">
                <p class="images-caption">Nguyên liệu sạch cho bánh healthy</p>
            </div>
            <h2>3. Ăn vừa phải</h2>
            <p>Bánh healthy vẫn có năng lượng, đặc biệt các loại có hạnh nhân, hạt và granola. Hãy ăn theo nhu cầu của bạn.</p>
        `
    },
    {
        id: 6,
        title: "Cách bảo quản bánh mì và cookie healthy",
        excerpt: "Mẹo bảo quản để bánh mì, cookie và bánh nướng giữ được độ ngon trong nhiều ngày.",
        image: "images/news6.jpg",
        date: "01/11/2026",
        author: "Admin",
        views: "950 lượt xem",
        content: `
            <p>Bánh healthy thường ít chất bảo quản, nên cách bảo quản đúng rất quan trọng:</p>
            <h2>Bánh mì</h2>
            <ul>
                <li>Bọc kín và để ở nhiệt độ phòng, dùng trong 2-3 ngày.</li>
                <li>Nếu không ăn hết, cắt lát và để ngăn đông.</li>
                <li>Khi ăn, nướng lại 3-5 phút, bánh sẽ giòn ngon như mới.</li>
            </ul>
            <h2>Cookie & biscotti</h2>
            <p>Để nguội hoàn toàn rồi cho vào hũ kín, có thể thêm gói hút ẩm để bánh luôn giòn.</p>
            <div class="news-images text-center">
                <img src="images/news-6.jpg" alt="Bảo quản bánh">
            </div>
            <h2>Tart, su kem và bánh có nhân</h2>
            <p>Bảo quản trong ngăn mát tủ lạnh (2-5 độ C), nên dùng trong ngày.</p>
        `
    }
];

// Nhan hien thi tren the san pham
const TAG_LABELS = { keto: "Keto", gf: "Gluten-free", protein: "Protein", nosugar: "Không thêm đường" };
function renderTags(product) {
    if (!product.tags || !product.tags.length) return "";
    return `<div class="product-tags">${product.tags.map(t => `<span class="tag tag-${t}">${TAG_LABELS[t] || t}</span>`).join("")}</div>`;
}
