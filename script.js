// DOM elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add user message to chat box
function addUserMessage(message) {
    const userMessage = document.createElement('p');
    userMessage.textContent = `You: ${message}`;
    chatBox.appendChild(userMessage);
}

// Function to add therapist message to chat box
function addTherapistMessage(message) {
    const therapistMessage = document.createElement('p');
    therapistMessage.textContent = `Therapist: ${message}`;
    chatBox.appendChild(therapistMessage);
}

// Function to generate responses based on user input
function generateResponse(message) {
    // Basic response generation based on keywords mongodb://localhost:27017/
    fetch("http://127.0.0.1:5000/api/data")
    .then((res)=>{
     console.log('ok')
    })
    .catch((err)=>{
     console.log('error')   
    });
    if (message.toLowerCase().includes('sad')) {
        return "I'm sorry to hear that. Would you like to talk more about what's making you feel sad?";
    } else if (message.toLowerCase().includes('anxious') || message.toLowerCase().includes('nervous')) {
        return "It sounds like you're feeling anxious. Let's explore ways to manage your anxiety together.";
    } else if (message.toLowerCase().includes('angry') || message.toLowerCase().includes('frustrated')) {
        return "It's understandable to feel angry or frustrated. Let's discuss what triggered these emotions.";
    } else if (message.toLowerCase().includes('hi') || message.toLowerCase().includes('hello')|| message.toLowerCase().includes('hey')) {
        return "Howdy, howdy, howdy! How you doin' mate";
    //"Hi ! Whether you need someone to talk to, coping strategies, or information on mental health resources, we're here to help."
    } else if (message.toLowerCase().includes('Depress') || message.toLowerCase().includes('Lonely')) {
        return "";
    } else if (message.toLowerCase().includes('Suicide') || message.toLowerCase().includes('i dont feel like living')) {
        return "I'm really sorry to hear that you're feeling this way. It's important for you to know that your life is extremely valueable. absolutely nothing is worth the price of your life. I URGE YOU TO talk to someone. i'm always here to listen to you.Know that you are NEVER alone.If you need further support contact thi helpline no. : 9152987821";
    } else {
        return "Tell me more about how you're feeling today. Let's talk about? I'm all ears";
    }
}

// Function to handle user input
function handleUserInput() {
    const message = userInput.value.trim();
    console.log(message);
    if (message !== '') {
        addUserMessage(message);
        userInput.value = '';
        // Generate a response based on user input
        const response = generateResponse(message);
        setTimeout(() => {
            addTherapistMessage(response);
            // Scroll chat box to bottom
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
    }
}

// Event listener for send button click
sendBtn.addEventListener('click', handleUserInput);

// Event listener for pressing Enter key
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});
