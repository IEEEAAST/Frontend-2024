import { SwipeCarousel } from "./Carousel"

export const AchievementCarousel = () => {
  return (
    <div className="flex flex-col items-start w-full  container mx-auto">
        <p className="font-bold text-[45px] my-5 mt-20">Branch Achivements</p>
        <div className="w-full">
          <SwipeCarousel/>
        </div>
    </div>
  )
}