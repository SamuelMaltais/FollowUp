import { Platform, Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Set the notification handler globally.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class NotificationManager {
  expoPushToken: any;
  notificationListener: any;
  channels: any;
  responseListener: any;
  constructor() {
    // Initialize state values.
    this.expoPushToken = "";
    this.channels = [];
    this.notificationListener = null;
    this.responseListener = null;

    // Kick off the setup.
    this.init();
  }

  async init() {
    // Request permissions and retrieve the push token.
    this.expoPushToken = await this.registerForPushNotificationsAsync();

    // On Android, retrieve the notification channels.
    if (Platform.OS === "android") {
      this.channels = await Notifications.getNotificationChannelsAsync();
    }

    // Set up listeners.
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
        // You can add further handling here.
      }
    );

    this.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
        // Handle responses to the notification (e.g. user tap) here.
      });

    // Schedule an example notification.
    await this.schedulePushNotification();
  }

  async schedulePushNotification() {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Have you taken your medications? 📬",
          body: "It seems your insulin instake is late !!!",
          data: { data: "goes here", test: { test1: "more data" } },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 4, // Trigger after 2 seconds.
        },
      });
      console.log("Notification scheduled.");
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  }

  async registerForPushNotificationsAsync() {
    let token;

    // For Android, set up the notification channel.
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("myNotificationChannel", {
        name: "A channel is needed for the permissions prompt to appear",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // Ensure the device supports notifications.
    if (Device.isDevice) {
      // Get existing permissions.
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Ask for permissions if not already granted.
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notifications!");
        return;
      }

      try {
        // Retrieve the projectId from configuration.
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        const response = await Notifications.getExpoPushTokenAsync({
          projectId,
        });
        token = response.data;
        console.log("Expo push token:", token);
      } catch (e) {
        token = `${e}`;
        console.error("Error getting Expo push token:", e);
      }
    } else {
      Alert.alert("Must use a physical device for Push Notifications");
    }

    return token;
  }

  // Optionally, call this to remove listeners when they are no longer needed.
  cleanup() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
      this.notificationListener = null;
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
      this.responseListener = null;
    }
  }
}
