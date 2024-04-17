// import { useMutation, useQuery } from 'convex/react';
// import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// import { api } from '@/convex/_generated/api';
// import { Id } from '@/convex/_generated/dataModel';
import { Toolbar } from '@/components/toolbar';
import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'react-router-dom';
import { title } from 'process';
import Editor from '@/components/editor';
import PlateEditor from '@/components/plate-editor';

const DocumentIdPage = () => {
  const { documentId } = useParams();

  // const document = useQuery(api.documents.getById, {
  //   documentId: params.documentId,
  // });

  // const update = useMutation(api.documents.update);

  // const onChange = (content: string) => {
  //   update({
  //     id: params.documentId,
  //     content,
  //   });
  // };
  let document = {
    _id: 'fhqjdkshfnkldjnfk',
    title: 'my document',
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

  // let document = undefined
  // let document = null

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="text-2xl text-gray-600 ">Not found...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40">
      <Cover url={document?.coverImage} />
      <div className=" mx-10">
        <Toolbar initialData={document} />
                <PlateEditor />

      </div>
    </div>
  );
};

export default DocumentIdPage;
