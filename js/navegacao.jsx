import React, { useState } from 'react';
import './navegacao.css';

export default function NavegacaoGuiada() {
  const [showFullPanel, setShowFullPanel] = useState(false);

  const stepsData = [
    { id: 1, dist: 'Em 100m', text: 'Entre no estacionamento principal do Shopping Cidade Jardim pela Entrada Norte.' },
    { id: 2, dist: 'Em 50m', text: 'Continue reto no corredor principal e passe pelo guichê automático.' },
    { id: 3, dist: 'Em 30m', text: 'Vire à direita na entrada para o Setor A (Lojas Americanas).', active: true },
    { id: 4, dist: 'Em 10m', text: 'Siga pela alameda A-3 até a coluna identificadora verde.' },
    { id: 5, dist: 'Destino', text: 'Sua vaga reservada A-70 está à esquerda!', isDestination: true }
  ];

  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="top-bar">
        <a href="setores.html" className="btn-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </a>
        <div className="top-title-group">
          <h1 className="top-title">Shopping Center Cidade Jardim</h1>
          <p className="top-subtitle">Navegando até a vaga mais próxima</p>
        </div>
        <div className="brand-badge">estac<span>IA</span></div>
      </header>

      {/* Visão do Mapa */}
      <div className="map-wrapper">
        <div id="map" style={{ width: '100%', height: '100%', backgroundColor: '#e5e3df' }}>
          {/* O Google Maps JS pode ser instanciado via useEffect */}
        </div>

        <div className="view-tag">
          <span className="status-dot"></span> Vista 3D • Cidade Jardim (Térreo)
        </div>

        <div className="map-controls">
          <button className="map-btn" title="Alternar Visão">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </button>
          <button className="map-btn">+</button>
          <button className="map-btn">−</button>
          <button className="map-btn highlight">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          </button>
        </div>
      </div>

      {/* Card Inferior */}
      <main className="navigation-card">
        <div className="current-step-box">
          <div className="step-icon-bg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </div>
          <div className="step-details">
            <span className="step-distance">Em 100 m</span>
            <h2 className="step-instruction">Entre no estacionamento e siga no corredor principal</h2>
            <span className="step-subtext">Siga as placas do Setor A (Próx. Lojas Americanas)</span>
          </div>
        </div>

        <div className="vagas-info-box">
          <div className="vagas-text">
            <span>Vagas disponíveis no <strong>Setor A - Norte</strong></span>
            <div className="vagas-count"><strong>51</strong> / 60 vagas</div>
          </div>
          <div className="vaga-destaque-badge">
            Vaga reservada: <strong>A-70</strong>
          </div>
        </div>

        <div className="next-steps-container">
          <div className="steps-header">
            <h3>Próximos Passos</h3>
            <button className="btn-see-all" onClick={() => setShowFullPanel(true)}>Ver Todos</button>
          </div>

          <ul className="steps-list-compact">
            <li className="compact-step">
              <div className="mini-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
              </div>
              <div className="compact-info">
                <p>Continue reto por 50m no corredor interno</p>
                <span>50m</span>
              </div>
            </li>
          </ul>
        </div>

        <button className="btn-finish" onClick={() => window.location.href = 'setores.html'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          Finalizar Navegação
        </button>
      </main>

      {/* Painel de Instruções Completas */}
      {showFullPanel && (
        <section className="full-instructions-panel">
          <div className="panel-header">
            <h2>Instruções Detalhadas</h2>
            <button className="btn-close-panel" onClick={() => setShowFullPanel(false)}>✕</button>
          </div>

          <div className="steps-timeline">
            {stepsData.map((step) => (
              <div className={`timeline-item ${step.isDestination ? 'destination' : ''}`} key={step.id}>
                <div className={`timeline-number ${step.isDestination ? 'success' : ''}`}>
                  {step.isDestination ? '✓' : step.id}
                </div>
                <div className={`timeline-content ${step.active ? 'active' : ''}`}>
                  <span className={`timeline-dist ${step.isDestination ? 'green' : ''}`}>{step.dist}</span>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="panel-footer">
            <button className="btn-back-map" onClick={() => setShowFullPanel(false)}>Voltar ao Mapa</button>
          </div>
        </section>
      )}
    </div>
  );
}