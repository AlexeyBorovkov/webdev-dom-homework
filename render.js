import { textInputElement, users }  from "../main.js";


const listElement = document.getElementById('list');



export  const renderUsers = () => {
  const usersHtml = users.map((user, index) => {
    return `<li class="comment">
        <div class="comment-header">
          <div>${user.name}</div>
          <div>${currentTime(user.date)}</div>
        </div>
        <div data-text="${user.comment}" class="comment-body">
          ${users[index].isEdit ? `<textarea class="comment-edited-text"> ${users[index].comment} </textarea>` : `<div class="comment-text"> ${users[index].comment} </div>` }
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button data-like="${user.likes}" data-index="${index}" class="like-button ${users[index].isLiked ? '-active-like' : 'like-button'}"></button>
            <button data-index=${index} class ="edit-button"> ${users[index].isEdit? "Сохранить":"Редактировать"} </button>
          </div>
        </div>
      </li>`;
  }).join('');
  
  listElement.innerHTML = usersHtml;
  answerComment();
  initLikeButtonListeners();
 
  
};




function initLikeButtonListeners() {
  const buttonElements = document.querySelectorAll('.like-button');

  for (const buttonElement of buttonElements) {

    const index = buttonElement.dataset.index;
    const counter = buttonElement.dataset.like;

    buttonElement.addEventListener('click', (e) => {
      e.stopPropagation();

      if (users[index].isLiked === false) {

        const result = Number(counter) + 1;
        users[index].likes = result;

        users[index].isLiked = true;
      } else if (users[index].isLiked === true) {

        const result = Number(counter) - 1;
        users[index].likes = result;

        users[index].isLiked = false;

      }

      renderUsers();

    });
  }
}

function answerComment () {
  const commentBlocks = document.querySelectorAll('.comment-body');
  for (const commentBlock of commentBlocks) {
    commentBlock.addEventListener('click', (event) => {
      const userNames = document.querySelectorAll('.user-name');
      console.log(event);
      textInputElement.value = `< ${event.target.outerText} \n ${event.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText},`;
    });
  
  }
}




function currentTime(time) {
  let currentDate = time.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "2-digit",}) + " " + time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return currentDate;
}