let activeUser = null; // Variable to store the currently logged-in user

window.onUserLogin = function (user) {
  localStorage.setItem("currentUser", JSON.stringify(user)); 
  activeUser = user; 
  updateUI(); 
  dialog.close(); 
};

document.addEventListener("DOMContentLoaded", () => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    activeUser = JSON.parse(storedUser);
    updateUI();
  }

  populateCountrySelect("country", countries);
  logStoredUsers();
});

function updateUI() {
  const submitBtn = document.getElementById("submitBtn");
  if (activeUser && submitBtn) {
    submitBtn.style.display = "block";
  }
}


const dialog = document.getElementById("lgn");
const wrapper = document.querySelector(".wrapper");
const userForm = document.getElementById("userForm");
const loginForm = document.getElementById("loginForm");

// Function to show/hide the login dialog and toggle between forms

const showLoginDialog = (show, formType = 'signup') => {
  const signupForm = document.getElementById("signupForm");
  const signinForm = document.getElementById("signinForm");

  if (show) {
    console.log("Dialog element:", dialog);

    dialog.showModal();
    if (formType === 'signup') {
      signupForm.style.display = 'block';
      signinForm.style.display = 'none';
    } else if (formType === 'signin') {
      signupForm.style.display = 'none';
      signinForm.style.display = 'block';
    }
  } else {
    dialog.close();
  }
};

// Close the dialog when clicking outside of it
const closeDialogOnOutsideClick = (e) => {
  if (!wrapper.contains(e.target)) {
    dialog.close();
  }
};

dialog.addEventListener("click", closeDialogOnOutsideClick);

// Function to save a new user to localStorage
const saveUserToLocalStorage = (userData) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the user already exists
  const userExists = users.some((user) => user.email === userData.email);
  if (userExists) {
    alert("User with this email already exists!");
    return; // Stop the function if the user exists
  }

  // Add the new user to the array
  users.push(userData);

  // Save the updated users array back to localStorage
  localStorage.setItem("users", JSON.stringify(users));
  alert("User registered successfully!");
};

// Function to log all stored users (for debugging)
const logStoredUsers = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("Stored Users:", users);
};

// Function to handle sign-up form submission
const handleFormSubmit = (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    country: document.getElementById("country").value,
    password: document.getElementById("password").value,
    checkbox: document.getElementById("checkbox").checked,
  };

  console.log("User Input:", userData);

  // Save the user to localStorage
  saveUserToLocalStorage(userData);

  // Reset the form
  userForm.reset();
  //This triggers showing the "Submit Property" button
  window.onUserLogin(userData);
  //window.onUserLogin(userData);
  //close the dialog after sign-up
  showLoginDialog(false);
};

// Function to check user credentials (login)
const checkUserCredentials = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user; // Returns the user object if found, otherwise undefined
};

// Function to handle login form submission
const handleLogin = (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = checkUserCredentials(email, password);

  if (user) {
    alert("You are signed in!");
    console.log("Signed in user:", user);
    //it cause "submit property" button to show after a user login
    window.onUserLogin(user);
    
    //close the dialog after login
    showLoginDialog(false);
  } else {
    alert("Invalid email or password.");
  }
};

// Add event listeners
userForm.addEventListener("submit", handleFormSubmit);
if (loginForm) {
  loginForm.addEventListener("submit", handleLogin);
}

/////////////////////////////////////////////////////////////////////////////////////

const countries = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "Greenland",
  "Guatemala",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Lebanon",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malaysia",
  "Malta",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Morocco",
  "Myanmar",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Senegal",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
// Populate the country dropdown
const populateCountrySelect = (selectId, countryList) => {
  const selectElement = document.getElementById(selectId);
  if (!selectElement) return;

  countryList.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    selectElement.appendChild(option);
  });
};

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  populateCountrySelect("country", countries);
  logStoredUsers();
});