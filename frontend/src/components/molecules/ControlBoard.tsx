import classNames from 'classnames'
import { useEffect } from 'react'

export const ControlBoard = ({
  onRotateAntiClockwiseClick,
  onMoveClick,
  onRotateClockwiseClick,
  handleArrowKeyInteraction,
  onResetClick: reset
}: ControlBoard.Props) => {
  const buttons = [
    {
      label: 'Anti-Clockwise',
      onClick: onRotateAntiClockwiseClick,
    },
    {
      label: 'Move',
      onClick: onMoveClick,
    },
    {
      label: 'Clockwise',
      onClick: onRotateClockwiseClick,
    },
  ]

  useEffect(() => {
    window.addEventListener('keydown', handleArrowKeyInteraction)
    return () =>
      window.removeEventListener('keydown', handleArrowKeyInteraction)
  }, [handleArrowKeyInteraction])

  return (
    <div className='w-full flex flex-col items-center justify-center gap-[24px]'>
      <ul className="grid grid-cols-3 gap-[12px]">
        {buttons.map((button) => (
          <li key={button.label}>
            <button
              className={classNames(
                'font-semibold w-full',
                'min-w-[120px] p-[12px] rounded-[8px] ',
                'bg-gradient-to-br from-cyan-500 to-teal-400',
                'hover:opacity-80 transition-opacity duration-200',
              )}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={classNames(
          'flex p-0.5',
          'min-w-[120px] rounded-[8px] ',
          'bg-gradient-to-br from-cyan-500 to-teal-400',
          'hover:opacity-80 transition-opacity duration-200',
        )}
        onClick={reset}
      >
        <span
          className={classNames(
            'flex justify-center',
            ' p-[12px] rounded-[8px]',
            'flex-1 bg-[#2D3537] text-white',
          )}
        >
          Reset
        </span>
      </button>
    </div>
  )
}

namespace ControlBoard {
  export type Props = {
    onRotateAntiClockwiseClick: () => Promise<void>
    onMoveClick: () => Promise<void>
    onRotateClockwiseClick: () => Promise<void>
    handleArrowKeyInteraction: (event: KeyboardEvent) => Promise<void>
    onResetClick:() => void
  }
}
