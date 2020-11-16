const statement = document.querySelector('.review-contents__statement');
const descriptionAnswer = document.querySelector('.description-contents__answer');
const descriptionTitle = document.querySelector('.description-contents__title');
const descriptionText = document.querySelector('.description-contents__text');
const descriptionContents = document.querySelector('.description-contents');
const descriptionCover = document.querySelector('.description-cover');
const answerText = document.querySelector('#answer-text');
const answerBtn = document.querySelector('#answer-btn');
const closeBtn = document.querySelector('#close-btn');
const homeBtn = document.querySelector('.header__home');

let title,
    description,
    question,
    answer;

homeBtn.addEventListener(eventType, () => {
  aHrefClick('./index.html');
});

const setReview = async() => {
  [title, description, question, answer] = getLocalStorage();
  descriptionAnswer.textContent = `正解: ${answer}`;
  descriptionTitle.textContent = title;
  descriptionText.textContent = description;
  statement.textContent = question;

  const resetReviewData = () => {
    resetLocalStorage();
  };

  const res = await resetReviewData();
};
setReview();


answerBtn.addEventListener(eventType, () => {
  if(answerText.value === answer) {
    confirmDisplayDescription('正解！');
  } else {
    confirmDisplayDescription('不正解！');
  }
});

closeBtn.addEventListener(eventType, () => {
  closeDescription();
});

descriptionCover.addEventListener(eventType, () => {
  closeDescription();
});

const confirmDisplayDescription = value => {
  if(confirm(value  + '\n解説を見ますか？')) {
    descriptionContents.classList.remove('disable');
    descriptionCover.classList.remove('disable');
  } else {
    aHrefClick('./index.html');
  }
};

const closeDescription = () => {
  descriptionContents.classList.add('disable');
  descriptionCover.classList.add('disable');
  aHrefClick('./index.html');
}
