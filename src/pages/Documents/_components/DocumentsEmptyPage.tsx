// import Image from "next/image";
// import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from 'lucide-react';
// import { useMutation } from "convex/react";
import { toast } from 'sonner';
// import { useRouter } from "next/navigation";

// import { api } from "@/convex/_generated/api";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const DocumentsEmptyPage = () => {
  const navigate = useNavigate();
  // const { user } = useUser();
  const user = {
    firstName: 'Anonymous',
  };
  // const create = useMutation(api.documents.create);

  // const onCreate = () => {
  //   const promise = create({ title: "Untitled" })
  //     .then((documentId) => router.push(`/documents/${documentId}`))

  //   toast.promise(promise, {
  //     loading: "Creating a new note...",
  //     success: "New note created!",
  //     error: "Failed to create a new note."
  //   });
  // };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <img
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <img
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName || 'Anonymous'}&apos;s Jotion
      </h2>
      <Button
        // onClick={onCreate}
        onClick={() => navigate("/documents/id")}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsEmptyPage;
