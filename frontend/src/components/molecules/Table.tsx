import classNames from 'classnames'

import { MouseEventHandler, ReactElement } from 'react'

export function Table({
  className,
  onClick,
  gridSize = 5,
  tableItem: TableItem,
  activeLocation,
}: Table.Props) {
  if (gridSize < 1) {
    throw new Error('Grid size must greater than 1 or equal to 1')
  }

  return (
    <ul
      className={classNames(
        'grid grid-cols-5 grid-rows-5 aspect-square',
        className,
      )}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, index) => {
        const row = gridSize - 1 - Math.floor(index / gridSize)
        const col = index % gridSize
        const squareId = `square-${row}-${col}`
        const isActive =
          activeLocation?.row === row && activeLocation?.column === col
        return (
          <li key={squareId}>
            <button
              id={squareId}
              onClick={onClick}
              className={classNames(
                'size-[80px]',
                'flex items-center justify-center',
                'border border-solid border-[#505354]',
                'bg-[#2A3538] text-white hover:bg-[#3A4346] active:bg-[#4A5356]',
                'transition-colors duration-200',
              )}
            >
              {isActive && TableItem}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

namespace Table {

  type TableCoordinates = {
    row: number
    column: number
  }
  export type Props = {
    gridSize?: number
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    tableItem: ReactElement
    activeLocation?: TableCoordinates
  }
}
