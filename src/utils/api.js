import { BASE_URL } from "./constants";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (itemId, token) => {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const updateProfile = ({ name, avatar }, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};
