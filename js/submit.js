
var config = {
    apiKey: "AIzaSyDLd485ledI1GKegU-B8NTj4quKtT5NvE4",
    authDomain: "fir-simple-d6672.firebaseapp.com",
    databaseURL: "https://fir-simple-d6672.firebaseio.com",
    projectId: "fir-simple-d6672",
    storageBucket: "fir-simple-d6672.appspot.com",
    messagingSenderId: "433817017034",
    appId: "1:433817017034:web:60c74582d32ac6beb4b233",
    measurementId: "G-P11THVWKMD"
};
firebase.initializeApp(config);
window.onload = function () {
    if(document.getElementById('register-form')){
        document.getElementById('register-form').addEventListener("submit", submitRegisterForm);
    }
    if(document.getElementById('signin-form')){
        document.getElementById('signin-form').addEventListener("submit", submitSigninForm);
    }
}

var db_ref = firebase.database().ref('users');

function getInput(id) {
    return document.getElementById(id).value;
}

function submitRegisterForm(e) {
    e.preventDefault();
    createUser(getInput('Dropdown'), getInput('Full-Name'), getInput('Email-Address'), getInput('Password'));
    // document.getElementById("register-form").reset();
}
function createUser(account_type, full_name, email_address, password) {
    var newRec = db_ref.push();
    newRec.set({
        account_type: account_type,
        full_name: full_name,
        email_address: email_address,
        password: password
    }, function(error) {
        if (error) {
          alert("Data could not be saved." + error);
        } else {
          alert("Data saved successfully.");
          location.replace("sign-in.html");
        }
      });
}

function submitSigninForm(e) {
    e.preventDefault();
    checkUser(getInput('Email-Address'), getInput('Password'));
}

function checkUser(email_address, password) {
    var db_ref = firebase.database().ref('users');
    db_ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          if(childData.email_address === email_address && childData.password === password) {
            console.log(childKey, childData);
            location.replace("requests.html?"+childKey);
          }
        });
      });
}