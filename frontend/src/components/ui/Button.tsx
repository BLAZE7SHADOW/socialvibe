import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'glass' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    secondary: 'bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white border border-gray-300 dark:border-dark-border hover:bg-gray-200 dark:hover:bg-dark-card',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    glass: 'glassmorphism-dark text-white hover:bg-white/10 border border-white/20',
    outline: 'bg-transparent border border-gray-300 dark:border-dark-border text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-card'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base'
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5'
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <div className={clsx(
            'animate-spin border-2 border-current border-t-transparent rounded-full mr-2',
            iconSizeClasses[size]
          )} />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className={clsx('mr-2', iconSizeClasses[size])}>
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className={clsx('ml-2', iconSizeClasses[size])}>
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button