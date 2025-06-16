import Image from 'next/image'
import RobotImage from '../../../../public/assets/robot.png'
import classNames from 'classnames'
import { Orientation } from '@toy-robot-simulator/shared'

export function Robot({ className, orientation }: Robot.Props) {
  return (
    <div className={classNames('size-[80px] p-[12px] relative', className)}>
      <DirectionIndicator orientation={orientation} />
      <Image
        fetchPriority="low"
        width={RobotImage.width}
        height={RobotImage.height}
        src={RobotImage.src}
        alt="Robot"
      />
    </div>
  )
}

export function DirectionIndicator({
  className,
  orientation,
}: RightChevron.Props) {
  function getOrientationIndicatorStyles(orientation?: Orientation): string {
    switch (orientation) {
      case 'WEST':
        return 'rotate-180 top-1/2 -translate-y-1/2 left-0'
      case 'SOUTH':
        return 'rotate-90 bottom-0 left-1/2 -translate-x-1/2'
      case 'EAST':
        return 'top-1/2 -translate-y-1/2 right-0'
      case 'NORTH':
      default:
        return '-rotate-90 top-0 left-1/2 -translate-x-1/2'
    }
  }

  return (
    <div
      className={classNames(
        'absolute',
        getOrientationIndicatorStyles(orientation),
        className,
      )}
    >
      <svg
        className="size-[24px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9.29 16.29a1 1 0 001.42 0l4-4a1 1 0 000-1.42l-4-4a1 1 0 10-1.42 1.42L12.59 12l-3.3 3.29a1 1 0 000 1.42z" />
      </svg>
    </div>
  )
}

namespace RightChevron {
  export type Props = {
    className?: string
    orientation?: Orientation
  }
}

namespace Robot {
  export type Props = {
    className?: string
    orientation?: Orientation
  }
}
