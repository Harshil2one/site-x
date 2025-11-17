/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCAOZgp1Sjla4sVd2wfLdBi4G7UGRz5ViI",
  authDomain: "bigbite-e2a3f.firebaseapp.com",
  projectId: "bigbite-e2a3f",
  storageBucket: "bigbite-e2a3f.firebasestorage.app",
  messagingSenderId: "279298965736",
  appId: "1:279298965736:web:89eb0837e83ce94606c95d",
  measurementId: "G-XN0ZDHR4V3",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message:", payload);

  const { title, body, icon } = payload;

  self.registration.showNotification(title, {
    body: body,
    icon: icon || "/logo.png",
  });
});
