// フォーム送信でイベント発生
form.onsubmit = addData;

function addData(e) {
  e.preventDefault();

  if(titleValue === '' || descriptionValue === '' || questionValue === '' || answerValue === '') {
    alert('書き忘れている項目があるよ！');
    return false;
  }

  // 送るデータ
  let newItem = {
    title: titleValue,
    description: descriptionValue,
    question: questionValue,
    answer: answerValue
  };
  
  // データのアクセス、読み書き許可
  let transaction = db.transaction(['posts'], 'readwrite');
  // アクセス
  let objectStore = transaction.objectStore('posts');
  // データベースに書き込み
  let request = objectStore.add(newItem);
  // 通信成功でフォームクリア
  request.onsuccess = () => {
    resetFormValue();

    if(isFromEdit) {
      // 消したい投稿のid
      let deleteId = localStorage.getItem('id');
      // アクセス、読み書き許可
      let transaction = db.transaction(['posts'], 'readwrite');
      // アクセス
      let objectStore = transaction.objectStore('posts');
      // idに一致する投稿のデータを削除
      let request = objectStore.delete(deleteId);

      request.onsuccess = () => {
        console.log('OK');
      };

      request.onerror = () => {
        console.log('error');
      };

      transaction.oncomplete = () => {
        localStorage.removeItem('id');
      };
    }
  };

  transaction.oncomplete = () => {
    console.log('Transaction complete: database modification finished.');
    location.reload();
  };

  transaction.onerror = () => {
    console.log('Transaction not opened due to error');
  };
};
