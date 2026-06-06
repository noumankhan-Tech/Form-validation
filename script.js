import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA378XmgTSeNFLWW0oCh7i0taQlEj2xH1s",
  authDomain: "form-validation-dc15e.firebaseapp.com",
  projectId: "form-validation-dc15e",
  storageBucket: "form-validation-dc15e.firebasestorage.app",
  messagingSenderId: "894159161437",
  appId: "1:894159161437:web:7c3143cee55a249492e5b4",
  measurementId: "G-VSRVF0DP3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');

  // Toggle Password Visibility
  togglePassword.addEventListener('click', () => {
    const isPassword = password.type === 'password';

    password.type = isPassword ? 'text' : 'password';

    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });

  // Success State
  const showSuccess = (input) => {
    const group = input.closest('.input-group');
    group.classList.remove('error');
    group.classList.add('success');
  };

  // Error State
  const showError = (input) => {
    const group = input.closest('.input-group');
    group.classList.remove('success');
    group.classList.add('error');
  };

  // Username Validation
  const checkUsername = () => {
    if (username.value.trim().length >= 3) {
      showSuccess(username);
      return true;
    } else {
      showError(username);
      return false;
    }
  };

  // Email Validation
  const checkEmail = () => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email.value.trim())) {
      showSuccess(email);
      return true;
    } else {
      showError(email);
      return false;
    }
  };

  // Password Validation
  const checkPassword = () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (passwordRegex.test(password.value)) {
      showSuccess(password);
      return true;
    } else {
      showError(password);
      return false;
    }
  };

  // Real-Time Validation
  username.addEventListener('input', checkUsername);
  email.addEventListener('input', checkEmail);
  password.addEventListener('input', checkPassword);

  // Form Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isUsernameValid = checkUsername();
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

    const submitBtn = document.getElementById('submitBtn');

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Creating Account...';

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.value.trim(),
          password.value
        );

      console.log("User Created:", userCredential.user);

      submitBtn.style.background = '#127403';
      submitBtn.innerHTML = 'Success ✓';

      alert('Account created successfully!');

      form.reset();

      document
        .querySelectorAll('.input-group')
        .forEach(group => {
          group.classList.remove('success');
         group.classList.remove('error');
        });

      submitBtn.style.background = '';
      submitBtn.innerHTML = 'Register Now';
      submitBtn.disabled = false;

    } catch (error) {
      alert(error.message);

      submitBtn.innerHTML = 'Register Now';
      submitBtn.disabled = false;
    }
  });
});