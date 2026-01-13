const users = [
  { id: 1, name: "User A" },
  { id: 2, name: "User B" },
  { id: 3, name: "User C" }
];

// follow relationships
let follows = [
  { follower: 1, following: 2 },
  { follower: 2, following: 3 }
];

function isFollowing(a, b) {
  return follows.some(f => f.follower === a && f.following === b);
}

function follow(a, b) {
  if (!isFollowing(a, b)) {
    follows.push({ follower: a, following: b });
    render();
  }
}

function unfollow(a, b) {
  follows = follows.filter(f => !(f.follower === a && f.following === b));
  render();
}

function render() {
  const container = document.getElementById("users");
  container.innerHTML = "";

  users.forEach(u => {
    const followers = follows.filter(f => f.following === u.id).length;
    const following = follows.filter(f => f.follower === u.id).length;

    const div = document.createElement("div");
    div.className = "user";

    div.innerHTML = `
      <strong>${u.name}</strong><br>
      Followers: ${followers} | Following: ${following}<br><br>
      ${users
        .filter(o => o.id !== u.id)
        .map(o =>
          isFollowing(u.id, o.id)
            ? `<button onclick="unfollow(${u.id},${o.id})">Unfollow ${o.name}</button>`
            : `<button onclick="follow(${u.id},${o.id})">Follow ${o.name}</button>`
        )
        .join("")}
    `;

    container.appendChild(div);
  });
}

render();
