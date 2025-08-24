import Header from '../components/Header';
import WorkoutCard from '../components/WorkoutCard';

function Home() {

    const workouts = [
        { id: 1, exercise: 'Bench Press', sets: 5, reps: 5, weight: 80 },
        { id: 2, exercise: 'Squat', sets: 4, reps: 8, weight: 100 },
    ];

    return (
        <div>
            <Header />
            <div className="container mx-auto p-4 sm:p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Workout History</h1>
                <div className="mb-4 text-white">
                    <p>Total Workouts: {workouts.length}</p>
                </div>
                {workouts.length > 0 ? (
                    workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)
                ) : (
                    <p className="text-strong-text-secondary">No workouts yet. Start logging!</p>
                )}
            </div>
        </div>
    );
}

export default Home;