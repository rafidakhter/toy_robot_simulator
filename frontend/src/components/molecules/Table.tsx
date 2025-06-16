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
        'table-container',
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
              className='table-grid-item'
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
