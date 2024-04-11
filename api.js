const host = 'https://wedev-api.sky.pro/api/v2/alexey-borovkov/comments';
const userHost = 'https://wedev-api.sky.pro/api/user/login';
const authHost = 'https://wedev-api.sky.pro/api/user';
export let token;
export const setToken = (newToken) => {
  token = newToken;
};

export function getTodos() {
    return fetch(host,
        {
          method: "GET",
          forceError: true,
        }).then((response) => {
          if (response.status === 500) {
          throw new Error("Сервер упал");
          };
          if (response.status === 401) {
            throw new Error("Нет авторизации");
            };
          return response.json();
        }).catch((error) => {
          if (error.message === 'Failed to fetch') {
            alert("Кажется что-то пошло не так, попробуйте позже");
          };
          if (error.message === "Сервер упал") {
            alert('Сервер сломался, попробуйте позже');
          };
          if (error.message === "Нет авторизации") {
            alert("Авторизируйся");
            };
        console.warn(error);
      });
};

export function postTodo({text, name}) {
    return fetch(host,
        {
          method: "POST",
          body: JSON.stringify({
            text: text.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
          }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
          forceError: true,
        }).then((response) => {
          if (response.status === 500) {
            throw new Error("Сервер упал");
          };
          if (response.status === 400) {
            throw new Error("Короткие вводимые данные");
          };
          return response.json();
        });
};

export function authUser({login, password}) {
  return fetch(userHost,
      {
        method: "POST",
        body: JSON.stringify({
          login: login.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
          password: password.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        }),
        forceError: true,
      }).then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
        };
        if (response.status === 400) {
          throw new Error("Короткие вводимые данные");
        };
        return response.json();
      });
};

export function regUser({name, login, password}) {
  return fetch(authHost,
      {
        method: "POST",
        body: JSON.stringify({
          name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
          login: login.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
          password: password.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        }),
        forceError: true,
      }).then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
        };
        if (response.status === 400) {
          throw new Error("Короткие вводимые данные");
        };
        return response.json();
      });
};