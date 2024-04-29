// import { useConvexAuth } from "convex/react";
// import { redirect } from "next/navigation";

// import { SearchCommand } from "@/components/search-command";

// import { Navigation } from "./_components/navigation";
// import { Spinner } from "@/components/spinner";
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Navigation } from './_components/navigation';
import { SearchCommand } from '@/components/search-command';
import DocumentsPage from './_components/DocumentsEmptyPage';
import { useQuery } from '@tanstack/react-query';
import { getWorkspaceById } from 'api/workspaces/getWorkspaceById';

export default function Documents() {
  // const { isAuthenticated, isLoading } = useConvexAuth();
  const isLoading = false;
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  if (!workspaceId) return;
  const { isLoading: isLoadingWorkspace, data: workspace } = useQuery({
    queryKey: ['workspaces', workspaceId],
    queryFn: async () => await getWorkspaceById({ workspaceId }),
  });
  // console.log(workspace);
  if (isLoadingWorkspace) return null;
  if (workspace === null || workspace?.statusCode === 404) {
    navigate('/');
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full flex dark:bg-[#191919]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto blockScrollMain">
        <SearchCommand />
        <Outlet />
      </main>
    </div>
  );
}
