import { api } from '@/lib/api';
import { BASE_URL } from 'shared/config';

export const getDocumentsofWorkspace = async function ({
  workspaceId,
  isTemporarilyDeleted,
}: {
  workspaceId: string | undefined;
  isTemporarilyDeleted: boolean;
}) {
  try {
    const query = `${BASE_URL}/documents?workspaceId=${workspaceId}&isTemporarilyDeleted=${isTemporarilyDeleted}`;
    const { data } = await api.get(query);
    // Sorting the data by createdAt
    return data.sort((a: any, b: any) =>
      a.createdAt.localeCompare(b.createdAt),
    );
  } catch (err) {
    throw err;
  }
};
