import newUser from "./newUser";
import timesheetForm from "../timesheetForm";

/*
I've added a button in this form to allow a first time user to register
Clicking on the Register New User button loads the newUser.js form
*/

const form = `
  <form id="login-user">
  <h1>Staff Portal Login</h1>
    <div class="form-group">
      <label for="Staff username">Username</label>
      <input type="text" class="form-control" placeholder="Please enter username" name="username">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" placeholder="Please enter password" name="password">
    </div>
    <button type="submit" class="btn btn-primary" id="submit-button">Register</button>
  </form>
  
`;

const loginUser = () => {
  $(document).on("submit", "#login-user", async (event) => {
    event.preventDefault();

    // Extract username and password entered
    const formData = {
      username: $("input[name='username']").val(),
      password: $("input[name='password']").val(),
    };

    // Make a call to validate user name and password
    try {
      const response = await $.ajax({
        type: "POST",
        url: "/api/users/register",
        contentType: "application/json",
        data: JSON.stringify(formData),
      });

      // Clear current login form as login is successful by calling empty() function
      $("body").empty();
      
      // Append the fruit form to the body allowing the user to create/update/delete fruits
      $("body").append(timesheetForm());
    } catch (err) {
      // If there's a problem logging in, then add a message to let user know that an invalid combination was provided
      $("body").append("<div>Invalid user/pass provided!</div>");
    }
  });
  return form;
};

// // Add event listener for Register new user button being clicked
// $(document).on("click", "#register-new-user", () => {
//   // Clear current login form
//   $("body").empty();

//   // Append new user form instead
//   $("body").append(newUser());
// });

export default loginUser;