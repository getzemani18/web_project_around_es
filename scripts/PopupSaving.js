export default class Api {
  constructor(options) {}

  getIniticialCards() {
    return fetch("https://around-api.es.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
    api
      .getIniticialCards()
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  }
}
