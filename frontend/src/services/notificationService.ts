import api from './api'
import type { ApiResponse, PaginatedResponse } from '@/types/api'

export interface NotificationUser {
  _id: string
  username: string
  profile: {
    avatar?: string
    fullName?: string
    isVerified: boolean
  }
}

export interface Notification {
  _id: string
  recipient: string
  sender: NotificationUser
  type: 'follow' | 'like' | 'comment' | 'reply' | 'mention' | 'message'
  entityType: 'post' | 'reel' | 'story' | 'comment' | 'message' | 'user'
  entityId?: string
  message: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationsResponse {
  notifications: Notification[]
  unreadCount: number
  pagination: {
    currentPage: number
    totalPages: number
    totalNotifications: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export const notificationService = {
  // Get notifications
  getNotifications: async (page = 1, limit = 20, unreadOnly = false): Promise<NotificationsResponse> => {
    const response = await api.get<ApiResponse<NotificationsResponse>>('/notifications', {
      params: { page, limit, unreadOnly }
    })
    return response.data.data!
  },

  // Get unread notification count
  getUnreadCount: async (): Promise<number> => {
    const response = await api.get<ApiResponse<{ unreadCount: number }>>('/notifications/unread-count')
    return response.data.data!.unreadCount
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<Notification> => {
    const response = await api.patch<ApiResponse<{ notification: Notification }>>(`/notifications/${notificationId}/read`)
    return response.data.data!.notification
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    await api.patch('/notifications/read-all')
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<void> => {
    await api.delete(`/notifications/${notificationId}`)
  }
}

export default notificationService