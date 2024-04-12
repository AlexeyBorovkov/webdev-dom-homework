import { authUser, regUser, setToken, token } from "./api.js";
import { renderApp, setUser } from "./main.js";

export const renderLoginForm = () => {
    const addLoginForm = document.querySelector(".container");
    const loginFormHtml = `
    <div class="add-form" id="authForm">
        <h2>Форма входа</h2>
        <input
            type="text" 
            class="input-form auth-input-form"
            placeholder="Введите логин"
            id="authInputName" 
            required
        />
        <input
            type="password"
            class="input-form auth-input-form auth-password"
            placeholder="Введите пароль"
            rows="4"
            id="authInputPassword"
        />
        <div class="add-form-row">
            <button class="add-form-button" id="authButton">Войти</button>
        </div>
        <button class="reg-button">Зарегестрироваться</button>
    </div>`;

    addLoginForm.innerHTML = loginFormHtml;

    const authButtonElement = document.getElementById("authButton");
    const loginInputElement = document.getElementById("authInputName");
    const passwordInputElement = document.getElementById("authInputPassword");
    authButtonElement.addEventListener('click', () => {
        authUser({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            setToken(responseData.user.token);
            setUser(responseData.user);
            renderApp();
            console.log(token);
        }).catch((error) => {
            if (error.message === 'Failed to fetch') {
              alert("Кажется что-то пошло не так, попробуйте позже");
            };
            if (error.message === "Сервер упал") {
              alert('Сервер сломался, попробуйте позже');
            };
            if (error.message === "Короткие вводимые данные") {
              alert('Неверный логин или пароль.');
            };
          console.warn(error);
        });
    });
    const regButton = document.querySelector(".reg-button");
    regButton.addEventListener('click', () => {
        renderRegForm();
    });
};

export const renderRegForm = () => {
    const addRegForm = document.querySelector(".container");
    const regFormHtml = `
    <div class="add-form" id="regForm">
        <h2>Форма регистрации</h2>
        <input
            type="text" 
            class="input-form auth-input-form"
            placeholder="Введите имя"
            id="regInputName" 
            required
        />
        <input
            type="text" 
            class="input-form auth-input-form"
            placeholder="Введите логин"
            id="regInputLogin" 
            required
        />
            <input
            type="password" 
            class="input-form auth-input-form"
            placeholder="Введите пароль"
            id="regInputPassword" 
            required
        />
        <div class="add-form-row">
            <button class="add-form-button" id="regButton">Зарегестрироваться</button>
        </div>
        <button class="auth-button">Войти</button>
    </div>`;
    addRegForm.innerHTML = regFormHtml;
    const regButtonElement = document.getElementById("regButton");
    const nameInputElement = document.getElementById("regInputName");
    const loginInputElement = document.getElementById("regInputLogin");
    const passwordInputElement = document.getElementById("regInputPassword");
    regButtonElement.addEventListener('click', () => {
        regUser({
            name: nameInputElement.value,
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            setUser(responseData.user);
            renderApp();
            console.log(token);
        }).catch((error) => {
            if (error.message === 'Failed to fetch') {
              alert("Кажется что-то пошло не так, попробуйте позже");
            };
            if (error.message === "Сервер упал") {
              alert('Сервер сломался, попробуйте позже');
            };
            if (error.message === "Короткие вводимые данные") {
              alert('Неверный логин или пароль.');
            };
          console.warn(error);
        });
    });
    const authButton = document.querySelector(".auth-button");
    authButton.addEventListener('click', () => {
        renderLoginForm();
    });
};