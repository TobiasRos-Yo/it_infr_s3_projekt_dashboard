import FeedbackChart from "./components/FeedbackChart";

function App() {
  return (
    <div 
      style={{ 
        padding: "2rem", 
        textAlign: "center", 
        alignItems: "center",
        display: "flex",
        }}>
      <h1>Feedback Stimmungsübersicht</h1>
      <FeedbackChart />
    </div>
  );
}

export default App;
  