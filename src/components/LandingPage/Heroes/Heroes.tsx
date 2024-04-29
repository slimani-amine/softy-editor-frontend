const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <img
            src="/documents.png"
            className="object-contain dark:hidden"
            alt="Documents"
          />
          <img
            src="/documents-dark.png"
            // fill
            className="object-contain dark:block hidden"
            alt="Documents"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <img
            src="/reading.png"
            className="object-contain dark:hidden"
            alt="Reading"
          />
          <img
            src="/reading-dark.png"
            // fill
            className="object-contain hidden dark:block"
            alt="Reading"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
