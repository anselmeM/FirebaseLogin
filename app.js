import { auth, db } from './firebase-config.js'; // Import auth and db from firebase-config.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'; // Firebase authentication functions
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js'; // Firestore functions

// --- Configuration ---

// Configuration for redirect paths - defines routes for different pages
const PATHS = {
    WELCOME: 'welcome.html', // Path to welcome page
    LOGIN: 'login.html',     // Path to login page
    SIGNUP: 'signup.html',   // Path to signup page
};

// --- Utility Functions ---

// Function to display messages to the user (e.g., success or error messages)
function showMessage(message, type = 'error', isLoading = false) {
    const messageElement = document.getElementById('message'); // Get the message display element from the DOM
    const signupButton = document.querySelector('#signup-form button[type="submit"]'); // Get the signup button to disable during loading

    if (messageElement) {
        messageElement.textContent = message; // Set the text content of the message element to the provided message
        messageElement.className = `message ${type}`; // Set the class name for styling based on the message type ('error' or 'success')

        if (isLoading) {
            messageElement.classList.add('loading'); // Add 'loading' class to display loading spinner
            signupButton && signupButton.setAttribute('disabled', true); // Disable the signup button to prevent multiple submissions
        } else {
            messageElement.classList.remove('loading'); // Remove 'loading' class to hide loading spinner
            signupButton && signupButton.removeAttribute('disabled'); // Enable the signup button
        }
    } else {
        console.error('Message element not found. Falling back to console:', message); // Log an error if the message element is not found in the DOM
    }
}

// Function to validate password strength based on defined rules
function validatePassword(password, rules) {
    if (password.length < rules.minLength) { // Check if password length is less than the minimum required length
        return `Password must be at least ${rules.minLength} characters long.`; // Return error message if too short
    }
    if (rules.requireUppercase && !/[A-Z]/.test(password)) { // Check if uppercase letter is required and missing
        return 'Password must contain at least one uppercase letter.'; // Return error message if uppercase letter is missing
    }
    if (rules.requireNumber && !/[0-9]/.test(password)) { // Check if number is required and missing
        return 'Password must contain at least one number.'; // Return error message if number is missing
    }
    return null; // Return null if password is valid and meets all rules
}

// Function to get form data from a form element
function getFormData(form, fields) {
    return fields.reduce((data, field) => { // Use reduce to iterate over fields and accumulate form data
        data[field] = form[field].value; // Get the value of each field from the form
        return data; // Return the accumulated data object
    }, {}); // Initialize an empty object as the starting value for reduce
}

// --- Event Listeners and Handlers ---

// Signup form event listener
const signupForm = document.getElementById('signup-form'); // Get the signup form element
if (signupForm) { // Check if signup form exists on the page
    signupForm.addEventListener('submit', (e) => { // Add event listener for signup form submission
        e.preventDefault(); // Prevent the default form submission behavior
        // Get email, password, and confirmPassword from the signup form
        const { email, password, confirmPassword } = getFormData(signupForm, ['email', 'password', 'confirmPassword']);
        const emailInput = signupForm.email; // Get the email input element for validation
        emailInput.addEventListener('input', () => { // Add input event listener for real-time email validation
            if (!emailInput.validity.valid) { // Check if the email input value is valid according to HTML validation rules
                showMessage('Invalid email format.'); // Show error message if email format is invalid
            } else {
                showMessage(''); // Clear any previous message if email format is valid
            }
        });

        if (!email) { // Check if email field is empty
            showMessage('Email is required.'); // Show message if email is required
            return; // Exit the function if email is required
        }

        if (!password) { // Check if password field is empty
            showMessage('Password is required.'); // Show message if password is required
            return; // Exit if password is required
        }

        if (!confirmPassword) { // Check if confirm password field is empty
            showMessage('Confirm Password is required.'); // Show message if confirm password is required
            return; // Exit if confirm password is required
        }

        // Password validation
        if (password !== confirmPassword) { // Check if password and confirm password match
            showMessage("Passwords do not match."); // Show error if passwords do not match
            return; // Exit if passwords do not match
        }

        // Password strength validation rules
        const passwordRules = { // Define rules for password validation
            minLength: 8,           // Minimum password length is 8 characters
            requireUppercase: true,  // Password must contain at least one uppercase letter
            requireNumber: true,     // Password must contain at least one number
        };
        const passwordError = validatePassword(password, passwordRules); // Validate password against defined rules
        if (passwordError) { // Check if password validation returned an error
            showMessage(passwordError); // Show the password validation error message
            return; // Exit if password validation failed
        }

        // Create user account using Firebase Authentication
        showMessage('Creating account...', 'loading', true); // Show loading message while creating account
        createUserWithEmailAndPassword(auth, email, password) // Firebase method to create user with email and password
            .then((userCredential) => { // If account creation is successful
                showMessage('Account created successfully!', 'success'); // Show success message
                window.location.href = PATHS.LOGIN; // Redirect user to the login page
            })
            .catch((error) => { // If there's an error during account creation
                showMessage('', 'error', false); // Clear loading message and set message type to error
                if (error.code === 'auth/email-already-in-use') { // Check for specific email-already-in-use error code
                    showMessage('Email already in use. Please use a different email.'); // Show specific error message for email already in use
                } else if (error.code === 'auth/invalid-email') { // Check for invalid-email error code
                    showMessage('Invalid email format.'); // Show specific error message for invalid email format
                } else { // For any other type of error
                    console.error('Error signing up:', error); // Log the error to the console for debugging
                    showMessage('An error occurred during registration. Please try again later.'); // Show generic error message to the user
                }
            });
    });
}

// Signin form event listener
const signinForm = document.getElementById('signin-form'); // Get the signin form element
if (signinForm) { // Check if signin form exists on the page
    signinForm.addEventListener('submit', (e) => { // Add event listener for signin form submission
        e.preventDefault(); // Prevent default form submission
        // Get email and password from the signin form
        const { email, password } = getFormData(signinForm, ['email', 'password']);

        // Sign in user using Firebase Authentication
        showMessage('Signing in...', 'loading', true); // Show loading message while signing in
        signInWithEmailAndPassword(auth, email, password) // Firebase method to sign in user with email and password
            .then((userCredential) => { // If signin is successful
                window.location.href = PATHS.WELCOME; // Redirect user to the welcome page
            })
            .catch((error) => { // If there's an error during signin
                showMessage('', 'error', false); // Clear loading message and set message type to error
                console.error('Error signing in:', error.message); // Log the error message to the console
                showMessage(error.message); // Show error message to the user
            });
    });
}

// Signout button event listener
const signoutButton = document.getElementById('signout-button'); // Get the signout button element
if (signoutButton) { // Check if signout button exists on the page
    signoutButton.addEventListener('click', () => { // Add click event listener to the signout button
        signOut(auth) // Firebase method to sign out the current user
            .then(() => { // If signout is successful
                window.location.href = PATHS.LOGIN; // Redirect user to the login page
            })
            .catch((error) => { // If there's an error during signout
                console.error('Error signing out:', error.message); // Log the error message to the console
                showMessage(error.message); // Show error message to the user
            });
    });
}

// --- Authentication State Listener ---

// Listen for changes in authentication state (user sign in or sign out)
onAuthStateChanged(auth, (user) => { // Firebase method to listen for auth state changes
    const currentPath = window.location.pathname; // Get the current path of the webpage
    const usernameDisplay = document.getElementById('username-display'); // Get the username display element
    const imagePreview = document.getElementById('image-preview'); // Get the image preview element
    const logoImage = document.getElementById('logo-image'); // Get the logo image element

    if (user) { // Check if a user is currently signed in
        // User is signed in
        console.log('User is signed in:', user.email); // Log user's email to the console

        // Display Username
        const username = user.displayName || user.email.split('@')[0]; // Use displayName if available, otherwise use email prefix
        if (usernameDisplay) {
            usernameDisplay.textContent = username; // Set the text content of the username display element to the retrieved username
        }

        // Load Profile Image from Local Storage
        const profileImageDataUrl = localStorage.getItem(`profileImage-${user.uid}`); // Get profile image data URL from local storage
        if (profileImageDataUrl) { // Check if profile image data URL exists in local storage
            imagePreview.src = profileImageDataUrl; // Set the src attribute of the image preview element to the data URL
            imagePreview.style.display = 'block'; // Show the image preview element
            logoImage.src = profileImageDataUrl; // Set the src of the logo image to the profile image as well
        }


        // Redirect to welcome page if the current page is not already the welcome page
        if (!currentPath.endsWith(PATHS.WELCOME)) { // Check if the current path does not end with the welcome page path
            window.location.href = PATHS.WELCOME; // Redirect to the welcome page
        }
    } else { // If no user is signed in
        // User is signed out
        console.log('User is signed out'); // Log user sign out to the console

        // Redirect to login page if the current page is not login or signup page
        if (!currentPath.endsWith(PATHS.LOGIN) ) { // Check if the current path does not end with the login page path
          if(!currentPath.endsWith(PATHS.SIGNUP)){ // Check if the current path also does not end with the signup page path
            window.location.href = PATHS.LOGIN; // Redirect to the login page
          }
        }
    }
});

// --- Profile Image Upload (Local Storage) ---
const profileImageFile = document.getElementById('profileImageFile'); // Get the profile image file input element


if (profileImageFile) { // Check if profile image file input exists on the page
    profileImageFile.addEventListener('change', (event) => { // Add change event listener to the profile image file input
        const file = event.target.files[0]; // Get the first selected file from the input
        const imagePreview = document.getElementById('image-preview'); // Get the image preview element

        if (file) { // Check if a file is selected
            const user = auth.currentUser; // Get the currently signed-in user
            if (!user) { // Check if user is signed in
                console.error('No user signed in.'); // Log an error if no user is signed in
                showMessage('No user signed in. Please sign in again.'); // Show error message to the user
                return; // Exit if no user is signed in
            }

            const loadingSpinner = document.getElementById('image-upload-loading'); // Get the loading spinner container
            loadingSpinner.style.display = 'flex'; // Show loading spinner

            const reader = new FileReader(); // Create a FileReader to read the file as a Data URL
            reader.onload = (e) => { // Add onload event listener to the FileReader
                const imageDataUrl = e.target.result; // Get the Data URL from the FileReader result
                localStorage.setItem(`profileImage-${user.uid}`, imageDataUrl); // Store the Data URL in local storage
                imagePreview.src = imageDataUrl; // Set the src attribute of the image preview element to the Data URL
                imagePreview.style.display = 'block'; // Show the image preview element

                // Update logo image source immediately after upload
                const logoImage = document.getElementById('logo-image'); // Get the logo image element
                logoImage.src = imageDataUrl; // Set the src of the logo image to the profile image
                
                showMessage('Profile image uploaded successfully (using local storage)!', 'success'); // Show success message to the user
                loadingSpinner.style.display = 'none'; // Hide loading spinner on success
            };
            reader.onerror = () => { // Add onerror event listener to the FileReader
                showMessage('Error reading profile image file.'); // Show error message to the user
                loadingSpinner.style.display = 'none'; // Hide loading spinner on error
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    });
}

// --- Remove Profile Image ---
const removeProfileImageButton = document.getElementById('remove-profile-image-button'); // Get the remove profile image button

if (removeProfileImageButton) { // Check if remove profile image button exists on the page
    removeProfileImageButton.addEventListener('click', () => { // Add click event listener to the remove profile image button
        const user = auth.currentUser; // Get the currently signed-in user
        if (!user) { // Check if user is signed in
            console.error('No user signed in.'); // Log an error if no user is signed in
            showMessage('No user signed in. Please sign in again.'); // Show error message to the user
            return; // Exit if no user is signed in
        }

        localStorage.removeItem(`profileImage-${user.uid}`); // Remove profile image data from local storage

        const imagePreview = document.getElementById('image-preview'); // Get the image preview element
        const logoImage = document.getElementById('logo-image'); // Get the logo image element

        imagePreview.src = '#'; // Reset image preview source (or you can set to a placeholder image)
        imagePreview.style.display = 'none'; // Hide image preview
        logoImage.src = 'https://fakeimg.pl/600x400'; // Reset logo image source to placeholder image from fakeimg.pl

        showMessage('Profile image removed successfully!', 'success'); // Show success message to the user
    });
}