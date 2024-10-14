(function() {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function() {
            if (input.value !== '') {
                button.disabled = false;
            }
        });

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name, done = false) {
        let item = document.createElement('li');
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        item.innerHTML = `
            <span>${name}</span>
            <div class="btn-group btn-group-sm">
                <button class="btn btn-success">Готово</button>
                <button class="btn btn-danger">Удалить</button>
            </div>
        `;

        let doneButton = item.querySelector('.btn-success');
        let deleteButton = item.querySelector('.btn-danger');

        const myDialog = document.getElementById('myDialog');
        const dialogButton = document.getElementById('dialogButton');
        const closeButton = document.getElementById('closeDialog');

        if (done) {
            item.classList.add('list-group-item-success');
            doneButton.remove();
        }

        doneButton.addEventListener('click', function() {
            item.classList.toggle('list-group-item-success');
            doneButton.remove();
        });
        
        deleteButton.addEventListener('click', function() {
            myDialog.classList.add('d-flex');
            myDialog.showModal();

            closeButton.addEventListener('click', function() {
                myDialog.classList.remove('d-flex');
                myDialog.close();
            });

            dialogButton.addEventListener('click', function() {
                myDialog.classList.remove('d-flex');
                item.remove();
                myDialog.close();
            });
        });

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp(container, title = 'Список дел', tasks = []) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        function addTodoItem(name, done = false) {
            let todoItem = createTodoItem(name, done);

            if (done) {
                todoItem.item.classList.add('list-group-item-success');
            }

            todoList.append(todoItem.item);
        }

        for (let task of tasks) {
            addTodoItem(task.name, task.done);
        }

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                todoItemForm.button.disabled = true;
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);

            todoList.append(todoItem.item);
            
            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
})();