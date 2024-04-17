// import { useConvexAuth } from "convex/react";
// import { redirect } from "next/navigation";

// import { SearchCommand } from "@/components/search-command";

// import { Navigation } from "./_components/navigation";
// import { Spinner } from "@/components/spinner";
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import { Outlet } from 'react-router-dom';
import { Navigation } from './_components/navigation';
import { SearchCommand } from '@/components/search-command';
import DocumentsPage from './_components/DocumentsEmptyPage';

export default function Documents() {
  // const { isAuthenticated, isLoading } = useConvexAuth();
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        <Outlet />
      </main>
    </div>
  );
}
