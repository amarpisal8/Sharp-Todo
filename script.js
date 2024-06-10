const apiUrl = "https://crudcrud.com/api/332ff279073643059d148e910af32498";

window.addEventListener("DOMContentLoaded", () => {
  axios.get(`${apiUrl}/Data`)
    .then((res) => {
      res.data.forEach(item => ShowUserOnScreen(item));
    })
    .catch((err) => {
      console.log(err);
    });

  axios.get(`${apiUrl}/Done`)
    .then((res) => {
      res.data.forEach(item => AddToDone(item));
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleFormSubmit(event) {
  event.preventDefault();
  const todo = event.target.username.value;
  const description = event.target.Description.value;
  const myObj = { Todo: todo, description: description };

  axios.post(`${apiUrl}/Data`, myObj)
    .then((res) => {
      ShowUserOnScreen(res.data);
      event.target.reset();
    })
    .catch((err) => {
      console.log(err);
    });
}

function ShowUserOnScreen(user) {
  const tableBody = document.getElementById("listOfItems");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${user.Todo}</td>
    <td>${user.description}</td>
    <td class="action-btns">
      <button class="btn btn-success" onclick="markAsDone('${user._id}', '${user.Todo}', '${user.description}')">✔️</button>
      <button class="btn btn-danger" onclick="deleteUser('${user._id}', this)">🗑️</button>
    </td>
  `;

  tableBody.appendChild(row);
}

function deleteUser(userId, btn) {
  axios.delete(`${apiUrl}/Data/${userId}`)
    .then(() => {
      const row = btn.closest("tr");
      row.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function markAsDone(userId, todo, description) {
  const myObj = { Todo: todo, description: description };

  axios.post(`${apiUrl}/Done`, myObj)
    .then(() => {
      deleteUser(userId, { closest: () => document.querySelector(`button[onclick*='${userId}']`).closest("tr") });
      AddToDone(myObj);
    })
    .catch((err) => {
      console.log(err);
    });
}

function AddToDone(user) {
  const tableBody = document.getElementById("DoneItems");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${user.Todo}</td>
    <td>${user.description}</td>
  `;

  tableBody.appendChild(row);
}
