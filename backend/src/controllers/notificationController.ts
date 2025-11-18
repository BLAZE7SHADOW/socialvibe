import { Request, Response, NextFunction } from 'express';
import Notification from '../models/Notification';
import { AppError, catchAsync } from '../middleware/errorHandler';

// Get user notifications
export const getNotifications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const unreadOnly = req.query.unreadOnly === 'true';
  const skip = (page - 1) * limit;

  if (!userId) {
    return next(new AppError('User not authenticated', 401));
  }

  const query: any = { recipient: userId };
  if (unreadOnly) {
    query.isRead = false;
  }

  const notifications = await Notification.find(query)
    .populate('sender', 'username profile.avatar profile.fullName profile.isVerified')
    .populate('entityId') // Dynamically populate based on entityType
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalNotifications = await Notification.countDocuments(query);
  const unreadCount = await Notification.countDocuments({ 
    recipient: userId, 
    isRead: false 
  });

  res.status(200).json({
    status: 'success',
    data: {
      notifications,
      unreadCount,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalNotifications / limit),
        totalNotifications,
        hasNext: page * limit < totalNotifications,
        hasPrevious: page > 1
      }
    }
  });
});

// Mark notification as read
export const markNotificationAsRead = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { notificationId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return next(new AppError('User not authenticated', 401));
  }

  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    return next(new AppError('Notification not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { notification }
  });
});

// Mark all notifications as read
export const markAllNotificationsAsRead = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  if (!userId) {
    return next(new AppError('User not authenticated', 401));
  }

  await Notification.updateMany(
    { recipient: userId, isRead: false },
    { isRead: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'All notifications marked as read'
  });
});

// Delete notification
export const deleteNotification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { notificationId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return next(new AppError('User not authenticated', 401));
  }

  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    recipient: userId
  });

  if (!notification) {
    return next(new AppError('Notification not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Notification deleted'
  });
});

// Get unread notification count
export const getUnreadCount = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  if (!userId) {
    return next(new AppError('User not authenticated', 401));
  }

  const unreadCount = await Notification.countDocuments({
    recipient: userId,
    isRead: false
  });

  res.status(200).json({
    status: 'success',
    data: { unreadCount }
  });
});

// Helper function to create notifications
export const createNotification = async (
  recipientId: string,
  senderId: string,
  type: 'follow' | 'like' | 'comment' | 'reply' | 'mention' | 'message',
  entityType: 'post' | 'reel' | 'story' | 'comment' | 'message' | 'user',
  entityId?: string,
  customMessage?: string
) => {
  // Don't send notification to yourself
  if (recipientId === senderId) {
    return null;
  }

  // Generate default message based on type
  let message = customMessage;
  if (!message) {
    switch (type) {
      case 'follow':
        message = 'started following you';
        break;
      case 'like':
        message = `liked your ${entityType}`;
        break;
      case 'comment':
        message = `commented on your ${entityType}`;
        break;
      case 'reply':
        message = 'replied to your comment';
        break;
      case 'mention':
        message = `mentioned you in a ${entityType}`;
        break;
      case 'message':
        message = 'sent you a message';
        break;
      default:
        message = 'interacted with your content';
    }
  }

  try {
    // Try to update existing notification or create new one
    const notification = await Notification.findOneAndUpdate(
      {
        recipient: recipientId,
        sender: senderId,
        type,
        entityId: entityId || null
      },
      {
        message,
        isRead: false,
        entityType,
        createdAt: new Date() // Update timestamp for existing notifications
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};