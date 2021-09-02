export const BASE_URL = "https://api.domainname.mesto.nomoredomains.monster";

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        secure: true,
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "password": data.password,
            "email": data.email
        })
    })
    .then(res => responseCheck(res))
}

export const login = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        secure: true,
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "password": data.password,
            "email": data.email
        })
    })
    .then(res => responseCheck(res))
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        secure: true,
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => responseCheck(res))
}

export const checkCredentials = () => { // Проверка токена
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => this.responseCheck(res));
  }