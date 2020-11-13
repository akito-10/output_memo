const homeBtn = document.querySelector('.header__home');
const titleArea = document.querySelector('#memo-title');
const descriptionArea = document.querySelector('#memo-description');
const questionArea = document.querySelector('#memo-question');
const answerArea = document.querySelector('#memo-answer');
const form = document.querySelector('.memo-wrapper');
const clearBtn = document.querySelector('#clear-btn');
const addBtn = document.querySelector('#add-btn');

// 編集ボタンから移ってきたか判定
let isFromEdit = false;
console.log(isFromEdit);

// クリックホームに戻る
homeBtn.addEventListener('click', () => {
  aHrefClick('./index.html');
});

// フォームを変数に格納
titleArea.addEventListener('change', e => {
  titleValue = e.target.value;
});
descriptionArea.addEventListener('change', e => {
  descriptionValue = e.target.value;
});
questionArea.addEventListener('change', e => {
  questionValue = e.target.value;
});
answerArea.addEventListener('change', e => {
  answerValue = e.target.value;
});

// 編集画面から遷移してきたときのためにもう一度入れ込む
addBtn.addEventListener('mouseover', () => {
  titleValue = titleArea.value;
  descriptionValue = descriptionArea.value;
  questionValue = questionArea.value;
  answerValue = answerArea.value;
});

// 戻るボタンクリックで変数をからにしてホームに戻る
clearBtn.addEventListener('click', () => {
  aHrefClick('./index.html');
  resetFormValue();
});

document.addEventListener('DOMContentLoaded', () => {
  // 読み込み時にlocalStorage保存しておいたデータを読み込み、
  // 書いた後に初期化
  const getFormValue = async () => {
    [titleValue, descriptionValue, questionValue, answerValue] = getLocalStorage();
    console.log(titleValue);
    titleArea.value = titleValue;
    descriptionArea.value = descriptionValue;
    questionArea.value = questionValue;
    answerArea.value = answerValue;

    // 編集ボタンからきた時は変数に値が入っているはずなので
    // そこで振り分け
    if(titleValue && descriptionValue && questionValue && answerValue) {
      isFromEdit = true;
    };

    const removeLocalStorage = () => {
      resetLocalStorage();
      resetFormValue();
      console.log(isFromEdit);
    };

    const res = await removeLocalStorage();
  };

  getFormValue();
});
