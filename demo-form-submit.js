var demoSubmitAttempted = false;

$("#submitDemoBtn").click(function () {
  console.log("Submit button clicked");
  demoSubmitAttempted = true; // mark that user attempted to submit so validation messages can appear
  // Client-side validation: show inline errors and prevent submit if required fields are missing
  if (!validateDemoForm()) {
    return;
  }
  const orgId = 1;
  var date = $("#startDate").val();
  var time = $("#startTime").val();
  var $btn = $(this);
  var $spinner = $("#submitSpinner");
  var $submitText = $("#submitText");

  var createdDate = date && time ? Math.floor(new Date(date + 'T' + time).getTime() / 1000) : null;

  var data = {
    userName: $("#username").val(),
    email: $("#email").val(),
    phoneNumber: $("#mobile").val(),
    country: $("#country").val(),
    countryCode: $("#countryCode").val(),
    technology: $("#technology").val(),
    description: $("#description").val(),
    createdDate: createdDate,
    timeZone: $("#timezone").val(),
  demoType: $("#EnrollmentType").val()
    // link: $("#link").val("https://pioneermeetings.com/?roomId="),
  };

  // Immediately show loading state
  $btn.prop('disabled', true);
  $submitText.text("Processing..."); // Change button text
  $spinner.removeClass('d-none');

  $.ajax({
    // url: "http://localhost:8080/api/v1/" + orgId + "/jobsupport/demo",
    url: "https://lndhub.krishnamurthyedtechapi.com/api/v1/" + orgId + "/jobsupport/demo",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    beforeSend: function () {
      $("#loader").show(); // Page-level loader
    },
    success: function (response) {
      alert("Demo booked successfully!");
      setTimeout(function () {
        $('#demoModal').modal('hide');
        $('#demoForm')[0].reset();
        $('#timezone').val('IST');
        $('#countryCode').val('+91');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      }, 100);
    },
    error: function (xhr) {
      var msg = 'An error occurred while booking demo.';
      try {
        if (xhr && xhr.responseJSON && xhr.responseJSON.message) {
          msg = xhr.responseJSON.message;
        } else if (xhr && xhr.responseText) {
          try { var parsed = JSON.parse(xhr.responseText); if (parsed && parsed.message) msg = parsed.message; } catch(e) { msg = xhr.responseText || msg; }
        } else if (xhr && xhr.statusText) {
          msg = xhr.statusText;
        }
      } catch (e) {}
      $("#demoFormError").removeClass('d-none').text(msg);
    }, 
    complete: function () {
      // Reset button state
      $btn.prop('disabled', false);
      $submitText.text("Submit");
      $spinner.addClass('d-none');
      $("#loader").hide();
    }
  });
});

// Validation helpers
function validateDemoForm() {
  var valid = true;
  $("#demoFormError").addClass('d-none').text('');
  var $firstInvalid = null;
  $('#demoForm').find('input[required],textarea[required],select[required]').each(function() {
    var $el = $(this);
    if ($.trim($el.val()) === '') {
      // mark invalid only after the user attempted to submit
      valid = false;
      if (demoSubmitAttempted) {
        $el.addClass('is-invalid');
        // ensure default required message is present
        if ($el.next('.invalid-feedback').length) {
          $el.next('.invalid-feedback').text('This field is required');
        }
        if (!$firstInvalid) { $firstInvalid = $el; }
      }
    } else {
      $el.removeClass('is-invalid');
      // reset any custom message back to default
      if ($el.next('.invalid-feedback').length) {
        $el.next('.invalid-feedback').text('This field is required');
      }
    }
  });

  // Email validation: check presence of '@' first, then basic format
  var $email = $('#demoForm').find('#email');
  var emailVal = $.trim($email.val());
  if (emailVal !== '') {
    if (emailVal.indexOf('@') === -1) {
      // Missing @ symbol
      valid = false;
      if (demoSubmitAttempted) {
        $email.addClass('is-invalid');
        var msg = 'Please enter a valid email address (example@domain.com or example@gmail.com).';
        if ($email.next('.invalid-feedback').length) {
          $email.next('.invalid-feedback').text(msg);
        } else {
          // Ensure feedback element exists so message is visible
          $email.after('<div class="invalid-feedback">'+msg+'</div>');
        }
        console.log('DemoForm: email missing @ ->', emailVal);
        if (!$firstInvalid) { $firstInvalid = $email; }
      }
    } else {
      // Basic practical regex for general validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        valid = false;
        if (demoSubmitAttempted) {
          $email.addClass('is-invalid');
          var msg2 = 'Please enter a valid email address (example@domain.com or example@gmail.com).';
          if ($email.next('.invalid-feedback').length) {
            $email.next('.invalid-feedback').text(msg2);
          } else {
            $email.after('<div class="invalid-feedback">'+msg2+'</div>');
          }
          console.log('DemoForm: email invalid format ->', emailVal);
          if (!$firstInvalid) { $firstInvalid = $email; }
        }
      }
    }
  }

  if ($firstInvalid) {
    $firstInvalid.focus();
  }
  return valid;
}

// Clear inline validation on input/change
$('#demoForm').on('input change', 'input,textarea,select', function() {
  var $el = $(this);
  if ($.trim($el.val()) !== '') {
    $el.removeClass('is-invalid');
    // Reset invalid-feedback text for this field
    if ($el.next('.invalid-feedback').length) {
      $el.next('.invalid-feedback').text('This field is required');
    }
    $("#demoFormError").addClass('d-none').text('');
  }
});

// When the modal opens clear previous validation states so errors aren't visible initially
$('#demoModal').on('show.bs.modal', function () {
  demoSubmitAttempted = false; // reset submit attempt flag so errors don't show until next Submit
  $('#demoForm').find('.is-invalid').removeClass('is-invalid');
  $('#demoFormError').addClass('d-none').text('');
});

// Fallback: ensure any element that targets #demoModal will show it (delegated handler)
// This helps when data attributes may not trigger, or buttons are added dynamically.
$(document).on('click', '[data-target="#demoModal"]', function (e) {
  e.preventDefault();
  if ($('#demoModal').length) {
    $('#demoModal').modal('show');
  }
});