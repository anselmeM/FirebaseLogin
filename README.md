# Firebase Login with Profile Image Upload (Vanilla JavaScript)

This project demonstrates a simple user authentication system using Firebase Authentication with email and password. It also includes a feature for users to upload and display a profile image, stored in the browser's local storage.

## Features

*   **User Authentication:**
    *   User signup with email and password.
    *   User login with email and password.
    *   User sign-out.
    *   Basic password strength validation during signup.
*   **Profile Image Upload:**
    *   Users can upload a profile image.
    *   Profile images are stored in the browser's local storage.
    *   Uploaded profile image is displayed as a preview and as the logo on the welcome page.
    *   Option to remove the profile picture, reverting to a placeholder logo.
*   **Personalized Welcome:**
    *   After login, users are redirected to a welcome page.
    *   The welcome page displays a personalized greeting with the user's username (derived from their email).
*   **Basic Styling:**
    *   Simple and clean user interface using CSS.

## Technologies Used

*   **Firebase:**
    *   Firebase Authentication (for user management).
    *   Firebase Firestore (optional, currently not used for profile images, but could be used for more robust user data storage in the future).
    *   Firebase JavaScript SDK (v9.17.2).
*   **Vanilla JavaScript:**  Project is built using pure JavaScript, HTML, and CSS, without any frontend frameworks.
*   **ionicons:**  For icons in input fields.
*   **fakeimg.pl:** For placeholder logo image.

## Setup Instructions

1.  **Firebase Project Setup:**
    *   Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    *   Enable **Authentication** in your Firebase project (Authentication -> Sign-in methods -> Email/Password).
    *   (Optional) Enable **Firestore** or **Storage** if you plan to extend the app to use these features later.
    *   Create a **Web app** in your Firebase project to get your Firebase configuration.

2.  **Firebase Configuration:**
    *   Copy your Firebase web app configuration object from the Firebase Console (Project settings -> General -> Your apps -> Web app -> Firebase SDK snippet -> Config).
    *   **Important: For simplicity in this project, paste your Firebase configuration directly into `firebase-config.js`, replacing the placeholder values.**
    *   **For better security in real-world applications, especially for server-side code, you should use environment variables or a more secure method to manage your Firebase credentials.**  However, for this client-side demo, direct embedding is used for simplicity.
    *   **Note:**  The `.env` file and `process.env` based configuration in `firebase-config.js` are not functional in this browser-based setup without additional build tools.

3.  **Run the Application:**
    *   Open the `login.html` file in your web browser.
    *   You can then sign up, log in, upload a profile image, and test the application features.


## Local Storage for Profile Images - Limitations

*   This project uses **local storage** to store profile images for simplicity.
*   **Limitations of Local Storage:**
    *   **Limited Storage Space:** Browsers provide limited storage (5-10MB per domain).
    *   **Browser-Specific:** Profile images are only stored in the user's current browser and device.
    *   **Not Scalable:** Local storage is not suitable for large-scale applications or storing many user images.
*   **For a production application, consider using Firebase Storage or a backend database to store profile images for persistence, scalability, and cross-device access.**


---