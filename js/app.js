/**
 * Todolist
 */
const app = {
  todos: [],
  remaining: 0,
  init: () => {
    app.nextID = app.length + 1;
    app.createInput();
    app.createTitle();
    app.todosContainer = document.createElement('div');
    app.todosContainer.className = "todos"
    document.body.appendChild(app.todosContainer);

    app.showTodos();

    app.input.addEventListener('keyup', e => {
      if (e.keyCode === 13 || e.keyCode === 10) {
        app.todos.push({
          id: app.nextID,
          label: e.target.value,
          completed: false,
        });
        app.nextID++;
        e.target.value = '';
        app.renderTodos();
      }
    });
  },

  clearTodos: () => {
    app.todosContainer.innerHTML = '';
  },

  renderTodos: () => {
    app.clearTodos();
    app.updateTitle();
    app.showTodos();

  },

  createInput: () => {
    app.input = document.createElement('input');
    app.input.className = 'addTask';
    app.input.placeholder = 'Ajouter une tâche';
    app.input.name = 'todo-label';
    document.body.appendChild(app.input);
  },

  createTitle: () => {
    app.title = document.createElement('h2');
    app.title.className = 'tasksTitle';
    app.updateTitle();
    document.body.appendChild(app.title);
  },

  updateTitle: () => {
    app.remaining = app.todos.filter(todo => !todo.completed).length;
    app.title.textContent = `${app.remaining} tâche${
      app.remaining !== 1 ? 's' : ''
    } en cours`;
  },

  showTodos: () => {
    app.todos.forEach(todo => {
      const todoInput = document.createElement('input');
      todoInput.className = 'todo';
      todoInput.id = `todo-${todo.id}`;
      todoInput.type = 'checkbox';
      const todoLabel = document.createElement('label');
      todoLabel.htmlFor = todoInput.id;
      todoLabel.textContent = todo.label;
      const todoContainer = document.createElement('div');
      todoContainer.className = "todo-container"
      todoContainer.appendChild(todoInput);
      todoContainer.appendChild(todoLabel);
      app.todosContainer.appendChild(todoContainer);
    });
  },
};

// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
