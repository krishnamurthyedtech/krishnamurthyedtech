/* ================= OPEN DROPDOWN ================= */
function openDropdown() {
  $("#dropdownMenu").addClass("active");
  $("#overlay").addClass("active");
}

/* ================= OPEN SPECIFIC FORM ================= */
function openForm(formType) {
  $("#dropdownMenu").removeClass("active");
  $("#" + formType + "Form").addClass("active");
}

/* ================= BACK TO MENU ================= */
function backToMenu() {
  $(".form-container").removeClass("active");
  $("#dropdownMenu").addClass("active");
}

/* ================= CLOSE EVERYTHING ================= */
function closeAll() {
  $("#dropdownMenu").removeClass("active");
  $("#overlay").removeClass("active");
  $(".form-container").removeClass("active");
}

/* ================= HANDLE FORM SUBMIT ================= */
function handleSubmit(event, formType) {
  event.preventDefault();

  console.log(formType + " form submitted");

  alert("Thank you for your registration! We will contact you soon.");

  closeAll();
  event.target.reset();
}
