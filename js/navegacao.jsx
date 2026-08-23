import React, { useState } from 'react';

export default function Navegacao({ sectorData, onBack, onFinish }) {
  const currentSector = sectorData || { title: 'Setor A - Norte', sub: 'Próx. Lojas Americanas', vagas: '51' };

  const routeSteps = [
    {
      userPos: { cx: 200, cy: 185 },
      dist: '600m',
      instDist: 'Em 100m',
      instTitle: 'Passe a portaria sul e siga pela alameda de circulação',
      instSub: `560m até o ${currentSector.title}`,
      activeStepId: null
    },
    {
      userPos: { cx: 105, cy: 165 },
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
    <div style={{
      backgroundColor: '#f7f3ed',
      width: '100%',
      maxWidth: '420px',
      borderRadius: '28px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      gap: '14px',
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={onBack} style={{
          width: '36px', height: '36px', backgroundColor: '#ffffff', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1565c0',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)', cursor: 'pointer', border: 'none'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', margin: 0, lineHeight: 1.2 }}>Shopping Center Cidade Jardim</h1>
          <p style={{ fontSize: '11px', color: '#666666', margin: 0 }}>Rota até a vaga A-145 · {currentSector.title}</p>
        </div>
      </header>

      {/* Mapa 3D SVG Container */}
      <div style={{
        position: 'relative', backgroundColor: '#e2e8f0', borderRadius: '20px', height: '230px',
        overflow: 'hidden', border: '1px solid #d1d5db', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.9)',
          padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 600, color: '#333',
          display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#2e7d32', borderRadius: '50%' }} /> Vista 3D - Cidade Jardim
        </div>

        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 10 }}>
          <button style={{ width: '30px', height: '30px', background: '#ffffff', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1565c0', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: '14px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </button>
          <button style={{ width: '30px', height: '30px', background: '#ffffff', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1565c0', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: '14px' }}>+</button>
          <button style={{ width: '30px', height: '30px', background: '#ffffff', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1565c0', fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: '14px' }}>-</button>
        </div>

        {/* SVG ajustado e contido */}
        <svg style={{ width: '100%', height: '100%', display: 'block' }} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0, 5)">
            {/* Terreno principal */}
            <polygon points="60,180 200,60 340,180 200,210" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Praça Central */}
            <polygon points="120,135 200,80 280,135 200,165" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
            <text x="200" y="128" fontSize="11" fontWeight="700" fill="#15803d" textAnchor="middle">Praça Central</text>

            {/* Marcadores de Setores */}
            <rect x="120" y="42" width="28" height="16" rx="4" fill="#059669" />
            <text x="134" y="53" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">A 51</text>
            
            <rect x="252" y="52" width="28" height="16" rx="4" fill="#d97706" />
            <text x="266" y="63" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">B 35</text>
            
            <rect x="248" y="142" width="28" height="16" rx="4" fill="#dc2626" />
            <text x="262" y="153" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">C 22</text>
            
            <rect x="124" y="142" width="28" height="16" rx="4" fill="#dc2626" />
            <text x="138" y="153" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">D 5</text>

            {/* Portaria */}
            <rect x="170" y="180" width="60" height="14" rx="4" fill="#1e3a8a" />
            <text x="200" y="190" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">PORTARIA</text>

            {/* Caminho da rota ajustado */}
            <path d="M 200,180 L 105,165 L 98,62 L 120,50" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

            {/* Ponto do Usuário */}
            <circle cx={activeStep.userPos.cx} cy={activeStep.userPos.cy} r="7" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2.5" />
          </g>
        </svg>

        <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <span style={{ background: '#1565c0', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>Você está aqui</span>
          <span style={{ background: 'rgba(255,255,255,0.9)', color: '#555', padding: '2px 8px', borderRadius: '8px', fontSize: '9px', fontWeight: 600 }}>— 500m</span>
        </div>
      </div>

      {/* Info Card Setor */}
      <div style={{ background: '#ffffff', border: '1.5px solid #1565c0', borderRadius: '16px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>{currentSector.title}</div>
          <div style={{ fontSize: '10px', color: '#666', marginBottom: '6px' }}>SCN · Asa Norte, Brasília - DF</div>
          <div style={{ display: 'flex', gap: '8px', fontSize: '10px', color: '#1565c0', fontWeight: 600 }}>
            <span>📐 5 passos</span>
            <span>Vaga A-145</span>
            <span>{currentSector.sub}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#1565c0', lineHeight: 1 }}>{activeStep.dist}</div>
          <div style={{ fontSize: '9px', color: '#666' }}>até a vaga</div>
        </div>
      </div>

      {/* Instrução do Passo Atual */}
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px', height: '36px',
          backgroundColor: isLastStep ? '#e8f5e9' : '#e3f2fd',
          color: isLastStep ? '#2e7d32' : '#1565c0',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700
        }}>
          {isLastStep ? '✓' : '↑'}
        </div>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#1565c0' }}>{activeStep.instDist}</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>{activeStep.instTitle}</div>
          <div style={{ fontSize: '10px', color: '#666' }}>{activeStep.instSub}</div>
        </div>
      </div>

      {/* Vagas & Preço */}
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '10px', color: '#666' }}>
          Vagas disponíveis no {currentSector.title}<br />
          <strong style={{ fontSize: '16px', color: '#1565c0', fontWeight: 700 }}>{currentSector.vagas}</strong> / 60 vagas
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>R$ 8,50</div>
          <div style={{ fontSize: '9px', color: '#777' }}>por hora</div>
        </div>
      </div>

      {/* Lista Próximos Passos */}
      <div style={{ fontSize: '10px', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between' }}>
        PRÓXIMOS PASSOS
        <span style={{ color: '#1565c0', cursor: 'pointer', textTransform: 'none' }}>Ver Todos</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { id: 1, text: 'Vire à direita na alameda oeste', dist: 'Em 90m', icon: '➔' },
          { id: 2, text: 'Contorne o bloco das Lojas Americanas pela lateral oeste', dist: 'Em 30m', icon: '↑' },
          { id: 3, text: 'Vire à direita no apron norte, corredor A', dist: 'Em 60m', icon: '➔' },
          { id: 4, text: 'Sua vaga está à esquerda (Vaga A-145)', dist: 'Chegada', icon: '📍', isGreen: true }
        ].map((item) => {
          const isActive = activeStep.activeStepId === item.id;
          return (
            <div key={item.id} style={{
              background: isActive ? '#f1f8e9' : '#ffffff',
              border: isActive ? '1.5px solid #2e7d32' : 'none',
              borderRadius: '14px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px',
              opacity: isActive ? 1 : 0.7, transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '28px', height: '28px',
                backgroundColor: item.isGreen ? '#2e7d32' : '#0d47a1',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, fontSize: '12px'
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '9px', fontWeight: 700, color: item.isGreen ? '#2e7d32' : '#1565c0' }}>{item.dist}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a1a1a' }}>{item.text}</div>
              </div>
              <span style={{ color: '#999', fontSize: '12px' }}>›</span>
            </div>
          );
        })}
      </div>

      {isLastStep && (
        <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', textAlign: 'center', padding: '10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
          🎉 Você chegou na vaga A-145!
        </div>
      )}

      {/* Botões Inferiores */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
        <button onClick={onBack} style={{
          flex: 1, backgroundColor: '#ffffff', color: '#333333', border: '1px solid #d1d5db', padding: '11px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer'
        }}>
          Voltar ao Mapa
        </button>
        <button onClick={handleNextStep} style={{
          flex: 1, backgroundColor: isLastStep ? '#2e7d32' : '#1565c0', color: '#ffffff', border: 'none', padding: '11px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          {isLastStep ? 'Finalizar Navegação' : 'Próximo Passo'}
        </button>
      </div>
    </div>
  );
}