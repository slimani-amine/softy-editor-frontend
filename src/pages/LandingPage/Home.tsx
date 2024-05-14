import Heading from './_components/Heading';
import Heroes from './_components/Heroes';
import NavBar from './_components/NavBar';

const Home = () => {
  return (
    <div className="h-full flex justify-center dark:bg-[#191919] ">
      <div className="z-0 absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <NavBar />
      <div className=" flex z-10 flex-col mt-20 w-full">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 w-full">
          <Heading />
          <Heroes />
        </div>
      </div>
    </div>
  );
};

export default Home;
