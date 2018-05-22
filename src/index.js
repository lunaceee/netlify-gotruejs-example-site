import "file-loader?name=index.html!./index.html";
import GoTrue from "gotrue-js";
import 'normalize.css';
import "./style.css";

// instantiate auth
let auth;

document
  .querySelector("form[name='endpoint']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const {
      apiendpoint
    } = form.elements;
    auth = new GoTrue({
      APIUrl: apiendpoint.value
    });
    document.getElementById(
      "alert-msg"
    ).innerHTML = `<br><p>API endpoint submitted!</p>`;
  });

window.auth = auth;

//sign up
document.querySelector("form[name='signup']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  if (!auth) {
    noAuthFound(form)
  }

  const {
    email,
    password
  } = form.elements;
  auth
    .signup(email.value, password.value)
    .then(response =>
      showMessage(`<p>Created a user! </p><p>Response: </p><code>${JSON.stringify(response)}</code>`, form)
    )
    .catch(error => showMessage(`Failed :( <code>${JSON.stringify(error)}</code>`, form));
});

document.querySelector("#user-email").textContent = "Are you logged in?";

//login
document.querySelector("form[name='login']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  if (!auth) {
    noAuthFound(form)
  }
  const {
    email,
    password
  } = form.elements;
  auth
    .login(email.value, password.value)
    .then(response => {
      document.querySelector("#user-email").textContent = email.value;
      showMessage(
        `<p>Log in successful! </p><p>Response:  </p><code>${JSON.stringify(response)}</code>`,
        form
      );
    })
    .catch(error =>
      showMessage(`Failed to log in :( <code>${JSON.stringify(error)}</code>`, form)
    );
});

//request recovery email
document
  .querySelector("form[name='request_recovery']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;

    if (!auth) {
      noAuthFound(form)
    }

    if (!auth.currentUser()) {
      noUserFound(form)
    }

    const user = auth.currentUser();
    const email = user.email;

    auth
      .requestPasswordRecovery(email)
      .then(response =>
        showMessage(
          `<p>Recovery email sent, check your inbox! </p><p>Response: </p><code>${JSON.stringify(response)}</code>`,
          form
        )
      )
      .catch(error =>
        showMessage(`Something went wrong :( <code>${JSON.stringify(error)}</code>`, form));
  });

//get current user
document
  .querySelector("form[name='get_current_user']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const user = auth.currentUser();
    user ?
      showMessage(
        `<p>Got current user! </p><p>Response: </p><code>${JSON.stringify(user)}</code>`,
        form
      ) : showMessage(`<p>User not found...did you log in?</p>`, form)
  });


//Update users
document
  .querySelector("form[name='update_user']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const {
      password
    } = form.elements;
    const user = auth.currentUser();
    user
      .update({
        password: password.value
      })
      .then(
        response => {
          showMessage(
            `<p>Updated user! </p><p>Response: </p><code>${JSON.stringify(response)}</code>`,
            form
          )
        })
      .catch(error => {
        showMessage(`Failed to update user :( <code>${JSON.stringify(error)}</code>`, form)
      });
  });


//get jwt token
document
  .querySelector("form[name='get_token']")
  .addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    if (!auth) {
      noAuthFound(form)
    }

    if (!auth.currentUser()) {
      noUserFound(form)
    }
    const user = auth.currentUser();
    const jwt = user.jwt();

    jwt
      .then(response =>
        showMessage(
          `<p>Got JWT token! </p><p>Response: </p><code>${JSON.stringify(response)}</code>`,
          form
        )
      )
      .catch(error => {
        showMessage(
          `<p>Failed to get JWT token :( </p><code>${JSON.stringify(error)}</code>`,
          form
        );
        throw error;
      });
  });

//log out
document.querySelector("form[name='log_out']").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  if (!auth) {
    noAuthFound(form)
  }

  if (!auth.currentUser()) {
    noUserFound(form)
  }
  const user = auth.currentUser();
  user
    .logout()
    .then(response => {
      showMessage(`<p>Logged out!</p><p>Response: </p><code>${JSON.stringify(response)}</code>`, form)
    })
    .catch(error => {
      showMessage(`<p>Failed to log out :(</p><code>${JSON.stringify(error)}</code>`, form);
      throw error;
    });
});

//helper functions

function noAuthFound(form) {
  showMessage(`<p>Did you paste in your API endpoint?</p>`, form);
}

function noUserFound(form) {
  showMessage(`<p>Did you log in?</p>`, form)
}

function showMessage(msg, el) {
  el.querySelector(".message").innerHTML = msg;
}

function clearPage() {
  document.querySelectorAll(".message").forEach(el => {
    el.textContent = "";
  });
}