import { SubmitHandler, useForm } from 'react-hook-form';
import { inviteMembersSchema, validateEmail } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUsersByEmails } from '@/services/queries/auth.query';
import { useState } from 'react';
import {
  useGetMyWorkSpacesQuery,
  useGetWorkSpacesQuery,
  useInviteMembers,
} from '@/services/queries/workspace.query';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import InviteMembersHeader from './_components/InviteMembersHeader';
import InviteMembersForm from './_components/InviteMembersForm';
import {
  InviteMembersApiBody,
  InviteMembersBody,
} from 'shared/types/workspace';

export default function InviteMembers() {
  const { user, myWorkspaces, setMyWorkspaces } = useAuthStore(
    (state) => state,
  );
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [invite, setInvite] = useState<boolean>(true);
  const [more, setMore] = useState<boolean>(false);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InviteMembersBody>({
    resolver: yupResolver(inviteMembersSchema),
  });

  const {
    isLoading: getUsersByEmailsLoading,
    mutateAsync: getUsersByEmails,
  }: any = useGetUsersByEmails();

  const {
    isLoading: getMyWorkspacesLoading,
    mutateAsync: getMyWorkspaces,
    isError: isErrorForGetMyWorkspaces,
    error: errorForGetMyWorkspaces,
  } = useGetMyWorkSpacesQuery();

  const { isLoading: addMembersLoading, mutateAsync: inviteMembers }: any =
    useInviteMembers();

  const validateEmails = (data: InviteMembersBody, more: boolean): boolean => {
    const { email_01, email_02, email_03 } = data;
    const newEmails: Set<string> = new Set();

    const addEmail = (email: any) => {
      if (email.trim() !== '') {
        if (!validateEmail(email)) {
          toast.error(`Invalid email format: ${email}`);
          return false;
        }
        newEmails.add(email.trim());
      }
      return true;
    };

    let isValid = true;

    if (more) {
      if (textAreaValue) {
        const emailsFromTextArea = textAreaValue.split(/[\s,]+/);
        emailsFromTextArea.forEach((email) => {
          if (!addEmail(email)) {
            isValid = false;
          }
        });
        if (emailsFromTextArea.length > 10) {
          toast.error('You can invite a maximum of 10 guests for your plan.');
          isValid = false;
        }
      }
    } else {
      if (!addEmail(email_01)) {
        isValid = false;
      }
      if (!addEmail(email_02)) {
        isValid = false;
      }
      if (!addEmail(email_03)) {
        isValid = false;
      }
    }

    return isValid;
  };

  const onSubmit: SubmitHandler<InviteMembersBody> = async (data) => {
    const { email_01, email_02, email_03 } = data;
    const newEmails: Set<string> = new Set();

    // Add individual email fields to the newEmails set if they are valid
    if (email_01 && validateEmail(email_01)) {
      newEmails.add(email_01);
    }
    if (email_02 && validateEmail(email_02)) {
      newEmails.add(email_02);
    }
    if (email_03 && validateEmail(email_03)) {
      newEmails.add(email_03);
    }

    try {
      if (newEmails.size === 0) {
        // Handle case when no valid emails are provided
        navigate(
          `/workspaces/${workspaceId || (myWorkspaces && myWorkspaces[0]?.id)}/documents`,
        );
      } else {
        // Proceed with invitation process
        // Include user's email if available
        if (user?.email && validateEmail(user.email)) {
          newEmails.add(user.email);
        }

        // Construct body for invitation
        const body = {
          id: workspaceId || (myWorkspaces && (myWorkspaces[0]?.id as any)),
          emails: Array.from(newEmails),
        };

        // Call API to invite members
        const res = await inviteMembers(body);
        const allMyWorkspaces = await getMyWorkspaces();
        setMyWorkspaces(allMyWorkspaces);
        toast.success(`Members added successfully`);
        navigate(
          `/workspaces/${workspaceId || (myWorkspaces && myWorkspaces[0]?.id)}/documents`,
        );
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
    <div className="h-full flex flex-col justify-center bg-[#F7F6F3] relative">
      <section className="px-4 w-[30rem] h-full m-auto overflow-visible flex flex-col justify-center ">
        <div className="w-full  mx-auto flex flex-col gap-10 ">
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
            isLoading={getUsersByEmailsLoading || addMembersLoading}
            getUsersByEmailsLoading={getUsersByEmailsLoading}
            addMembersLoading={addMembersLoading}
            isValid={isValid}
            errors={errors}
          />
        </div>
      </section>
    </div>
  );
}
