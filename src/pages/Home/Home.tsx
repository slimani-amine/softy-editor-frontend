import { Heading } from '@/components/heading';
import { Heroes } from '@/components/heroes';
import Navbar from '@/components/NavBar/Navbar';

const Home = () => {
  return (
    <div className="h-full flex justify-center overflow-hidden">
      <Navbar />
      <div className=" flex flex-col mt-20 dark:bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading />
          <Heroes />
        </div>
      </div>
    </div>
  );
};

export default Home;
