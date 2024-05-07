import {
  AddMembersBody,
  CreateWorkspaceBody,
  InviteMembersApiBody,
} from 'shared/types/workspace';
import { useMutation } from '@tanstack/react-query';
import {
  addMembers,
  createWorkspace,
  getMyWorkspaces,
  getMyWorkspaces2,
  getWorkspaces,
  inviteMembers,
} from '../api/workspace.service';

export const useCreateWorkSpaceQuery = () =>
  useMutation(['createWorkspace'], async (body: CreateWorkspaceBody) => {
    const res = await createWorkspace(body);
    return res;
  });

export const useGetMyWorkSpacesQuery = () =>
  useMutation(['getMyWorkspaces'], async (token: string) => {
    const res = await getMyWorkspaces({ token });
    console.log('🚀 ~ useMutation ~ res:', res);
    return res;
  });

export const useGetMyWorkSpacesQuery2 = () =>
  useMutation(['getMyWorkspaces'], async () => {
    const res = await getMyWorkspaces2();
    console.log('🚀 ~ useMutation ~ res:', res);
    return res;
  });

export const useGetWorkSpacesQuery = () =>
  useMutation(['getMyWorkspaces'], async (id: number) => {
    const res = await getWorkspaces(id);
    return res;
  });

export const useInviteMembers = () =>
  useMutation(['addMembers'], async (body: InviteMembersApiBody) => {
    const res = await inviteMembers(body);
    return res;
  });

export const useAddMembers = () =>
  useMutation(['addMembers'], async (body: AddMembersBody) => {
    const res = await addMembers(body);
    return res;
  });
