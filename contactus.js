$(document).ready(function () {
    $('#contact-form').on('submit', function (event) {
        event.preventDefault();
        const $form = $(this);
        
            $form.find('.email-error').remove();
            const emailVal = ($form.find('input[name="email"]').val() || '').trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                $form.find('input[name="email"]').after('<div class="email-error text-danger" style="margin-top:4px;">Please enter a valid email address.</div>');
                $form.find('input[name="email"]').focus();
                return;
            }
        
            const formData = {
                organizationId: 1,
                fullName: $form.find('input[name="fullName"]').val(),
                email: emailVal,
                phoneNumber: $form.find('input[name="phoneNumber"]').val(),
                message: $form.find('textarea[name="message"]').val(),
                hostSite: 'kmedtech'
            };

        $.ajax({
            url: 'https://lndhub.krishnamurthyedtechapi.com/api/v1/ed-tech/user-enquiry/org/1',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                alert('Thank you for contacting us. We will get back to you shortly.');
            },
            error: function (xhr, status, error) {
                alert('It seems your message couldn’t be sent. Please try again shortly.');
            }
        });
    });

    $('#contact-form').on('input', 'input[name="email"]', function () {
        $(this).next('.email-error').remove();
    });

});