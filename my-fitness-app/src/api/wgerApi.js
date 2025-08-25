const mockExercises = [
    { id: 1, name: 'Bench Press', description: 'A compound exercise targeting the chest.', muscle: 4 },
    { id: 2, name: 'Squat', description: 'A lower body exercise for quads.', muscle: 10 },
    { id: 3, name: 'Bicep Curl', description: 'Isolates the biceps.', muscle: 1 },
    { id: 4, name: 'Deadlift', description: 'A full-body strength exercise.', muscle: 10 },
    { id: 5, name: 'Push-Up', description: 'Bodyweight chest and triceps exercise.', muscle: 4 },
    { id: 6, name: 'Pull-Up', description: 'Upper body exercise for back and biceps.', muscle: 1 },
];

export const fetchExercises = async (query = '') => {
    try {
        const filteredExercises = query
            ? mockExercises.filter((ex) =>
                ex.name.toLowerCase().includes(query.toLowerCase())
            )
            : mockExercises;
        console.log('Fetched exercises:', filteredExercises); // Debug log
        return filteredExercises;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        throw new Error('Failed to fetch exercises. Please try again.');
    }
};

export const fetchExerciseDetails = async (id) => {
    try {
        const exercise = mockExercises.find((ex) => ex.id === Number(id));
        if (!exercise) {
            throw new Error('Exercise not found');
        }
        console.log('Fetched exercise details:', exercise); // Debug log
        return exercise;
    } catch (error) {
        console.error('Error fetching exercise details:', error);
        throw new Error('Failed to fetch exercise details. Please try again.');
    }
};

export const fetchExercisesByMuscle = async (muscleId) => {
    try {
        const filteredExercises = mockExercises.filter(
            (ex) => ex.muscle === Number(muscleId)
        );
        console.log('Fetched exercises by muscle:', filteredExercises); // Debug log
        return filteredExercises;
    } catch (error) {
        console.error('Error fetching exercises by muscle:', error);
        throw new Error('Failed to fetch exercises by muscle group. Please try again.');
    }
};

export const saveWorkout = async (workout) => {
    try {
        const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        workouts.push({
            ...workout,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            exercises: Array.isArray(workout.exercises) ? workout.exercises : [],
        });
        localStorage.setItem('workouts', JSON.stringify(workouts));
        return true;
    } catch (error) {
        console.error('Error saving workout:', error);
        throw new Error('Failed to save workout. Please try again.');
    }
};

export const fetchWorkouts = async () => {
    try {
        const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        return workouts.map((workout) => ({
            ...workout,
            exercises: Array.isArray(workout.exercises) ? workout.exercises : [],
        }));
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw new Error('Failed to fetch workout history. Please try again.');
    }
};

export const deleteWorkout = async (id) => {
    try {
        const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
        return true;
    } catch (error) {
        console.error('Error deleting workout:', error);
        throw new Error('Failed to delete workout. Please try again.');
    }
};