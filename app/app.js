const form = document.getElementById("addUserForm");
const result = document.getElementById("result");

let users = [];

/**
 * Lấy username hoặc ID từ link Facebook
 */
function extractFacebookId(url) {
  try {
    const u = new URL(url);

    // facebook.com/username
    const path = u.pathname.replace("/", "");

    if (path && path !== "profile.php") {
      return path;
    }

    // facebook.com/profile.php?id=123
    return u.searchParams.get("id");
  } catch {
    return null;
  }
}

// Render users
function renderUsers() {
  result.innerHTML = "";

  if (users.length === 0) {
    result.innerHTML = "<p>Chưa có user nào.</p>";
    return;
  }

  users.forEach((user) => {
    const fbId = extractFacebookId(user.fb);

    const avatarUrl = fbId
      ? `https://graph.facebook.com/${fbId}/picture?type=large`
      : "";

    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="avatar">
        ${
          avatarUrl
            ? `<img src="${avatarUrl}" alt="avatar" />`
            : ""
        }
      </div>

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

  if (
    !fb.startsWith("https://facebook.com") &&
    !fb.startsWith("https://www.facebook.com")
  ) {
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
