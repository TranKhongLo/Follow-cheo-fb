const API = "https://social-api.dungnguyen68783979.workers.dev";

// load danh sách users
async function loadUsers() {
  const res = await fetch(`${API}/users`);
  const data = await res.json();

  const list = document.getElementById("userList");
  list.innerHTML = "";

  data.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.username || u;
    list.appendChild(li);
  });
}

// thêm user
async function addUser() {
  const input = document.getElementById("username");
  const username = input.value.trim();

  if (!username) return alert("Nhập username");

  await fetch(`${API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  });

  input.value = "";
  loadUsers();
}

// chạy khi load trang
loadUsers();
