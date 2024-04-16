document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://crudcrud.com/api/d42f960357df47daa3b0906f3cae509b/todo';

    const todoList = document.getElementById('todo-list');
    const todoTitleInput = document.getElementById('todo-title');
    const todoDescriptionInput = document.getElementById('todo-description');
    const addTodoBtn = document.getElementById('add-todo-btn');

    // Function to fetch todos from API
    const fetchTodos = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Function to display todos
    const displayTodos = (todos) => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
                <div class="action-buttons">
                    <button class="done-btn" onclick="markAsDone('${todo._id}')"><i class="fas fa-check"></i> Done</button>
                    <button class="delete-btn" onclick="deleteTodo('${todo._id}')"><i class="fas fa-trash"></i> Delete</button>
                    ${todo.status ? `<span class="status">Status: ${todo.status}</span>` : ''}
                </div>
            `;
            todoList.appendChild(todoItem);
        });
    };

    // Function to add new todo
    addTodoBtn.addEventListener('click', async () => {
        const title = todoTitleInput.value.trim();
        const description = todoDescriptionInput.value.trim();

        if (title === '' || description === '') {
            alert('Please enter title and description');
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });
            const data = await response.json();
            fetchTodos();
            todoTitleInput.value = '';
            todoDescriptionInput.value = '';
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    });

    // Function to mark todo as done
    window.markAsDone = async (id) => {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'done' })
            });
            fetchTodos();
        } catch (error) {
            console.error('Error marking todo as done:', error);
        }
    };

    // Function to delete todo
    window.deleteTodo = async (id) => {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Initial fetch todos
    fetchTodos();
});
