const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[400px] h-[400px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <img
            src="/documents.png"
            className="object-contain dark:hidden"
            alt="Documents"
          />
          <img
            src="/documents-dark.png"
            className="object-contain dark:block hidden"
            alt="Documents"
          />
        </div>
        <div className="relative w-[400px] h-[400px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px] max-lg:hidden">
          <img
            src="/reading.png"
            className="object-contain dark:hidden"
            alt="Reading"
          />
          <img
            src="/reading-dark.png"
            className="object-contain hidden dark:block"
            alt="Reading"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
