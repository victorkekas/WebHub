// document.querySelector('.icon').addEventListener('click', function () {
//     this.classList.toggle('selected');
// });
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Add event listener for real-time validation (on blur)
    passwordInput.addEventListener('blur', function () {
        const isValid = validatePassword(passwordInput.value);

        // Add/remove CSS classes based on validation
        if (isValid) {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
        } else {
            passwordInput.classList.remove('valid');
            passwordInput.classList.add('invalid');
        }
    });

    // Add event listener for final validation on form submit
    form.addEventListener('submit', function (event) {
        errorMessage.textContent = ''; // Clear previous error messages
        const isValid = validatePassword(passwordInput.value);

        if (!isValid) {
            event.preventDefault(); // Prevent form submission
            errorMessage.textContent = 'Password does not meet the requirements.';
        }
    });

    // Helper function to validate password
    function validatePassword(password) {
        // Example requirements: at least 8 characters, 1 uppercase, 1 lowercase, and 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }
});