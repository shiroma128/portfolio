// 画像のスライドショー
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.slider');

const totalSlides = dots.length;
let current = 0;

function showSlide(index) {
  // 要素がなければ何もしない
  if (!slider || !slides || totalSlides === 0) return;

  const sliderWidth = slider.clientWidth;
  slides.style.transform = `translateX(-${sliderWidth * index}px)`;

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

// 画像のスライドショー：一定間隔でスライド切り替え（スライダーがあるページのみ）
if (slider && slides && totalSlides > 0) {
  showSlide(0);
  setInterval(() => {
    current = (current + 1) % totalSlides;
    showSlide(current);
  }, 3000);
}        

// 現在の日付を取得（問い合わせフォームがあるページのみ）
const availableStatus = document.getElementById("available-status");
if (availableStatus) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const message = `${year}年${month}月${date}日現在、新規案件もスムーズに対応可能です。`;
  availableStatus.textContent = message;
}