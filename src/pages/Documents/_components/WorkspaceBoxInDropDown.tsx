import { WorkspaceBoxInDropDownPropsType } from '@/types/Propstypes';
import { Avatar, AvatarImage } from 'shared/components/ui/avatar';
import { Link } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

export default function WorkspaceBoxInDropDown({
  workspace,
  inWorkspaceId,
}: WorkspaceBoxInDropDownPropsType) {
  const { user } = useAuthStore((state) => state);

  return (
    <Link
      to={`/workspaces/${workspace?.id}/documents`}
      className={`flex items-center gap-x-2 dark:hover:bg-gray-700 hover:bg-[#F1F5F9] cursor-pointer transition-all p-2 rounded-md ${workspace?.id === Number(inWorkspaceId) && 'dark:bg-gray-700 bg-[#F1F5F9] '}`}
    >
      <div className="rounded-md  p-1">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={
              workspace?.emoji ||
              'https://i.pinimg.com/236x/54/72/d1/5472d1b09d3d724228109d381d617326.jpg'
            }
          />
        </Avatar>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm line-clamp-1">
          {workspace?.title || 'Anonymous'}&apos;s E-ditor
        </p>
        <div className="flex gap-2">
          <p className="text-xs font-light text-gray-300">
            {user && user?.offer && user?.offer?.id === 1
              ? 'Free Plan'
              : user?.offer?.id === 2
                ? 'Plus Plan'
                : 'Buisness Plan'}
          </p>
          <p className="text-xs font-light text-gray-300">
            {workspace?.members.length} Member
          </p>
        </div>
      </div>
    </Link>
  );
}
