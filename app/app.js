const usersEl = document.getElementById("users");
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const fbInput = document.getElementById("facebook");

let users = [
  {
    name: "Dung Nguyen",
    fbUrl: "https://facebook.com/dungnguyenvl"
  }
];

function avatar(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=6c63ff&color=fff&size=256`;
}

function renderUsers() {
  usersEl.innerHTML = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="avatar">
        <img src="${avatar(user.name)}" alt="${user.name}" />
      </div>

      <strong>${user.name}</strong>

      <a href="${user.fbUrl}" target="_blank">🔗 Mở Facebook</a>

      <span class="badge">FB USER</span>
    `;

    usersEl.appendChild(card);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const fb = fbInput.value.trim();

  if (!name || !fb) return;

  users.push({ name, fbUrl: fb });
  renderUsers();
  form.reset();
});

renderUsers();
