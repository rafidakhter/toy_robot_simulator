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
    <div className='control-board-container'>
      <ul className="grid grid-cols-3 gap-[12px]">
        {buttons.map((button) => (
          <li key={button.label}>
            <button
              className='button-primary'
              onClick={button.onClick}
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="button-secondary"
        onClick={reset}
      >
        <span className='button-secondary-content'>
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
