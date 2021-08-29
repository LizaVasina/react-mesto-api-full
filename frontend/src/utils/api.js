class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  handleOriginalResponse (res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      credentials: 'include',
      secure: true,
      headers: this._headers
    })
    .then(res => this.handleOriginalResponse(res));
  }

  addCard(cardName, cardLink) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      credentials: 'include',
      secure: true,
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(res => this.handleOriginalResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      secure: true,
      headers: this._headers,
    })
    .then(res => this.handleOriginalResponse(res));
  }

  getProfileData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      credentials: 'include',
      secure: true,
      headers: this._headers
    })
    .then(res => this.handleOriginalResponse(res));
  }

  updateProfileData(newName, newAbout) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      secure: true,
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    .then(res => this.handleOriginalResponse(res));
  }

  updateProfileAvatar(newAvatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      secure: true,
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
    .then(res => this.handleOriginalResponse(res));
  }

  setLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      credentials: 'include',
      secure: true,
      headers: this._headers
    })
    .then(res => this.handleOriginalResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      secure: true,
      headers: this._headers
    })
    .then(res => this.handleOriginalResponse(res));
  }

  changeLikeCardStatus(cardId, cardLiked) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: cardLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
      secure: true,
      headers: this._headers
    })
    .then(res => this.handleOriginalResponse(res));
  }

}

const api = new Api({
  url: 'https://api.domainname.mesto.nomoredomains.monster',
  // headers: {
  //   authorization: '7ff747f4-57ba-4d6b-8671-46b7cc0f01d2',
  //   'Content-type': 'application/json'
  // }
});

export default api;
