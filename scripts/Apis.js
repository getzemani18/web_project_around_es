export default class apis {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: token,
    });
  }
}
