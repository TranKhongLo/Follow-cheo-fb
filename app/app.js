function loadApp(type) {
  const app = document.getElementById("app");

  if (type === "youtube") {
    app.innerHTML = `
      <h2 class="title">YouTube Downloader</h2>
      <input class="input" placeholder="Dán link YouTube..." />
      <button class="btn">Download</button>
    `;
  }

  if (type === "merge") {
    app.innerHTML = `
      <h2 class="title">PDF Merge</h2>
      <input type="file" multiple class="input" />
      <button class="btn">Merge</button>
    `;
  }

  if (type === "split") {
    app.innerHTML = `
      <h2 class="title">PDF Split</h2>
      <input type="file" class="input" />
      <button class="btn">Split</button>
    `;
  }

  if (type === "image") {
    app.innerHTML = `
      <h2 class="title">Image Converter</h2>
      <input type="file" class="input" />
      <button class="btn">Convert</button>
    `;
  }

  if (type === "text") {
    app.innerHTML = `
      <h2 class="title">Text Tools</h2>
      <textarea id="text" class="input"></textarea>
      <button class="btn" onclick="toUpper()">Uppercase</button>
    `;
  }

  if (type === "qr") {
    app.innerHTML = `
      <h2 class="title">QR Generator</h2>
      <input id="qrText" class="input" placeholder="Nhập nội dung..." />
      <button class="btn" onclick="genQR()">Generate</button>
      <canvas id="qrCanvas" class="mt-4 bg-white p-2 rounded"></canvas>
    `;
  }
}

function toUpper() {
  const input = document.getElementById("text");
  input.value = input.value.toUpperCase();
}

function genQR() {
  const text = document.getElementById("qrText").value;
  const canvas = document.getElementById("qrCanvas");
  QRCode.toCanvas(canvas, text);
}

// default
loadApp("qr");
