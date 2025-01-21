const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "index.html";
}

document.getElementById("balance").textContent = currentUser.balance;

document.getElementById("add-link-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const link = document.getElementById("tiktok-link").value;
  if (currentUser.balance < 50) {
    alert("Você não tem moedas suficientes para adicionar um link.");
    return;
  }

  const links = JSON.parse(localStorage.getItem("links")) || [];
  links.push({ user: currentUser.email, link });
  localStorage.setItem("links", JSON.stringify(links));

  currentUser.balance -= 50;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  updateBalance();

  document.getElementById("tiktok-link").value = "";
  alert("Link adicionado com sucesso!");
});

function updateBalance() {
  document.getElementById("balance").textContent = currentUser.balance;
}

function loadLinks() {
  const links = JSON.parse(localStorage.getItem("links")) || [];
  const list = document.getElementById("link-list");

  list.innerHTML = "";
  links.forEach(link => {
    if (link.user !== currentUser.email) {
      const listItem = document.createElement("li");
      const linkElement = document.createElement("a");
      linkElement.href = link.link;
      linkElement.target = "_blank";
      linkElement.textContent = "Acessar perfil";
      listItem.appendChild(linkElement);
      list.appendChild(listItem);

      linkElement.addEventListener("click", () => {
        currentUser.balance += 10;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        updateBalance();
      });
    }
  });
}

loadLinks();
