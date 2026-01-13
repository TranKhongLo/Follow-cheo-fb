// ==============================
// Mini Social App - app.js
// ==============================

// DOM
const usersEl = document.getElementById("users");
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const fbInput = document.getElementById("facebook");

// ==============================
// DATA
// ==============================
let users = [
  {
    name: "dungnguyen",
    fbUsername: "dungnguyenvl",
    fbUrl: "https://facebook.com/dungnguyenvl",
    type: "FB USER"
  }
];

// ==============================
// HELPERS
// ==============================
function getAvatar(username) {
  return `https://graph.facebook.com/${username}/picture?type=large`;
}

function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "user-card";

  card.innerHTML = `
    <div class="avatar">
      <img 
        src="${getAvatar(user.fbUsername)}"
        alt="${user.name}"
        onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=6c63ff&color=fff'"
      >
    </div>

    <h3>${user.name}</h3>

    <a href="${user.fbUrl}" target="_blank" rel="noopener">
      🔗 Mở Facebook
    </a>

    <span class="badge">${user.type}</span>
  `;

  return card;
}

// ==============================
// RENDER
// ==============================
function renderUsers() {
  usersEl.innerHTML = "";
  users.forEach(user => {
    usersEl.appendChild(createUserCard(user));
  });
}

// ==============================
// FORM SUBMIT
// ==============================
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const fbLink = fbInput.value.trim();

    if (!name || !fbLink) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // Lấy username từ link Facebook
    const fbUsername = fbLink
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace("facebook.com/", "")
      .replace("/", "");

    const newUser = {
      name,
      fbUsername,
      fbUrl: `https://facebook.com/${fbUsername}`,
      type: "FB USER"
    };

    users.push(newUser);
    renderUsers();
    form.reset();
  });
}

// ==============================
// INIT
// ==============================
renderUsers();
