import { Simulator } from '@/components'

export default function Home() {
  return (
    <main className="root-container">
      <div className="space-y-l4 flex justify-center items-center flex-col">
        {/* instructions */}
        <p className="instruction-container">
          <span className='text-onBase'>Click to place the robot, use the buttons or arrows to move</span>
        </p>

        <Simulator />
      </div>

      <footer className="pt-[48px] pb-[96px]">
        <span className='text-onBase-impact'>By Rafid Akhter</span>
      </footer>
    </main>
  )
}
