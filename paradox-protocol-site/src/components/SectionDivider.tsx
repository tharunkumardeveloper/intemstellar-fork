interface SectionDividerProps {
  imageSrc: string;
  alt: string;
}

const SectionDivider = ({ imageSrc, alt }: SectionDividerProps) => {
  return (
    <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden my-8 sm:my-12 md:my-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <div className="sr-only">{alt}</div>
    </div>
  );
};

export default SectionDivider;
