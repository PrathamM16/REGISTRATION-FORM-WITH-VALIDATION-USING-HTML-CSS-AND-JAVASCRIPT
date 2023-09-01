const form = document.getElementById('registrationForm');
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const dob = document.getElementById('dob');
        const ageDisplay = document.getElementById('age');
        const submitBtn = document.getElementById('submitBtn');

        // Function to display error messages
        function showError(inputField, errorMessage) {
            const errorElement = document.getElementById(`${inputField.id}Error`);
            errorElement.textContent = errorMessage;
            inputField.classList.add('error');
            inputField.classList.remove('success');
        }

        // Function to display success messages
        function showSuccess(inputField) {
            const errorElement = document.getElementById(`${inputField.id}Error`);
            errorElement.textContent = '';
            inputField.classList.remove('error');
            inputField.classList.add('success');
        }

        // Function to validate full name
        function validateFullName() {
            const fullNameValue = fullName.value.trim();
            if (fullNameValue.length < 3) {
                showError(fullName, 'Full name must be at least 3 characters long.');
                return false;
            } else {
                showSuccess(fullName);
                return true;
            }
        }

        // Function to validate email address
        function validateEmail() {
            const emailValue = email.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailValue)) {
                showError(email, 'Invalid email format.Ex:Pratham@gmail.com');
                return false;
            } else {
                showSuccess(email);
                return true;
            }
        }

        // Function to validate password
        function validatePassword() {
            const passwordValue = password.value;
            if (passwordValue.length < 8 || !/\d/.test(passwordValue) || !/[a-zA-Z]/.test(passwordValue)) {
                showError(password, 'Password must be at least 8 characters long and contain both letters and numbers.');
                return false;
            } else {
                showSuccess(password);
                return true;
            }
        }

        // Function to confirm password
        function confirmPasswordValidation() {
            const confirmPasswordValue = confirmPassword.value;
            if (confirmPasswordValue !== password.value) {
                showError(confirmPassword, 'Passwords do not match.');
                return false;
            } else {
                showSuccess(confirmPassword);
                return true;
            }
        }

        // Function to validate date of birth in dd/mm/yyyy format
        function validateDateOfBirth() {
            const dobValue = dob.value.trim();
            const dobPattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

            if (!dobPattern.test(dobValue)) {
                showError(dob, 'Date of Birth must be in the format dd/mm/yyyy.');
                ageDisplay.textContent = '';
                return false;
            }

            const [, day, month, year] = dobValue.match(dobPattern);
            const userDOB = new Date(`${year}-${month}-${day}`);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - userDOB.getFullYear();

            if (currentDate.getMonth() < userDOB.getMonth() || (currentDate.getMonth() === userDOB.getMonth() && currentDate.getDate() < userDOB.getDate())) {
                age -= 1;
            }

            if (age < 18) {
                showError(dob, 'You must be at least 18 years old.');
                ageDisplay.textContent = '';
                return false;
            } else {
                showSuccess(dob);
                ageDisplay.textContent = `Age: ${age} years`;
                return true;
            }
        }

        // Function to enable or disable submit button based on form validity
        function updateSubmitButton() {
            const isValid =
                validateFullName() &&
                validateEmail() &&
                validatePassword() &&
                confirmPasswordValidation() &&
                validateDateOfBirth();

            submitBtn.disabled = !isValid;
        }

        // Event listeners for real-time validation
        fullName.addEventListener('input', validateFullName);
        email.addEventListener('input', validateEmail);
        password.addEventListener('input', validatePassword);
        confirmPassword.addEventListener('input', confirmPasswordValidation);
        dob.addEventListener('input', validateDateOfBirth);

        // Event listener for form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault(); 
            alert('Form submitted successfully!'); 
        });

        // Initial validation
        updateSubmitButton();