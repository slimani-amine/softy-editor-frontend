const EmptyAvatar = ({ selectedFileUrl }: { selectedFileUrl: string }) => {
  return (
    <img
      src={!selectedFileUrl ? `/empty-avatar.png` : selectedFileUrl}
      alt="empty-avatar"
      className="rounded-full w-16 h-16 shadow-md object-cover cursor-pointer"
    />
  );
};

export default EmptyAvatar;
