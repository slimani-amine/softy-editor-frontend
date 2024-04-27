import { api } from '@/lib/api';
import { CreateWorkspaceBody } from '@/types/workspace';

import { BASE_URL } from 'shared/config';

export const createWorkspace = async (body: CreateWorkspaceBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/workspaces`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};
