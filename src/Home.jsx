import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    completed: [],
  }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add habit to "To-Do" section
  const addHabit = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, { text: task, category: 'todo' }], // Add to to-do
      }));
      setTask(''); // Clear input
    }
  };

  // Move habit to another category
  const moveHabit = (currentCategory, targetCategory, habitToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t.text !== habitToMove.text
      );
      const updatedTarget = [
        ...prevTasks[targetCategory],
        { ...habitToMove, category: targetCategory },
      ];
      return {
        ...prevTasks,
        [currentCategory]: updatedCurrent,
        [targetCategory]: updatedTarget,
      };
    });
  };

  // Delete a single habit
  const deleteHabit = (category, habitToDelete) => {
    setTasks((prevTasks) => {
      const updatedCategory = prevTasks[category].filter(
        (t) => t.text !== habitToDelete.text
      );
      return { ...prevTasks, [category]: updatedCategory };
    });
  };

  // Clear all habits
  const clearAllHabits = () => {
    setTasks({ todo: [], ongoing: [], completed: [] });
  };

  // Clear habits for a specific category
  const clearHabits = (category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [],
    }));
  };

  return (
    <div className="home">
      <div className="heading-container">
        <h1 className="main-heading">HabitNow</h1>
      </div>

      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addHabit();
        }}
      >
        <input
          type="text"
          placeholder="Enter habit..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="button" className="add-task-button" onClick={addHabit}>
          ADD HABIT
        </button>
      </form>

      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>Planned Habits</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index} className={`task ${t.category}`}>
                <div className="task-text">{t.text}</div>
                <div className="task-buttons">
                  <button
                    className="move-to-ongoing-btn"
                    onClick={() => moveHabit('todo', 'ongoing', t)}
                  >
                    Move to Ongoing
                  </button>
                  <button
                    className="move-to-completed-btn"
                    onClick={() => moveHabit('todo', 'completed', t)}
                  >
                    Move to Completed
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteHabit('todo', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="clear-all-button" onClick={() => clearHabits('todo')}>
            Clear All
          </button>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing Habits</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index} className={`task ${t.category}`}>
                <div className="task-text">{t.text}</div>
                <div className="task-buttons">
                  <button
                    className="move-to-todo-btn"
                    onClick={() => moveHabit('ongoing', 'todo', t)}
                  >
                    Move to Planned
                  </button>
                  <button
                    className="move-to-completed-btn"
                    onClick={() => moveHabit('ongoing', 'completed', t)}
                  >
                    Move to Completed
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteHabit('ongoing', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="clear-all-button" onClick={() => clearHabits('ongoing')}>
            Clear All
          </button>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Habits</h2>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index} className={`task ${t.category}`}>
                <div className="task-text">{t.text}</div>
                <div className="task-buttons">
                  <button
                    className="move-to-ongoing-btn"
                    onClick={() => moveHabit('completed', 'ongoing', t)}
                  >
                    Move to Ongoing
                  </button>
                  <button
                    className="move-to-todo-btn"
                    onClick={() => moveHabit('completed', 'todo', t)}
                  >
                    Move to Planned
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteHabit('completed', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="clear-all-button" onClick={() => clearHabits('completed')}>
            Clear All
          </button>
        </div>
      </div>

      <button className="clear-all-button" onClick={clearAllHabits}>
        Clear All Habits
      </button>
    </div>
  );
}

export default Home;
