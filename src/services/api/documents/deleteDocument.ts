import { api } from '@/lib/api';
import { BASE_URL } from 'shared/config';

export const deleteDocument = async function ({
  documentId,
}: {
  documentId: string | undefined;
}) {
  try {
    const { data } = await api.delete(`${BASE_URL}/documents/${documentId}`);
    return data;
  } catch (err) {
    throw err;
  }
};
