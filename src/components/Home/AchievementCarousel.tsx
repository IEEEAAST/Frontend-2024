import { SwipeCarousel } from "./Carousel"

export const AchievementCarousel = () => {
  return (
    <div className="flex flex-col items-start w-full px-[205px] container mx-auto">
        <p className="font-bold text-[45px]">Branch Achivements</p>
        <div className="w-full">
          <SwipeCarousel/>
        </div>
    </div>
  )
}