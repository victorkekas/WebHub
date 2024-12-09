document.addEventListener("DOMContentLoaded", init);

function init() {
    const webpageTitle = document.title;
    switch (webpageTitle) {
        case "WH Quiz":
            QuizPageInit();
            break;
        case "WH SignUp":
            SignUpPageInit();
            break;
        default:
            break;
    }
}

function SignUpPageInit() {
    const form = document.getElementById("signupForm");
    form.addEventListener("submit", SignUpPageSubmitValidate);

    // Select all checkboxes within the contact-check container
    const checkboxes = document.querySelectorAll('.contact-check input[type="checkbox"]');
    // Add an event listener to each checkbox
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            // Find the associated label using the 'for' attribute
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            const image = label.querySelector('img'); // Find the image inside the label

            if (checkbox.checked) {
                // Remove grayscale when the checkbox is checked
                image.style.filter = 'grayscale(0%)';
            } else {
                // Apply grayscale when the checkbox is unchecked
                image.style.filter = 'grayscale(100%)';
            }
        });
    });
    const images = document.querySelectorAll('.contact-group img');
    // Function to handle hover over the images
    images.forEach((img) => {
        img.addEventListener('mouseover', function () {
            this.style.filter = 'grayscale(0%)'; // Remove grayscale on hover
        });

        img.addEventListener('mouseout', function () {
            const checkbox = this.closest('label').previousElementSibling;
            if (!checkbox.checked) {
                this.style.filter = 'grayscale(100%)'; // Return to grayscale if not checked
            }
        });
    });
}

function QuizPageInit() {
    const form = document.getElementById("quizForm");
    form.addEventListener("submit", QuizPageSubmitValidate);
    const certificationNone = document.querySelector('input[name="certifications"][value="none"]');
    const certificationOptions = document.querySelectorAll('input[name="certifications"]:not([value="none"])');
    

    //For the question 3 functionality
    certificationNone.addEventListener("change",certificationNoneChanged);
    certificationOptions.forEach(option => {
        option.addEventListener("change", certificationOptionsChanged);
    });
}
/*Validation Functions for Signup form*/
function SignUpPageSubmitValidate(event) {
    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let homeaddress = document.getElementById("homeaddress");
    let homeaddressnumber = document.getElementById("homeaddressnumber");
    let dob = document.getElementById("dob");
    let email = document.getElementById("email");
    let country = document.getElementById("country");
    let phonenumber = document.getElementById("phonenumber");
    let contactMethods = document.querySelectorAll('.contact-check input[type="checkbox"]');
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let passwordCheck = document.getElementById("passwordCheck");
    //Stop Default submition
    event.preventDefault();
    //Check every field. If one is invalid the whole form is invalid
    let validForm = NameValidate(name) && SurnameValidate(surname) && HomeAddressValidate(homeaddress) && HomeAddressNumberValidate(homeaddressnumber) && DoBValidate(dob) && GenderValidate(gender) && EmailValidate(email) && PhonenumberValidate(country, phonenumber) && ContactMethodValidate(contactMethods) && UsernameValidate(username) && PasswordValidate(password) && PasswordCheckValidate(password, passwordCheck);
    //Do not submit if any field is invalid 
    if (validForm) {
        document.getElementById("signupForm").submit()
    }

}
//The "text" element must be <document.getElementById()>
function TextOnlyValidate(text) {
    // if input text follows regex return true, otherwise false
    return /^[a-zA-Z\s]*$/.test(text.value.trim());
}
function NameValidate(name) {
    let isValid = true;
    if (!TextOnlyValidate(name)) {
        isValid = false;
    }
    if(!isValid){
        setError(name,"Name must contain only letters.");
    }else{
        setSuccess(name);
    }
    console.log("name " + isValid)
    return isValid;
}
function SurnameValidate(surname) {
    let isValid = true;
    if (!TextOnlyValidate(surname)) {
        isValid = false;
    }
    if(!isValid){
        setError(surname,"Surname must contain only letters.");
    }else{
        setSuccess(surname);
    }
    console.log("surname " + isValid)
    return isValid;
}
function HomeAddressValidate(homeaddress) {
    let isValid = true;
    if (!TextOnlyValidate(homeaddress)) {
        isValid = false;
    }
    if(!isValid){
        setError(homeaddress,"Home address must contain only letters.");
    }else{
        setSuccess(homeaddress);
    }
    console.log("home address " + isValid)
    return isValid;
}
//Check if the digits are 0-9.
function HomeAddressNumberValidate(homeaddress, homeAddressNumber) {
    let isValid = true;
    if(homeaddress.value.trim() !==""){
        if (!(/^\d*$/.test(homeAddressNumber.value.trim())) || homeAddressNumber.value.trim()<1) {
            isValid = false;
        }
        if(!isValid){
            setError(homeAddressNumber,"Where do you live bro? In your mom's basement?");
        }else{
            setSuccess(homeAddressNumber);
        }
    }
    console.log("home number " + isValid);
    return isValid;
}
// Validate Date of Birth (must be 8 <= age <= 130)
function DoBValidate(dob) {
    // const bdayInput = document.getElementById("dob");
    let isValid = true;
    const today = new Date();
    const bday = new Date(dob.value);
    const age = today.getFullYear() - bday.getFullYear();
    //Take into consideration the month and the exact day
    if (today.getMonth() < bday.getMonth() || (today.getMonth() === bday.getMonth() && today.getDate() < bday.getDate())) {
        age = age - 1;
    }
    if (age < 8 || age > 130) {
        isValid = false;
    }
    if(!isValid){
        setError(dob,"Requiried age between 8 and 130 years old.");
    }else{
        setSuccess(dob);
    }
    console.log("dob " + isValid);
    return isValid;
}
//Validate Gender
function GenderValidate(gender){
    let isValid = SelectOptionsValidation(gender);
    console.log("gender " + isValid);
    if(gender.value.trim() === ""){
        setError(gender,"Provide a gender.");
    }else if(!isValid){
        setError(gender,"Gender must contain only letters.");
    }else{
        setSuccess(gender);
    }
    return isValid;
}
function EmailValidate(email) {
    // return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.trim());
    let isValid = true;
    if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value.trim()))) {
        isValid = false;
    }
    if(email.value.trim() === ""){
        setError(email,"You must write an email.");
    }else if(!isValid){
        setError(email,"Write a valid email.");
    }else{
        setSuccess(email);
    }
    console.log("email " + isValid);
    return isValid;
}
function PhonenumberValidate(country, phonenumber) {
    // Validate Phone Number based on country
    let isValid = true;
    switch (country.value.trim()) {
        case "":
            isValid = false;
            setError(country,"Pleasse choose a country code.");
            break;
        case "Greece":
            isValid = /^69\d{8}$/.test(phonenumber.value.trim());
            break;
        case "USA":
            isValid = /^\d{10}$/.test(phonenumber.value.trim());
            break;
        case "UK":
            isValid = /^\d{10}$/.test(phonenumber.value.trim());
            break;
        case "India":
            isValid = /^\d{10}$/.test(phonenumber.value.trim());
            break;
        default:
            isValid = /^\d{10}$/.test(phonenumber.value.trim());
            break;
    }
    if(!isValid){
        setError(country,"Invalid phone number.");
    }else{
        setSuccess(country);
    }
    console.log("phone " + isValid);
    return isValid;
}
function ContactMethodValidate(contactMethods) {
    let isValid = true;
    if (!Array.from(contactMethods).some(checkbox => checkbox.checked)) {
        isValid = false;
    }
    if(!isValid){
        setError(document.getElementById("contact-check-container"),"You must choose a contact option.");
    }else{
        setSuccess(document.getElementById("contact-check-container"));
    }
    console.log("contact methods " + isValid);
    return isValid;
}
//username is valid if it contains letters, digits and this special characters (-_!@#$%^&*()+=) AND length is less than or equal to 30.
function UsernameValidate(username) {
    let isValid = true;
    const usernameValue = username.value.trim();
    if (!(/^[a-zA-Z0-9][a-zA-Z0-9\-_!@#$%^&*()+=]*$/.test(usernameValue) || usernameValue.length > 30)) {
        isValid = false;
    }
    if(usernameValue === ""){
        setError(username,"You must write a username.");
    }else if(!isValid){
        setError(username,"Password must be at most 30 character.");
    }else{
        setSuccess(username);
    }
    console.log("username " + isValid);
    return isValid;
}
//Check if password is valide
function PasswordValidate(password) {
    let isValid = true;
    const passwordValue = password.value.trim();
    if (
        passwordValue.length < 10 || // At least 10 characters
        !/[A-Z]/.test(passwordValue) || // At least one uppercase letter
        !/[a-z]/.test(passwordValue) || // At least one lowercase letter
        !/[0-9]/.test(passwordValue) || // At least one number
        !/[!@#$%^&*(),.?":|<>]/.test(passwordValue) // At least one special character
    ) {
        isValid = false;
    }
    if(passwordValue === ""){
        setError(password,"You must write a password.");
    }else if(!isValid){
        setError(password,"Password must be at lest 10 character and contain one uppercase, one lowercase, one number, and one special character.");
    }else{
        setSuccess(password);
    }
    console.log("password " + isValid);
    return isValid;

}
//Check if the two passwords match
function PasswordCheckValidate(password, passwordCheck) {
    let isValid = true;
    if (password.value.trim() !== passwordCheck.value.trim()) {
        isValid = false;
    }
    if(!isValid){
        setError(passwordCheck,"Password doesn't match.");
    }else{
        setSuccess(passwordCheck);
    }
    console.log("passwordcheck " + isValid);
    return isValid;
}


/*Validation Functions for Quiz form*/
function QuizPageSubmitValidate(event) {
    const education = document.getElementById("education");
    const studyField = document.getElementById("studyField");
    const certificationOptions = document.querySelectorAll('input[name="certifications"]:not([value="none"])');
    const certificationDetails = document.getElementById("certification-details");
    const languageCourses = document.querySelectorAll(`input[name="language-courses"]`);
    const skills = document.getElementById("skills");
    const motivations = document.querySelectorAll(`input[name="motivation"]`);
    const improveCheckboxes = document.querySelectorAll(`input[name="improve"]`);
    const time = document.getElementById("time");
    const learningMethodsCheckboxes = document.querySelectorAll(`input[name="learning-methods"]`);

    
    let validForm = EducationValidate(education) && StudyFieldValidate(studyField) && certificationDetailsValidate(certificationDetails, certificationOptions) && 
    LanguageCoursesValidate(languageCourses) && TechnicalSkillsValidate(skills) && MotivationsValidate(motivations) && ImproveCheckboxesValidate(improveCheckboxes) &&
    TimeValidate(time) && LearningMethodsCheckboxesValidate(learningMethodsCheckboxes);//Do not submit if any field is invalid 
    if (!validForm) {
        console.log("Net")
        event.preventDefault();
    }
}
//True if user has selected anything
function SelectOptionsValidation(selection) {
    let isValid = true;
    if (selection.value === "") {
        isValid = false;
    }
    return isValid;

}
//1
function EducationValidate(education) {
    let isValid = SelectOptionsValidation(education);
    console.log("education " + isValid);
    return isValid;
}
//2
function StudyFieldValidate(studyField) {
    let isValid = SelectOptionsValidation(studyField);
    console.log("studyField " + isValid);
    return isValid;
}
//3
function certificationNoneChanged(){
    const certificationDetails = document.getElementById("certification-details");
    const certificationOptions = document.querySelectorAll('input[name="certifications"]:not([value="none"])');
    if (this.checked) {
        certificationDetails.disabled = true; //Make the textarea non-interactive
        certificationDetails.value = ""; // Clear text when disabled
        //Uncheck the opter options
        certificationOptions.forEach(option => {
            option.checked = false;
        });
    }
}
//3
function certificationOptionsChanged(){
    const certificationDetails = document.getElementById("certification-details");
    const certificationOptions = document.querySelectorAll('input[name="certifications"]:not([value="none"])');
    const certificationNone = document.querySelector('input[name="certifications"][value="none"]');
    // Check if any option is checked and enable the textarea
    if (Array.from(certificationOptions).some(option => option.checked)) {
        certificationDetails.disabled = false;
        //Un-check the none option
        certificationNone.checked = false;
    }
}
//3
function certificationDetailsValidate(certificationDetails, certificationOptions){
    let isValid = true;
    if (Array.from(certificationOptions).some(option => option.checked)) {
        if (certificationDetails.value.trim().length < 30 || /[{}\[\];]/.test(certificationDetails.value.trim())) {
            isValid = false;
        }
    }
    console.log("certificationDetails "+isValid);
    return isValid;
}
//4
function LanguageCoursesValidate(languageCourses){
    let isValid = true;
    if (!Array.from(languageCourses).some(option => option.checked)) {
        isValid = false;
    }
    console.log("languageCourses "+isValid);
    return isValid;

}
//5
function TechnicalSkillsValidate(skills) {
    let isValid = true;
    if (skills.value.trim().length < 30 || /[{}\[\];]/.test(skills.value.trim())) {
        isValid = false;
    }
    if(!isValid){
        setError(skills,"You must write a small paragraph.");
    }else{
        setSuccess(skills);
    }
    console.log("skills "+isValid);
    return isValid;
 }
//6
function MotivationsValidate(motivations){
    let isValid = true;
    if (!Array.from(motivations).some(option => option.checked)) {
        isValid = false;
    }
    console.log("motivations "+isValid);
    return isValid;
}
//7
function ImproveCheckboxesValidate(improveCheckboxes){
    let isValid = true;
    if (!Array.from(improveCheckboxes).some(checkbox => checkbox.checked)) {
        isValid = false;
    }
    console.log("improveCheckboxes "+isValid);
    return isValid;
}
//8
function TimeValidate(time) {
    let isValid = SelectOptionsValidation(time);
    console.log("time " + isValid);
    return isValid;
}
//9
function LearningMethodsCheckboxesValidate(learningMethodsCheckboxes){
    let isValid = true;
    if (!Array.from(learningMethodsCheckboxes).some(checkbox => checkbox.checked)) {
        isValid = false;
    }
    console.log("learningMethodsCheckboxes "+isValid);
    return isValid;
}

//Display an error message when input is wrong
const setError = (element, message) => {
    const formQuestion = element.parentElement;
    const errorDisplay = formQuestion.querySelector('.error');

    errorDisplay.innerText = message;
    formQuestion.classList.add('error');
    formQuestion.classList.remove('success')
}

//Display an success message when input is right
const setSuccess = element => {
    const formQuestion = element.parentElement;
    console.log(formQuestion)
    console.log(element)
    const errorDisplay = formQuestion.querySelector('.error');

    errorDisplay.innerText = '';
    formQuestion.classList.add('success');
    formQuestion.classList.remove('error');
};