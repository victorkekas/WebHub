document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const phoneNumberField = document.getElementById("phonenumber");
    const countrySelector = document.getElementById("country");
    const passwordField = document.getElementById("password");
    const passwordCheckField = document.getElementById("passwordCheck");
    const homeAddressNumberField = document.getElementById("homeaddressnumber");

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Validate Name, Surname, and Home Address (only letters A-Z/a-z)
        const textInputs = ["name", "surname", "homeaddress"];
        textInputs.forEach((id) => {
            const input = document.getElementById(id);
            if (!/^[a-zA-Z\s]*$/.test(input.value.trim())) {
                isValid = false;
                alert(`${id.charAt(0).toUpperCase() + id.slice(1)} must contain only letters.`);
            }
        });

        // Validate Home Address Number (only digits 0-9)
        const homeAddressNumber = homeAddressNumberField.value.trim();
        if (!/^\d+$/.test(homeAddressNumber)) {
            isValid = false;
            alert("Home Address Number must contain only digits (0-9).");
        }

        // Validate Date of Birth (14 <= age <= 130)
        const bdayInput = document.getElementById("bday");
        const today = new Date();
        const bday = new Date(bdayInput.value);
        const age = today.getFullYear() - bday.getFullYear();
        if (age < 14 || age > 130) {
            isValid = false;
            alert("Date of Birth must indicate an age between 14 and 130 years.");
        }

        // Validate Email
        const emailInput = document.getElementById("email");
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value.trim())) {
            isValid = false;
            alert("Invalid email format. It must follow the format: email@service.com.");
        }

        // Validate Phone Number
        const phoneNumber = phoneNumberField.value.trim();
        if (countrySelector.value === "") {
            isValid = false;
            alert("Please select a country.");
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            isValid = false;
            alert("Phone Number must contain exactly 10 digits.");
        }

        // Validate Username (at most 30 characters)
        const usernameInput = document.getElementById("username");
        if (usernameInput.value.trim().length > 30) {
            isValid = false;
            alert("Username must be at most 30 characters long.");
        }

        // Validate Password
        const password = passwordField.value.trim();
        if (
            password.length < 10 || // At least 10 characters
            !/[A-Z]/.test(password) || // At least one uppercase letter
            !/[a-z]/.test(password) || // At least one lowercase letter
            !/[0-9]/.test(password) || // At least one number
            !/[!@#$%^&*(),.?":{}|<>]/.test(password) // At least one special character
        ) {
            isValid = false;
            alert(
                "Password must be at least 10 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
            );
        }

        // Validate Password Confirmation
        const confirmPassword = passwordCheckField.value.trim();
        if (password !== confirmPassword) {
            isValid = false;
            alert("Password and Password Confirmation must match.");
        }

        // Prevent submission if any validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
});