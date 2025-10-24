$("#submitDemoBtn").click(function () {
  console.log("Submit button clicked");
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
    technology: $("#technology").val(),
    description: $("#description").val(),
    createdDate: createdDate,
    timeZone: $("#timezone").val(),
    demoType: $("#Enrollmenttype").val()
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
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      }, 100);
    },
    error: function (xhr) {
      alert("Error: while demo booking");
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