import Button from '@/components/Shared/Button';
import toast from 'react-hot-toast';
import PlanningCards from '../PlanningCards';
import { useUpdateUserQuery } from '@/services/queries/auth.query';

export default function PlanningToUse({
  selectedId,
  setSelectedId,
  setIsHaveAPlan,
}: {
  selectedId: number;
  setSelectedId: any;
  setIsHaveAPlan: any;
}) {
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
    const data = { plan: selectedId };
    try {
      const res = await update(data);
      if (res) {
        setIsHaveAPlan(true);
        toast.success('user Upadated successfully');
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
