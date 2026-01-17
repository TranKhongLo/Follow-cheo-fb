// 👉 ID user đang xem (test)
const userId = 2;

// 👉 URL Worker của bạn
const API_BASE = "https://social-api.dungnguyen68783979.workers.dev";

const nameEl = document.getElementById("name");
const fbLink = document.getElementById("fbLink");
const followBtn = document.getElementById("followBtn");

async function loadProfile() {
  const res = await fetch(`${API_BASE}/user/${userId}`, {
    credentials: "include" // gửi cookie login
  });

  if (!res.ok) {
    nameEl.innerText = "Không load được user";
    return;
  }

  const user = await res.json();

  // Tên
  nameEl.innerText = user.name;

  // Facebook
  if (user.facebook_url) {
    fbLink.href = user.facebook_url;
    fbLink.style.display = "inline-block";
  }

  // Follow button
  followBtn.style.display = "inline-block";

  if (user.isFollowing) {
    followBtn.innerText = "Following";
    followBtn.classList.add("following");
    followBtn.disabled = true;
  } else {
    followBtn.onclick = followUser;
  }
}

async function followUser() {
  const res = await fetch(`${API_BASE}/follow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ following_id: userId })
  });

  if (!res.ok) {
    alert("Follow thất bại (bạn đã login chưa?)");
    return;
  }

  followBtn.innerText = "Following";
  followBtn.classList.add("following");
  followBtn.disabled = true;
}

loadProfile();
