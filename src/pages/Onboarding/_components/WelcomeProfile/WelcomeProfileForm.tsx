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
import { useState } from 'react';
import { User } from '@/types/user';
import useAuthStore from '@/store/useAuthStore';
interface Props {
  user: User | null;
  setIsHaveProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WelcomeProfileForm({ user, setIsHaveProfile }: Props) {
  const { setUser } = useAuthStore((state) => state);

  const [selectedFileUrl, setSelectedFileUrl] = useState<string>(
    user?.photo || '',
  );

  const {
    isLoading,
    mutateAsync: update,
    isError,
    error,
  }: any = useUpdateUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileBody>({
    resolver: yupResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<ProfileBody> = async (data) => {
    data.photo = selectedFileUrl;
    data.id = user?.id as number;

    try {
      const res = await update(data);
      if (res) {
        setUser(res);
        setIsHaveProfile(true);
      }
    } catch (error) {}
  };

  return (
    <form
      className="flex flex-col items-center gap-3 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex flex-col items-center gap-4">
        <input
          type="file"
          className="hidden "
          accept="image/*"
          onChange={(e) => {
            uplaodImage(e, setSelectedFileUrl);
          }}
        />
        <EmptyAvatar selectedFileUrl={selectedFileUrl} />
        <p className="text-xs text-gray-500 cursor-pointer hover:bg-gray-200 px-2 py-1 hover:rounded-[4px]">
          Add a photo
        </p>
      </label>

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
          {isError && error && (
            <span className="text-red-500">
              {' '}
              {error?.response?.data?.errors?.password
                ? error?.response?.data?.errors.password
                : 'This UserName already in use'}
            </span>
          )}
        </div>
        <Marketing className="font-normal text-xs leading-0 text-gray-400 w-full " />
      </div>
    </form>
  );
}
