import React, {useState} from "react";
import './App.css';

const MAX_HISTORY = 10;

function App() {
  const [urlInput, setUrlInput] = useState("");
  const [history, setHistory] = useState([]);
  const [nDisplay, setNDisplay] = useState(5);

  const visitPage = () => {
    const trimmedUrl = urlInput.trim();
    if (!trimmedUrl) return;

    const newEntry = {
      url: trimmedUrl,
      timestamp: new Date()
    };

    //Remove existing entry if URL exists
    const filtered =History.filter(entry => entry.url !== trimmedUrl);
    //Add new entry to the front
    setHistory([newEntry, ...filtered]);
    setUrlInput("");
  };

  const getMostRecentHistory = (n) => {
    const seen = new Set();
    const result = [];

    for (const entry of history) {
      if (!seen.has(entry.url)) {
        result.push(entry);
        seen.add(entry.url);
      }
      if (result.length === n) break;
    }
    return result;
  };
  
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: 'Arial' }}>
      <h2> URL visit Tracker</h2>

      <input type="text" placeholder="Enter URL"
             value={urlInput}
             onChange={(e) => setUrlInput(e.target.value)}
             style={{ width: "300px", padding: "10px", marginRight: "10px" }} />
      <button onClick={visitPage} style={{ padding: "10px 20px" }}>Visit</button>
      <button onClick={clearHistory} style={{ padding: "10px 20px", marginLeft: "10px" }}>Clear History</button>
      <div style={{ marginTop: "20px" }}>
        <label>
          Show N Recent URLs:
          <input
            type="number"
            value={nDisplay}
            onChange={(e) => setNDisplay(Math.max(1, Math.min(100, e.target.value)))}
            style={{ width: "60px", marginLeft: "10px" }}
          />
        </label>
      </div>
      <ul style ={{marginTop: "20px", listStyleType: "none", padding: 0}}>
        {history.map((entry, index) => (
          <li key={index} style={{ marginBottom: "12px", background:"#f5f5f5",  borderRadius:"5px" }}>
            <strong>{entry.url}</strong> <br />
            <small>
              Visited at: {entry.timestamp.toLocaleString()}
              {new Date(entry.timestamp).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              })}
            </small>
          </li>
        ))}
      </ul>
      </div>
  );
}

  export default App;