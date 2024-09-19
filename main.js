import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAm7alZssivC27byHGhljLNnlNTvozANoU",
  authDomain: "wodpacer-hosting.firebaseapp.com",
  databaseURL:
    "https://wodpacer-hosting-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wodpacer-hosting",
  storageBucket: "wodpacer-hosting.appspot.com",
  messagingSenderId: "543411213166",
  appId: "1:543411213166:web:65f765a4407d73ebd1277f",
  measurementId: "G-JXHVY4V0QN",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function new_user(first_name, last_name, email, created_at) {
  const user_ref = doc(collection(db, "users"));

  await setDoc(user_ref, {
    first_name: first_name,
    last_name: last_name,
    email: email,
    created_at: created_at,
  });
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let cover_id = params.cover;

//console.log(value);

document.querySelector(
  ".landing"
).style.backgroundImage = `url('./img/cover_v${cover_id}.png')`;

// Link functionality
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function scrollToSection(event) {
  event.preventDefault();

  const targetId = this.getAttribute("href"); // Get the target section ID

  // Scroll to the target section smoothly
  document.querySelector(targetId).scrollIntoView({
    behavior: "smooth",
  });
}

// Navigate to signup
const button1 = document.querySelector(".btn_gotosignup");
button1.addEventListener("click", scrollToSignup);

function scrollToSignup() {
  document.querySelector("#join").scrollIntoView({ behavior: "smooth" });
}

// Navigate to learn more
const button2 = document.querySelector(".btn_learnmore");
button2.addEventListener("click", scrollToSection1);

function scrollToSection1() {
  document.querySelector("#whoarewe").scrollIntoView({ behavior: "smooth" });
}

function save(form, event) {
  if (!form.checkValidity()) {
    return "Validation failed";
  }

  const d = new Date();
  const date = d.toISOString();

  const name = form.inputFirstName.value;
  const last = form.inputLastName.value;
  const email = form.inputEmail.value;

  event.preventDefault();

  new_user(name, last, email, date);

  form.innerHTML =
    '<p class="thank-you">Thank you for signing up to our email list!</p>';
}

(function () {
  "use strict";
  const forms = document.querySelectorAll(".validation");

  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        save(form, event);

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
