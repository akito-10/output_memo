const container = document.querySelector('#container');

let titleValue;
let descriptionValue;
let questionValue;
let answerValue;

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.header__btn');
  const gContainer = document.querySelector('#global-container');

  // メニューアイコンを押すとメニューを開閉できる様にする。
  menuBtn.addEventListener('click', () => {
    gContainer.classList.toggle('opened');
  });
});

// 引数に入れたリンクに飛ぶ様にする
const aHrefClick = link => {
  const a = document.createElement('a');
  a.href = link;
  a.click();
};

const logtittle = () => {
  console.log(titleValue);
};

const setLocalStorage = (id, title, description, question, answer) => {
  localStorage.setItem('id', id);
  localStorage.setItem('title', title);
  localStorage.setItem('description', description);
  localStorage.setItem('question', question);
  localStorage.setItem('answer', answer);
};

const getLocalStorage = () => {
  const title = localStorage.getItem('title');
  const description = localStorage.getItem('description');
  const question = localStorage.getItem('question');
  const answer = localStorage.getItem('answer');

  return [title, description, question, answer];
};

const resetLocalStorage = () => {
  localStorage.removeItem('title');
  localStorage.removeItem('description');
  localStorage.removeItem('question');
  localStorage.removeItem('answer');
};

const resetFormValue = () => {
  titleValue = '';
  descriptionValue = '';
  questionValue = '';
  answerValue = '';
}
