import { api } from '@/lib/api';
import { BASE_URL } from 'shared/config';

export const getWorkspaceById = async function ({
  workspaceId,
}: {
  workspaceId: string;
}) {
  try {
    const { data } = await api.get(`${BASE_URL}/workspaces/${workspaceId}`);
    return data;
  } catch (error: any) {
    throw error;
  }
};
