// Handle form submission for sign up and sign in
document.querySelectorAll('.form-container form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(this); // Get form data

        fetch('/post', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                this.reset(); // Clear the input fields after successful submission
                window.location.href = 'history.html'; // Redirect to history.html
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Optionally show an error message
        });
    });
});

// Show error message if the login fails
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = document.getElementById("error-message");

    if (urlParams.has('error')) {
        errorMessage.style.display = 'block'; // Show the error message
    }
});
