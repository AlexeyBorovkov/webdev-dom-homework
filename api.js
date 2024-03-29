export const getTodos = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/alexey-borovkov/comments', {
      method: 'GET',
      forceError: true,
    })
    .then((response) => {
      if (response === 500) {
        throw new Error('Сервер упал');
      };
      return response.json();
    })
    .catch((error) => {
      if (error.message === 'Failed to fetch') {
        alert('Кажется что-то пошло не так, попробуйте позже');
      };
      if (error.message === 'Сервер упал') {
        alert('Сервер сломался, попробуйте позже')
      };
  
      console.warn(error);
    })
}

export const postComments = ({name, text}) => {
  return fetch('https://wedev-api.sky.pro/api/v1/alexey-borovkov/comments', {
    method: 'POST',
    body: JSON.stringify({
      text: text.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      forceError: true,
    })
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Сервер упал');
      };
      if (response.status === 400) {
        throw new Error("Короткие вводимые данные");
      };
      return response.json();
    })
    .catch((error) => {
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
      
    })
    .finally(() => {
      document.getElementById('add-comment-status').textContent = "";
      document.querySelector('.add-form').classList.remove('hidden');
    });
}