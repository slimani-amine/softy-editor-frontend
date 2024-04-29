import { BASE_URL } from 'constants/api';

export const createDocument = async function (body: any) {
  try {
    const jwtToken = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
