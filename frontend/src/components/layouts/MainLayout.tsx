import { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon,
  UserIcon,
  Cog6ToothIcon,
  PlayIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  PlayIcon as PlayIconSolid,
  BellIcon as BellIconSolid,
  InformationCircleIcon as InformationCircleIconSolid
} from '@heroicons/react/24/solid'
import { useAuthStore } from '@/store/authStore'
import socketService from '@/services/socketService'
import NotificationsManager from '@/components/common/NotificationsManager'
import notificationService from '@/services/notificationService'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)

  // Initialize socket connection for authenticated users
  useEffect(() => {
    if (user) {
      socketService.connect()
      // Load initial unread count
      loadUnreadCount()
    } else {
      socketService.disconnect()
      setUnreadCount(0)
    }

    return () => {
      // Don't disconnect on unmount as other components might need the connection
    }
  }, [user])

  // Listen for new notifications to update unread count
  useEffect(() => {
    if (user) {
      const unsubscribe = socketService.onNotification(() => {
        // Increment unread count when new notification arrives
        setUnreadCount(prev => prev + 1)
      })
      return unsubscribe
    }
  }, [user])

  const loadUnreadCount = async () => {
    try {
      const count = await notificationService.getUnreadCount()
      setUnreadCount(count)
    } catch (error) {
      console.error('Error loading unread count:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: MagnifyingGlassIcon,
      iconSolid: MagnifyingGlassIconSolid,
    },
    {
      name: 'Reels',
      href: '/reels',
      icon: PlayIcon,
      iconSolid: PlayIconSolid,
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: ChatBubbleLeftRightIcon,
      iconSolid: ChatBubbleLeftRightIconSolid,
    },
    {
      name: 'Profile',
      href: `/profile/${user?.username || ''}`,
      icon: UserIcon,
      iconSolid: UserIconSolid,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      iconSolid: Cog6ToothIconSolid,
    },
    {
      name: 'Features',
      href: '/features',
      icon: InformationCircleIcon,
      iconSolid: InformationCircleIconSolid,
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-white dark:bg-dark-surface lg:border-r lg:border-gray-200 dark:border-dark-border lg:pb-4">
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200 dark:border-dark-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">SocialVibe</h1>
        </div>
        <nav className="mt-6">
          <ul className="flex flex-col gap-y-1 px-3">
            {navigation.map((item) => {
              const active = isActive(item.href)
              const Icon = active ? item.iconSolid : item.icon
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`nav-item ${active ? 'active' : ''}`}
                  >
                    <Icon className="h-6 w-6 mr-3" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            })}
            
            {/* Notification bell for desktop */}
            {user && (
              <>
                <li className="mt-4">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="nav-item relative w-full"
                  >
                    <BellIcon className="h-6 w-6 mr-3" />
                    <span className="text-sm font-medium">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="absolute top-2 left-8 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                </li>
                
                {/* Logout button for desktop */}
                <li className="mt-2">
                  <button
                    onClick={handleLogout}
                    className="nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface px-4 shadow-sm lg:hidden">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">SocialVibe</h1>
          
          {/* Mobile header buttons */}
          {user && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
              >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="mobile-bottom-nav lg:hidden bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border">
        <div className="flex justify-around py-2">
          {navigation.slice(0, 5).map((item) => {
            const active = isActive(item.href)
            const Icon = active ? item.iconSolid : item.icon
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center p-2 transition-colors ${
                  active ? 'text-primary-500' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Notifications Dropdown */}
      {showNotifications && user && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowNotifications(false)}
          />
          <div className="fixed top-16 right-4 lg:top-20 lg:right-8 z-50 w-80 max-h-96 bg-dark-surface rounded-lg shadow-lg border border-dark-border overflow-hidden">
            <div className="p-4 border-b border-dark-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <button
                  onClick={async () => {
                    await notificationService.markAllAsRead()
                    setUnreadCount(0)
                  }}
                  className="text-sm text-primary-400 hover:text-primary-300"
                >
                  Mark all read
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-80">
              <div className="p-4 text-center text-gray-400">
                <BellIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
                <p className="text-sm">When you get notifications, they'll appear here</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Real-time notifications for authenticated users */}
      {user && <NotificationsManager />}
    </div>
  )
}

export default MainLayout