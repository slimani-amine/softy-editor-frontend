import Button from '@/components/Shared/Button';
import Marketing from '../Marketing';
import Input from '@/components/Shared/Input';
import EmptyAvatar from '@/components/Shared/Icons/EmptyAvatar';
import { uplaodImage } from 'shared/utils/uploadImage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProfileBody } from '@/types/auth';
import { profileSchema } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateUserQuery } from '@/services/queries/auth.query';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function WelcomeProfileForm({ user, setIsHaveProfile }: any) {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>(user?.photo);

  const {
    isLoading,
    mutateAsync: update,
    isError,
    error,
  }: any = useUpdateUserQuery();

  useEffect(() => {
    if (isError && error) {
      const errorMessage = error.response?.data?.errors;
      if (errorMessage?.userName) {
        toast.error('UserName Already Exists');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }, [isError, error]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileBody>({
    resolver: yupResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<ProfileBody> = async (data) => {
    data.photo = selectedFileUrl;
    data.id = user.id;

    try {
      const res = await update(data);
      if (res) {
        toast.success('user Upadated successfully');
        setIsHaveProfile(true);
      }
    } catch (error) {}
  };

  return (
    <form
      className="flex flex-col items-center cursor-pointer gap-3 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-4">
        <EmptyAvatar selectedFileUrl={selectedFileUrl} />
        <label className="text-xs text-gray-500 cursor-pointer hover:bg-gray-200 px-2 py-1 hover:rounded-[4px]">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              uplaodImage(e, setSelectedFileUrl);
            }}
          />
          Add a photo
        </label>
      </div>

      <div className="flex flex-col gap-4 w-[80%]">
        <Input
          label="What should we call you?"
          placeholder="e.g Ada Lovelace, Ada, Al"
          type="text"
          aria-label="userName"
          className="w-full outline-none border border-gray-200 h-7 rounded-[5px] px-2  placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
          name="userName"
          register={register}
        />
        <Input
          label="Set a password"
          placeholder="New password"
          type="password"
          aria-label="password"
          className="w-full outline-none border border-gray-200 h-7 rounded-[5px] px-2 placeholder:text-sm placeholder:font-extralight placeholder:bg-[#FFFEFC]"
          name="password"
          register={register}
        />
        <div className="flex gap-2 w-full">
          <input type="checkbox" />{' '}
          <p className="text-xs text-gray-400">
            I agree to E-ditor sending marketing communications about E-ditor to
            me.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-1 w-full">
          <Button
            text={'Continue'}
            isLoading={isLoading}
            disabled={!isValid} // here
            type="submit"
            className="w-full flex items-center justify-center h-8 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2 disabled:opacity-40  "
          />
          {errors && errors && (
            <span className="text-red-500">
              {' '}
              {errors?.userName?.message
                ? errors?.userName?.message
                : (errors?.password?.message as string)}
            </span>
          )}
        </div>
        <Marketing className="font-normal text-xs leading-0 text-gray-400 w-full " />
      </div>
    </form>
  );
}
