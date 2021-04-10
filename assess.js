let addUserForm = document.getElementById('addUserForm');
let loginForm = document.getElementById('loginForm');
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById('password');

let emailSign = document.getElementById("emailSign");
let passwordSign = document.getElementById("passwordSign");

let invalidDetails = document.getElementById("invalidDetails");
let invalid = document.getElementById("invalid");

let firstNameErrMsg = document.getElementById("firstNameErrMsg");
let lastNameErrMsg = document.getElementById("lastNameErrMsg");
let emailErrMsg = document.getElementById("emailErrMsg");
let passwordErrMsg = document.getElementById("passwordErrMsg");

firstName.addEventListener("change", function(event) {
    if (event.target.value === "") {
        firstNameErrMsg.textContent = "Required*";
    } else {
        firstNameErrMsg.textContent = "";
    }
});
lastName.addEventListener("change", function(event) {
    if (event.target.value === "") {
        lastNameErrMsg.textContent = "Required*";
    } else {
        lastNameErrMsg.textContent = "";
    }
});
email.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsg.textContent = "Required*";
    } else {
        emailErrMsg.textContent = "";
    }
});
password.addEventListener("change", function(event) {
    if (event.target.value === "") {
        passwordErrMsg.textContent = "Required*";
    } else {
        passwordErrMsg.textContent = "";
    }
});

function usersFromLocalStorage() {
    let stringifiedUsers = localStorage.getItem("users");
    let parsedUsers = JSON.parse(stringifiedUsers);
    if (parsedUsers === null) {
        return []
    } else {
        return parsedUsers
    }

}
let users = usersFromLocalStorage()

function validate(enteredEmail, enteredPassword) {

    for (let each of users) {
        console.log(each.email)
        console.log(each.password)
        console.log(enteredEmail)
        console.log(enteredPassword)
        if (each.email === enteredEmail && each.password === enteredPassword) {
            invalid.classList.add("correct")
            invalid.textContent = "Correct details"
            window.location = "HomePage.html";
            emailSign.value = ""

        } else {
            invalid.classList.add("error")
            invalid.textContent = "Invalid details"

        }
    }
}





function createUser() {


    if (firstName.value === "") {
        firstNameErrMsg.textContent = "Required*";
    }
    if (lastName.value === "") {
        lastNameErrMsg.textContent = "Required*";
    }
    if (email.value === "") {
        emailErrMsg.textContent = "Required*";
    }
    if (password.value === "") {
        passwordErrMsg.textContent = "Required*";
    } else {


        let user = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        }
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users));
        invalid.classList.add("correct")
        invalidDetails.textContent = "Correct details"
        window.location = "HomePage.html";
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        password.value = ""
    }
}

addUserForm.addEventListener("submit", function(event) {
    event.preventDefault()
    createUser()
})
loginForm.addEventListener("submit", function(event) {
    event.preventDefault()
    let enteredEmail = emailSign.value;
    let enteredPassword = passwordSign.value;
    let length = users.length
    if (length === 0) {
        invalid.classList.add("invalid")
        invalid.textContent = "Invalid details"
    } else {
        validate(enteredEmail, enteredPassword)
    }
})