import { api } from '@/lib/api';
import { BASE_URL } from 'shared/config';

export const createDocument = async function (body: any) {
  try {
    const { data } = await api.post(`${BASE_URL}/documents`, body);
    return data;
  } catch (err) {
    throw err;
  }
};
