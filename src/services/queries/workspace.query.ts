import { CreateWorkspaceBody } from '@/types/workspace';
import { useMutation } from '@tanstack/react-query';
import { createWorkspace } from '../api/workspace.service';

export const useCreateWorkSpaceQuery = () =>
  useMutation(['createWorkspace'], async (body: CreateWorkspaceBody) => {
    const res = await createWorkspace(body);
    return res;
  });
