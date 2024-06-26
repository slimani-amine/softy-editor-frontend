import { BASE_URL } from 'shared/config';

export const updateDocument = async function ({
  documentId,
  body,
}: {
  documentId: string | undefined;
  body: any;
}) {
  try {
    const jwtToken = localStorage.getItem('access_token');
    const res = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: 'PATCH',
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
