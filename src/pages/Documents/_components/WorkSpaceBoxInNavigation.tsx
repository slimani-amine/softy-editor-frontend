import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { WorkspaceBoxInNavigationPropsType } from '@/types/Propstypes';

export default function WorkSpaceBoxInNavigation({
  workspace,
}: WorkspaceBoxInNavigationPropsType) {
  return (
    <div className="gap-x-2 flex items-center max-w-[150px]">
      <Avatar className="h-5 w-5">
        <AvatarImage
          src={
            workspace?.imgUrl ||
            'https://i.pinimg.com/236x/54/72/d1/5472d1b09d3d724228109d381d617326.jpg'
          }
        />
      </Avatar>
      <span className="text-start font-medium line-clamp-1">
        {workspace?.title || 'Anonymous'}&apos;s Jotion
      </span>
    </div>
  );
}
