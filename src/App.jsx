
import TopBar from './components/TopBar';
import StatusBoard from './components/StatusBoard';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-base w-full h-full font-nunito text-text-primary">
      <TopBar />
      <StatusBoard />
    </div>
  );
}

export default App;
