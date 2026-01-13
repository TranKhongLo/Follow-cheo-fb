const form = document.getElementById("addUserForm");
const result = document.getElementById("result");

let users = [];

// Lấy chữ cái avatar
function getInitial(name) {
  return name ? name.trim().charAt(0).toUpperCase() : "?";
}

// Render users
function renderUsers() {
  result.innerHTML = "";

  if (users.length === 0) {
    result.innerHTML = "<p>Chưa có user nào.</p>";
    return;
  }

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="avatar">${getInitial(user.name)}</div>
      <strong>${user.name}</strong>

      <a href="${user.fb}" target="_blank" rel="noopener noreferrer">
        🔗 Mở Facebook
      </a>

      <span class="badge user">FB USER</span>
    `;

    result.appendChild(card);
  });
}

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const fb = document.getElementById("fb").value.trim();

  if (!name || !fb) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if (!fb.startsWith("https://facebook.com") && !fb.startsWith("https://www.facebook.com")) {
    alert("Link Facebook không hợp lệ");
    return;
  }

  users.push({
    id: Date.now(),
    name,
    fb,
  });

  form.reset();
  renderUsers();
});

// Init
renderUsers();
