class Api {
  constructor(options) {
    this._url = options.url;
    // this._headers = options.headers;
  }

  handleOriginalResponse (res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      secure: true,
      // headers: this._headers
    })
    .then(res => this.handleOriginalResponse(res));
  }

  addCard(cardName, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      secure: true,
      // headers: this._headers,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(res => this.handleOriginalResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      secure: true,
      // headers: this._headers,
    })
    .then(res => this.handleOriginalResponse(res));
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      secure: true,
      // headers: this._headers
    })
    .then(res => this.handleOriginalResponse(res));
  }

  updateProfileData(newName, newAbout) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      secure: true,
      // headers: this._headers,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    .then(res => this.handleOriginalResponse(res));
  }

  updateProfileAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      secure: true,
      // headers: this._headers,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
    .then(res => this.handleOriginalResponse(res));
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      secure: true,
    })
    .then(res => this.handleOriginalResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      secure: true,
    })
    .then(res => this.handleOriginalResponse(res));
  }

  changeLikeCardStatus(cardId, cardLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: cardLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
    })
    .then(res => this.handleOriginalResponse(res));
  }

}

const api = new Api({
  url: 'https://api.domainname.mesto.nomoredomains.monster',
});

export default api;
