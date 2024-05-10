import Input from 'shared/components/Shared/Input';
import { Plus } from 'lucide-react';

export default function InviteMembersInputs({
  register,
  handleSetMore,
  errors
}: {
  register: any;
  handleSetMore: any;
  errors:any
}) {
  return (
    <>
      <Input
        placeholder="Email"
        type="text"
        label="Invite people"
        aria-label="email"
        className="w-full outline-none border border-gray-200 h-8 rounded-[5px] px-2  placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
        name="email_01"
        register={register}
        errors={errors}
      />
      <Input
        placeholder="Email"
        type="text"
        aria-label="email"
        className="w-full outline-none border border-gray-200 h-8 rounded-[5px] px-2  placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
        name="email_02"
        register={register}
        errors={errors}
      />
      <Input
        placeholder="Email"
        type="text"
        aria-label="email"
        className="w-full outline-none border border-gray-200 h-8 rounded-[5px] px-2 placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
        name="email_03"
        register={register}
        errors={errors}
      />
      <div
        className="flex gap-1 items-center text-sm font-normal text-[#949493] pl-2 mt-2 cursor-pointer hover:bg-gray-200 px-2 py-1 hover:rounded-[4px]"
        onClick={handleSetMore}
      >
        <Plus className="fill-[#37352F80] w-5 h-5" /> Add more or bulk invite
      </div>
      <hr className="h-2 w-full " />
    </>
  );
}
