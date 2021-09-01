export const BASE_URL = "https://api.domainname.mesto.nomoredomains.monster";

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        secure: true,
        headers: {
            // authorization: '7ff747f4-57ba-4d6b-8671-46b7cc0f01d2',
            // "Accept": "application.json",
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
            // authorization: '7ff747f4-57ba-4d6b-8671-46b7cc0f01d2',
            // "Accept": "application.json",
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
            // "Accept": "application.json",
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`
        }
    })
    .then(res => responseCheck(res))
}

export const checkCredentials = () => { // Проверка токена
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => this._checkResponseData(res));
  }