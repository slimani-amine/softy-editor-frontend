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
