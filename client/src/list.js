import taskForm from "./task"


const form = `
<form id = "timesheetForm" >
<div class="form-group">
<label for="projectId">Project name</label>
<select name="timesheet" id="timesheets"></select>
</div>
<button type="submit" class="btn">show Tasks</button>

</form>
<ul id="tasksList" ></ul>
<div id="taskDetail"></div>

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


  $(document).on("submit", "#timesheetForm", (e) => {
    e.preventDefault();
    console.log($("#timesheets").val());
    const projectId = $("#timesheets").val();
    $.ajax({
      type: "GET",
      url: `/api//project/getById/${projectId}`,
    }).done((tasks) => {
      $("#tasksList").empty();

      tasks.forEach((task) => {
        const taskHtml = $(`<li>${task.name}</li>`);

        taskHtml.on("click", () => {
          console.log("id: ", task);
          const detail = taskForm(task);
          console.log("detail: ", detail);
          $("#taskDetail").empty();
          $("#taskDetail").append(detail);
        });
        $("#tasksList").append(taskHtml);

      });
    });
    const response = $.ajax({
      type: "Patch", // OR GET
      url: `/api//project/update/${projectId}`,
      contentType: "application/json",
      data: JSON.stringify(response),
    });
    console.log(`This is the response I get back!: ${response}`);

  });
  return form;
};

export default list;