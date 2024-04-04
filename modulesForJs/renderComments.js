// Рендер-функция
import { postComment, token } from "./api.js";
import { name } from "./api.js";
import { getComments } from "../main.js";
import { renderLogin } from "./loginPage.js";


export function renderComments({ comments, initLikeButtonListeners, reply, removeValidation, delay }) {
  const appElement = document.getElementById('app');
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment">
    <div class="comment-header">
      <div data-index="${index}">${comment.name}</div>
      <div>${comment.date}</div>
    </div>
    <div class="comment-body">
      <div data-index="${index}" class="comment-text">
        ${comment.comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span id="likes" class="likes-counter">${comment.likesCounter}</span>
        <button id="button-like" data-like="${comment.likesCounter}" data-index="${index}" class="like-button ${comments[index].isLiked ? '-active-like' : ''}"></button>
      </div>
    </div>
    </li>`
  }).join('');

  let appHtml = '';

  if(token) {

    appHtml = `
    <ul id="list" class="comments">
     ${commentsHtml}
    </ul>
    <div id="add-form" class="add-form">
    <input id="name-input" type="text" class="add-form-name" value=${name} disabled id="name-input" readonly/>
    <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button id="add-button" class="add-form-button">Написать</button>
    </div>
    <div class="add-form-row">
      <button id="delete-button" class="add-form-button">Удалить последний комментарий</button>
    </div>
  </div>`;

  } else {

    appHtml = `   
  <div id="comments-block" class="comments-block">
    <ul id="list" class="comments">
     ${commentsHtml}
    </ul>
    <span class="auth-link-span" id="load-comment">Чтобы добавить комментарий, 
    <a href="#" id="log">авторизуйтесь</a>
    </span>
  </div>`

  }

  appElement.innerHTML = appHtml;


  if(!token) {
    
    const logButtonElement = document.getElementById('log');
    logButtonElement.addEventListener('click', () => {
      renderLogin({getComments});
    });

  } else {

    const addButtonElement = document.getElementById('add-button');
    const nameInputElement = document.getElementById('name-input');
    const commentInputElement = document.getElementById('comment-input');

    // Добавление нового коммента на сервер 
    addButtonElement.addEventListener('click', () => {
      nameInputElement.classList.remove('error');
      commentInputElement.classList.remove('error');

      if (nameInputElement.value.trim() === '' || commentInputElement.value.trim() === '') {
        nameInputElement.classList.add('error');
        commentInputElement.classList.add('error');
        return;
      };

      addButtonElement.disabled = true;
      addButtonElement.textContent = 'Комментарий добавляется.....';

      return postComment(

        { name: nameInputElement.value },
        { text: commentInputElement.value, }

      ).then(() => {

        return getComments();

      }).then(() => {

        addButtonElement.disabled = false;
        addButtonElement.textContent = 'Добавить';
        nameInputElement.value = '';
        commentInputElement.value = '';

      }).catch((error) => {

        if (error === 'Сервер сломался, попробуй позже') {

          alert('Сервер сломался, попробуй позже');

          addButtonElement.disabled = false;
          addButtonElement.textContent = 'Добавить';

        } else if (error === 'Имя и комментарий должны быть не короче 3 символов') {

          alert('Имя и комментарий должны быть не короче 3 символов');

          addButtonElement.disabled = false;
          addButtonElement.textContent = 'Добавить';

        };
        renderComments({ comments, initLikeButtonListeners, reply, removeValidation, delay, getComments });
      });
      
    });

    initLikeButtonListeners({ comments, renderComments, reply, removeValidation, delay });
    reply({ comments });
    removeValidation();
  };
};