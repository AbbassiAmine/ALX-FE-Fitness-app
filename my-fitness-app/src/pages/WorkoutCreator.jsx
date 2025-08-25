import { useState, useEffect } from 'react';
import { saveWorkout, fetchExercises } from '../api/wgerApi';

function WorkoutCreator({ setCurrentPage, currentWorkout }) {
    const [name, setName] = useState(currentWorkout ? currentWorkout.name : '');
    const [exercises, setExercises] = useState(currentWorkout ? currentWorkout.exercises : []);
    const [newExercise, setNewExercise] = useState({ exercise: '', sets: '', reps: '', weight: '' });
    const [availableExercises, setAvailableExercises] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadExercises = async () => {
            setLoading(true);
            try {
                const data = await fetchExercises();
                setAvailableExercises(data);
                if (data.length === 0) {
                    setError('No exercises available.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadExercises();
    }, []);

    const handleAddExercise = () => {
        if (!newExercise.exercise || !newExercise.sets || !newExercise.reps || !newExercise.weight) {
            setError('Please fill all fields for the exercise');
            return;
        }
        setExercises([...exercises, { ...newExercise, id: Date.now() }]);
        setNewExercise({ exercise: '', sets: '', reps: '', weight: '' });
        setError('');
    };

    const handleRemoveExercise = (id) => {
        setExercises(exercises.filter((ex) => ex.id !== id));
    };

    const handleFinishWorkout = async () => {
        if (!name || exercises.length === 0) {
            setError('Please add a name and at least one exercise');
            return;
        }
        try {
            const success = await saveWorkout({ name, exercises });
            if (success) {
                setName('');
                setExercises([]);
                setError('');
                setCurrentPage('home');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Create Workout</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                placeholder="Workout Name (e.g., Chest Day)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-md p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
            />
            <h2 className="text-xl font-bold text-white mb-2">Add Exercises</h2>
            <div className="space-y-4 mb-4 max-w-md">
                {loading ? (
                    <p className="text-white">Loading exercises...</p>
                ) : (
                    <select
                        value={newExercise.exercise}
                        onChange={(e) => setNewExercise({ ...newExercise, exercise: e.target.value })}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                    >
                        <option value="">Select an exercise</option>
                        {availableExercises.map((ex) => (
                            <option key={ex.id} value={ex.name}>{ex.name}</option>
                        ))}
                    </select>
                )}
                <input
                    type="number"
                    placeholder="Sets"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                />
                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={newExercise.weight}
                    onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                />
                <button
                    onClick={handleAddExercise}
                    className="w-full bg-[#ff6b6b] text-white rounded-md px-4 py-2 hover:bg-opacity-90"
                >
                    Add Exercise
                </button>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Exercises in Workout</h2>
            {exercises.length > 0 ? (
                exercises.map((ex) => (
                    <div key={ex.id} className="bg-[#ffffff] rounded-lg p-4 mb-4 shadow-md max-w-md">
                        <h3 className="text-lg font-bold text-[#2d3436]">{ex.exercise}</h3>
                        <p className="text-[#6c757d]">
                            Sets: {ex.sets}, Reps: {ex.reps}, Weight: {ex.weight} kg
                        </p>
                        <button
                            onClick={() => handleRemoveExercise(ex.id)}
                            className="mt-2 text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-[#6c757d]">No exercises added yet</p>
            )}
            <button
                onClick={handleFinishWorkout}
                className="w-full max-w-md bg-[#ff6b6b] text-white rounded-md px-4 py-2 hover:bg-opacity-90 mt-4"
            >
                Save Workout
            </button>
            <button
                onClick={() => setCurrentPage('home')}
                className="mt-4 text-[#ff6b6b] hover:underline"
            >
                Cancel
            </button>
        </div>
    );
}

export default WorkoutCreator;