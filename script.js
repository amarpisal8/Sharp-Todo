const apiUrl = "https://crudcrud.com/api/83238bf572864e519ea39d443c6a3a13";


const clickSound = new Audio('./sound/action.mp3');
const completedSound = new Audio('./sound/completed.mp3');
// const deletedSound = new Audio('./sound/Deleted.mp3');


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
    clickSound.play();
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
    row.classList.add('animate__animated', 'animate__fadeInUp');

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
    const row = document.getElementById(userId);
    if (row) {
        row.classList.add('animate__animated', 'animate__fadeOut');
        row.addEventListener('animationend', () => row.remove());
    }
}

function markAsDone(userId, todo, description) {
    const myObj = { todo, description };
    axios.post(`${apiUrl}/Done`, myObj)
        .then(() => {
            deleteUser(userId);
            AddToDone(myObj);
            completedSound.play();
        })
        .catch((err) => console.log(err));
}

function AddToDone(user) {
    const doneEle = document.getElementById("DoneItems");
    const row = document.createElement("tr");
    row.classList.add('animate__animated', 'animate__fadeInUp');

    row.innerHTML = `
        <td>${user.todo}</td>
        <td>${user.description}</td>
        <td> <i><i id="checkTick" class="fa-solid fa-circle-check fa-lg" style="color: #1b6600;"></i></i></td>
    `;

    doneEle.appendChild(row);
}
