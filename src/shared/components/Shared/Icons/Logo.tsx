const Logo = () => {
  return (
    <>
      <img src="/Logo.png" alt="logo" className=" w-36 dark:hidden " />
      <img src="LogoDark.png" alt="logo" className=" w-36 hidden dark:block" />
    </>
  );
};

export default Logo;
