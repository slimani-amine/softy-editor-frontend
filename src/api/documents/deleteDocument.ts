import { BASE_URL } from 'constants/api';

export const deleteDocument = async function ({
  documentId,
}: {
  documentId: string | undefined;
}) {
  try {
    const jwtToken = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const { data } = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};
