const taskForm = (task) => {
    console.log("task page", task);
    console.log("task name: ", task.name);
    const form = `
    <form id = "taskForm">
    <table class="styled-table">
    <th>Project Name : ${task.name}</th>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
      <th>Comment</th>
      <th>Action</th>
      <th></th>
    </tr>
    <tr>
      <td> ${task.name} </td>
      <td> ${task.status}</td>
      <td> ${task.date}</td>
      <td> ${task.comment}</td>
      <td>
          <i class="material-icons button edit">edit</i>
          </td>
          <td>
          <i class="material-icons button delete">delete</i>
        </td>
    </tr>
    </table>
    </form>
      `;
    return form;
  };
  export default taskForm;
  