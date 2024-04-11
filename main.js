import { getTodos } from "./api.js";
import { renderComments } from "./renderComments.js";
import { renderCommentForm } from "./renderForms.js";

export let user = null;
export let comments = [];
export function setUser(value) {
  user = value;
}
export function renderApp() {
  const container = document.querySelector('.container');
  container.innerHTML = `
  <ul class="comments" id = 'list'>
  </ul>
  <div class="form"></div>
  <div class="loader"></div>`
  getComments();
  renderCommentForm();
}

export function getComments() {
  const loader = document.querySelector(".loader");
  const preloader = document.getElementById('preloader');
    return getTodos().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date),
            comment: comment.text,
            likes: comment.likes,
            isLiked: false,
            id: comment.id,
          }
        });
        comments = appComments;
        renderComments({comments});
        loader.textContent = '';

        if (user) {
        const addForm = document.querySelector(".add-form");
          addForm.classList.remove("hidden");
        }
        preloader.classList.add('preloader-hidden');
  });
};

renderApp();