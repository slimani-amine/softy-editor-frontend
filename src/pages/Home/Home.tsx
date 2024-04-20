import Heading from '@/components/LandingPage/Heading';
import Heroes from '@/components/LandingPage/Heroes';
import Navbar from '@/components/LandingPage/NavBar/Navbar';
import Pricing from '@/components/Pricing/Pricing';

const Home = () => {
  return (
    <div className="h-full flex justify-center ">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <Navbar />
      <div className=" flex flex-col mt-20 dark:bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading />
          <Heroes />
        </div>
        <Pricing id='pricing'/>
      </div>
    </div>
  );
};

export default Home;
