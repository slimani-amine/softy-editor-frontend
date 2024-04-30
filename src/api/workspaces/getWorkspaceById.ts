import { BASE_URL } from 'shared/config';

export const getWorkspaceById = async function ({
  workspaceId,
}: {
  workspaceId: string;
}) {
  try {
    const jwtToken = localStorage.getItem('access_token');
    const res = await fetch(`${BASE_URL}/workspaces/${workspaceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
