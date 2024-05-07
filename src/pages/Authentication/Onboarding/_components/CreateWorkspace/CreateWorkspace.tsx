import Button from 'shared/components/Shared/Button';
import Input from 'shared/components/Shared/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateWorkspaceBody } from 'shared/types/workspace';
import { createWorkspaceSchema } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUserQuery } from '@/services/queries/auth.query';
import EmojiPicker from 'emoji-picker-react';
import { useState, useEffect, useRef } from 'react';
import { useCreateWorkSpaceQuery } from '@/services/queries/workspace.query';
import EmptyWorkspaceIcon from 'shared/components/Shared/Icons/EmptyWorkspaceIcon';
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from 'react-router';

export default function CreateWorkspace({ user, setIsHaveAWorkspace }: any) {
  const { setUser, setIsAuthenticated, setMyWorkspaces } = useAuthStore(
    (state) => state,
  );
  const navigate = useNavigate();

  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const {
    isLoading: isUpdateLoading,
    mutateAsync: update,
    isError: isUpdateError,
    error: updateError,
  }: any = useUpdateUserQuery();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const {
    isLoading,
    mutateAsync: CreateWorkspace,
    isError,
    error,
  }: any = useCreateWorkSpaceQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateWorkspaceBody>({
    resolver: yupResolver(createWorkspaceSchema),
  });

  const onSubmit: SubmitHandler<CreateWorkspaceBody> = async (data) => {
    data.emoji = selectedFileUrl;

    try {
      const res = await CreateWorkspace(data);
      const resArray = [res];

      const updateUser = await update({ status: { id: 1 }, id: user.id });
      setMyWorkspaces(resArray);
      if (updateUser) {
        setUser(updateUser);
        setIsAuthenticated(true);
        navigate(`/workspaces/${res?.id}/documents`);
      }
      setMyWorkspaces(res);
    } catch (error) {}
  };

  return (
    <form
      className="flex flex-col items-center cursor-pointer gap-3 relative "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div ref={emojiPickerRef}>
        <label
          onClick={() => {
            setOpen(!open);
          }}
          className="flex flex-col items-center gap-2"
        >
          <EmptyWorkspaceIcon selectedFileUrl={selectedFileUrl} />
          <p className="text-xs text-gray-500 cursor-pointer hover:bg-gray-200 px-2 py-1 hover:rounded-[4px]">
            Choose icon
          </p>
        </label>
        {open && (
          <div className="absolute z-10">
            <EmojiPicker
              onEmojiClick={(e) => {
                setSelectedFileUrl(e.imageUrl);
              }}
              height={'350px'}
              width={'400px'}
              searchDisabled={false}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 w-[80%]">
        <div className="flex flex-col gap-1">
          <Input
            label="Workspace name"
            placeholder="Acme Inc."
            type="text"
            aria-label="title"
            className="w-full outline-none border border-gray-200 h-7 rounded-[5px] px-2  placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
            name="title"
            register={register}
          />
          <p className="text-xs  font-light ">
            The name of your company or organization.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 w-full">
          <Button
            text={'Continue'}
            isLoading={isLoading}
            disabled={!isValid}
            type="submit"
            className="w-full flex items-center justify-center h-8 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2 disabled:opacity-40  "
          />
          {errors && errors && (
            <span className="text-red-500">
              {' '}
              {errors?.title?.message && errors?.title?.message}
            </span>
          )}
          {isError && error && (
            <span className="text-red-500">
              {' '}
              {error?.response?.data?.errors?.emoji && 'Please choose an icon'}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
