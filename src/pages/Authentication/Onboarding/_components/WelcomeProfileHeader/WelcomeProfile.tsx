export default function Header({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <h1
        className="text-2xl font-semibold text-center max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
        style={{
          fontWeight: 600,
          fontSize: '28px',
          lineHeight: '36px',
          color: '#37352f',
        }}
      >
        {title}
      </h1>
      <h2
        className="text-[#acaba9] text-xl text-center font-normal "
        style={{
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '23px',
          color: 'rgba(55, 53, 47, 0.65)',
        }}
      >
        {subTitle}
      </h2>
    </div>
  );
}
