import { BASE_URL } from 'shared/config';

export const updateDocumentContent = async function ({
  documentId,
  content,
}: {
  documentId: string | undefined;
  content: any;
}) {
  console.log(content);

  try {
    const jwtToken = localStorage.getItem('access_token');
    const res = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        content: content,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
