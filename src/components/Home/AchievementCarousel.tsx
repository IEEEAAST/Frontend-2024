import { SwipeCarousel } from "./Carousel"

export const AchievementCarousel = () => {
  return (
    <div className="flex flex-col items-start w-full container mx-auto" >
        <p className="font-bold text-[45px]">Branch Achievements</p>
        <div className="w-full rounded-2xl pb-4" style={{ backgroundColor: "hsl(220, 100%, 5%)" }}>
          <SwipeCarousel/>
        </div>
    </div>
  )
}