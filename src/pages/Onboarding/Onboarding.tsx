import WelcomeProfileForm from '@/components/Onboarding/WelcomeProfile';
import Header from '@/components/Onboarding/WelcomeProfileHeader/WelcomeProfile';
import { profileSchema } from '@/lib/validation';
import {
  useLoginQuery,
  useUpdateUserQuery,
} from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { ProfileBody } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Onboarding = () => {
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileBody>({
    resolver: yupResolver(profileSchema),
  });
  console.log('🚀 ~ Onboarding ~ isValid:', isValid);
  const [files, setFile] = useState<any>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>(user?.photo);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (
        selectedFile.type.startsWith('image/') &&
        selectedFile.size <= 2 * 1024 * 1024
      ) {
        try {
          const form = new FormData();
          form.append('file', selectedFile);
          form.append('upload_preset', 'firaslatrach');

          const response = await fetch(
            'https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload',
            {
              method: 'post',
              body: form,
            }
          );

          if (response.ok) {
            const data = await response.json();
            setSelectedFileUrl(data.url);
          } else {
            console.log(
              'Erreur lors du téléchargement du fichier. Veuillez réessayer.'
            );
          }
        } catch (error) {
          console.log(
            'Une erreur est survenue lors du téléchargement du fichier. Veuillez réessayer.'
          );
          console.error(error);
        }
      } else {
        console.log(
          'Format ou taille de fichier invalide. Veuillez choisir un fichier image valide (max 2 Mo).'
        );
      }
    }
  };

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

  const onSubmit: SubmitHandler<ProfileBody> = async (data) => {
    data.photo = selectedFileUrl;
    data.id = user.id;

    try {
      const res = await update(data);
      if (res) {
        toast.success('user Upadated successfully');
      }
    } catch (error) {}
  };

  return (
    <div className="h-full flex flex-col justify-center bg-[#F7F6F3]">
      <section className="px-4 w-[24rem] h-full m-auto overflow-visible flex flex-col justify-center  ">
        <div className="w-full  mx-auto flex flex-col gap-5 ">
          <Header />
          <WelcomeProfileForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            handleFileChange={handleFileChange}
            files={files}
            selectedFileUrl={selectedFileUrl}
            isLoading={isLoading}
            isValid={isValid}
          />
        </div>
      </section>
    </div>
  );
};

export default Onboarding;
