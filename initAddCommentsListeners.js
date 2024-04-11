import { postTodo } from "./api.js";
import { getComments, comments } from "./main.js";
import { renderComments, } from "./renderComments.js";

export function initAddCommentsListeners() {
    const addForm = document.querySelector(".add-form");
    const buttonElement = document.getElementById("addCommentButton");
    const loader = document.querySelector(".loader");
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.getElementById("text-input");
    buttonElement.addEventListener('click', () => {
        textInputElement.classList.remove("error");
        if (!textInputElement.value.trim()) {
          textInputElement.classList.add("error");
          return;        
        }

        addForm.classList.add("hidden");
        loader.textContent = 'Комментарий добавляется...';
      
        const lastIndex = comments.length - 1;
        const lastCommentId = comments[lastIndex]['id']
      
        postTodo({ 
          text: textInputElement.value,
          name: nameInputElement.value,
        }).then((response) => {
          getComments();

          textInputElement.value = "";
      
          renderComments();
        }).catch((error) => {
          if (error.message === 'Failed to fetch') {
            alert("Кажется что-то пошло не так, попробуйте позже");
          };
          if (error.message === "Сервер упал") {
            alert('Сервер сломался, попробуйте позже');
          };
          if (error.message === "Короткие вводимые данные") {
            alert('Имя и комментарий должны быть не короче 3х символов');
          };
      
          console.warn(error);
          loader.textContent = '';
          addForm.classList.remove("hidden");
        });
      });
};