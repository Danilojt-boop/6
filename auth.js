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
