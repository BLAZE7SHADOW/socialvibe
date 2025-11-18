# 📚 SocialVibe - Complete Technical Documentation

> Your go-to guide for understanding the entire SocialVibe codebase

---

## 📋 Table of Contents

1. [Project Architecture](#project-architecture)
2. [Backend Structure](#backend-structure)
3. [Frontend Structure](#frontend-structure)
4. [Database Models](#database-models)
5. [API Endpoints](#api-endpoints)
6. [Real-time Features](#real-time-features)
7. [Authentication Flow](#authentication-flow)
8. [File Upload System](#file-upload-system)
9. [State Management](#state-management)
10. [Component Hierarchy](#component-hierarchy)
11. [Services Layer](#services-layer)
12. [Code Organization](#code-organization)

---

## 🏗️ Project Architecture

### Tech Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│  - React 18 + TypeScript                                │
│  - Vite (Build Tool)                                    │
│  - TailwindCSS (Styling)                                │
│  - Zustand (State)                                      │
│  - Axios (HTTP)                                         │
│  - Socket.IO Client (Real-time)                         │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP + WebSocket
┌──────────────────▼──────────────────────────────────────┐
│                   BACKEND (Node.js)                      │
│  - Express.js + TypeScript                              │
│  - MongoDB + Mongoose (Database)                        │
│  - Socket.IO (Real-time)                                │
│  - JWT (Authentication)                                 │
│  - Cloudinary (Media Storage)                           │
│  - Redis (Optional Caching)                             │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│              EXTERNAL SERVICES                           │
│  - MongoDB Atlas (Database)                             │
│  - Cloudinary (Media CDN)                               │
│  - Redis Cloud (Caching)                                │
└─────────────────────────────────────────────────────────┘
```

---

## 🔙 Backend Structure

### Directory Layout

```
backend/
├── src/
│   ├── controllers/          # Request handlers (business logic)
│   │   ├── authController.ts        # Authentication logic
│   │   ├── userController.ts        # User management
│   │   ├── postController.ts        # Post operations
│   │   ├── reelController.ts        # Reel operations
│   │   ├── storyController.ts       # Story operations
│   │   ├── messageController.ts     # Messaging logic
│   │   ├── notificationController.ts # Notifications
│   │   └── uploadController.ts      # File uploads
│   │
│   ├── models/               # MongoDB schemas
│   │   ├── User.ts           # User model
│   │   ├── Post.ts           # Post model
│   │   ├── Reel.ts           # Reel model
│   │   ├── Story.ts          # Story model
│   │   ├── Message.ts        # Message model
│   │   └── Notification.ts   # Notification model
│   │
│   ├── routes/               # API route definitions
│   │   ├── auth.ts           # /api/auth/*
│   │   ├── user.ts           # /api/users/*
│   │   ├── post.ts           # /api/posts/*
│   │   ├── reel.ts           # /api/reels/*
│   │   ├── story.ts          # /api/stories/*
│   │   ├── message.ts        # /api/messages/*
│   │   ├── notification.ts   # /api/notifications/*
│   │   └── upload.ts         # /api/upload/*
│   │
│   ├── middleware/           # Express middlewares
│   │   ├── auth.ts           # JWT verification
│   │   ├── validation.ts     # Input validation
│   │   ├── upload.ts         # Multer file upload
│   │   ├── rateLimiter.ts    # Rate limiting
│   │   ├── errorHandler.ts   # Global error handler
│   │   └── profileComplete.ts # Profile check
│   │
│   ├── socket/               # WebSocket handlers
│   │   └── socketHandler.ts  # Socket.IO events
│   │
│   ├── utils/                # Utility functions
│   │   ├── database.ts       # MongoDB connection
│   │   ├── cloudinary.ts     # Cloudinary setup
│   │   ├── jwt.ts            # JWT helpers
│   │   └── redis.ts          # Redis connection
│   │
│   └── server.ts             # Entry point
│
├── package.json
└── tsconfig.json
```

---

## 🎨 Frontend Structure

### Directory Layout

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/           # Shared components
│   │   │   ├── CommentModal.tsx
│   │   │   ├── ConnectionStatus.tsx
│   │   │   ├── GlobalLoading.tsx
│   │   │   ├── NotificationsManager.tsx
│   │   │   ├── NotificationToast.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── layouts/          # Layout components
│   │   │   ├── MainLayout.tsx      # Main app layout
│   │   │   └── AuthLayout.tsx      # Login/Register layout
│   │   │
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   └── AvatarUpload.tsx
│   │   │
│   │   ├── post/             # Post-related components
│   │   │   ├── PostCard.tsx
│   │   │   └── CreatePostModal.tsx
│   │   │
│   │   ├── reel/             # Reel-related components
│   │   │   ├── ReelPlayer.tsx
│   │   │   └── CreateReelModal.tsx
│   │   │
│   │   ├── story/            # Story-related components
│   │   │   ├── StoryRing.tsx
│   │   │   ├── StoriesRing.tsx
│   │   │   ├── StoryViewer.tsx
│   │   │   └── CreateStoryModal.tsx
│   │   │
│   │   ├── message/          # Messaging components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── ConversationsList.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── NewConversationModal.tsx
│   │   │
│   │   └── user/             # User-related components
│   │       ├── FollowButton.tsx
│   │       ├── FollowersModal.tsx
│   │       ├── ProfileCompletionModal.tsx
│   │       └── UserSearchModal.tsx
│   │
│   ├── pages/                # Page components (routes)
│   │   ├── Home.tsx          # Feed page
│   │   ├── Explore.tsx       # Explore page
│   │   ├── Reels.tsx         # Reels feed
│   │   ├── Messages.tsx      # Messaging page
│   │   ├── Profile.tsx       # User profile
│   │   ├── Settings.tsx      # Settings page
│   │   ├── Features.tsx      # Features showcase
│   │   ├── Login.tsx         # Login page
│   │   ├── Register.tsx      # Registration page
│   │   └── NotFound.tsx      # 404 page
│   │
│   ├── services/             # API service layer
│   │   ├── api.ts            # Axios instance
│   │   ├── auth.ts           # Auth API calls
│   │   ├── userService.ts    # User API calls
│   │   ├── postService.ts    # Post API calls
│   │   ├── reelService.ts    # Reel API calls
│   │   ├── storyService.ts   # Story API calls
│   │   ├── messageService.ts # Message API calls
│   │   ├── notificationService.ts # Notification API
│   │   └── socketService.ts  # Socket.IO client
│   │
│   ├── store/                # Zustand state stores
│   │   ├── authStore.ts      # Authentication state
│   │   └── themeStore.ts     # Theme preferences
│   │
│   ├── types/                # TypeScript types
│   │   ├── api.ts            # API response types
│   │   └── auth.ts           # Auth types
│   │
│   ├── styles/               # Global styles
│   │   └── globals.css       # Tailwind + custom CSS
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useAuthError.ts
│   │
│   ├── App.tsx               # Root component
│   └── main.tsx              # Entry point
│
├── public/                   # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 💾 Database Models

### User Model (`User.ts`)

```typescript
{
  username: string,           // Unique username
  email: string,              // Unique email
  password: string,           // Hashed password
  profile: {
    fullName: string,
    bio: string,
    avatar: string,          // Cloudinary URL
    website: string,
    location: string,
    dateOfBirth: Date,
    isVerified: boolean,
    isPrivate: boolean,
    completedProfile: boolean
  },
  stats: {
    postsCount: number,
    followersCount: number,
    followingCount: number
  },
  followers: [ObjectId],      // Array of User IDs
  following: [ObjectId],       // Array of User IDs
  blockedUsers: [ObjectId],    // Array of User IDs
  refreshTokens: [string],     // Array of valid refresh tokens
  createdAt: Date,
  updatedAt: Date
}
```

**Key Methods:**
- `comparePassword(password)` - Verify password
- `generateAccessToken()` - Create JWT access token
- `generateRefreshToken()` - Create JWT refresh token

---

### Post Model (`Post.ts`)

```typescript
{
  author: ObjectId,            // Reference to User
  caption: string,
  media: [{
    type: 'image' | 'video',
    url: string,
    thumbnail: string,
    width: number,
    height: number
  }],
  hashtags: [string],
  mentions: [ObjectId],        // Referenced Users
  location: {
    name: string,
    coordinates: [longitude, latitude]
  },
  likes: [ObjectId],           // Array of User IDs
  comments: [{
    _id: ObjectId,
    author: ObjectId,
    text: string,
    likes: [ObjectId],
    replies: [ObjectId],
    createdAt: Date
  }],
  hideLikeCount: boolean,
  commentsDisabled: boolean,
  isArchived: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Virtual Fields:**
- `stats.likesCount` - Total likes
- `stats.commentsCount` - Total comments
- `stats.sharesCount` - Total shares
- `stats.viewsCount` - Total views

---

### Reel Model (`Reel.ts`)

```typescript
{
  author: ObjectId,
  videoUrl: string,            // Cloudinary video URL
  thumbnailUrl: string,        // Auto-generated thumbnail
  caption: string,
  music: {
    name: string,
    artist: string,
    url: string,
    duration: number
  },
  videoDetails: {
    duration: number,
    width: number,
    height: number,
    aspectRatio: number
  },
  hashtags: [string],
  mentions: [ObjectId],
  location: { name: string },
  likes: [ObjectId],
  comments: [ObjectId],
  shares: [ObjectId],
  saves: [ObjectId],
  views: [ObjectId],
  isArchived: boolean,
  createdAt: Date
}
```

---

### Story Model (`Story.ts`)

```typescript
{
  author: ObjectId,
  media: {
    type: 'image' | 'video',
    url: string,
    thumbnail: string
  },
  caption: string,
  hashtags: [string],
  mentions: [ObjectId],
  views: [{
    user: ObjectId,
    viewedAt: Date
  }],
  expiresAt: Date,             // 24 hours from creation
  isHighlight: boolean,
  highlightTitle: string,
  privacy: 'public' | 'followers' | 'close-friends',
  isArchived: boolean,
  createdAt: Date
}
```

---

### Message Model (`Message.ts`)

```typescript
{
  conversation: {
    participants: [ObjectId],  // 2 users for DM
    lastMessage: string,
    lastMessageAt: Date
  },
  sender: ObjectId,
  recipient: ObjectId,
  content: {
    text: string,
    media: {
      type: 'image' | 'video',
      url: string
    }
  },
  reactions: [{
    user: ObjectId,
    emoji: string
  }],
  isRead: boolean,
  readAt: Date,
  isEdited: boolean,
  isDeleted: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

### Notification Model (`Notification.ts`)

```typescript
{
  recipient: ObjectId,
  sender: ObjectId,
  type: 'like' | 'comment' | 'follow' | 'mention' | 'story_view' | 'message',
  content: {
    text: string,
    link: string
  },
  postId: ObjectId,            // Optional
  reelId: ObjectId,            // Optional
  commentId: ObjectId,         // Optional
  storyId: ObjectId,           // Optional
  isRead: boolean,
  createdAt: Date
}
```

---

## 🛣️ API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create new user account | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/logout` | Logout user | ✅ |
| POST | `/refresh-token` | Get new access token | ❌ |
| GET | `/me` | Get current user | ✅ |
| PUT | `/password` | Update password | ✅ |
| DELETE | `/account` | Delete account | ✅ |

**Example: Register**
```javascript
POST /api/auth/register
Body: {
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
Response: {
  "success": true,
  "user": { ...userObject },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

---

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile/:username` | Get user profile | ✅ |
| PUT | `/profile` | Update profile | ✅ |
| POST | `/avatar` | Upload avatar | ✅ |
| POST | `/follow/:userId` | Follow user | ✅ |
| DELETE | `/follow/:userId` | Unfollow user | ✅ |
| GET | `/search` | Search users | ✅ |
| GET | `/suggestions` | Get follow suggestions | ✅ |
| POST | `/block/:userId` | Block user | ✅ |
| DELETE | `/block/:userId` | Unblock user | ✅ |
| GET | `/followers/:userId` | Get followers list | ✅ |
| GET | `/following/:userId` | Get following list | ✅ |
| PUT | `/complete-profile` | Complete profile setup | ✅ |

---

### Post Routes (`/api/posts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create post | ✅ |
| GET | `/feed` | Get personalized feed | ✅ |
| GET | `/:postId` | Get single post | ✅ |
| DELETE | `/:postId` | Delete post | ✅ |
| POST | `/:postId/like` | Like/unlike post | ✅ |
| POST | `/:postId/comment` | Add comment | ✅ |
| PUT | `/:postId/archive` | Archive/unarchive post | ✅ |
| GET | `/user/:userId` | Get user's posts | ✅ |
| GET | `/trending` | Get trending posts | ✅ |
| GET | `/search` | Search posts by hashtag | ✅ |

**Example: Create Post**
```javascript
POST /api/posts
Body: FormData {
  "caption": "Beautiful sunset! #nature #photography",
  "media": [File, File],  // Images/videos
  "location": "Malibu Beach"
}
Response: {
  "success": true,
  "post": { ...postObject }
}
```

---

### Reel Routes (`/api/reels`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create reel | ✅ |
| GET | `/feed` | Get reels feed | ✅ |
| GET | `/:reelId` | Get single reel | ✅ |
| DELETE | `/:reelId` | Delete reel | ✅ |
| POST | `/:reelId/like` | Like/unlike reel | ✅ |
| POST | `/:reelId/save` | Save/unsave reel | ✅ |
| POST | `/:reelId/share` | Share reel | ✅ |
| POST | `/:reelId/comment` | Add comment | ✅ |
| GET | `/user/:userId` | Get user's reels | ✅ |
| GET | `/trending` | Get trending reels | ✅ |

---

### Story Routes (`/api/stories`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create story | ✅ |
| GET | `/active` | Get active stories | ✅ |
| GET | `/:storyId` | Get single story | ✅ |
| DELETE | `/:storyId` | Delete story | ✅ |
| GET | `/user/:userId` | Get user's stories | ✅ |
| POST | `/highlights` | Add to highlights | ✅ |
| PUT | `/:storyId/privacy` | Update privacy | ✅ |
| GET | `/:storyId/viewers` | Get story viewers | ✅ |
| POST | `/cleanup` | Cleanup expired stories | ✅ |

---

### Message Routes (`/api/messages`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/conversations` | Get all conversations | ✅ |
| GET | `/conversations/:conversationId` | Get messages | ✅ |
| POST | `/` | Send message | ✅ |
| PUT | `/:messageId` | Edit message | ✅ |
| DELETE | `/:messageId` | Delete message | ✅ |
| POST | `/:messageId/reaction` | Add reaction | ✅ |
| PUT | `/:messageId/read` | Mark as read | ✅ |
| GET | `/search` | Search messages | ✅ |

---

### Notification Routes (`/api/notifications`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all notifications | ✅ |
| PUT | `/:notificationId/read` | Mark as read | ✅ |
| PUT | `/read-all` | Mark all as read | ✅ |
| DELETE | `/:notificationId` | Delete notification | ✅ |
| GET | `/unread-count` | Get unread count | ✅ |

---

### Upload Routes (`/api/upload`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/image` | Upload single image | ✅ |
| POST | `/images` | Upload multiple images | ✅ |
| POST | `/video` | Upload video | ✅ |

---

## 🔄 Real-time Features (Socket.IO)

### Connection Flow

```javascript
// Client connects
socket.on('connect', () => {
  // Authenticate socket
  socket.emit('authenticate', { token: 'jwt_token' });
});

// Server authenticates
socket.on('authenticate', (data) => {
  // Verify JWT
  // Store userId with socket
  // Join user's personal room
});
```

### Socket Events

#### Client → Server Events

| Event | Description | Payload |
|-------|-------------|---------|
| `authenticate` | Authenticate socket | `{ token }` |
| `join_conversation` | Join conversation room | `{ conversationId }` |
| `leave_conversation` | Leave conversation room | `{ conversationId }` |
| `typing` | User is typing | `{ conversationId }` |
| `stop_typing` | User stopped typing | `{ conversationId }` |
| `mark_messages_read` | Mark messages as read | `{ conversationId }` |

#### Server → Client Events

| Event | Description | Payload |
|-------|-------------|---------|
| `authenticated` | Socket authenticated | `{ userId }` |
| `new_message` | New message received | `{ message, conversationId }` |
| `message_edited` | Message edited | `{ messageId, newContent }` |
| `message_deleted` | Message deleted | `{ messageId }` |
| `message_reaction` | Reaction added | `{ messageId, reaction }` |
| `typing` | Someone is typing | `{ userId, username }` |
| `stop_typing` | Stopped typing | `{ userId }` |
| `user_online` | User came online | `{ userId }` |
| `user_offline` | User went offline | `{ userId }` |
| `new_notification` | New notification | `{ notification }` |
| `post_liked` | Post was liked | `{ postId, userId }` |
| `new_comment` | New comment | `{ postId, comment }` |
| `new_follower` | New follower | `{ userId }` |

**Example: Real-time messaging**

```javascript
// Client sends message
socket.emit('send_message', {
  conversationId: '123',
  text: 'Hello!'
});

// Server broadcasts to recipient
io.to(recipientSocketId).emit('new_message', {
  message: { ...messageObject },
  conversationId: '123'
});
```

---

## 🔐 Authentication Flow

### Registration Flow

```
1. User submits registration form
   ↓
2. Frontend validates input
   ↓
3. POST /api/auth/register
   ↓
4. Backend validates:
   - Username uniqueness
   - Email uniqueness
   - Password strength
   ↓
5. Hash password with bcrypt
   ↓
6. Save user to database
   ↓
7. Generate JWT tokens:
   - Access token (15min)
   - Refresh token (7days)
   ↓
8. Return tokens + user data
   ↓
9. Frontend stores tokens:
   - Access in memory
   - Refresh in localStorage
   ↓
10. Redirect to profile completion
```

### Login Flow

```
1. User submits login form
   ↓
2. POST /api/auth/login
   ↓
3. Find user by email/username
   ↓
4. Compare password with bcrypt
   ↓
5. Generate JWT tokens
   ↓
6. Save refresh token in DB
   ↓
7. Return tokens + user data
   ↓
8. Frontend stores tokens
   ↓
9. Connect Socket.IO
   ↓
10. Redirect to home feed
```

### Token Refresh Flow

```
1. Access token expires (15min)
   ↓
2. API request fails with 401
   ↓
3. Frontend detects 401
   ↓
4. POST /api/auth/refresh-token
   Body: { refreshToken }
   ↓
5. Backend validates refresh token:
   - Check JWT validity
   - Check if token in user's array
   ↓
6. Generate new access token
   ↓
7. Return new access token
   ↓
8. Frontend updates token
   ↓
9. Retry original request
```

### Protected Route Flow

```
1. Request to protected endpoint
   ↓
2. Extract JWT from Authorization header
   ↓
3. Verify JWT signature
   ↓
4. Check expiration
   ↓
5. Extract userId from token
   ↓
6. Fetch user from database
   ↓
7. Attach user to request object
   ↓
8. Continue to controller
```

---

## 📤 File Upload System

### Upload Flow with Cloudinary

```
1. User selects file
   ↓
2. Frontend validates:
   - File size (max 10MB images, 100MB videos)
   - File type (images: jpg, png, gif; videos: mp4, mov)
   ↓
3. Create FormData
   ↓
4. POST to upload endpoint
   ↓
5. Multer middleware processes file:
   - Stores in memory buffer
   - Validates file type
   ↓
6. Controller receives file buffer
   ↓
7. Upload to Cloudinary:
   - For images: optimize, resize
   - For videos: generate thumbnail
   ↓
8. Cloudinary returns URL
   ↓
9. Save URL to database
   ↓
10. Return URL to frontend
   ↓
11. Display uploaded media
```

### Cloudinary Configuration

```javascript
// utils/cloudinary.ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload function
const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });
};
```

### Upload Types

**1. Avatar Upload**
- Single image
- Auto-resize to 400x400
- Stored in `/socialvibe/avatars/` folder

**2. Post Media**
- Multiple images/videos (max 10)
- Images: max 1920px width
- Videos: max 1080p
- Stored in `/socialvibe/posts/` folder

**3. Reel Upload**
- Single video
- Max 60 seconds
- Auto-generate thumbnail
- Stored in `/socialvibe/reels/` folder

**4. Story Upload**
- Single image/video
- 24-hour expiration
- Stored in `/socialvibe/stories/` folder

**5. Message Media**
- Images or videos
- Smaller size limits
- Stored in `/socialvibe/messages/` folder

---

## 🗂️ State Management

### Zustand Stores

#### Auth Store (`authStore.ts`)

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

// Usage in components
const { user, login, logout } = useAuthStore();
```

**Features:**
- Persists user data
- Auto token refresh
- Auth state management
- Loading & error states

#### Theme Store (`themeStore.ts`)

```typescript
interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Usage
const { theme, toggleTheme } = useThemeStore();
```

**Features:**
- Dark/light mode
- Persists preference
- Auto-apply on load

---

## 🎨 Component Hierarchy

### Main App Structure

```
App.tsx
├── Router
│   ├── Public Routes (non-authenticated)
│   │   ├── AuthLayout
│   │   │   ├── Login
│   │   │   └── Register
│   │   │
│   │   └── NotFound
│   │
│   └── Protected Routes (authenticated)
│       └── MainLayout
│           ├── Sidebar Navigation
│           ├── Mobile Bottom Nav
│           ├── Notification Dropdown
│           │
│           └── Route Content
│               ├── Home (Feed)
│               ├── Explore
│               ├── Reels
│               ├── Messages
│               ├── Profile
│               ├── Settings
│               └── Features
│
├── GlobalLoading
├── ErrorBoundary
└── NotificationsManager
```

### Component Patterns

#### 1. Container Components (Pages)

```typescript
// pages/Home.tsx
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch data
  useEffect(() => {
    loadPosts();
  }, []);
  
  // Render UI components
  return (
    <div>
      <CreatePostModal />
      {posts.map(post => <PostCard post={post} />)}
    </div>
  );
}
```

#### 2. Presentational Components (UI)

```typescript
// components/post/PostCard.tsx
interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
}

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  // Pure UI logic
  return (
    <article>
      <PostHeader author={post.author} />
      <PostMedia media={post.media} />
      <PostActions onLike={() => onLike(post._id)} />
    </article>
  );
}
```

#### 3. Modal Components

```typescript
// components/ui/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{title}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

---

## 🔌 Services Layer

### API Service Configuration

```typescript
// services/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try to refresh token
      await refreshAccessToken();
      // Retry original request
      return api(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Service Examples

#### Post Service

```typescript
// services/postService.ts
export const postService = {
  // Get feed posts
  getFeedPosts: async (page = 1, limit = 10) => {
    const response = await api.get('/posts/feed', {
      params: { page, limit }
    });
    return response.data;
  },
  
  // Create post
  createPost: async (postData: FormData) => {
    const response = await api.post('/posts', postData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.post;
  },
  
  // Like post
  toggleLikePost: async (postId: string) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },
  
  // Add comment
  addComment: async (postId: string, text: string) => {
    const response = await api.post(`/posts/${postId}/comment`, { text });
    return response.data;
  }
};
```

#### Socket Service

```typescript
// services/socketService.ts
class SocketService {
  private socket: Socket | null = null;
  
  connect() {
    const token = getAccessToken();
    this.socket = io(SOCKET_URL, {
      auth: { token }
    });
    
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });
  }
  
  disconnect() {
    this.socket?.disconnect();
  }
  
  // Join conversation
  joinConversation(conversationId: string) {
    this.socket?.emit('join_conversation', { conversationId });
  }
  
  // Listen for new messages
  onNewMessage(callback: (message: Message) => void) {
    this.socket?.on('new_message', callback);
    return () => this.socket?.off('new_message', callback);
  }
  
  // Send typing indicator
  sendTyping(conversationId: string) {
    this.socket?.emit('typing', { conversationId });
  }
}

export default new SocketService();
```

---

## 📦 Code Organization Best Practices

### 1. Component Structure

```typescript
// ✅ Good: Single Responsibility
// PostCard.tsx - Displays a single post
// CreatePostModal.tsx - Creates new post
// PostList.tsx - Lists multiple posts

// ❌ Bad: Multiple responsibilities
// Posts.tsx - Everything in one file
```

### 2. Props vs State

```typescript
// ✅ Good: Props for parent data, state for local
function PostCard({ post, onLike }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(userId));
}

// ❌ Bad: Duplicating parent state
function PostCard({ post }: PostCardProps) {
  const [post, setPost] = useState(post); // Duplicate!
}
```

### 3. API Error Handling

```typescript
// ✅ Good: Centralized error handling
try {
  const data = await postService.createPost(formData);
  toast.success('Post created!');
} catch (error) {
  if (error.response?.status === 413) {
    toast.error('File too large');
  } else {
    toast.error('Failed to create post');
  }
}

// ❌ Bad: Silent failures
try {
  await postService.createPost(formData);
} catch (error) {
  // Do nothing
}
```

### 4. TypeScript Types

```typescript
// ✅ Good: Shared types
// types/api.ts
export interface Post {
  _id: string;
  author: User;
  caption: string;
  // ...
}

// ❌ Bad: Duplicate types
interface Post { ... } // In PostCard.tsx
interface Post { ... } // In PostList.tsx (different!)
```

### 5. Environment Variables

```typescript
// ✅ Good: Centralized config
// config.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  socketUrl: import.meta.env.VITE_SOCKET_URL
};

// ❌ Bad: Scattered across files
const url = import.meta.env.VITE_API_URL; // In multiple files
```

---

## 🎯 Key Features Implementation

### Feature: Infinite Scroll

```typescript
function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  
  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasMore]);
  
  return (
    <>
      {posts.map(post => <PostCard post={post} />)}
      <div ref={observerRef} />
    </>
  );
}
```

### Feature: Real-time Updates

```typescript
function ChatInterface({ conversationId }) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Join conversation
    socketService.joinConversation(conversationId);
    
    // Listen for new messages
    const unsubscribe = socketService.onNewMessage((message) => {
      if (message.conversationId === conversationId) {
        setMessages(prev => [...prev, message]);
      }
    });
    
    return () => {
      socketService.leaveConversation(conversationId);
      unsubscribe();
    };
  }, [conversationId]);
}
```

### Feature: Optimistic Updates

```typescript
function PostCard({ post }) {
  const handleLike = async () => {
    // Optimistically update UI
    setLiked(true);
    setLikesCount(prev => prev + 1);
    
    try {
      await postService.toggleLikePost(post._id);
    } catch (error) {
      // Revert on error
      setLiked(false);
      setLikesCount(prev => prev - 1);
      toast.error('Failed to like post');
    }
  };
}
```

---

## 🔍 Debugging Tips

### Backend Debugging

```javascript
// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// Debug socket connections
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  console.log('User:', socket.userId);
});

// Debug database queries
mongoose.set('debug', true);
```

### Frontend Debugging

```typescript
// Log API calls
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method, config.url);
  return config;
});

// Debug socket events
socketService.socket.onAny((event, ...args) => {
  console.log('Socket event:', event, args);
});

// Debug state changes
const { user } = useAuthStore();
useEffect(() => {
  console.log('User changed:', user);
}, [user]);
```

---

## 📊 Performance Optimization

### Backend Optimizations

1. **Database Indexing**
```javascript
// User model
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

// Post model
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ hashtags: 1 });
```

2. **Population Limits**
```javascript
// Only populate needed fields
Post.find()
  .populate('author', 'username profile.avatar profile.isVerified')
  .select('caption media likes comments');
```

3. **Pagination**
```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const posts = await Post.find()
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });
```

### Frontend Optimizations

1. **Code Splitting**
```typescript
// Lazy load pages
const Profile = lazy(() => import('./pages/Profile'));
const Messages = lazy(() => import('./pages/Messages'));
```

2. **Image Optimization**
```typescript
<img
  src={post.media.url}
  loading="lazy"
  decoding="async"
/>
```

3. **Memoization**
```typescript
const PostList = memo(({ posts }) => {
  return posts.map(post => <PostCard key={post._id} post={post} />);
});
```

---

## 🚀 Deployment Checklist

### Backend Deployment

- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB (Atlas)
- [ ] Configure Redis for caching
- [ ] Set secure JWT secrets
- [ ] Enable rate limiting
- [ ] Add compression middleware
- [ ] Configure CORS properly
- [ ] Set up logging (Winston)
- [ ] Enable HTTPS
- [ ] Add health check endpoint

### Frontend Deployment

- [ ] Build production bundle: `npm run build`
- [ ] Set production API URLs
- [ ] Enable service worker (PWA)
- [ ] Configure CDN for assets
- [ ] Optimize images
- [ ] Enable Gzip compression
- [ ] Add error tracking (Sentry)
- [ ] Configure analytics

---

## 📚 Additional Resources

### Official Documentation
- [MongoDB Docs](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [Socket.IO Docs](https://socket.io/docs/v4/)
- [Cloudinary Docs](https://cloudinary.com/documentation)

### Tutorials Used
- JWT Authentication
- Socket.IO Real-time Communication
- File Upload with Multer & Cloudinary
- React State Management with Zustand

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Last Updated:** 2024
**Maintained by:** Satyam Govind Rao

---

*This documentation is continuously updated as new features are added.*

