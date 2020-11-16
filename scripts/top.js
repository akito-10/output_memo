const topBtn = document.querySelector('.header__top');
const memoOpen = document.querySelector('#memo-open');

// topボタンでcontainerのtopへ
topBtn.addEventListener(eventType, () => {
  const scrollArea = container;
  if (scrollArea) {
    scrollArea.scrollTop = 0;
  }
});

// クリックでmemoページへ
memoOpen.addEventListener(eventType, () => {
  aHrefClick('./memo.html');
});
