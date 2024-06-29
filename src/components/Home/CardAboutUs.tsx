type CardProps = {
    image: string;
    quote: string;
    logo: string;
    name: string;
    position: string;
    company: string;
    percentage: string;
    description: string;
}

export const CardAboutUs = (data: CardProps) => {
  return (
    <div className='bg-orange-50 rounded-3xl p-4 md:p-6 lg:p-8 xl:p-10 min-h-[400px] md:min-h-[450px] lg:min-h-[433px] xl:min-h-[350px]'>
      <div className='flex flex-col xl:flex-row space-y-4 xl:space-y-0 h-full'>
        <img
          className="rounded-3xl h-48 w-full md:h-60 lg:h-72 xl:w-[30%] xl:h-[350px] object-cover"
          src={data.image}
          alt={`${data.name}'s photo`}
        />
        <div className='flex flex-col justify-between space-y-4 xl:w-1/3 xl:min-h-[433px]'>
          <p className='text-black text-lg md:text-xl lg:text-2xl italic'>{data.quote}</p>
          <div className='flex items-center'>
            <img src={data.logo} height="80" width="80" alt={`${data.name}'s logo`} />
            <div className='flex flex-col text-black ml-3'>
              <p className="font-bold text-base md:text-lg lg:text-xl">{data.name}</p>
              <p className="font-semibold text-sm md:text-base lg:text-lg text-slate-500">{data.position}</p>
            </div>
          </div>
        </div>
        <div className='xl:w-[2px] sm:w-[2px] bg-gray-200'></div>
        <div className='flex flex-col justify-end text-black'>
          <p className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>{data.percentage}</p>
          <p className='mt-1 text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-slate-500'>{data.description}</p>
        </div>
      </div>
    </div>
  )
}
