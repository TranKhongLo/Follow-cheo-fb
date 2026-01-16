// ID user đang xem (test)
const userId = 2;

async function loadProfile() {
  try {
    const res = await fetch(
      `https://social-api.dungnguyen68783979.workers.dev/user/${userId}`
    );

    if (!res.ok) {
      alert("Không tải được user");
      return;
    }

    const user = await res.json();

    // Hiển thị tên
    document.getElementById("name").innerText = user.name;

    // Nếu có link Facebook → hiện nút
    if (user.facebook_url) {
      const fb = document.getElementById("fbLink");
      fb.href = user.facebook_url;
      fb.style.display = "inline-block";
    }
  } catch (err) {
    console.error(err);
  }
}

loadProfile();
