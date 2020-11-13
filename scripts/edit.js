const homeBtn = document.querySelector('.header__back');
const topBtn = document.querySelector('.header__top');
const postEdit = document.querySelector('#post-edit');

// クリックでホームに戻る
homeBtn.addEventListener('click', () => {
  aHrefClick('index.html');
});

// 編集ボタンクリックで削除ボタン表示
postEdit.addEventListener('click', () => {
  const covers = document.querySelectorAll('.main-contents__cover');

  covers.forEach(cover => {
    cover.classList.toggle('disable');
  })
});

// topボタンでcontainerのtopへ
topBtn.addEventListener('click', () => {
  const scrollArea = container;
  if (scrollArea) {
    scrollArea.scrollTop = 0;
  }
});
