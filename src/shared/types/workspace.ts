export interface CreateWorkspaceBody {
  emoji?: string;
  title: string;
  token?: string;
}

export interface InviteMembersBody {
  email_01?: string;
  email_02?: string;
  email_03?: string;
}

export interface InviteMembersApiBody {
  id: number;
  emails: string[];
}
export interface AddMembersBody {
  id: number;
  members: string[];
}
export interface Workspace {
  createdAt: string;
  creator_id: null | number;
  id: number;
  emoji: string;
  members: { id: number }[];
  title: string;
  updatedAt: string;
}
