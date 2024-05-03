import Button from '@/components/Shared/Button';
import Input from '@/components/Shared/Input';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { InviteMembersBody } from '@/types/workspace';
import { inviteMembersSchema } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetUsersByEmails,
  useUpdateUserQuery,
} from '@/services/queries/auth.query';
import EmojiPicker from 'emoji-picker-react';
import { useState, useEffect } from 'react';
import {
  useAddMembers,
  useCreateWorkSpaceQuery,
} from '@/services/queries/workspace.query';
import EmptyWorkspaceIcon from '@/components/Shared/Icons/EmptyWorkspaceIcon';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router';
import { User } from '@/types/user';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { TextareaForm } from '@/components/ui/TextareaForm';

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

  const [invite, setInvite] = useState<boolean>(false);
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

  const {
    isLoading,
    mutateAsync: update,
    isError,
    error,
  }: any = useUpdateUserQuery();

  const {
    isLoading: getUsersByEmailsLoading,
    mutateAsync: getUsersByEmails,
    isError: isGetUsersByEmailsError,
    error: getetUsersByEmailsError,
  }: any = useGetUsersByEmails();

  const {
    isLoading: addMembersLoading,
    mutateAsync: addMembers,
    isError: isaddMembersError,
    error: addMembersError,
  }: any = useAddMembers();

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
        setInvite(true)
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
          const workspaceId = myWorkspaces[0].id;
          const usersIds: { id: number }[] = usersResponse.map(
            (user: User) => user.id,
          );
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
    const workspaceId = myWorkspaces[0].id;
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
      <div className="flex flex-col items-center gap-1">
        <h1
          className="text-2xl font-semibold text-center max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
          style={{
            fontWeight: 600,
            fontSize: '22px',
            lineHeight: '29px',
            color: '#1d1b16',
          }}
        >
          Start with your team
        </h1>
        <h2
          className="text-[#acaba9] text-xl text-center font-normal "
          style={{
            fontWeight: 500,
            fontSize: '22px',
            lineHeight: '29px',
            color: '#acaba9',
          }}
        >
          Notion works best with your teammates
        </h2>
      </div>
      <form
        className="flex flex-col items-center cursor-pointer gap-3 relative "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2"></div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            {!more ? (
              <>
                <Input
                  placeholder="Email"
                  type="text"
                  label="Invite people"
                  aria-label="email"
                  className="w-full outline-none border border-gray-200 h-8 rounded-[5px] px-2  placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
                  name="email_01"
                  register={register}
                />
                <Input
                  placeholder="Email"
                  type="text"
                  aria-label="email"
                  className="w-full outline-none border border-gray-200 h-8 rounded-[5px] px-2  placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
                  name="email_02"
                  register={register}
                />
                <Input
                  placeholder="Email"
                  type="text"
                  aria-label="email"
                  className="w-full outline-none border border-gray-200 h-8 rounded-[5px] px-2 placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
                  name="email_03"
                  register={register}
                />
                <div
                  className="flex gap-1 items-center text-sm font-normal text-[#949493] pl-2 mt-2 cursor-pointer hover:bg-gray-200 px-2 py-1 hover:rounded-[4px]"
                  onClick={handleSetMore}
                >
                  <Plus className="fill-[#37352F80] w-5 h-5" /> Add more or bulk
                  invite
                </div>
                <hr className="h-2 w-full " />
              </>
            ) : (
              <TextareaForm setValue={setTextAreaValue} />
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <Button
              text={''}
              onClick={copyInviteLink}
              type="button"
              className="w-full flex items-center justify-center gap-1 h-8 rounded-[5px] text-[#2383E2] text-sm font-medium bg-[#E9F0F7] hover:opacity-75 shadow-inner md:shadow-md mt-2 disabled:opacity-40   "
            >
              <svg
                role="graphics-symbol"
                viewBox="0 0 16 16"
                className="w-4 h-4 fill-[#2383E2] "
              >
                <path d="M7.69922 10.8945L8.73828 9.84863C7.91797 9.77344 7.34375 9.51367 6.91992 9.08984C5.76465 7.93457 5.76465 6.29395 6.91309 5.14551L9.18262 2.87598C10.3379 1.7207 11.9717 1.7207 13.127 2.87598C14.2891 4.04492 14.2822 5.67188 13.1338 6.82031L11.958 7.99609C12.1768 8.49512 12.2451 9.10352 12.1289 9.62988L14.0908 7.6748C15.7725 6 15.7793 3.62109 14.084 1.92578C12.3887 0.223633 10.0098 0.237305 8.33496 1.91211L5.95605 4.29785C4.28125 5.97266 4.26758 8.35156 5.96289 10.0469C6.36621 10.4434 6.90625 10.7441 7.69922 10.8945ZM8.30078 5.13184L7.26855 6.17773C8.08203 6.25293 8.66309 6.51953 9.08008 6.93652C10.2422 8.09863 10.2422 9.73242 9.08691 10.8809L6.81738 13.1504C5.66211 14.3057 4.03516 14.3057 2.87305 13.1504C1.71094 11.9883 1.71777 10.3545 2.87305 9.20605L4.04199 8.03027C3.83008 7.53125 3.75488 6.92969 3.87109 6.39648L1.91602 8.35156C0.234375 10.0264 0.227539 12.4121 1.92285 14.1074C3.61816 15.8027 5.99707 15.7891 7.67188 14.1143L10.0439 11.7354C11.7256 10.0537 11.7324 7.6748 10.0371 5.98633C9.64062 5.58301 9.10059 5.28223 8.30078 5.13184Z"></path>
              </svg>
              Copy invite link
            </Button>
            <Button
              text={
                !invite ? `Take me to E-ditor` : `Invite and Take me to E-ditor`
              }
              isLoading={
                isLoading || getUsersByEmailsLoading || addMembersLoading
              }
              disabled={!isValid}
              type="submit"
              className="w-full flex items-center justify-center h-8 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2 disabled:opacity-40  "
            />
          </div>
        </div>
      </form>
    </>
  );
}
