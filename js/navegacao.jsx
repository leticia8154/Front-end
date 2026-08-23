import React, { useState } from 'react';
import './navegacao.css';

export default function Navegacao({ sectorData, onBack, onFinish }) {
  const currentSector = sectorData || { title: 'Setor A - Norte', sub: 'Próx. Lojas Americanas', vagas: '51' };

  const routeSteps = [
    {
      userPos: { cx: 190, cy: 185 },
      dist: '600m',
      instDist: 'Em 100m',
      instTitle: 'Passe a portaria sul e siga pela alameda de circulação',
      instSub: `560m até o ${currentSector.title}`,
      activeStepId: null
    },
    {
      userPos: { cx: 105, cy: 175 },
      dist: '350m',
      instDist: 'Em 90m',
      instTitle: 'Vire à direita na alameda oeste',
      instSub: `Aproximando do bloco do ${currentSector.title}`,
      activeStepId: 1
    },
    {
      userPos: { cx: 98, cy: 110 },
      dist: '120m',
      instDist: 'Em 30m',
      instTitle: 'Contorne o bloco pela lateral oeste',
      instSub: '90m até o corredor principal',
      activeStepId: 2
    },
    {
      userPos: { cx: 105, cy: 62 },
      dist: '30m',
      instDist: 'Em 10m',
      instTitle: 'Vire à direita no apron norte, corredor A',
      instSub: 'Vaga A-145 à vista',
      activeStepId: 3
    },
    {
      userPos: { cx: 120, cy: 50 },
      dist: '0m',
      instDist: 'Chegada',
      instTitle: 'Sua vaga está à esquerda (Vaga A-145)',
      instSub: 'Você chegou ao seu destino!',
      activeStepId: 4
    }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const activeStep = routeSteps[currentStepIndex];
  const isLastStep = currentStepIndex === routeSteps.length - 1;

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    } else if (onFinish) {
      onFinish();
    }
  };

  return (
    <div className="card-container">
      <header className="header">
        <button className="btn-back" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="header-title-group">
          <h1 className="header-title">Shopping Center Cidade Jardim</h1>
          <p className="header-subtitle">Rota até a vaga A-145 · {currentSector.title}</p>
        </div>
      </header>

      <div className="map-container">
        <div className="map-tag-3d">
          <span className="dot-green"></span> Vista 3D - Cidade Jardim
        </div>
        <div className="map-controls">
          <button className="map-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </button>
          <button className="map-btn">+</button>
          <button className="map-btn">-</button>
          <button className="map-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          </button>
        </div>

        <svg className="map-svg" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0, 10)">
            <polygon points="60,180 200,60 340,180 200,210" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
            <polygon points="120,135 200,80 280,135 200,165" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
            <text x="200" y="128" fontSize="9" fontWeight="600" fill="#15803d" textAnchor="middle">Praça Central</text>

            <rect x="120" y="42" width="24" height="14" rx="4" fill="#059669" />
            <text x="132" y="52" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">A 51</text>
            <rect x="256" y="52" width="24" height="14" rx="4" fill="#d97706" />
            <text x="268" y="62" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">B 35</text>
            <rect x="248" y="142" width="24" height="14" rx="4" fill="#dc2626" />
            <text x="260" y="152" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">C 22</text>
            <rect x="128" y="142" width="24" height="14" rx="4" fill="#dc2626" />
            <text x="140" y="152" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">D 5</text>

            <rect x="180" y="185" width="40" height="10" rx="3" fill="#1e3a8a" />
            <text x="200" y="193" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">PORTARIA</text>

            <path d="M 190,185 L 105,175 L 98,62 L 120,50" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

            <circle cx={activeStep.userPos.cx} cy={activeStep.userPos.cy} r="6" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
          </g>
        </svg>

        <div className="map-footer-bar">
          <span className="user-tag">Você está aqui</span>
          <span className="scale-tag">— 500m</span>
        </div>
      </div>

      <div className="info-card">
        <div className="info-left">
          <h2 className="title">{currentSector.title}</h2>
          <p className="sub">SCN · Asa Norte, Brasília - DF</p>
          <div className="info-tags">
            <span>📐 5 passos</span>
            <span>Vaga A-145</span>
            <span>{currentSector.sub}</span>
          </div>
        </div>
        <div className="info-right">
          <div className="dist">{activeStep.dist}</div>
          <div className="dist-lbl">até a vaga</div>
        </div>
      </div>

      <div className="instruction-card">
        <div className={`inst-icon ${isLastStep ? 'success' : ''}`}>
          {isLastStep ? '✓' : '↑'}
        </div>
        <div>
          <div className="inst-dist">{activeStep.instDist}</div>
          <div className="inst-text">{activeStep.instTitle}</div>
          <div className="inst-sub">{activeStep.instSub}</div>
        </div>
      </div>

      <div className="pricing-card">
        <div className="pricing-left">
          Vagas disponíveis no {currentSector.title}<br />
          <strong>{currentSector.vagas}</strong> / 60 vagas
        </div>
        <div className="pricing-right">
          <div className="price">R$ 8,50</div>
          <div className="price-sub">por hora</div>
        </div>
      </div>

      <div className="steps-label">
        PRÓXIMOS PASSOS
        <span>Ver Todos</span>
      </div>

      <div className="steps-list">
        <div className={`step-item ${activeStep.activeStepId === 1 ? 'active-next' : ''}`}>
          <div className="step-icon">➔</div>
          <div className="step-content">
            <div className="step-dist">Em 90m</div>
            <div className="step-title">Vire à direita na alameda oeste</div>
          </div>
          <span className="step-arrow">›</span>
        </div>

        <div className={`step-item ${activeStep.activeStepId === 2 ? 'active-next' : ''}`}>
          <div className="step-icon">↑</div>
          <div className="step-content">
            <div className="step-dist">Em 30m</div>
            <div className="step-title">Contorne o bloco das Lojas Americanas pela lateral oeste</div>
          </div>
          <span className="step-arrow">›</span>
        </div>

        <div className={`step-item ${activeStep.activeStepId === 3 ? 'active-next' : ''}`}>
          <div className="step-icon">➔</div>
          <div className="step-content">
            <div className="step-dist">Em 60m</div>
            <div className="step-title">Vire à direita no apron norte, corredor A</div>
          </div>
          <span className="step-arrow">›</span>
        </div>

        <div className={`step-item ${activeStep.activeStepId === 4 ? 'active-next' : ''}`}>
          <div className="step-icon green">📍</div>
          <div className="step-content">
            <div className="step-dist" style={{ color: '#2e7d32' }}>Chegada</div>
            <div className="step-title">Sua vaga está à esquerda (Vaga A-145)</div>
          </div>
          <span className="step-arrow">›</span>
        </div>
      </div>

      {isLastStep && (
        <div className="banner-arrival" style={{ display: 'block' }}>
          🎉 Você chegou na vaga A-145!
        </div>
      )}

      <div className="actions-row">
        <button className="btn-secondary" onClick={onBack}>Voltar ao Mapa</button>
        <button className={`btn-primary-action ${isLastStep ? 'finish' : ''}`} onClick={handleNextStep}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          {isLastStep ? 'Finalizar Navegação' : 'Próximo Passo'}
        </button>
      </div>
    </div>
  );
}