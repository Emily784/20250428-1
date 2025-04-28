let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#bde0fe'); // 設定背景顏色

  // 嘗試擷取攝影機影像
  try {
    capture = createCapture(VIDEO, () => {
      console.log('攝影機已啟動');
    });
    capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
    capture.hide(); // 隱藏原始的 HTML 視訊元素
  } catch (error) {
    console.error('無法存取攝影機:', error);
  }
}

function draw() {
  background('#bde0fe'); // 確保背景顏色一致

  if (!capture || capture.width === 0 || capture.height === 0) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('無法顯示攝影機畫面', width / 2, height / 2);
    return; // 停止繪製其餘內容
  }

  // 如果 overlayGraphics 尚未初始化，且 capture 的寬高已正確設定
  if (!overlayGraphics && capture.width > 0 && capture.height > 0) {
    overlayGraphics = createGraphics(capture.width, capture.height);
    overlayGraphics.background(0); // 設定背景為黑色

    // 繪製方框和圓形圖案
    capture.loadPixels(); // 載入 capture 的像素資料
    for (let x = 10; x < overlayGraphics.width; x += 20) {
      for (let y = 10; y < overlayGraphics.height; y += 20) {
        let index = (y * capture.width + x) * 4; // 計算像素索引
        let g = capture.pixels[index + 1]; // 綠色值
        overlayGraphics.fill(0, g, 100); // 設定方框顏色，R=0, G=綠色值, B=100
        overlayGraphics.noStroke();
        overlayGraphics.rect(x - 9, y - 9, 18, 18); // 繪製方框，寬高為 18

        overlayGraphics.fill(0); // 設定圓形顏色為黑色
        overlayGraphics.ellipse(x, y, 5, 5); // 繪製圓形，寬高為 5
      }
    }
  }

  // 水平翻轉畫布並顯示視訊
  translate(width, 0);
  scale(-1, 1);
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2); // 將影像置中

  // 顯示 overlayGraphics 在視訊上方
  if (overlayGraphics) {
    image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小

  // 如果 overlayGraphics 已初始化，則重新調整大小並繪製
  if (overlayGraphics) {
    overlayGraphics.resizeCanvas(capture.width, capture.height);
    overlayGraphics.background(0); // 設定背景為黑色
    capture.loadPixels(); // 載入 capture 的像素資料
    for (let x = 10; x < overlayGraphics.width; x += 20) {
      for (let y = 10; y < overlayGraphics.height; y += 20) {
        let index = (y * capture.width + x) * 4; // 計算像素索引
        let g = capture.pixels[index + 1]; // 綠色值
        overlayGraphics.fill(0, g, 100); // 設定方框顏色，R=0, G=綠色值, B=100
        overlayGraphics.noStroke();
        overlayGraphics.rect(x - 9, y - 9, 18, 18); // 繪製方框，寬高為 18

        overlayGraphics.fill(0); // 設定圓形顏色為黑色
        overlayGraphics.ellipse(x, y, 5, 5); // 繪製圓形，寬高為 5
      }
    }
  }
}
