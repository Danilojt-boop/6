const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Simulação de banco de dados local
let users = {};

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!users[username]) {
        users[username] = { password, coins: 50, links: [] };
        alert('Registro bem-sucedido! Faça login.');
    } else {
        alert('Usuário já existe!');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username].password === password) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
});
const currentUser = localStorage.getItem('currentUser');
const usernameDisplay = document.getElementById('username-display');
const coinsDisplay = document.getElementById('coins-display');
const linkInput = document.getElementById('link-input');
const addLinkBtn = document.getElementById('add-link-btn');
const viewLinksBtn = document.getElementById('view-links-btn');

if (!currentUser) {
    window.location.href = 'index.html';
}

const userData = JSON.parse(localStorage.getItem(currentUser)) || users[currentUser];
usernameDisplay.textContent = currentUser;
coinsDisplay.textContent = userData.coins;

addLinkBtn.addEventListener('click', () => {
    if (userData.coins >= 50) {
        const newLink = linkInput.value;
        if (newLink) {
            userData.links.push(newLink);
            userData.coins -= 50;
            localStorage.setItem(currentUser, JSON.stringify(userData));
            coinsDisplay.textContent = userData.coins;
            alert('Link adicionado!');
        }
    } else {
        alert('Você precisa de mais moedas para adicionar um link.');
    }
});

viewLinksBtn.addEventListener('click', () => {
    const linksPage = userData.links.map(
        (link, index) => `<li><a href="${link}" target="_blank">Link ${index + 1}</a></li>`
    ).join('');
    document.body.innerHTML = `<ul>${linksPage}</ul>`;
});
