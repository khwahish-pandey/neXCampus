import React, { useState } from 'react';
import './todo.css'; // The new CSS file for this component

// --- SVG Icon Components ---
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.716c-1.123 0-2.033.954-2.033 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


const TodoList = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Finish the report for the ML project', isCompleted: true },
        { id: 2, text: 'Prepare for the Web Dev quiz', isCompleted: false },
        { id: 3, text: 'Submit the fee payment', isCompleted: false },
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            isCompleted: false,
        };

        setTasks([...tasks, newTask]);
        setInputValue('');
    };

    const handleToggleComplete = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="todo-list-wrapper">
            <div className="todo-list-container">
                <h2 className="todo-list-title">My To-Do List</h2>
                
                <form className="todo-input-form" onSubmit={handleAddTask}>
                    <input
                        type="text"
                        className="todo-input"
                        placeholder="Add a new task..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="add-task-btn" title="Add Task">
                        <PlusIcon />
                    </button>
                </form>

                <div className="tasks-list-container">
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <div key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
                                <div className="task-checkbox" onClick={() => handleToggleComplete(task.id)}>
                                    {task.isCompleted && '✔'}
                                </div>
                                <span className="task-text">{task.text}</span>
                                <button className="delete-task-btn" onClick={() => handleDeleteTask(task.id)} title="Delete Task">
                                    <TrashIcon />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="no-tasks-message">You're all caught up! ✨</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoList;