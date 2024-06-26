import { api } from '@/lib/api';
import { AddMembersBody, CreateWorkspaceBody } from 'shared/types/workspace';

import { BASE_URL } from 'shared/config';

export const createWorkspace = async (body: CreateWorkspaceBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/workspaces`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const getMyWorkspaces = async function ({ token }: { token: string }) {
  try {
    const res = await fetch(`${BASE_URL}/workspaces`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const addMembers = async (body: AddMembersBody) => {
  try {
    const { data } = await api.patch(`${BASE_URL}/workspaces/${body.id}`, {
      members: body.members,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
