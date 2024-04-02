"use strict";

import { fetchAndRenderComments } from "./modulesForJs/api.js";
import { delay } from "./modulesForJs/delay.js";
import { initLikeButtonListeners } from "./modulesForJs/likeButton.js";
import { removeValidation } from "./modulesForJs/removeValid.js";
import { renderComments } from "./modulesForJs/renderComments.js";
import { reply } from "./modulesForJs/reply.js";

// Получениe комментов с сервера
export function getComments() {

  fetchAndRenderComments().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' }) + ' ' + new Date(comment.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        comment: comment.text,
        likesCounter: comment.likes,
        isLiked: comment.isLiked,
      };
    });
    comments = appComments;
    renderComments({ comments, initLikeButtonListeners, reply, removeValidation, delay });
    // preLoadElement.classList.add('hide');
  });
}

getComments();
// renderLogin({ getComments });



//  Массив для комментов 
let comments = [];

// Кнопка для лайка 
initLikeButtonListeners({ comments }, { renderComments });

// Ответ по клику на коммент 
reply({ comments });



