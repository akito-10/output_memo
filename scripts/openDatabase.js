const mainContents = document.querySelector('.main-contents');
let db;

window.onload = () => {
  // データベースを開く
  let request = window.indexedDB.open('posts', 1);

  request.onerror = () => {
    console.log('データベースを開けませんでした。')
  }
  request.onsuccess = () => {
    console.log('データベースを開きました。')

    // 開いたデータベースを変数に格納
    db = request.result;

    // 今のパスがindex.htmlまたはedit.htmlであれば描画処理
    if(location.pathname === '/index.html' || location.pathname === '/edit.html') {
      displayData();
    }
  }
  // 開きたいデータベースがまだない、バージョンが違うなどの時
  // 新規作成または更新
  request.onupgradeneeded = e => {
    let db = e.target.result;
    let objectStore = db.createObjectStore('posts', {keyPath: 'id', autoIncrement: true});

    objectStore.createIndex('title', 'title', {unique: false});
    objectStore.createIndex('description', 'description', {unique: false});
    objectStore.createIndex('question', 'question', {unique: false});
    objectStore.createIndex('answer', 'answer', {unique: false});

    console.log('Database setup complete');
  }
};

// 投稿の要素を作る(返り値: link,description,btn,post)
function createPost() {
  const post = document.createElement('div');
  const text = document.createElement('div');
  const review = document.createElement('div');
  const link = document.createElement('a');
  const description = document.createElement('p');
  const btn = document.createElement('button');
  const p = document.createElement('p')

  post.classList.add('main-contents__post');
  text.classList.add('main-contents__text');
  review.classList.add('main-contents__review');
  link.classList.add('main-contents__link');
  p.textContent = '< 解説 >';
  description.classList.add('main-contents__description');
  btn.classList.add('main-contents__btn');
  btn.classList.add('button-style-non');

  mainContents.appendChild(post);
  post.appendChild(text);
  text.appendChild(link);
  text.appendChild(p);
  text.appendChild(description);
  text.appendChild(review);
  review.appendChild(btn);

  return [
    link,
    description,
    btn,
    post
  ];
};

// 投稿を表示とデータ両方から削除
function deletePost(e) {
  // 選択した投稿のid読み取り
  let postId = Number(e.target.parentNode.parentNode.getAttribute('data-note-id'));
  // アクセス、読み書き許可
  let transaction = db.transaction(['posts'], 'readwrite');
  // アクセス
  let objectStore = transaction.objectStore('posts');
  // idに一致する投稿のデータを削除
  let request = objectStore.delete(postId);

  request.onsuccess = () => {
    console.log('OK');
  };

  request.onerror = () => {
    console.log('error');
  };

  transaction.oncomplete = () => {
    // 選択した投稿に一致するidの投稿の要素を削除
    const removePost = async () => {
      e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
      // リロードすることで再描画
      const reload = await location.reload();
    };

    removePost();
    // もし要素が一つもなくなれば投稿作成を促す表示
    if(!mainContents.firstChild) {
      displayData();
    }
  }
};

// 投稿を削除するためのボタン作成(返り値: cover,button)
function createCover() {
  const cover = document.createElement('div');
  const button = document.createElement('button');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');

  cover.classList.add('main-contents__cover');
  cover.classList.add('disable');
  button.classList.add('button-style-non');

  button.appendChild(span1);
  button.appendChild(span2);
  cover.appendChild(button);

  return [cover, button];
};

// 読み取ったデータを表示
function displayData() {
  // 初期化
  while(mainContents.firstChild) {
    mainContents.removeChild(mainContents.firstChild);
  }

  // データ読み取り、アクセスする
  let objectStore = db.transaction('posts').objectStore('posts');
  // 読み取ったデータに対し、一つずつ処理
  objectStore.openCursor().onsuccess = e => {
    // データ情報取得
    let cursor = e.target.result;

    // データがあればtrue
    if(cursor) {
      // パスがindex.htmlかedit.htmlで振り分け
      if(location.pathname === '/index.html') {
        // ホーム描画処理
        const [link, description, btn, post] = createPost();
        link.textContent = cursor.value.title;
        description.textContent = cursor.value.description;
        btn.textContent = '復習する';

        btn.addEventListener('click', e => {
          // クリックで復習画面へ
          aHrefClick('./review.html');
          // クリックした投稿のid取得、データベース にアクセス
          console.log(e.target.parentNode.parentNode.parentNode.getAttribute('data-note-id'));
          let reviewId = Number(e.target.parentNode.parentNode.parentNode.getAttribute('data-note-id'));
          let store = db.transaction('posts').objectStore('posts');
          let request = store.get(reviewId);

          // データベース にアクセスできたらストレージにセット
          request.onsuccess = () => {
            console.log(request.result.title);
            setLocalStorage(reviewId, request.result.title, request.result.description, request.result.question, request.result.answer);
          };
        });

        // 固有のidを要素に設定
        post.setAttribute('data-note-id', cursor.value.id);
      } else if(location.pathname === '/edit.html') {
        // 編集画面描画処理
        const [cover, deleteBtn] = createCover();
        const [link, description, editBtn, post] = createPost();

        // ボタンクリックで投稿削除
        deleteBtn.onclick = deletePost;

        // 後ろに入れていく
        post.insertBefore(cover, post.firstChild);

        link.textContent = cursor.value.title;
        description.textContent = cursor.value.description;
        editBtn.textContent = '編集する';

        editBtn.addEventListener('click', e => {
          // クリックでフォームへ
          aHrefClick('./memo.html');
          // クリックした投稿のid取得、データベース にアクセス
          console.log(e.target.parentNode.parentNode.parentNode.getAttribute('data-note-id'));
          let editId = Number(e.target.parentNode.parentNode.parentNode.getAttribute('data-note-id'));
          let store = db.transaction('posts').objectStore('posts');
          let request = store.get(editId);

          // データベース にアクセスできたらストレージにセット
          request.onsuccess = () => {
            console.log(request.result.title);
            setLocalStorage(editId, request.result.title, request.result.description, request.result.question, request.result.answer);
          };
        });

        // 固有のidを要素に設定
        post.setAttribute('data-note-id', cursor.value.id);
      }

      // まだデータがあればもう一度実行
      cursor.continue();
    } else {
      // 投稿がなくなれば投稿作成を促す表示
      if(!mainContents.firstChild) {
        const [link, description, btn] = createPost();

        link.textContent = '問題がありません';
        description.textContent = 'まだ問題を追加できていません。';
        btn.textContent = '問題作成';

        btn.addEventListener('click', () => {
          aHrefClick('./memo.html');
        });
      }
    }
  };
};
