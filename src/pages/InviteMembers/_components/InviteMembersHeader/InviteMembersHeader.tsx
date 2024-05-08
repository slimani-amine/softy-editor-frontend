export default function InviteMembersInputs() {
  return (
    <div className="flex flex-col items-center gap-1">
      <h1
        className="text-2xl font-semibold text-center max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
        style={{
          fontWeight: 600,
          fontSize: '22px',
          lineHeight: '29px',
          color: '#1d1b16',
        }}
      >
        Start with your team
      </h1>
      <h2
        className="text-[#acaba9] text-xl text-center font-normal "
        style={{
          fontWeight: 500,
          fontSize: '22px',
          lineHeight: '29px',
          color: '#acaba9',
        }}
      >
        E-ditor works best with your teammates
      </h2>
    </div>
  );
}
