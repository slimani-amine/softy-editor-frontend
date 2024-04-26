const EmptyAvatar = ({ selectedFileUrl }: any) => {
  return (
    <img
      src={!selectedFileUrl ? `/empty-avatar.png` : selectedFileUrl}
      alt="empty-avatar"
      className="rounded-full w-16 h-16 shadow-md object-cover"
    />
  );
};

export default EmptyAvatar;
