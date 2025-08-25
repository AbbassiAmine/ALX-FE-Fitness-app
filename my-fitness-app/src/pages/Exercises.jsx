import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchExercises, fetchExercisesByMuscle } from '../api/wgerApi';

function Exercises({ setCurrentPage }) {
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState('');
    const [muscleFilter, setMuscleFilter] = useState('');

    const handleSearch = async (query) => {
        try {
            const data = muscleFilter ? await fetchExercisesByMuscle(muscleFilter) : await fetchExercises(query);
            if (data.length === 0) {
                setError('No exercises found for your search');
            } else {
                setError('');
                setExercises(data);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        handleSearch('');
    },);

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-white mb-4">Exercises</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <select
                    onChange={(e) => setMuscleFilter(e.target.value)}
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                >
                    <option value="">All Muscle Groups</option>
                    <option value="1">Biceps</option>
                    <option value="4">Chest</option>
                    <option value="10">Quadriceps</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exercises.length > 0 ? (
                    exercises.map((exercise) => (
                        <div key={exercise.id} className="bg-[#ffffff] rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-bold text-[#2d3436]">{exercise.name}</h3>
                            <p className="text-[#6c757d]">{exercise.description || 'No description'}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-[#6c757d]">No exercises found</p>
                )}
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

export default Exercises;