function setActive(el) {
  document.querySelectorAll(".menu").forEach(m => m.classList.remove("active"));
  el.classList.add("active");
}

function loadApp(type, el) {
  if (el) setActive(el);

  const app = document.getElementById("app");

  if (type === "qr") {
    app.innerHTML = `
      <div class="card">
        <div class="title">QR Generator</div>

        <input id="qrText" class="input" placeholder="Enter text..." />

        <button class="btn" onclick="genQR()">Generate QR</button>

        <canvas id="qrCanvas" class="qr-box"></canvas>
      </div>
    `;
  }

  if (type === "text") {
    app.innerHTML = `
      <div class="card">
        <div class="title">Text Tools</div>

        <textarea id="text" class="input"></textarea>

        <button class="btn" onclick="toUpper()">Uppercase</button>
      </div>
    `;
  }

  if (type === "youtube") {
    app.innerHTML = `
      <div class="card">
        <div class="title">YouTube Downloader</div>
        <input class="input" placeholder="Paste link..." />
        <button class="btn">Download</button>
      </div>
    `;
  }

  if (type === "merge") {
    app.innerHTML = `
      <div class="card">
        <div class="title">PDF Merge</div>
        <input type="file" multiple class="input" />
        <button class="btn">Merge</button>
      </div>
    `;
  }

  if (type === "split") {
    app.innerHTML = `
      <div class="card">
        <div class="title">PDF Split</div>
        <input type="file" class="input" />
        <button class="btn">Split</button>
      </div>
    `;
  }
}

// QR
function genQR() {
  const text = document.getElementById("qrText").value;
  const canvas = document.getElementById("qrCanvas");
  QRCode.toCanvas(canvas, text);
}

// Text
function toUpper() {
  const input = document.getElementById("text");
  input.value = input.value.toUpperCase();
}

// default load
loadApp("qr");
