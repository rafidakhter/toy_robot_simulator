import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

type ToastContextType = {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // debounced
  const showToast = useCallback((message: string) => {
    setToast((prev) => {
      // If the message is the same, don't reset the timer or flicker
      if (prev === message) return prev
      return message
    })

    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Only set a new timeout if the message is different or just appeared
    timeoutRef.current = setTimeout(() => {
      setToast(null)
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[100] w-[300px] bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-start gap-3 transition-opacity duration-300"
          role="alert"
          aria-live="assertive"
        >
          <span className="mt-1">⚠️</span>
          <div>
            <div className="font-semibold mb-1">Error</div>
            <div>{toast}</div>
          </div>
          <button
            className="ml-auto text-white hover:text-gray-200 font-bold"
            onClick={() => setToast(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </ToastContext.Provider>
  )
}
