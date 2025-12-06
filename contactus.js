$(document).ready(function () {
    $('#contact-form').on('submit', function (event) {
        event.preventDefault(); 
        const formData = {
           fullName:$('#fullName').val(),
            email: $('#email').val(),
            phoneNumber: $('#phoneNumber').val(),
            message: $('#message').val(),
            hostSite:"kmedtech"
        };
        $.ajax({
            url: 'https://lndhub.krishnamurthyedtechapi.com/api/v1/ed-tech/user-enquiry/org/1', 
            method: 'POST',
            contentType: 'application/json',    
            data: JSON.stringify(formData),
            success: function (response) {
                alert('Form submitted successfully!');
                console.log(response);
            },
            error: function (xhr, status, error) {
                alert('Error submitting form!');
                console.log(error);
            }
        });
    });
});