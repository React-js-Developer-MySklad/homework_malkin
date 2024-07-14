import { Contragent } from '../app/types';

const API_URL = 'http://localhost:5000/contragents';

export const fetchContragents = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const create = async (contragent: Contragent) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contragent),
  });
  return response.json();
};

export const update = async (contragent: Contragent) => {
  const response = await fetch(`${API_URL}/${contragent.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contragent),
  });
  return response.json();
};

export const remove = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
