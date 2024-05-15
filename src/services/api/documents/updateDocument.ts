import { api } from '@/lib/api';
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
    const { data } = await api.patch(
      `${BASE_URL}/documents/${documentId}`,
      body,
    );
    return data;
  } catch (err) {
    throw err;
  }
};
