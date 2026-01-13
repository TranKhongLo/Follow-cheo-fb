const form = document.getElementById("userForm");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

function getInitials(name = "?") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loading.classList.remove("hidden");
  result.classList.add("hidden");
  result.innerHTML = "";

  try {
    const res = await fetch(
      "https://social-api.dungnguyen68783979.workers.dev/users"
    );
    const users = await res.json();

    if (!users.length) {
      result.innerHTML = "<div>❌ Không có user nào</div>";
    } else {
      users.forEach((user, index) => {
        const card = document.createElement("div");
        card.className = "user-card";

        card.innerHTML = `
          <div class="avatar">
            ${getInitials(user.name || "U")}
          </div>

          <div class="user-info">
            <div class="user-name">${user.name || "Unknown User"}</div>
            <div class="user-meta">User ID: ${user.id || index + 1}</div>
          </div>

          <div class="badge">
            ACTIVE
          </div>
        `;

        result.appendChild(card);
      });
    }

    result.classList.remove("hidden");
  } catch (err) {
    result.innerHTML = "<div>⚠️ Lỗi khi gọi API</div>";
    result.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
});
