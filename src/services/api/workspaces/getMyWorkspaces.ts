import { BASE_URL } from 'shared/config';

export const getMyWorkspaces = async function () {
  try {
    const jwtToken = localStorage.getItem('access_token');
    const res = await fetch(`${BASE_URL}/workspaces`, {
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
