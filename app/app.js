// ====== STATE ======
const form = document.getElementById("addUserForm");
const result = document.getElementById("result");

// Danh sách user (tạm thời lưu trong bộ nhớ)
let users = [];

// ====== UTILS ======
function getInitial(name) {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}

// ====== RENDER USERS ======
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
      <div>${user.email}</div>
      <span class="badge ${user.role}">${user.role}</span>
    `;

    result.appendChild(card);
  });
}

// ====== HANDLE FORM SUBMIT ======
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const roleSelect = document.getElementById("role");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const role = roleSelect.value;

  if (!name || !email) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    role,
  };

  users.push(newUser);

  renderUsers();
  form.reset();
});

// ====== INIT ======
renderUsers();
