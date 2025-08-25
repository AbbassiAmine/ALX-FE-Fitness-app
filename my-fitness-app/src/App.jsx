import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import WorkoutCreator from './pages/WorkoutCreator';
import Progress from './pages/Progress';
import Exercises from './pages/Exercises';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentWorkout, setCurrentWorkout] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setCurrentWorkout={setCurrentWorkout} />;
      case 'creator':
        return <WorkoutCreator setCurrentPage={setCurrentPage} currentWorkout={currentWorkout} />;
      case 'progress':
        return <Progress setCurrentPage={setCurrentPage} />;
      case 'exercises':
        return <Exercises setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} setCurrentWorkout={setCurrentWorkout} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#2d3436]">
      <Header setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;