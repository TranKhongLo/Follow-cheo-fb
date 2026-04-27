function setActiveMenu(el) {
  document.querySelectorAll(".menu").forEach(m => m.classList.remove("active"));
  el.classList.add("active");
}

function loadApp(type) {
  const app = document.getElementById("app");

  if (type === "qr") {
    app.innerHTML = `
      <div class="card">
        <div class="title">QR Generator</div>

        <input id="qrText" class="input" placeholder="Nhập nội dung..." />

        <button class="btn" onclick="genQR()">Tạo QR</button>

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

  if (type === "image") {
    app.innerHTML = `
      <div class="card">
        <div class="title">Image Converter</div>
        <input type="file" class="input" />
        <button class="btn">Convert</button>
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

// default
loadApp("qr");
