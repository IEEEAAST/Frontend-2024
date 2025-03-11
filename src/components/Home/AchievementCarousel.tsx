import { SwipeCarousel } from "./Carousel"

export const AchievementCarousel = () => {
  return (
    <div className="flex items-center justify-center mx-8">
      <div className="flex flex-col items-center w-full container" >
        <h2 className="font-bold text-[2rem] md:text-[3rem] lg:text-[3rem] text-center pb-14">Branch Achievements</h2>
        <div className="w-full rounded-2xl pb-4" style={{ backgroundColor: "hsl(220, 100%, 5%)" }}>
          <SwipeCarousel />
        </div>
      </div>
    </div>
  )
}