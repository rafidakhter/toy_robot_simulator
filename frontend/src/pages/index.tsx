import Simulator from '@/components/blocks/Simulator'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between bg-[#1D2527] min-h-screen py-[24px]">
      <div className="space-y-[24px] flex justify-center items-center flex-col">
        {/* instructions */}
        <p className="bg-[#2D3537] p-[24px] rounded-[12px] text-white">
          Click to place the robot, use the buttons or arrows to move
        </p>

        <Simulator />
      </div>

      <footer className="text-cyan-500 pt-[48px] pb-[96px]">
        By Rafid Akhter
      </footer>
    </main>
  )
}
