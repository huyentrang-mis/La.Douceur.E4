document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    if (!chatbotToggler) return; // Nếu không có chatbot thì thoát

    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage = null; 
    const inputInitHeight = chatInput.scrollHeight;

    const knowledgeBase = {
        "xin chào": "Chào bạn! Rất vui được gặp bạn tại La.Douceur.",
        "menu": "Menu bên mình có 4 nhóm: Bánh mì healthy, Ngũ cốc & Granola, Bánh nướng healthy và Cookie healthy. Tất cả đều không thêm đường tinh luyện ạ.",
        "bánh mì": "Bánh mì có nguyên cám (65k), lúa mạch đen (80k), đa ngũ cốc (60k), gluten-free/keto (90k) và sourdough (110k) ạ.",
        "gluten": "Bên mình có bánh mì gluten-free/keto (90k) và cookie keto bột hạnh nhân (110k) ạ. Bạn dị ứng nặng vui lòng gọi hotline để được tư vấn thành phần nhé.",
        "keto": "Bên mình có bánh mì gluten-free/keto (90k) và cookie keto bột hạnh nhân (110k) ạ.",
        "protein": "Các món giàu protein: thanh granola/protein bar (25k), su kem protein (65k) và bánh chiffon hạnh nhân protein (75k) ạ.",
        "cookie": "Cookie bên mình có biscotti nguyên cám (130k), cookie chuối yến mạch (80k), cookie keto hạnh nhân (110k) và langue de chat nguyên cám (85k) ạ.",
        "đường": "Tất cả sản phẩm đều không thêm đường tinh luyện, bên mình dùng nguyên liệu sạch và đường thay thế ạ.",
        "calo": "Mỗi sản phẩm đều có calo ước tính trên 100g ở trang chi tiết. Ví dụ bánh mì nguyên cám khoảng 250 kcal/100g, cookie keto hạnh nhân khoảng 520 kcal/100g (nhiều hạnh nhân nên năng lượng cao hơn) ạ.",
        "giá": "Giá bánh bên mình dao động từ 20.000đ đến 130.000đ tùy loại ạ. Bạn quan tâm món nào nhất?",
        "địa chỉ": "Tiệm mình ở số 12 Chùa Bộc, Đống Đa, Hà Nội.",
        "giờ mở cửa": "Chúng mình mở cửa từ 8:00 sáng đến 21:00 tối hàng ngày.",
        "ship": "Bên mình freeship cho đơn từ 150k trong nội thành Hà Nội. Đơn nhỏ hơn phí ship khoảng 30k ạ.",
        "liên hệ": "Bạn có thể gọi hotline 0387 198 273 để được tư vấn nhanh nhất nhé.",
        "default": "Xin lỗi, mình chưa hiểu rõ câu hỏi lắm. Bạn có thể hỏi về 'menu', 'giá', 'bánh mì', 'cookie', 'địa chỉ' hoặc 'ship' được không ạ? 🤔"
    };

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = className === "outgoing" 
            ? `<p></p>` 
            : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi; 
    }

    const generateResponse = (userMsg) => {
        const incomingChatLi = createChatLi("Đang nhập...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        const normalizedMsg = userMsg.toLowerCase();
        let botResponse = knowledgeBase["default"]; 

        for (const key in knowledgeBase) {
            if (normalizedMsg.includes(key)) {
                botResponse = knowledgeBase[key];
                break; 
            }
        }

        setTimeout(() => {
            incomingChatLi.querySelector("p").textContent = botResponse;
        }, 600);
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if(!userMessage) return;

        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            generateResponse(userMessage);
        }, 600);
    }

    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});