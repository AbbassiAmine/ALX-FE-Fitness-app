function WorkoutCard({ workout }) {
    return (
        <div className="bg-red-500 rounded-lg p-4 mb-4 shadow-md hover:scale-105 transition-transform">
            <h3 className="text-lg font-bold">{workout.exercise || 'Bench Press'}</h3>
            <p className="text-strong-text-secondary">
                Sets: {workout.sets || 5} | Reps: {workout.reps || 5} | Weight: {workout.weight || 80}kg
            </p>
        </div>
    );
}

export default WorkoutCard;