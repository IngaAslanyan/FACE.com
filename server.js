document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");

    function askQuestion() {
        const userText = userInput.value.trim();
        if (userText !== "") {
            appendMessage("You", userText);
            userInput.value = "";
            getBotResponse(userText);
        }
    }

    async function getBotResponse(userText) {
         try {
            const response = await fetchOpenAIResponse(userText);
            appendMessage("Bot", response.data.choices[0].text.trim());
        } catch (error) {
            console.error("Error:", error);
            appendMessage("Bot", "Hello! What beauty advice are you looking for?"); 
        }
    }

    async function fetchOpenAIResponse(userText) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer API_KEY' 
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-16k',
                prompt: userText,
                max_tokens: 150
            })
        });
        return await response.json();
    }

    function appendMessage(sender, text) {
        const message = document.createElement("div");
        message.classList.add("message");
        message.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    document.querySelector("button").addEventListener("click", askQuestion);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            askQuestion();
        }
    });
});
