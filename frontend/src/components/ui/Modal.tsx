import * as Dialog from '@radix-ui/react-dialog'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  children: React.ReactNode
  className?: string
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl'
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  children,
  className
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in-0" />
        <Dialog.Content 
          className={clsx(
            'fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] transform overflow-hidden rounded-xl bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border p-6 text-left shadow-xl animate-in fade-in-0 zoom-in-95 duration-200',
            sizeClasses[size],
            className
          )}
          aria-describedby={description ? undefined : undefined}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between mb-4">
              {title && (
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </Dialog.Title>
              )}
              {showCloseButton && (
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}

          {/* Description (for accessibility) */}
          {description && (
            <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {description}
            </Dialog.Description>
          )}

          {/* Content */}
          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}