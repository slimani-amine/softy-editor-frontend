import { BASE_URL } from 'shared/config';

export const updateDocumentContent = async function ({
  documentId,
  content,
}: {
  documentId: string | undefined;
  content: any;
}) {
<<<<<<< HEAD:src/services/api/documents/updateDocumentContent.ts
=======
  const replacer = (key: string, value: string) =>
    key === 'text' && value.includes('"') ? value.replaceAll('"', '“') : value;
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2:src/api/documents/updateDocumentContent.ts

  try {
    const jwtToken = localStorage.getItem('access_token');
    const res = await fetch(`${BASE_URL}/documents/${documentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(
        {
          content: content,
        },
        replacer,
      ),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
