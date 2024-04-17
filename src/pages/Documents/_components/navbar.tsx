// import { useQuery } from "convex/react";
// import { useParams } from "next/navigation";
import { MenuIcon } from 'lucide-react';

// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";

import { Title } from './title';
import { Banner } from './banner';
import { Menu } from './menu';
import { Publish } from './publish';

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  // const params = useParams();

  // const document = useQuery(api.documents.getById, {
  //   documentId: params.documentId as Id<"documents">,
  // });
  let document = {
    _id: 'fhqjdkshfnkldjnfk',
    title: 'my document',
    isArchived: false,
    coverImage:
      'https://media.istockphoto.com/id/1208738316/photo/abstract-geometric-network-polygon-globe-graphic-background.webp?b=1&s=170667a&w=0&k=20&c=Ewa2JDeA8E9k9ch3IYWkSYdEkTEhyaMNfNLkClag-j4=',
    content: `[
      {
        "id": "dcc3cbac-85e6-4f90-8544-32411614baa2",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "Welcome to this demo!",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "89f4abd6-b44a-4e28-a7c9-237da6659532",
        "type": "heading",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left",
          "level": 1
        },
        "content": [
          {
            "type": "text",
            "text": "This is a heading block",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "ef7e36ef-4497-4695-9595-2d39c17ae2dd",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [],
        "children": []
      },
      {
        "id": "6303d7f9-e36a-4526-aad8-25312a63ceef",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "This is a paragraph block",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "45a93c6b-0b84-4924-9499-1ddd27859807",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [],
        "children": []
      }
    ]
    `,
  };
  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document?.isArchived && <Banner documentId={document?._id} />}
    </>
  );
};
