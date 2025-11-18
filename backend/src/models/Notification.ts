import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  type: 'follow' | 'like' | 'comment' | 'reply' | 'mention' | 'message';
  entityType: 'post' | 'reel' | 'story' | 'comment' | 'message' | 'user';
  entityId?: mongoose.Types.ObjectId;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['follow', 'like', 'comment', 'reply', 'mention', 'message'],
    required: true
  },
  entityType: {
    type: String,
    enum: ['post', 'reel', 'story', 'comment', 'message', 'user'],
    required: true
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: false, // Not required for follow notifications
    refPath: 'entityType'
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, type: 1 });

// Prevent duplicate notifications for the same action
notificationSchema.index({ 
  recipient: 1, 
  sender: 1, 
  type: 1, 
  entityId: 1 
}, { 
  unique: true,
  sparse: true // Allow multiple notifications without entityId (like follows)
});

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;