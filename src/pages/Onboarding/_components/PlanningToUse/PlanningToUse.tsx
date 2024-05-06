import Button from 'shared/components/Shared/Button';
import PlanningCards from '../PlanningCards';
import { useUpdateUserQuery } from '@/services/queries/auth.query';
import { useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { User } from 'shared/types/user';

export default function PlanningToUse({
  user,
  setIsHaveAPlan,
}: {
  user: User | null;
  setIsHaveAPlan: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setUser } = useAuthStore((state) => state);

  const [selectedId, setSelectedId] = useState<number>(0);

  const handleClick = (id: number) => () => {
    setSelectedId(id);
  };
  const {
    isLoading,
    mutateAsync: update,
    isError,
    error,
  }: any = useUpdateUserQuery();

  const onSubmit = async () => {
    const data = { id: user?.id, plan: { id: selectedId } };
    try {
      const res = await update(data);
      if (res) {
        setUser(res)
        setIsHaveAPlan(true);

      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col items-center cursor-pointer mb-4  ">
      <div className="flex flex-col justify-center items-center gap-1 w-full ">
        <PlanningCards selectedId={selectedId} handleClick={handleClick} />
        <Button
          onClick={onSubmit}
          isLoading={isLoading}
          text="Continue"
          disabled={selectedId === 0}
          type="submit"
          className="w-[18rem] flex items-center justify-center h-8 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md disabled:opacity-40 mt-4"
        />
      </div>
    </div>
  );
}
