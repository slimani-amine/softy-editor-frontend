import { api } from '@/lib/api';
import { BASE_URL } from 'shared/config';

export const getMyWorkspaces = async function () {
  try {
    const { data } = await api.get(`${BASE_URL}/workspaces`);

    return data.sort((a: any, b: any) =>
      a.createdAt.localeCompare(b.createdAt),
    );
  } catch (err) {
    throw err;
  }
};
