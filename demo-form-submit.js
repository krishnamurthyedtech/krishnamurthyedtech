//  var orgId = 1;
  var orgId = 1;

  $("#submitDemoBtn").click(function () {
    var data = {
      userName: $("#username").val(),
      email: $("#email").val(),
      phoneNumber: $("#mobile").val(),
      country: $("#country").val(),
      technology: $("#technology").val(),
      description: $("#description").val(),
      startDate: $("#startDate").val()
    };

    $.ajax({
      // url: "http://localhost:8080/api/v1/" + orgId + "/jobsupport",
      url:"https://lndhub.krishnamurthyedtechapi.com/api/v1/" + orgId + "/jobsupport/demo",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
  alert("Demo booked successfully!");
  setTimeout(function () {
    $('#demoModal').modal('hide');
    $('#demoForm')[0].reset();

    // 🧽 Cleanup leftover backdrop and modal-open class
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }, 100);
},
      error: function (xhr) {
        alert("Error: while demo booking" );
      }
    });
  });