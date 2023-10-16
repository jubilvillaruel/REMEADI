import * as Notifications from 'expo-notifications';
import { useEffect } from 'react'; // You may need to import React if not already done

// Function to request notification permissions
const getNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Notification permission denied');
    return;
  }
};

// Function to schedule a daily reminder notification
const scheduleDailyReminder = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync(); // Clear any existing notifications

  const trigger = {
    hour: 12, // Set the hour when you want the notification to appear (e.g., 9 AM)
    minute: 16,
    repeats: false, // Repeat daily
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Daily Reminder',
      body: 'Don\'t forget to meditate today!',
    },
    trigger,
  });
};

// Component that handles notification setup and scheduling
function Notification() {
  useEffect(() => {
    // Request notification permissions when the component mounts
    getNotificationPermission();

    // Schedule the daily reminder notification
    scheduleDailyReminder();
  }, []);

  return null; // You can render your UI here
}

export default Notification;