
export default function ClunkyControls({
    newTask,
    handleInputChange,
    handleAddTask,
    handleRemoveCompleted
}: {
    newTask: string,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleAddTask: () => void,
    handleRemoveCompleted: () => void
}) {
    return (
        <div id="controls-container">
            <input
                type="text"
                value={newTask}
                onChange={handleInputChange}
                placeholder="Add new task"
            />
            <button onClick={handleAddTask}>Add</button>
            <button onClick={handleRemoveCompleted}>Remove completed</button>
        </div>
    );
}
