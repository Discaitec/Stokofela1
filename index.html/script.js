// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Profile Picture Preview
function previewProfilePic() {
    const file = document.getElementById('profile-pic').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-preview').src = e.target.result;
            document.getElementById('profile-preview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Register User
function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const profilePic = document.getElementById('profile-preview').src;

    localStorage.setItem('user', JSON.stringify({ email, password, profilePic }));
    alert("Registration successful!");
    showLogin();
}

// Login User
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('loggedIn', 'true');
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        document.getElementById('profile-info').innerHTML = `<img src="${storedUser.profilePic}" width="50" height="50" style="border-radius:50%;"> <b>${storedUser.email}</b>`;
    } else {
        alert("Invalid credentials!");
    }
}

// Auto-login if user was logged in before
window.onload = function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
    }
}

// Chat Functionality
function sendMessage() {
    const message = document.getElementById('chat-message').value;
    if (message.trim() === '') return;
    
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ text: message, timestamp: new Date().toLocaleTimeString() });
    localStorage.setItem('messages', JSON.stringify(messages));

    document.getElementById('chat-message').value = '';
    loadMessages();
}

// Load Chat Messages
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const chatBox = document.getElementById('messages');
    chatBox.innerHTML = messages.map(msg => `<div class="message sender">${msg.text} <span class="timestamp">${msg.timestamp}</span></div>`).join('');
}

// Stokofela Calculator
function addToStokofela() {
    let total = parseInt(localStorage.getItem('total')) || 0;
    total += parseInt(document.getElementById('amount').value);
    localStorage.setItem('total', total);
    document.getElementById('total').textContent = total;
}

// Load Saved Total
document.getElementById('total').textContent = localStorage.getItem('total') || 0;
loadMessages();