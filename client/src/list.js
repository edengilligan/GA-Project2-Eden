// import taskForm from "./task"
// const form = `
// <form id = "projectsForm" >
// <div class="form-group">
// <label for="projectId">Project name</label>
// <select name="projectId" id="projects"></select>
// </div>
// <button type="submit" class="btn">show Tasks</button>

// </form>
// <ul id="tasksList" ></ul>
// <div id="taskDetail"></div>

// `;

// const list = () => {
//   $.ajax({
//     type: "GET",
//     url: "/api/project/all",
//   }).done((ProjectCategories) => {
//     console.log("ProjectCategories: ", ProjectCategories);
//     let optionsHtml = "";
//     ProjectCategories.forEach((projectEl) => {
//       console.log("projectEl: ", projectEl);
//       optionsHtml += `<option value=${projectEl._id}>${projectEl.projectName}</option>`;
//       console.log("optionsHtml", optionsHtml);
//     });
//     console.log("optionsHtml", optionsHtml);
//     $("#projects").append(optionsHtml);
//   });




//   $(document).on("submit", "#projectsForm", (e) => {
//     e.preventDefault();
//     console.log($("#projects").val());
//     const projectId = $("#projects").val();
//     $.ajax({
//       type: "GET",
//       url: `/api//project/getById/${projectId}`,
//     }).done((tasks) => {
//       $("#tasksList").empty();

//       tasks.forEach((task) => {
//         const taskHtml = $(`<li>${task.name}</li>`);

//         taskHtml.on("click", () => {
//           console.log("id: ", task);
//           const detail = taskForm(task);
//           console.log("detail: ", detail);
//           $("#taskDetail").empty();
//           $("#taskDetail").append(detail);
//         });
//         $("#tasksList").append(taskHtml);

//       });
//     });
//     const response = $.ajax({
//       type: "Patch", // OR GET
//       url: `/api//project/update/${projectId}`,
//       contentType: "application/json",
//       data: JSON.stringify(response),
//     });
//     console.log(`This is the response I get back!: ${response}`);

//   });
//   return form;
// };

// export default list;
