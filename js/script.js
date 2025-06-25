// Sign up 

let UserNameInput = document.getElementById("UserName");

let EmailInput = document.getElementById("signinEmail");
let passwordInput = document.getElementById("signinPassword");

let userData = [];

userData = JSON.parse(localStorage.getItem("userData")) || [];

function signup() {
  document.getElementById("emptyFields").classList.add("d-none");
  document.getElementById("emailExists").classList.add("d-none");
  document.getElementById("validEmail").classList.add("d-none");
  if (
    UserNameInput.value.trim() === "" ||
    EmailInput.value.trim() === "" ||
    passwordInput.value.trim() === ""
  ) {
    document.getElementById("emptyFields").classList.remove("d-none");
    return;
  }

  let emailExists = userData.some(
    (user) => user.email.toLowerCase() === EmailInput.value.trim().toLowerCase()
  );
  if (emailExists) {
    document.getElementById("emailExists").classList.remove("d-none");
    return;
  }

  let Data = {
    username: UserNameInput.value,
    email: EmailInput.value,
    password: passwordInput.value,
  };

  userData.push(Data);
  localStorage.setItem("userData", JSON.stringify(userData));

  displaydata();
  ClearForm();
   document.getElementById("validEmail").classList.remove("d-none");
}

function displaydata() {
  let user = UserNameInput.value;
  let mail = EmailInput.value;
  let pass = passwordInput.value;
  console.log("user:", UserNameInput.value);
  console.log("mail:", EmailInput.value);
  console.log("pass:", passwordInput.value);
  console.log("users:", userData);
}

function ClearForm() {
  UserNameInput.value = null;
  EmailInput.value = null;
  passwordInput.value = null;
}

// ================================================
// login page 

function login() {
  document.getElementById("invalidData").classList.add("d-none");
  let users = JSON.parse(localStorage.getItem("userData")) || [];

  let emailInput = document.getElementById("login-email");
  let passwordInput = document.getElementById("login-password");

  let found = users.find(user => 
    user.email.toLowerCase() === emailInput.value.trim().toLowerCase() &&
    user.password === passwordInput.value.trim()
  );

if (found) {
  console.log("✅ Login success");
  // مثال: ممكن تحفظ اسم المستخدم أو تروح لصفحة تانية
  localStorage.setItem("currentUser", found.username);
   window.location.href = "home.html";
} 
else {
  document.getElementById("invalidData").classList.remove("d-none");
}
}


// ================================================
// home page 

window.onload = function () {
  let currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("username").innerText = `Welcome ${currentUser}`;
};
