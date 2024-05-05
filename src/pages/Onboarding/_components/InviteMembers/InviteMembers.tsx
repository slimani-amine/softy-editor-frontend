import Button from '@/components/Shared/Button';
import Input from '@/components/Shared/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InviteMembersBody } from '@/types/workspace';
import { inviteMembersSchema } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetUsersByEmails,
  useUpdateUserQuery,
} from '@/services/queries/auth.query';
import { useState } from 'react';
import { useAddMembers } from '@/services/queries/workspace.query';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router';
import { User } from '@/types/user';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { TextareaForm } from '@/components/ui/TextareaForm';
import InviteMembersInputs from '../InviteMembersInputs';
import InviteMembersHeader from '../InviteMembersHeader';
import InviteMembersForm from '../InviteMembersForm';

export default function InviteMembers({
  user,
  setIsInviteTeam,
}: {
  user: User | null;
  setIsInviteTeam: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { myWorkspaces, setUser, setMyWorkspaces } = useAuthStore(
    (state) => state,
  );
  const navigate = useNavigate();

  const [invite, setInvite] = useState<boolean>(true);
  const [more, setMore] = useState<boolean>(false);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm<InviteMembersBody>({
    resolver: yupResolver(inviteMembersSchema),
  });

  const { isLoading, mutateAsync: update }: any = useUpdateUserQuery();

  const {
    isLoading: getUsersByEmailsLoading,
    mutateAsync: getUsersByEmails,
  }: any = useGetUsersByEmails();

  const { isLoading: addMembersLoading, mutateAsync: addMembers }: any =
    useAddMembers();

  const onSubmit: SubmitHandler<InviteMembersBody> = async (data) => {
    const { email_01, email_02, email_03 } = data;
    const newEmails: Set<string> = new Set(emails);
    if (more) {
      if (textAreaValue) {
        const emailsFromTextArea = textAreaValue.split(/[\s,]+/);
        emailsFromTextArea.forEach((email) => newEmails.add(email));
        if (emailsFromTextArea.length > 10) {
          toast.error('You can invite a maximum of 10 guests for your plan.');
        }
        return;
      }
    } else {
      if (email_01) newEmails.add(email_01);
      if (email_02) newEmails.add(email_02);
      if (email_03) newEmails.add(email_03);
    }

    try {
      if (newEmails.size === 0) {
        const body = { id: user?.id, status: { id: 1 } };
        const res = await update(body);
        setIsInviteTeam(true);
        setUser(res);
        navigate('/pricing');
      } else {
        setInvite(true);
        const usersResponse = await getUsersByEmails(Array.from(newEmails));
        const invalidEmails: string[] = [];

        const validUsers = usersResponse.filter(
          (user: User | null, index: number) => {
            if (user === null) {
              invalidEmails.push(Array.from(newEmails)[index]);
              return false;
            }
            return true;
          },
        );

        if (invalidEmails.length > 0) {
          toast.error(
            `The following email(s) do not exist: ${invalidEmails.join(', ')}`,
          );
        } else {
          const workspaceId = myWorkspaces && myWorkspaces[0].id;
          const usersIds: { id: number }[] = usersResponse.map(
            (user: User) => user.id,
          );
          usersIds.push(user?.id as any);
          const body = {
            id: workspaceId,
            members: usersIds.map((id) => ({ id })),
          };
          const res = await addMembers(body);
          setMyWorkspaces(res);
          toast.success(`Members added successfully`);
          const updateBody = { id: user?.id, status: { id: 1 } };
          const updateRes = await update(updateBody);
          setUser(updateRes);
          setIsInviteTeam(true);
          navigate('/pricing');
        }
      }
    } catch (error) {
      toast.error('Error occurred while inviting members');
      console.error('Error:', error);
    }
  };

  const handleSetMore = () => {
    setMore(true);
    setEmails([]);
  };
  const copyInviteLink = () => {
    const workspaceId = myWorkspaces && myWorkspaces[0].id;
    const inviteLink = `http://localhost:5173/workspaces/${workspaceId}/documents`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        toast.success('Invite link copied to clipboard!');
      })
      .catch((err) => {
        toast.error('Failed to copy invite link. Please try again.');
        console.error('Error copying invite link:', err);
      });
  };
  return (
    <>
      <InviteMembersHeader />
      <InviteMembersForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        more={more}
        register={register}
        handleSetMore={handleSetMore}
        setTextAreaValue={setTextAreaValue}
        copyInviteLink={copyInviteLink}
        invite={invite}
        setInvite={setInvite}
        isLoading={isLoading}
        getUsersByEmailsLoading={getUsersByEmailsLoading}
        addMembersLoading={addMembersLoading}
        isValid={isValid}
      />
    </>
  );
}
