// ===========================
// REGINA AI
// TUNDAR TECHNOLOGIES
// ===========================

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ Regina AI Loaded");

    const startBtns = document.querySelectorAll(".start-conversation");
    const chat = document.getElementById("reginaChat");
    const closeBtn = document.getElementById("closeChat");
    const sendBtn = document.getElementById("sendMessage");
    const input = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");
    const thinking = document.getElementById("thinkingIndicator");

    // ===========================
    // OPEN CHAT
    // ===========================

    startBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            chat.classList.add("active");

            if (input) {
                input.focus();
            }

        });

    });

    // ===========================
    // CLOSE CHAT
    // ===========================

    if (closeBtn) {

        closeBtn.addEventListener("click", () => {

            chat.classList.remove("active");

        });

    }

// ===========================
// SEND MESSAGE
// ===========================

function sendMessage() {

    if (!input || !chatBody) return;

    const text = input.value.trim();

    if (text === "") return;

    // USER MESSAGE
    const userMessage = document.createElement("div");

    userMessage.className = "message user";

    userMessage.innerHTML = `
        <div class="bubble">${text}</div>
    `;

    chatBody.appendChild(userMessage);

    input.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;

    // CREATE THINKING MESSAGE
    const thinkingMessage = document.createElement("div");

    thinkingMessage.className = "message ai";

    thinkingMessage.innerHTML = `
        <div class="bubble">
            <div class="thinking">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    chatBody.appendChild(thinkingMessage);

    chatBody.scrollTop = chatBody.scrollHeight;

    // AI RESPONSE
    setTimeout(() => {

        // Remove thinking animation
        thinkingMessage.remove();

        // Create AI message
        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai";

        aiMessage.innerHTML = `
            <div class="bubble">
                Regina AI is currently under development 🚀
                <br><br>
                Soon I will answer questions, search the web,
                write code, and assist with Tundar Technologies.
            </div>
        `;

        chatBody.appendChild(aiMessage);

        chatBody.scrollTop = chatBody.scrollHeight;

    }, 2000);

}

// ===========================
// SEND BUTTON
// ===========================

if (sendBtn) {

    sendBtn.addEventListener("click", sendMessage);

}

// ===========================
// ENTER KEY
// ===========================

if (input) {

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();

        }

    });

}

});