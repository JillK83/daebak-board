import { useState } from 'react';
import TopBar from './components/TopBar';
import StatusBoard from './components/StatusBoard';

const initialMockData = [
  {
    id: '1',
    column: 'backlog',
    title: "Crash Landing on You",
    year: 2019,
    male_lead: "Hyun Bin",
    female_lead: "Son Ye-jin",
    platforms: "Netflix"
  },
  {
    id: '2',
    column: 'watching',
    title: "Queen of Tears",
    year: 2024,
    male_lead: "Kim Soo-hyun",
    female_lead: "Kim Ji-won",
    platforms: "Netflix",
    totalEpisodes: 16,
    currentEpisode: 8
  },
  {
    id: '3',
    column: 'completed',
    title: "Business Proposal",
    year: 2022,
    male_lead: "Ahn Hyo-seop",
    female_lead: "Kim Se-jeong",
    platforms: "Netflix",
    rating: 8
  },
  {
    id: '4',
    column: 'rewatch',
    title: "Twenty Five Twenty One",
    year: 2022,
    male_lead: "Nam Joo-hyuk",
    female_lead: "Kim Tae-ri",
    platforms: "Netflix",
    rating: 9
  }
];

function App() {
  const [dramas, setDramas] = useState(initialMockData);

  const stats = {
    tracked: dramas.length,
    active: dramas.filter(d => d.column === 'watching').length,
    done: dramas.filter(d => d.column === 'completed').length
  };

  return (
    <div className="flex flex-col min-h-screen bg-base w-full h-full font-nunito text-text-primary">
      <TopBar stats={stats} />
      <StatusBoard dramas={dramas} setDramas={setDramas} />
    </div>
  );
}

export default App;
