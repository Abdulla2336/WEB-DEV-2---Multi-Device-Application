document.getElementById('todo-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const input = document.getElementById('new-todo');
  const task = input.value.trim();
  if (task === '') return;

  // Send the new task to the backend
  const res = await fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  });

  if (res.ok) {
    input.value = '';
    loadTasks(); // reload tasks after adding
  } else {
    alert('Failed to add task.');
  }
});

async function loadTasks() {
  const res = await fetch('/tasks');
  const tasks = await res.json();

  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;

    // Create delete button with emoji and styling
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.title = 'Remove this task';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.border = 'none';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.fontSize = '1.2rem';

    deleteBtn.onclick = async () => {
      const res = await fetch(`/delete/${index}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        loadTasks();
      } else {
        alert('Failed to delete task.');
      }
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Load tasks when page loads
loadTasks();
