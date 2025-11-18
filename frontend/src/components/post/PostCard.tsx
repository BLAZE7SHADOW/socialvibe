import { useState, useRef, useEffect } from 'react'
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon, 
  BookmarkIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  ArchiveBoxIcon,
  PencilIcon,
  FlagIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartIconSolid, 
  BookmarkIcon as BookmarkIconSolid 
} from '@heroicons/react/24/solid'
import { clsx } from 'clsx'
import CommentModal from '@/components/common/CommentModal'

interface PostMedia {
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  width?: number
  height?: number
}

interface PostAuthor {
  _id: string
  username: string
  profile: {
    avatar?: string
    fullName?: string
    isVerified: boolean
  }
}

interface PostComment {
  _id: string
  author: PostAuthor
  text: string
  likes: string[]
  replies: any[]
  createdAt: string
}

interface Post {
  _id: string
  author: PostAuthor
  caption?: string
  media: PostMedia[]
  hashtags: string[]
  mentions: string[]
  likes: string[]
  comments: PostComment[]
  stats: {
    likesCount: number
    commentsCount: number
    sharesCount: number
    viewsCount: number
  }
  location?: {
    name: string
    coordinates?: [number, number]
  }
  hideLikeCount: boolean
  commentsDisabled: boolean
  timeAgo: string
  createdAt: string
}

interface PostCardProps {
  post: Post
  currentUserId?: string
  onLike: (postId: string) => void
  onComment: (postId: string, text: string) => Promise<{ comment: PostComment; commentsCount: number }>
  onShare?: (postId: string) => void
  onSave?: (postId: string) => void
  onDelete?: (postId: string) => void
  onArchive?: (postId: string) => void
  onEdit?: (postId: string) => void
  onReport?: (postId: string) => void
  onUserClick?: (username: string) => void
  className?: string
}

export default function PostCard({
  post,
  currentUserId,
  onLike,
  onComment,
  onShare,
  onSave,
  onDelete,
  onArchive,
  onEdit,
  onReport,
  onUserClick = () => {},
  className
}: PostCardProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [liked, setLiked] = useState(currentUserId ? post.likes.includes(currentUserId) : false)
  const [saved, setSaved] = useState(false) // You'd track this in your app state
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const isOwnPost = currentUserId === post.author._id

  const handleLike = () => {
    setLiked(!liked)
    onLike(post._id)
  }

  const handleShare = () => {
    onShare?.(post._id)
  }

  const handleSave = () => {
    setSaved(!saved)
    onSave?.(post._id)
  }

  const handleDelete = () => {
    setShowDeleteConfirm(false)
    setShowDropdown(false)
    onDelete?.(post._id)
  }

  const handleArchive = () => {
    setShowDropdown(false)
    onArchive?.(post._id)
  }

  const handleEdit = () => {
    setShowDropdown(false)
    onEdit?.(post._id)
  }

  const handleReport = () => {
    setShowDropdown(false)
    onReport?.(post._id)
  }

  const formatHashtags = (text: string) => {
    return text.replace(/#(\w+)/g, '<span class="text-primary-400 hover:underline cursor-pointer">#$1</span>')
  }

  const formatMentions = (text: string) => {
    return text.replace(/@(\w+)/g, '<span class="text-primary-400 hover:underline cursor-pointer">@$1</span>')
  }

  return (
    <article className={clsx('bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-4 mb-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onUserClick(post.author.username)}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-primary">
              {post.author.profile.avatar ? (
                <img
                  src={post.author.profile.avatar}
                  alt={`${post.author.username}'s avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-medium">
                  {post.author.username[0].toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-white">{post.author.username}</span>
                {post.author.profile.isVerified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {post.location && (
                <p className="text-xs text-gray-400">{post.location.name}</p>
              )}
            </div>
          </button>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-dark-surface rounded-lg shadow-lg border border-dark-border py-2 z-50">
              {isOwnPost ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-white hover:bg-dark-hover flex items-center space-x-3 transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit post</span>
                  </button>
                  <button
                    onClick={handleArchive}
                    className="w-full px-4 py-2 text-left text-white hover:bg-dark-hover flex items-center space-x-3 transition-colors"
                  >
                    <ArchiveBoxIcon className="w-4 h-4" />
                    <span>Archive post</span>
                  </button>
                  <hr className="border-dark-border my-2" />
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(true)
                      setShowDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-dark-hover flex items-center space-x-3 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete post</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleReport}
                  className="w-full px-4 py-2 text-left text-red-400 hover:bg-dark-hover flex items-center space-x-3 transition-colors"
                >
                  <FlagIcon className="w-4 h-4" />
                  <span>Report post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Media */}
      <div className="relative mb-3 rounded-lg overflow-hidden bg-black/5 dark:bg-black/20">
        {post.media.length > 0 && (
          <div className="relative w-full max-h-[600px] flex items-center justify-center bg-black/5">
            {post.media[currentMediaIndex].type === 'image' ? (
              <img
                src={post.media[currentMediaIndex].url}
                alt="Post media"
                className="w-full h-auto max-h-[600px] object-contain"
              />
            ) : (
              <video
                src={post.media[currentMediaIndex].url}
                className="w-full h-auto max-h-[600px] object-contain"
                controls
                poster={post.media[currentMediaIndex].thumbnail}
              />
            )}

            {/* Media navigation */}
            {post.media.length > 1 && (
              <>
                <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded-full text-white text-sm">
                  {currentMediaIndex + 1} / {post.media.length}
                </div>
                
                {currentMediaIndex > 0 && (
                  <button
                    onClick={() => setCurrentMediaIndex(currentMediaIndex - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                
                {currentMediaIndex < post.media.length - 1 && (
                  <button
                    onClick={() => setCurrentMediaIndex(currentMediaIndex + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Media dots indicator */}
        {post.media.length > 1 && (
          <div className="flex justify-center space-x-1 mt-3">
            {post.media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={clsx(
                  'w-2 h-2 rounded-full transition-colors',
                  index === currentMediaIndex ? 'bg-primary-500' : 'bg-gray-600'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              liked ? 'text-red-500' : 'text-gray-400 hover:text-white'
            )}
          >
            {liked ? (
              <HeartIconSolid className="w-6 h-6" />
            ) : (
              <HeartIcon className="w-6 h-6" />
            )}
          </button>

          {!post.commentsDisabled && (
            <button
              onClick={() => setShowComments(true)}
              className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
            >
              <ChatBubbleLeftIcon className="w-6 h-6" />
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <ShareIcon className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={handleSave}
          className={clsx(
            'p-2 rounded-lg transition-colors',
            saved ? 'text-primary-500' : 'text-gray-400 hover:text-white'
          )}
        >
          {saved ? (
            <BookmarkIconSolid className="w-6 h-6" />
          ) : (
            <BookmarkIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Likes count */}
      {!post.hideLikeCount && post.stats.likesCount > 0 && (
        <p className="text-gray-900 dark:text-white font-semibold text-sm mb-2">
          {post.stats.likesCount.toLocaleString()} {post.stats.likesCount === 1 ? 'like' : 'likes'}
        </p>
      )}

      {/* Caption */}
      {post.caption && (
        <div className="mb-2">
          <p className="text-gray-900 dark:text-white text-sm">
            <button
              onClick={() => onUserClick(post.author.username)}
              className="font-medium hover:opacity-80 transition-opacity mr-2"
            >
              {post.author.username}
            </button>
            <span 
              dangerouslySetInnerHTML={{
                __html: formatMentions(formatHashtags(post.caption))
              }}
            />
          </p>
        </div>
      )}

      {/* Comments preview */}
      {post.stats.commentsCount > 0 && (
        <div className="mb-2">
          <button
            onClick={() => setShowComments(true)}
            className="text-gray-400 hover:text-white text-sm mb-2 transition-colors"
          >
            View all {post.stats.commentsCount} comments
          </button>
          
          {post.comments && post.comments.length > 0 && (
            post.comments.slice(0, 2).map((comment) => (
              <div key={comment._id} className="text-white mb-1">
                <button
                  onClick={() => onUserClick(comment.author.username)}
                  className="font-medium hover:opacity-80 transition-opacity mr-2"
                >
                  {comment.author.username}
                </button>
                <span className="text-gray-300">{comment.text}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Time ago */}
      <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">{post.timeAgo}</p>

      {/* Comment Modal */}
      <CommentModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        contentId={post._id}
        contentType="post"
        comments={post.comments || []}
        onAddComment={onComment}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-surface rounded-lg p-6 max-w-sm w-full mx-4 border border-dark-border">
            <h3 className="text-lg font-semibold text-white mb-4">Delete Post?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 text-white bg-dark-hover rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}