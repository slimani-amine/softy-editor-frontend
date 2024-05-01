import Button from '@/components/Shared/Button';
import Input from '@/components/Shared/Input';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { InviteMembersBody } from '@/types/workspace';
import { inviteMembersSchema } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUserQuery } from '@/services/queries/auth.query';
import EmojiPicker from 'emoji-picker-react';
import { useState, useEffect } from 'react';
import { useCreateWorkSpaceQuery } from '@/services/queries/workspace.query';
import EmptyWorkspaceIcon from '@/components/Shared/Icons/EmptyWorkspaceIcon';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router';
import { User } from '@/types/user';
import { Plus } from 'lucide-react';

export default function Checkout({
  user,
  setIsInviteTeam,
}: {
  user: User;
  setIsInviteTeam: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { myWorkspaces, setUser } = useAuthStore((state) => state);
  console.log('🚀 ~ myWorkspaces:', myWorkspaces);
  const navigate = useNavigate();

  const [invite, setInvite] = useState<boolean>(false);
  console.log('🚀 ~ invite:', invite);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm<InviteMembersBody>({
    resolver: yupResolver(inviteMembersSchema),
  });

  const {
    isLoading: isUpdateLoading,
    mutateAsync: update,
    isError: isUpdateError,
    error: updateError,
  }: any = useUpdateUserQuery();

  const handleInputChange = (e: any) => {
    const values = getValues();
    const isAnyEmailFilled =
      values?.email_01 ||
      values?.email_02 ||
      values?.email_03 ||
      e?.target ||
      e?.target?.value;
    setInvite(isAnyEmailFilled);
  };

  const onSubmit = async () => {
    const workspaceId = myWorkspaces[0].id;
    try {
      const updateUser = await update({ status: { id: 1 }, id: user.id });
      if (updateUser) {
        setUser(updateUser);
      }
      navigate(`/workspaces/${workspaceId}/documents`);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-center items-center gap-1 w-full">
      <Button
        onClick={() => onSubmit()}
        text={!invite ? `Take me to E-ditor` : `Invite and Take me to E-ditor`}
        // isLoading={isLoading}
        disabled={!isValid}
        type="submit"
        className="w-full flex items-center justify-center h-8 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2 disabled:opacity-40  "
      />
    </div>
  );
}
