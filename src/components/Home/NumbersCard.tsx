
interface NumbersCardProps {
  title: string;
  text: string;
  imgSrc: string;
}

const NumbersCard = ({ title, text, imgSrc }: NumbersCardProps) => {
  return (
    <div className="bg-[#f9f7f4] rounded-2xl text-[#1f396e] p-4 flex flex-col items-center text-center md:flex-row md:text-left md:p-6 w-full">
      <img src={imgSrc} alt={title} className="w-20 mb-2 md:mr-2 md:mb-0" />
      <div className="md:ml-2">
        <h2 className="text-[25px] font-bold mb-1 md:text-[20px]">{title}</h2>
        <p className="text-[15px] font-medium md:text-[14px]">{text}</p>
      </div>
    </div>
  );
};

export default NumbersCard;
