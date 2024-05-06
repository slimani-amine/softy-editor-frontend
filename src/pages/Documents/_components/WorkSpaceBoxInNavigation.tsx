import { Avatar, AvatarImage } from 'shared/components/ui/avatar';

import { WorkspaceBoxInNavigationPropsType } from 'shared/types/Propstypes';

export default function WorkSpaceBoxInNavigation({
  workspace,
}: WorkspaceBoxInNavigationPropsType) {
  return (
    <div className="gap-x-2 flex items-center max-w-[150px]">
      <Avatar className="h-5 w-5">
        <AvatarImage
          src={
            workspace?.emoji ||
            'https://i.pinimg.com/236x/54/72/d1/5472d1b09d3d724228109d381d617326.jpg'
          }
        />
      </Avatar>
      <span className="text-start font-medium line-clamp-1">
<<<<<<< HEAD
        {workspace?.title || 'Anonymous'}&apos;s E-ditor
=======
        {workspace?.title || 'Untitled'}
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2
      </span>
    </div>
  );
}
