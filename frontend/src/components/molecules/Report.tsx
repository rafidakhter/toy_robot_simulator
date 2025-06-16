import classNames from 'classnames'
import { useState } from 'react'

export function Report({ reports }: Report.Props) {
  const [displayReport, setDisplayReport] = useState(false)

  return (
    <>
      {/* report */}
      <button
        className={classNames(
          'flex p-0.5',
          'min-w-[120px] rounded-[8px] ',
          'bg-gradient-to-br from-cyan-500 to-teal-400',
          'hover:opacity-80 transition-opacity duration-200',
        )}
        onClick={() => setDisplayReport((prev) => !prev)}
      >
        <span
          className={classNames(
            'flex justify-center',
            ' p-[12px] rounded-[8px]',
            'flex-1 bg-[#2D3537] text-white',
          )}
        >
          Report
        </span>
      </button>

      {/* robot report */}
      <div
        className={classNames(
          'fixed bottom-0 min-w-[400px] aspect-video overflow-scroll',
          'block aspect-video',
          'min-w-[120px] p-[12px] rounded-[8px]',
          'flex-1 bg-[#2D3537] text-white',
          'transition-opacity duration-200 ease-in-out',
          'space-y-[12px]',
          {
            'opacity-0 translate-y-[110%]': !displayReport,
            'opacity-100': displayReport,
          },
        )}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Report:</h2>
          <button onClick={() => setDisplayReport(false)}>close</button>
        </div>

        {displayReport && (
          <ul className="list-disc pl-[20px]">
            {reports.map((action, i) => (
              <li key={action + i}>{action}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

namespace Report {
  export type Props = {
    reports: string[]
  }
}
