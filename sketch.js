let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#bde0fe'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與視訊畫面相同大小的 Graphics
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.fill(255, 0, 0, 100); // 半透明紅色
  overlayGraphics.textSize(32);
  overlayGraphics.textAlign(CENTER, CENTER);
  overlayGraphics.text('這是我的影像', overlayGraphics.width / 2, overlayGraphics.height / 2); // 在中間顯示文字
}

function draw() {
  background('#bde0fe'); // 確保背景顏色一致

  // 水平翻轉畫布並顯示視訊
  translate(width, 0);
  scale(-1, 1);
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2); // 將影像置中

  // 顯示 overlayGraphics 在視訊上方
  image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
  overlayGraphics.resizeCanvas(capture.width, capture.height); // 調整 Graphics 大小
}
