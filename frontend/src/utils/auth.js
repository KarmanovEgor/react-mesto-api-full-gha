export const BaseURL = "https://api.cohort68.karmanov.nomoredomainsrocks.ru";

const handleResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export function register (password, email) {
  return fetch(`${BaseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(response => handleResponse(response));
};

export function authorize (password, email) {
  return fetch(`${BaseURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
  .then(response => handleResponse(response));
};
export function getContent (token) {
  return fetch(`${BaseURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  }).then(response => handleResponse(response));
};