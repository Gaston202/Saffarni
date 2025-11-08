import { useState } from 'react';
import RecommendationPage from './components/RecommendationPage';
import TripCustomizationPage from './components/TripCustomizationPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('recommendations');
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);

  const handleCustomizeTrip = (destinationId) => {
    setSelectedDestinationId(destinationId);
    setCurrentPage('customize');
  };

  const handleBackToRecommendations = () => {
    setCurrentPage('recommendations');
    setSelectedDestinationId(null);
  };

  return (
    <>
      {currentPage === 'recommendations' ? (
        <RecommendationPage onCustomizeTrip={handleCustomizeTrip} />
      ) : (
        <TripCustomizationPage
          destinationId={selectedDestinationId}
          onBack={handleBackToRecommendations}
        />
      )}
    </>
  );
}

export default App;
