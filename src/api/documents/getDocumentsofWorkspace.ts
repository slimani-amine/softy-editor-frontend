import { BASE_URL } from 'shared/config';

export const getDocumentsofWorkspace = async function ({
  workspaceId,
  isTemporarilyDeleted,
}: {
  workspaceId: string | undefined;
  isTemporarilyDeleted: boolean;
}) {
  try {
    const jwtToken = localStorage.getItem('access_token');
    let query = `${BASE_URL}/documents?workspaceId=${workspaceId}&isTemporarilyDeleted=${isTemporarilyDeleted}`;
    const res = await fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await res.json();
    return data.sort((a: any, b: any) =>
      a.createdAt.localeCompare(b.createdAt),
    );
  } catch (err) {
    throw err;
  }
};
