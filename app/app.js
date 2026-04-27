function loadApp(type) {
  const app = document.getElementById("app");

  // Reset content
  app.innerHTML = "";

  if (type === "youtube") {
    app.innerHTML = `
      <h2 class="title">YouTube Downloader</h2>
      <input id="yt" placeholder="Dán link YouTube..." class="input"/>
      <button class="btn">Tải xuống</button>
      <p class="note">* Cần backend để chạy thật</p>
    `;
  }

  if (type === "merge") {
    app.innerHTML = `
      <h2 class="title">PDF Merge</h2>
      <input type="file" multiple class="input"/>
      <button class="btn">Nối PDF</button>
      <p class="note">* Cần backend xử lý</p>
    `;
  }

  if (type === "split") {
    app.innerHTML = `
      <h2 class="title">PDF Split</h2>
      <input type="file" class="input"/>
      <button class="btn">Cắt PDF</button>
    `;
  }

  if (type === "image") {
    app.innerHTML = `
      <h2 class="title">Image Converter</h2>
      <input type="file" class="input"/>
      <button class="btn">Convert</button>
    `;
  }

  if (type === "text") {
    app.innerHTML = `
      <h2 class="title">Text Tools</h2>
      <textarea id="text" class="input" placeholder="Nhập text..."></textarea>
      <button class="btn" onclick="toUpper()">Uppercase</button>
    `;
  }

  if (type === "qr") {
    app.innerHTML = `
      <h2 class="title">QR Generator</h2>
      <input id="qrText" placeholder="Nhập nội dung..." class="input"/>
      <button class="btn" onclick="genQR()">Tạo QR</button>
      <canvas id="qrCanvas" class="mt-4 bg-white p-2 rounded"></canvas>
    `;
  }
}

// TEXT TOOL
function toUpper() {
  const input = document.getElementById("text");
  input.value = input.value.toUpperCase();
}

// QR TOOL (CHẠY THẬT)
function genQR() {
  const text = document.getElementById("qrText").value;
  const canvas = document.getElementById("qrCanvas");

  QRCode.toCanvas(canvas, text, function (error) {
    if (error) console.error(error);
  });
}

// default load
loadApp("qr");
