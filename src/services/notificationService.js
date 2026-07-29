import { mockNotifications } from '../utils/mockData';

const simulateNetwork = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 150));

export const notificationService = {
  getNotifications: async () => {
    return await simulateNetwork(mockNotifications);
  },

  markAsRead: async (id) => {
    const notif = mockNotifications.find((n) => n.id === id);
    if (notif) notif.read = true;
    return await simulateNetwork({ success: true, notification: notif });
  },

  createAnnouncement: async (announcementData) => {
    const newNotif = {
      id: mockNotifications.length + 1,
      title: announcementData.title,
      message: announcementData.message,
      read: false,
      time: 'Just now',
      category: announcementData.type || 'Placement Alert'
    };
    mockNotifications.unshift(newNotif);
    return await simulateNetwork({ success: true, notification: newNotif });
  }
};
