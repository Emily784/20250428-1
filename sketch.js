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
  overlayGraphics.background(0); // 設定背景為黑色

  // 繪製圓形圖案
  for (let x = 10; x < overlayGraphics.width; x += 20) {
    for (let y = 10; y < overlayGraphics.height; y += 20) {
      let colorValue = map(x + y, 0, overlayGraphics.width + overlayGraphics.height, 0, 255); // 根據位置計算顏色
      overlayGraphics.fill(colorValue, 255 - colorValue, colorValue / 2); // 設定顏色
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x, y, 15, 15); // 繪製圓形，寬高為 15
    }
  }
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

  // 重新繪製 Graphics 圖案
  overlayGraphics.background(0); // 設定背景為黑色
  for (let x = 10; x < overlayGraphics.width; x += 20) {
    for (let y = 10; y < overlayGraphics.height; y += 20) {
      let colorValue = map(x + y, 0, overlayGraphics.width + overlayGraphics.height, 0, 255); // 根據位置計算顏色
      overlayGraphics.fill(colorValue, 255 - colorValue, colorValue / 2); // 設定顏色
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x, y, 15, 15); // 繪製圓形，寬高為 15
    }
  }
}
