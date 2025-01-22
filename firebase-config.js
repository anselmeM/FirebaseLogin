import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';
// import { getStorage } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js'; // If you intend to use Firebase Storage later


// firebaseConfig placeholder for github
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // Placeholder for GitHub - REPLACE with your actual API Key
  authDomain: "YOUR_AUTH_DOMAIN",     // Placeholder for GitHub - REPLACE with your actual Auth Domain
  projectId: "YOUR_PROJECT_ID",       // Placeholder for GitHub - REPLACE with your actual Project ID
  storageBucket: "YOUR_STORAGE_BUCKET",  // Placeholder for GitHub - REPLACE with your actual Storage Bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Placeholder for GitHub - REPLACE with your actual Messaging Sender ID
  appId: "YOUR_APP_ID"             // Placeholder for GitHub - REPLACE with your actual App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app); // Export Firebase Storage if you intend to use it later

