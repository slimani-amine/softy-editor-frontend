import { api } from '@/lib/api';
import {
  AddMembersBody,
  CreateWorkspaceBody,
  InviteMembersApiBody,
  InviteMembersBody,
} from 'shared/types/workspace';

import { BASE_URL } from 'shared/config';

export const createWorkspace = async (body: CreateWorkspaceBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/workspaces`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const getMyWorkspacesWithToken = async function ({
  token,
}: {
  token: string;
}) {
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

export const getMyWorkspaces2 = async function () {
  try {
    const { data } = await api.get(`${BASE_URL}/workspaces`);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getWorkspaces = async (id: number) => {
  try {
    const { data } = await api.get(`${BASE_URL}/workspaces/${id}`);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getWorkspacesWithToken = async function ({
  payload,
}: {
  payload: { id: number; token: string };
}) {
  try {
    const res = await fetch(`${BASE_URL}/workspaces/${payload.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const inviteMembers = async (body: InviteMembersApiBody) => {
  try {
    const { data } = await api.put(`${BASE_URL}/workspaces/${body.id}`, {
      emails: body.emails,
    });
    return data;
  } catch (error: any) {
    throw error;
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

export const deleteWorkspace = async (id: number) => {
  try {
    const { data } = await api.delete(`${BASE_URL}/workspaces/${id}`);
    return data;
  } catch (error: any) {
    throw error;
  }
};
