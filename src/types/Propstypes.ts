export type WorkspaceBoxInDropDownPropsType = {
  workspace: {
    createdAt: string;
    creator_id: null | number;
    id: number;
    emoji: string;
    members: { id: number }[];
    title: string;
    updatedAt: string;
  };
  inWorkspaceId: string | undefined;
};

export type WorkspaceBoxInNavigationPropsType = {
  workspace: {
    createdAt: string;
    creator_id: null | number;
    id: number;
    emoji: string;
    members: { id: number }[];
    title: string;
    updatedAt: string;
  };
};

export type DocumentItemPropsType = {
  document: {
    id: string;
    content: any;
    coverImageUrl: string;
    createdAt: string;
    emoji: string;
    isPublished: boolean;
    isTemporarilyDeleted: boolean;
    title: string;
    updatedAt: string;
    workspace: WorkspaceBoxInNavigationPropsType[];
  };
};

export type DocumentPropsType = {
  id: string;
  content: any;
  coverImageUrl: string;
  createdAt: string;
  emoji: string;
  isPublished: boolean;
  isTemporarilyDeleted: boolean;
  title: string;
  updatedAt: string;
  workspace: WorkspaceBoxInNavigationPropsType[];
};
