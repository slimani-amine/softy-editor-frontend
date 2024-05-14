import { api } from '@/lib/api';
import { BASE_URL } from 'shared/config';

export const updateDocumentContent = async function ({
  documentId,
  content,
}: {
  documentId: string | undefined;
  content: any;
}) {
  const replacer = (key: string, value: string) =>
    key === 'text' && value.includes('"') ? value.replaceAll('"', '“') : value;

  try {
    const jwtToken = localStorage.getItem('access_token');

    const { data } = await api.patch(`${BASE_URL}/documents/${documentId}`, {
      body: JSON.stringify({ content: content }, replacer),
    });
    // return res;

    // const res = await fetch(`${BASE_URL}/documents/`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${jwtToken}`,
    //   },
    //   body: JSON.stringify(
    //     {
    //       content: content,
    //     },
    //     replacer,
    //   ),
    // });

    // const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
