import { 
  PhotoIcon, 
  VideoCameraIcon, 
  ChatBubbleLeftRightIcon,
  BellAlertIcon,
  UserGroupIcon,
  CloudArrowUpIcon,
  BoltIcon,
  LockClosedIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const Features = () => {
  const features = [
    {
      icon: PhotoIcon,
      title: 'Posts',
      description: 'Share photos and videos with captions, hashtags, and mentions. Support for multiple media files per post.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: VideoCameraIcon,
      title: 'Reels',
      description: 'Create and watch short-form vertical videos with music, trending content, and engaging features.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: CloudArrowUpIcon,
      title: 'Stories',
      description: '24-hour ephemeral content with story highlights, privacy controls, and viewer tracking.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Direct Messages',
      description: 'Real-time messaging with text, images, videos, emoji reactions, and read receipts.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BellAlertIcon,
      title: 'Notifications',
      description: 'Stay updated with real-time notifications for likes, comments, follows, and messages.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: UserGroupIcon,
      title: 'Social Connections',
      description: 'Follow users, view followers/following lists, search for people, and get personalized suggestions.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: HeartIcon,
      title: 'Interactions',
      description: 'Like, comment, reply, share, and save content. Engage with your community in meaningful ways.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: BoltIcon,
      title: 'Real-time Updates',
      description: 'Socket.IO powered live updates for messages, typing indicators, and online status.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: CloudArrowUpIcon,
      title: 'Media Upload',
      description: 'Cloudinary-powered image and video hosting with automatic optimization and thumbnails.',
      color: 'from-teal-500 to-green-500'
    },
    {
      icon: MagnifyingGlassIcon,
      title: 'Discovery',
      description: 'Explore trending posts and reels, search by hashtags, discover new content and creators.',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: LockClosedIcon,
      title: 'Privacy & Security',
      description: 'Private accounts, blocked users, secure authentication with JWT, and profile customization.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: ShareIcon,
      title: 'Content Management',
      description: 'Archive posts, manage highlights, customize feed, and control your content visibility.',
      color: 'from-amber-500 to-yellow-500'
    }
  ]

  const techStack = {
    frontend: [
      { name: 'React', icon: '⚛️' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Vite', icon: '⚡' },
      { name: 'TailwindCSS', icon: '🎨' },
      { name: 'Zustand', icon: '🐻' },
      { name: 'Framer Motion', icon: '🎭' }
    ],
    backend: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express', icon: '🚂' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Socket.IO', icon: '🔌' },
      { name: 'JWT Auth', icon: '🔐' },
      { name: 'Bcrypt', icon: '🔒' }
    ],
    infrastructure: [
      { name: 'Cloudinary', icon: '☁️' },
      { name: 'WebSockets', icon: '⚡' },
      { name: 'REST API', icon: '🌐' },
      { name: 'Redis Cache', icon: '💾' }
    ]
  }

  const stats = [
    { label: 'Features', value: '12+' },
    { label: 'Tech Stack', value: '16+' },
    { label: 'Real-time', value: '100%' },
    { label: 'Full-Stack', value: '✨' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-dark-bg pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            SocialVibe Features
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            A complete social media platform with real-time capabilities, built from scratch
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-dark-surface/80 backdrop-blur-sm rounded-xl p-6 border border-dark-border text-center"
            >
              <div className="text-3xl font-bold text-primary-500 mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-white mb-8 text-center"
        >
          Core Features
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-dark-border hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-white mb-8 text-center"
        >
          Tech Stack
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-dark-border"
          >
            <h3 className="text-xl font-semibold text-primary-400 mb-4 flex items-center">
              <span className="text-2xl mr-2">🎨</span> Frontend
            </h3>
            <div className="space-y-3">
              {techStack.frontend.map((tech, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-dark-border"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
              <span className="text-2xl mr-2">⚙️</span> Backend
            </h3>
            <div className="space-y-3">
              {techStack.backend.map((tech, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Infrastructure */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-surface/50 backdrop-blur-sm rounded-xl p-6 border border-dark-border"
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
              <span className="text-2xl mr-2">🚀</span> Infrastructure
            </h3>
            <div className="space-y-3">
              {techStack.infrastructure.map((tech, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Developer Credits */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-500/20"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white">
              SG
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Built by Satyam Govind Rao</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Full-stack developer passionate about building modern, scalable web applications. 
              SocialVibe showcases expertise in React, Node.js, real-time communications, and cloud infrastructure.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/satyamgovindrao" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-dark-surface hover:bg-dark-hover rounded-lg text-white transition-colors border border-dark-border flex items-center space-x-2"
              >
                <span>🐙</span>
                <span>GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/satyamgovindrao" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center space-x-2"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <a 
                href="mailto:satyam@example.com" 
                className="px-6 py-2 bg-dark-surface hover:bg-dark-hover rounded-lg text-white transition-colors border border-dark-border flex items-center space-x-2"
              >
                <span>📧</span>
                <span>Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Info */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-dark-surface/30 backdrop-blur-sm rounded-xl p-6 border border-dark-border"
        >
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Project Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Full authentication system with JWT</span>
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Real-time messaging with Socket.IO</span>
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Cloud media storage with Cloudinary</span>
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Responsive design for all devices</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>RESTful API architecture</span>
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>MongoDB database with optimized queries</span>
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>TypeScript for type safety</span>
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Modern UI with TailwindCSS</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-4 mt-12 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 SocialVibe - Built with ❤️ by Satyam Govind Rao
        </p>
      </div>
    </div>
  )
}

export default Features

