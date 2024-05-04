import { useMediaQuery } from 'react-responsive'
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
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <div className='bg-white rounded-3xl h-[433px] p-2'>
        <div className='flex items-center h-full'>
            { (isTabletOrMobile)? <img  className="rounded-3xl" src={data.image} height="100" width="100"/>: <img  className="rounded-3xl" src={data.image} height="410" width="410"/>}
            <div className='flex flex-col justify-start w-1/3 h-full p-2 '>
                <p className='text-black text-l'>{data.quote}</p>
                <div className='flex items-center mt-auto'>
                    <img src={data.logo} height="100" width="100"/>
                    <div className='flex flex-col text-black'>
                        <p>{data.name}</p>
                        <p>{data.position}</p>
                    </div>
                </div>

            </div>
            <div className='h-full w-1 bg-gray-500 rounded-3xl'></div>
            <div className='mt-auto pr-28 text-black p-2'>
                <div className='flex flex-col'>
                <p className=' text-7xl font-bold sm:font-normal'>{data.percentage}</p>
                <p className='ml-2'>{data.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}