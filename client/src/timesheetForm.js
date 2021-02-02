import list from './list'

const form = `

<form id="timesheetId">
<h1>Client Timesheet</h1>
<div class="form-group">
  <div class="form-group">
    <input type="hidden" class="form-control" id="jobId" placeholder="Enter Job ID" name="jobId">
    
  </div>

    <label for="name">Client Name</label>
    <input type="text" class="form-control" id="name" placeholder="Enter Client Name" name="name">
    
  </div>

  <div class="form-group">
    <label for="time">Time Spent On Site</label>
    <input type="text" class="form-control" id="time" placeholder="Arrival/Departure Time" name="time">
  </div>

  <div class="form-group">
    <label for="notes">Notes</label>
    <input type="text" class="form-control" id="notes" placeholder="Notes From Visit" name="notes">
  </div>

  <fieldset class="form-group">
    <legend class="col-form-label" id="completedtext">Was the job fully completed?</legend>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" id="completedYes" name ="completed" value="true">
      <label class="form-check-label" for="completedYes">Yes</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" id="completedNo" name ="completed" value="false">
      <label class="form-check-label" for="completedNo">No</label>
    </div>
  </fieldset>
  <div class="form-group">
    <label for="visitId">Visit Type</label>
    <select name="visitId" id="visit"></select>
  </div>
  <div class="form-group">
  <button type="button" id="create-timesheet" class="btn btn-primary">Create</button>
  <button  type="button" id="update-timesheet"  class="btn btn-primary">Update</button>
  <button  type="button" id="delete-timesheet"  class="btn btn-primary">Delete</button>
  </form>
  </div>
`;

const timesheetForm = () => {
  // This logic below gets all categories and loads it in the dropdown
  $("body").append(list());
  // Call server using AJAX to get all categories
  const visitResponse = $.ajax({
    type: "GET",
    url: "/api/timesheet/visitId/all",
  }).done((visitId) => {
    console.log("Visit ID: ", visitId);
    let optionsHtml = "";
    /*
    Iterate over all categories
    Construct a dynamic <option> tag for each category
    Append your optionsHtml to the <select> tag with id "categories"
    */
   visitId.forEach((timesheetEl) => {
     console.log("timesheet el", timesheetEl);
      optionsHtml += `<option value=${timesheetEl._id}>${timesheetEl.name}</option>`;
    });

    $("#visit").append(optionsHtml);
  });

  // Event listener to for Create Button
  $(document).on("click", "#create-timesheet", async (e) => {
    e.preventDefault();

    // Construct body by extracting info from the form
    const requestBody = {
      name: $("#name").val(),
      time: $("#time").val(),
      notes: $("#notes").val(),
      completed: $(`input[name="completed"]:checked`).val(),
      visitId: $("#visit").val(),
    };
console.log("request body: ", requestBody); 


console.log("JobId: ", requestBody.visitId); 
$("jobId").prepend(requestBody.visitId);
$("requestbody").append(requestBody);


    //Make a POST request to the server to create 
    const response = await $.ajax({
      type: "POST",
      url: "/api/timesheet/new-timesheet",
      contentType: "application/json",
      data: JSON.stringify(requestBody),
    });

    $('#timesheetDrop').remove();
    $('body').prepend(list()); 
    // Create a pop up alert in the UI to inform the user that a timesheet was created
    window.alert("Timesheet Created!");
  });

  // Event listener to for Update Button
  $(document).on("click", "#update-timesheet", async (e) => {
    e.preventDefault();

    // Construct body by extracting info from the form
    const requestBody = {
      name: $("#name").val(),
      time: $("#time").val(),
      notes: $("#notes").val(),
      completed: $(`input[name="completed"]:checked`).val(),
      visitId: $("#visit").val(),
    };

    // Make a PATCH request to the server to update
    const response = await $.ajax({
      type: "PATCH",
      url: `/api/timesheet/update-timesheet/${$("#jobId").val()}`,
      contentType: "application/json",
      data: JSON.stringify(requestBody),
    });

    // Create a pop up alert in the UI to inform the user that timesheet was updated
    window.alert("Timesheet Updated!");
  });

  // Event listener to for Delete Button
  $(document).on("click", "#delete-timesheet", async (e) => {
    e.preventDefault();

    // Make a DELETE request to the server to delete
    const response = await $.ajax({
      type: "DELETE",
      url: `/api/timesheet/delete-timesheet/${$("#jobId").val()}`,
      contentType: "application/json",
    });

    // Create a pop up alert in the UI to inform the user that a timesheet was deleted
    window.alert("Timesheet Deleted!");
  });

  return form;
};



export default timesheetForm;