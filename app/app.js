const usersEl = document.getElementById("users");
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const fbInput = document.getElementById("facebook");

let users = [
  {
    name: "Dung Nguyen",
    fbUsername: "dungnguyenvl",
    fbUrl: "https://facebook.com/dungnguyenvl"
  }
];

function avatarUrl(username) {
  return `https://graph.facebook.com/${username}/picture?type=large`;
}

function renderUsers() {
  usersEl.innerHTML = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="avatar">
        <img 
          src="${avatarUrl(user.fbUsername)}"
          alt="${user.name}"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6c63ff&color=fff'"
        />
      </div>

      <strong>${user.name}</strong>

      <a href="${user.fbUrl}" target="_blank">🔗 Facebook</a>

      <span class="badge user">FB USER</span>
    `;

    usersEl.appendChild(card);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const fbLink = fbInput.value.trim();

  if (!name || !fbLink) return;

  const username = fbLink
    .replace(/^https?:\/\//, "")
    .replace("www.", "")
    .replace("facebook.com/", "")
    .replace("/", "");

  users.push({
    name,
    fbUsername: username,
    fbUrl: `https://facebook.com/${username}`
  });

  renderUsers();
  form.reset();
});

renderUsers();
