import express from 'express';
import { param, query } from 'express-validator';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getUnreadCount
} from '../controllers/notificationController';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';

const router = express.Router();

// All notification routes require authentication
router.use(protect);

// Get notifications
router.get('/',
  [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 and 50'),
    query('unreadOnly')
      .optional()
      .isBoolean()
      .withMessage('unreadOnly must be a boolean')
  ],
  validateRequest,
  getNotifications
);

// Get unread notification count
router.get('/unread-count', getUnreadCount);

// Mark notification as read
router.patch('/:notificationId/read',
  [
    param('notificationId')
      .isMongoId()
      .withMessage('Invalid notification ID')
  ],
  validateRequest,
  markNotificationAsRead
);

// Mark all notifications as read
router.patch('/read-all', markAllNotificationsAsRead);

// Delete notification
router.delete('/:notificationId',
  [
    param('notificationId')
      .isMongoId()
      .withMessage('Invalid notification ID')
  ],
  validateRequest,
  deleteNotification
);

export default router;