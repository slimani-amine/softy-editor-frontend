import toast from 'react-hot-toast';

export const uplaodImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setSelectedFileUrl: any,
) => {
  if (e.target.files && e.target.files.length > 0) {
    const selectedFile = e.target.files[0];

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
          },
        );

        if (response.ok) {
          const data = await response.json();
          setSelectedFileUrl(data.url);
        } else {
          toast.error(
            'Erreur lors du téléchargement du fichier. Veuillez réessayer.',
          );
        }
      } catch (error) {
        toast.error(
          'Une erreur est survenue lors du téléchargement du fichier. Veuillez réessayer.',
        );
      }
    } else {
      toast.error(
        'Format ou taille de fichier invalide. Veuillez choisir un fichier image valide (max 2 Mo).',
      );
    }
  }
};
