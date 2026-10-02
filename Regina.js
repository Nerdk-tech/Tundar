// ===========================
// REGINA AI
// TUNDAR TECHNOLOGIES
// ===========================

// --- Regina backend endpoint ---
// After deploying regina-backend/ (see README), paste its URL here.
// Example: "https://tundar-regina.vercel.app/api/chat"
// Leave empty to show the placeholder reply instead.
const REGINA_API = "";

const getSessionId = () => {
    let id = localStorage.getItem("regina-session");
    if (!id) {
        id = "web-" + Math.random().toString(36).slice(2, 10);
        localStorage.setItem("regina-session", id);
    }
    return id;
};

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
    const reply = async () => {

        // Remove thinking animation
        thinkingMessage.remove();

        const aiMessage = document.createElement("div");
        aiMessage.className = "message ai";
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        aiMessage.appendChild(bubble);

        if (REGINA_API) {
            try {
                const res = await fetch(REGINA_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: text,
                        sessionId: getSessionId()
                    })
                });
                const data = await res.json();
                bubble.textContent = data.response || data.message || "Sorry, something went wrong.";
            } catch (err) {
                bubble.innerHTML =
                    "Regina is offline right now. " +
                    "Please try again in a moment.";
            }
        } else {
            bubble.innerHTML =
                "Regina AI is currently under development 🚀" +
                "<br><br>" +
                "Soon I will answer questions, search the web, " +
                "write code, and assist with Tundar Technologies.";
        }

        chatBody.appendChild(aiMessage);
        chatBody.scrollTop = chatBody.scrollHeight;

    };

    if (REGINA_API) {
        reply();
    } else {
        setTimeout(reply, 2000);
    }

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