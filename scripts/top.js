const topBtn = document.querySelector('.header__top');
const memoOpen = document.querySelector('#memo-open');

// topボタンでcontainerのtopへ
topBtn.addEventListener('click', () => {
  const scrollArea = container;
  if (scrollArea) {
    scrollArea.scrollTop = 0;
  }
});

// クリックでmemoページへ
memoOpen.addEventListener('click', () => {
  aHrefClick('./memo.html');
});
