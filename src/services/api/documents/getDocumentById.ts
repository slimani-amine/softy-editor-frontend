import { BASE_URL } from 'shared/config';

export const getDocumentById = async function ({
  documentId,
}: {
  documentId: string | undefined;
}) {
  try {
    const jwtToken = localStorage.getItem('access_token');
    const res = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};
