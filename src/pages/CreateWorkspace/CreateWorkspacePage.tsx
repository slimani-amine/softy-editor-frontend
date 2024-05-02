import Header from '../Authentication/Onboarding/_components/WelcomeProfileHeader/WelcomeProfile';
import Button from '@/components/Shared/Button';
import Input from '@/components/Shared/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateWorkspaceBody } from '@/types/workspace';
import { createWorkspaceSchema } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import EmojiPicker from 'emoji-picker-react';
import { useState, useEffect, useRef } from 'react';
import { useCreateWorkSpaceQuery } from '@/services/queries/workspace.query';
import EmptyWorkspaceIcon from '@/components/Shared/Icons/EmptyWorkspaceIcon';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';

export default function CreateWorkspacePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setMyWorkspaces, myWorkspaces } = useAuthStore();

  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  const emojiPickerRef = useRef<HTMLDivElement>(null);

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
      setMyWorkspaces([...myWorkspaces, res]);

      navigate(`/workspaces/${res?.id}/documents`);
    } catch (error) {}
  };

  return (
    <section className="px-4 w-[24rem] h-full m-auto overflow-visible flex flex-col justify-center ">
      <div className="w-full  mx-auto flex flex-col gap-10 ">
        <Header
          title={'Create a team workspace'}
          subTitle={' Fill in some details for your teammates.             '}
        />
        <form
          className="flex flex-col items-center cursor-pointer gap-3 relative "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-2">
            <EmptyWorkspaceIcon selectedFileUrl={selectedFileUrl} />
            <div ref={emojiPickerRef}>
              <label
                className="text-xs text-gray-500 cursor-pointer hover:bg-gray-200 px-2 py-1 hover:rounded-[4px]"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Choose icon
              </label>
              {open && (
                <div className="absolute z-10">
                  {' '}
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      console.log(e.imageUrl);
                      setSelectedFileUrl(e.imageUrl);
                    }}
                    height={'300px'}
                    width={'400px'}
                    searchDisabled={true}
                  />
                </div>
              )}
            </div>
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
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
