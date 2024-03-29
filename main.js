"use strict";

import { getTodos, postComments } from "./api.js";
import { renderUsers } from "./render.js";
export const buttonElement = document.getElementById('add-button');
export const nameInputElement = document.getElementById('name-input');
export const textInputElement = document.getElementById('text-input');


export let users = [];


const getComments = () => {
  return getTodos()
    .then((responseData) => {
      const userComment = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          comment: comment.text,
          likes: comment.likes,
          isLiked: false,
          id: comment.id,
        };
      });
      users = userComment;
      renderUsers();
      document.getElementById('loading-status').textContent = "";
    });   
};

getComments();




buttonElement.addEventListener('click', () => {
  nameInputElement.classList.remove('error');
  textInputElement.classList.remove('error');
  if (nameInputElement.value.trim() !== '' && textInputElement.value.trim() === '') {
    textInputElement.classList.add('error');
    buttonElement.disabled = true;
    return;
  }
  else if (nameInputElement.value.trim() === '' && textInputElement.value.trim() === '') {
    nameInputElement.classList.add('error');
    textInputElement.classList.add('error');
    buttonElement.disabled = true;
    return;
  }

  if (textInputElement.value.trim() !== '' && nameInputElement.value.trim() === '') {
    nameInputElement.classList.add('error');
    buttonElement.disabled = true;
    return;
  }

  
  
  document.getElementById('add-comment-status').textContent = "Добавление комментария ...";
  document.querySelector('.add-form').classList.add('hidden');
  
  
 
    postComments({name: nameInputElement.value, text: textInputElement.value}).then(() => {
      return getComments();
    })
    .then(() => {
      nameInputElement.value = '';
      textInputElement.value = '';
    })
    .finally(() => {
      document.getElementById('add-comment-status').textContent = "";
      document.querySelector('.add-form').classList.remove('hidden');
    });

  renderUsers();
  

});