import { useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCAOZgp1Sjla4sVd2wfLdBi4G7UGRz5ViI",
  authDomain: "bigbite-e2a3f.firebaseapp.com",
  projectId: "bigbite-e2a3f",
  storageBucket: "bigbite-e2a3f.firebasestorage.app",
  messagingSenderId: "279298965736",
  appId: "1:279298965736:web:89eb0837e83ce94606c95d",
  measurementId: "G-XN0ZDHR4V3",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const usePushNotifications = () => {
  const requestPermissionAndGetToken = useCallback(async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      return token;
    }

    return null;
  }, []);

  return { requestPermissionAndGetToken };
};

onMessage(messaging, ({ notification }: any) => {
  new Notification(notification.title, {
    body: notification.body,
    icon: notification.icon,
  });
});
