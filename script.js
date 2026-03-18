let tasks = [];

            const taskInput = document.getElementById('taskInput');
            const addButton = document.getElementById('addButton');
            const taskList = document.getElementById('taskList');
            const emptyMessage = document.getElementById('emptyMessage');

            function loadTasks() {
                const savedTasks = localStorage.getItem('tasks');
                if (savedTasks) {
                    tasks = JSON.parse(savedTasks);
                    displayTasks();
                }
            }

            function saveTasks() {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            function addTask() {
                const taskText = taskInput.value.trim();

                if (taskText === '') {
                    alert('Please enter a task!');
                    return;
                }

                const newTask = {
                    id: Date.now(),
                    text: taskText,
                    completed: false
                };

                tasks.push(newTask);
                saveTasks();
                taskInput.value = '';
                displayTasks();
            }

            function deleteTask(id) {
                tasks = tasks.filter(task => task.id !== id);
                saveTasks();
                displayTasks();
            }

            function toggleComplete(id) {
                const task = tasks.find(task => task.id === id);
                if (task) {
                    task.completed = !task.completed;
                    saveTasks();
                    displayTasks();
                }
            }

            function displayTasks() {
                taskList.innerHTML = '';

                if (tasks.length === 0) {
                    emptyMessage.style.display = 'block';
                    return;
                } else {
                    emptyMessage.style.display = 'none';
                }

                tasks.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.className = 'task-item';
                    
                    taskItem.innerHTML = `
                        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                        <div class="task-actions">
                            <button class="complete-btn" onclick="toggleComplete(${task.id})">
                                ${task.completed ? '↺ Undo' : '✓ Done'}
                            </button>
                            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                        </div>
                    `;
                    
                    taskList.appendChild(taskItem);
                });
            }

            addButton.addEventListener('click', addTask);

            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });

            loadTasks();