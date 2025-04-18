document.addEventListener("DOMContentLoaded", function () {
  // Inject header HTML
  document.getElementById("header-container").innerHTML = `
    
  <header class="mainheader">
      <nav class="nav main-nav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="find-a-space.html">Find Space</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <div class="header-buttons">
          <div id="loginContainer">
          <button class="login" id="logbtn" type="button" onclick="showLoginDialog(true, 'signup')">
            Login / Sign Up
          </button>
        </div>
          <button id="submitPropertyBtn" style="background-color: #57bec3; display: none;" class="btn btn-primary">
            <a href="add-listing.html">Submit Property</a>
          </button>
          <button id="logoutBtn" style="background-color:rgb(229, 17, 17); display: none;" class="btn btn-primary">
            <a href="add-listing.html">Log Out</a>
          </button>
        </div>
        </nav>
      
      </nav>
      <h1 class="main-name main-name-large">Online Venue Booking</h1>
    </header>
  `;
  updateUI(); 
  // Function to update UI
  function updateUI() {
      const loginBtn = document.getElementById("logbtn");
      var currentUser = localStorage.getItem("currentUser");
      var submitBtn = document.getElementById("submitPropertyBtn");

      if (currentUser) {
          submitBtn.style.display = "inline-block"; // Show button if user is logged in
          if (loginBtn) loginBtn.style.display = "none";

      } else {
          submitBtn.style.display = "none"; // Hide button if not logged in
      }
  }

  // Run updateUI on page load
  updateUI();

  
  window.onUserLogin = function (user) {
      localStorage.setItem("currentUser", JSON.stringify(user)); // Store user
      updateUI(); // Update UI immediately
  };
});
