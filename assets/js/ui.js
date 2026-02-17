// タッチ操作できるブラウザの場合、
// <body>に"is-touch"クラスを追加
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.body.classList.add('is-touch');
  
  // iOS対策スクロール
  setTimeout(() => {
    window.scrollTo(window.scrollX, window.scrollY + 1);
  }, 0);
}


// ハンバーガーメニュー
const btn = document.querySelector('.toggle_btn');
const nav = document.querySelector('.nav');

if (btn &&nav) {
  // ハンバーガーメニュー開閉
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // ハンバーガーメニュー：外側タップで閉じる
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      nav.classList.remove('open');
      btn.classList.remove('active');
    }
  });
}


// フル画像をスクロール
document.querySelectorAll('.scroll-box').forEach((box) => {
  const img = box.querySelector('img');
  const title = box.querySelector('.scroll-title');
  let scrollAnimationId = null;
  let returnAnimationId = null;
  let scrollDistance = 0;
  let imgHeight = 0;
  let boxHeight = 0;

  img.onload = () => {
    const boxWidth = box.clientWidth;
    const ratio = boxWidth / img.naturalWidth;
    imgHeight = img.naturalHeight * ratio;
    boxHeight = box.clientHeight;
    img.style.height = imgHeight + 'px';

    // スクロール距離 = 画像全体の高さ - 枠の高さ + タイトルの高さ
    const titleHeight = title.offsetHeight;
    scrollDistance = imgHeight - (boxHeight - titleHeight);
  };

  if (img.conplete && img.naturalWidth !== 0) {
    img.onload();
  }

  function scrollDownStep() {
    const currentTop = parseFloat(getComputedStyle(img).top);
    const nextTop = currentTop - 7;
    if (Math.abs(nextTop - 40) >= scrollDistance) {
      img.style.top = (40 - scrollDistance) + 'px';
      cancelAnimationFrame(scrollAnimationId);
      return;
    }
    img.style.top = nextTop + 'px';
    scrollAnimationId = requestAnimationFrame(scrollDownStep);
  }

  function scrollUpStep() {
    const currentTop = parseFloat(getComputedStyle(img).top);
    const speed = 7;
    if (currentTop >= 40) {
      img.style.top = '40px';
      cancelAnimationFrame(returnAnimationId);
      return;
    }
    const nextTop = Math.min(currentTop + speed, 40);
    img.style.top = nextTop + 'px';
    returnAnimationId = requestAnimationFrame(scrollUpStep);
  }

  box.addEventListener('mouseenter', () => {
    cancelAnimationFrame(returnAnimationId);
    scrollAnimationId = requestAnimationFrame(scrollDownStep);
  });

  box.addEventListener('mouseleave', () => {
    cancelAnimationFrame(scrollAnimationId);
    returnAnimationId = requestAnimationFrame(scrollUpStep);
  });
});
