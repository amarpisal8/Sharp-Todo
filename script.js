const apiUrl = "https://crudcrud.com/api/465ba08919e643d5850c0d59b4c697c7";

window.addEventListener("DOMContentLoaded", () => {
    axios.get(`${apiUrl}/Data`)
        .then((res) => {
            res.data.forEach(user => ShowUserOnScreen(user));
        })
        .catch((err) => console.log(err));
    axios.get(`${apiUrl}/Done`)
        .then((res) => {
            res.data.forEach(user => AddToDone(user));
        })
        .catch((err) => console.log(err));
});

function handleFormSubmit(event) {
    event.preventDefault();
    const Todo = event.target.username.value;
    const description = event.target.Description.value;
    const myObj = { Todo, description };

    axios.post(`${apiUrl}/Data`, myObj)
        .then((res) => {
            ShowUserOnScreen(res.data);
            event.target.reset();
        })
        .catch((err) => console.log(err));
}

function ShowUserOnScreen(user) {
    const ParentEle = document.getElementById("listOfItems");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.Todo}</td>
        <td>${user.description}</td>
        <td>
            <button class="btn btn-success" onclick="markAsDone('${user._id}', '${user.Todo}', '${user.description}')">
                <i class="fas fa-check"></i>
            </button>
            <button class="btn btn-danger" onclick="deleteUser('${user._id}')">
                <i class="fas fa-trash-alt"></i> 
            </button>
        </td>
    `;

    row.id = user._id;
    ParentEle.appendChild(row);
}

function deleteUser(userId) {
    axios.delete(`${apiUrl}/Data/${userId}`)
        .then(() => removeFromScreen(userId))
        .catch((err) => console.log(err));
}

function removeFromScreen(userId) {
    const row = document.querySelector(`[data-id='${userId}']`);
    if (row) {
        row.remove();
    }
}

function markAsDone(userId, todo, description) {
    const myObj = { todo, description };
    axios.post(`${apiUrl}/Done`, myObj)
        .then(() => {
            deleteUser(userId);
            AddToDone(myObj);
        })
        .catch((err) => console.log(err));
}

function AddToDone(user) {
    const doneEle = document.getElementById("DoneItems");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.todo}</td>
        <td>${user.description}</td>
        <td> <i>Completed</i></td>
    `;

    doneEle.appendChild(row);
}
