import {
  AddMembersBody,
  CreateWorkspaceBody,
  InviteMembersApiBody,
} from 'shared/types/workspace';
import { useMutation } from '@tanstack/react-query';
import {
  addMembers,
  createWorkspace,
  deleteWorkspace,
  getMyWorkspaces2,
  getMyWorkspacesWithToken,
  getWorkspaces,
  getWorkspacesWithToken,
  inviteMembers,
} from '../api/workspace.service';

export const useCreateWorkSpaceQuery = () =>
  useMutation(['createWorkspace'], async (body: CreateWorkspaceBody) => {
    const res = await createWorkspace(body);
    return res;
  });

export const useGetMyWorkSpacesWithTokenQuery = () =>
  useMutation(['getMyWorkspacesWithToken'], async (token: string) => {
    const res = await getMyWorkspacesWithToken({ token });
    return res;
  });

export const useGetMyWorkSpacesQuery = () =>
  useMutation(['getMyWorkspaces'], async () => {
    const res = await getMyWorkspaces2();
    return res;
  });

export const useGetWorkSpacesQuery = () =>
  useMutation(['getWorkspaces'], async (id: number) => {
    const res = await getWorkspaces(id);
    return res;
  });

export const useGetWorkSpacesWithTokenQuery = () =>
  useMutation(
    ['getWorkspacesWithToken'],
    async ({ payload }: { payload: { id: number; token: string } }) => {
      const res = await getWorkspacesWithToken({ payload });
      return res;
    },
  );

export const useInviteMembers = () =>
  useMutation(['inviteMembers'], async (body: InviteMembersApiBody) => {
    const res = await inviteMembers(body);
    return res;
  });

export const useAddMembers = () =>
  useMutation(['addMembers'], async (body: AddMembersBody) => {
    const res = await addMembers(body);
    return res;
  });

  export const useDeleteWorkspace = () =>
    useMutation(['addMembers'], async (id:number) => {
      const res = await deleteWorkspace(id);
      return res;
    });
  