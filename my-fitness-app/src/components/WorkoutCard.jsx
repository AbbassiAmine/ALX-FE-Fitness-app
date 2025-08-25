function WorkoutCard({ workout, onStartAgain }) {
    const maxWeight = Array.isArray(workout.exercises)
        ? workout.exercises.reduce((max, ex) => Math.max(max, Number(ex.weight)), 0)
        : 0;

    return (

        <div className="bg-[#ffffff] rounded-lg mb-4 shadow-md">
            <h3 className="text-lg font-bold text-[#2d3436]">{workout.name || 'Unnamed Workout'}</h3>
            <p className="text-[#6c757d]">
                Date: {workout.timestamp ? new Date(workout.timestamp).toLocaleDateString() : 'No date'}
                <br />
                Max Weight: {maxWeight} kg - Keep pushing!
            </p>
            <ul className="mt-2">
                {Array.isArray(workout.exercises) && workout.exercises.length > 0 ? (
                    workout.exercises.map((ex, index) => (
                        <li key={index} className="text-[#6c757d]">
                            {ex.exercise}: Sets {ex.sets}, Reps {ex.reps}, Weight {ex.weight} kg
                        </li>
                    ))
                ) : (
                    <li className="text-[#6c757d]">No exercises</li>
                )}
            </ul>
            <button
                onClick={() => onStartAgain(workout)}
                className="mt-2 bg-[#ff6b6b] text-white rounded-md px-3 py-1 hover:bg-opacity-90"
            >
                Start Again
            </button>
        </div>

    );
}

export default WorkoutCard;