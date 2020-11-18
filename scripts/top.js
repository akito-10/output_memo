const topBtn = document.querySelector('.header__top');
const memoOpen = document.querySelector('#memo-open');

// topボタンでcontainerのtopへ
topBtn.addEventListener(eventType, () => {
  backPageTop();
});

// クリックでmemoページへ
memoOpen.addEventListener(eventType, () => {
  aHrefClick('./memo.html');
});
