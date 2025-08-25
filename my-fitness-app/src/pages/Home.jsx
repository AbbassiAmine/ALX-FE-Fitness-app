import { useState, useEffect } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import { fetchWorkouts } from '../api/wgerApi';

function Home({ setCurrentPage, setCurrentWorkout }) {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const data = await fetchWorkouts();
                setWorkouts(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
            } catch (err) {
                setError(err.message);
            }
        };
        loadWorkouts();
    }, []);

    const handleStartAgain = (workout) => {
        setCurrentWorkout({
            name: workout.name,
            exercises: workout.exercises.map((ex) => ({ ...ex, id: Date.now() + Math.random() })),
        });
        setCurrentPage('creator');
    };

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Workout History</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                onClick={() => {
                    setCurrentWorkout(null);
                    setCurrentPage('creator');
                }}
                className="mb-4 bg-[#00cec9] text-white rounded-md px-4 py-2 hover:bg-opacity-90"
            >
                Create New Workout
            </button>
            <div className="mb-4 text-white">
                <p>Total Workouts: {workouts.length}</p>
            </div>

            {workouts.length > 0 ? (
                workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} onStartAgain={handleStartAgain} />)
            ) : (
                <p className="text-[#6c757d]">No workouts yet. Start creating!</p>
            )}

        </div>
    );
}

export default Home;