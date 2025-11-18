import { useState } from 'react'
import UserSearchModal from '@/components/user/UserSearchModal'

export default function Explore() {
  const [showUserSearch, setShowUserSearch] = useState(false)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore</h1>
        <button
          onClick={() => setShowUserSearch(true)}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
        >
          Find People
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search People Card */}
        <div 
          onClick={() => setShowUserSearch(true)}
          className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-8 cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all"
        >
          <div className="text-center text-gray-600 dark:text-gray-400">
            <div className="text-5xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Find People</h3>
            <p className="text-sm">Discover new accounts to follow</p>
          </div>
        </div>

        {/* Trending Posts */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <div className="text-5xl mb-3">🔥</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trending Posts</h3>
            <p className="text-sm">Coming Soon</p>
          </div>
        </div>

        {/* Popular Reels */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <div className="text-5xl mb-3">🎬</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Popular Reels</h3>
            <p className="text-sm">Coming Soon</p>
          </div>
        </div>

        {/* Stories */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <div className="text-5xl mb-3">📖</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Stories</h3>
            <p className="text-sm">Coming Soon</p>
          </div>
        </div>

        {/* Hashtags */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <div className="text-5xl mb-3">#️⃣</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trending Hashtags</h3>
            <p className="text-sm">Coming Soon</p>
          </div>
        </div>

        {/* Places */}
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <div className="text-5xl mb-3">📍</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Popular Places</h3>
            <p className="text-sm">Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Search People Modal */}
      {showUserSearch && (
        <UserSearchModal
          onClose={() => setShowUserSearch(false)}
          showMessageButton={true}
          title="Find People"
        />
      )}
    </div>
  )
}