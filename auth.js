document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (username && email && password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      displayMessage("E-mail já cadastrado. Tente fazer login.", "error");
    } else {
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      displayMessage("Registro concluído! Faça login abaixo.", "success");
    }
  }
});

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    displayMessage(`Bem-vindo, ${user.username}! Login bem-sucedido.`, "success");
  } else {
    displayMessage("Credenciais inválidas. Tente novamente.", "error");
  }
});

function displayMessage(message, type) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.style.color = type === "success" ? "green" : "red";
}
