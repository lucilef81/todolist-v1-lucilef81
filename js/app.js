/**
 * Todolist
 */

const app = {
  todos: [],
  remaining: 0,
  init: () => {
    app.nextID = app.todos.length + 1;
    app.createInput();
    app.createTitle();
    app.todosContainer = document.createElement('div');
    app.todosContainer.className = "todos"
    document.body.appendChild(app.todosContainer);

    app.showTodos();

    app.input.addEventListener('keyup', e => {
      if (e.keyCode === 13 || e.keyCode === 10) {
        const newTodo = {
          id: app.nextID,
          label: e.target.value,
          completed: false,
        }
        app.todos.push(newTodo);
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
    app.showTodos();
    app.updateTitle();

  },

  createInput: () => {
    app.input = document.createElement('input');
    app.input.className = 'add-input';
    app.input.placeholder = 'Ajouter une tâche';
    app.input.name = 'todo-label';
    document.body.appendChild(app.input);
  },

  createTitle: () => {
    app.title = document.createElement('h2');
    app.title.className = 'tasks-title';
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
      todoInput.checked = todo.completed;
      const todoLabel = document.createElement('label');
      todoLabel.htmlFor = todoInput.id;
      todoLabel.textContent = todo.label;
      const todoContainer = document.createElement('div');
      todoContainer.className = "todo-container"
      todoContainer.appendChild(todoInput);
      todoContainer.appendChild(todoLabel);
      todoInput.addEventListener('change', ({ target: { checked } }) => app.toggleTodo(checked, todo.id));
      
      if(todo.completed) {
        todoContainer.classList.add('is-completed')
      } else {
        todoContainer.classList.contains('is-completed') && todoContainer.classList.remove('is-completed')
      }

      app.todosContainer.appendChild(todoContainer);
    });
  },

  toggleTodo: (checked, id) => {
    app.todos = app.todos.map(t => {
      if(t.id === id) {
        return {
          id: t.id,
          label: t.label,
          completed: checked
        }
      }
      return t
    })

    app.renderTodos()

  }
};

// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
