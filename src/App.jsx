import "./Home.css";
import SnakeGame from "./components/SnakeGame/SnakeGame";

function App() {
  return (
    <div className="container">
      <div className="hero">
        <h1>🚀 Retail Frontend</h1>

        <h2>CI/CD Pipeline Deployment Successful</h2>

        <p>
          This project demonstrates a complete DevOps CI/CD pipeline using
          GitHub, Jenkins, Docker, Docker Hub and Amazon EKS.
        </p>

        <div className="status">✅ Successfully Deployed on Amazon EKS</div>
      </div>

      <div className="tech-grid">
        <div className="tech-card">
          <h3>GitHub</h3>
          <p>Source Code Management</p>
        </div>

        <div className="tech-card">
          <h3>Jenkins</h3>
          <p>Continuous Integration</p>
        </div>

        <div className="tech-card">
          <h3>Docker</h3>
          <p>Containerization</p>
        </div>

        <div className="tech-card">
          <h3>Docker Hub</h3>
          <p>Image Registry</p>
        </div>

        <div className="tech-card">
          <h3>Kubernetes</h3>
          <p>Container Orchestration</p>
        </div>

        <div className="tech-card">
          <h3>Amazon EKS</h3>
          <p>Managed Kubernetes Cluster</p>
        </div>
      </div>

      <div className="pipeline">
        <div className="step">GitHub</div>
        <div className="arrow">➡</div>

        <div className="step">Jenkins</div>
        <div className="arrow">➡</div>

        <div className="step">Docker Hub</div>
        <div className="arrow">➡</div>

        <div className="step">Amazon EKS</div>
      </div>

      <div className="game-section">
        <SnakeGame />
      </div>
    </div>
  );
}

export default App;
