

const form = `
<form id = "timesheetDrop" >
<div class="form-group">
<label for="projectId">Project name</label>
<select name="timesheet" id="timesheets"></select>
</div>
<button type="submit" class="btn">show Tasks</button>

</form>


`;
const list = () => {
    console.log("list", list); 
  $.ajax({
    type: "GET",
    url: "/api/timesheet/all",
  }).done((timesheets) => {
    console.log("timesheets: ", timesheets);
    let optionsHtml = "";
    timesheets.forEach((timesheetEl) => {
      console.log("timesheetEl: ", timesheetEl);
      optionsHtml += `<option value=${timesheetEl._id}>${timesheetEl.name}</option>`;
      console.log("optionsHtml", optionsHtml);
    });
    console.log("optionsHtml", optionsHtml);
    $("#timesheets").append(optionsHtml);
  });


  $(document).on("submit", "#timesheetDrop", (e) => {
    e.preventDefault();
    console.log($("#timesheets").val());
    const timesheetId = $("#timesheets").val();
    $.ajax({
      type: "GET",
      url: `/api/timesheet/${timesheetId}`,
    }).done((timesheet) => {
      console.log("timesheet: ", timesheet); 
      $("input[name='jobId']").val(timesheet._id)
      $("input[name='name']").val(timesheet.name)
      $("input[name='time']").val(timesheet.time)
      $("input[name='notes']").val(timesheet.notes)
      // if(timesheet.completed) {
      //   $("#completedYes").prop('checked', true) 
      // } else {
      //   $("#completedNo").prop('checked', true) 
      // }
      timesheet.completed ? $("#completedYes").prop('checked', true) : $("#completedNo").prop('checked', true)
      $("select[name='visitId']").val(timesheet.visitId)
    });
    // const response = $.ajax({
    //   type: "Patch", // OR GET
    //   url: `/api//project/update/${projectId}`,
    //   contentType: "application/json",
    //   data: JSON.stringify(response),
    // });

  });
  return form;
};

export default list;