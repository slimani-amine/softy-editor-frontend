import { CreateWorkspaceBody } from '@/types/workspace';
import { useMutation } from '@tanstack/react-query';
import { createWorkspace, getMyWorkspaces } from '../api/workspace.service';

export const useCreateWorkSpaceQuery = () =>
  useMutation(['createWorkspace'], async (body: CreateWorkspaceBody) => {
    const res = await createWorkspace(body);
    return res;
  });

export const useGetMyWorkSpacesQuery = () =>
  useMutation(['getMyWorkspaces'], async (token: string) => {
    const res = await getMyWorkspaces({ token });
    return res;
  });
