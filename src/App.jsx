import "./App.css";
import TicTacToe from "./components/TicTacToe";

function App() {
  return (
    <div className="container">
      <h1>🚀 Retail Frontend</h1>

      <h2>CI/CD Pipeline Deployment Successful</h2>

      <p>This application has been successfully deployed using:</p>

      <ul>
        <li>✅ GitHub</li>
        <li>✅ Jenkins</li>
        <li>✅ Docker</li>
        <li>✅ Docker Hub</li>
        <li>✅ Kubernetes</li>
        <li>✅ Amazon EKS</li>
      </ul>
      <TicTacToe />

      <h3>DevOps Project</h3>
      <h3>DevOps Project - Webhook Test</h3>

      <p>Continuous Integration & Continuous Deployment</p>
    </div>
  );
}

export default App;
