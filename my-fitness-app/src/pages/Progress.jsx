import { useState, useEffect } from 'react';
import { fetchWorkouts } from '../api/wgerApi';

function Progress({ setCurrentPage }) {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const data = await fetchWorkouts();
                setWorkouts(data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
            } catch (err) {
                setError(err.message);
            }
        };
        loadWorkouts();
    }, []);

    const totalWeight = workouts.reduce(
        (sum, w) =>
            sum +
            (Array.isArray(w.exercises)
                ? w.exercises.reduce((s, ex) => s + Number(ex.sets) * Number(ex.reps) * Number(ex.weight), 0)
                : 0),
        0
    );

    const averageReps = workouts.length > 0
        ? (
            workouts.reduce(
                (sum, w) => sum + (Array.isArray(w.exercises) ? w.exercises.reduce((s, ex) => s + Number(ex.reps), 0) : 0),
                0
            ) / workouts.reduce((sum, w) => sum + (Array.isArray(w.exercises) ? w.exercises.length : 0), 0)
        ).toFixed(1)
        : 0;

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Progress</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-[#ffffff] rounded-lg p-4 mb-4 shadow-md">
                <p className="text-lg font-bold text-[#2d3436]">Total Workouts: {workouts.length}</p>
                <p className="text-[#6c757d]">
                    Total Weight Lifted: {totalWeight} kg
                </p>
                <p className="text-[#6c757d]">
                    Average Reps per Set: {averageReps}
                </p>
            </div>
            <div className="bg-[#ffffff] rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-bold text-[#2d3436] mb-2">Progress Over Time</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2 text-[#2d3436]">Date</th>
                            <th className="p-2 text-[#2d3436]">Workout Name</th>
                            <th className="p-2 text-[#2d3436]">Weight Lifted (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((w) => {
                            const weight = Array.isArray(w.exercises)
                                ? w.exercises.reduce((s, ex) => s + Number(ex.sets) * Number(ex.reps) * Number(ex.weight), 0)
                                : 0;
                            return (
                                <tr key={w.id} className="border-t border-gray-300">
                                    <td className="p-2 text-[#6c757d]">{new Date(w.timestamp).toLocaleDateString()}</td>
                                    <td className="p-2 text-[#6c757d]">{w.name}</td>
                                    <td className="p-2 text-[#6c757d]">{weight} kg</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => setCurrentPage('home')}
                className="mt-4 text-[#ff6b6b] hover:underline"
            >
                Back to Home
            </button>
        </div>
    );
}

export default Progress;