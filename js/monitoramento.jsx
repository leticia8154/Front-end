const STEPS = [
  { progress: 0, x: 80, y: 71, title: 'Você está no interior da loja Riachuelo', dist: 'Distância total: 85m', btn: 'Iniciar Navegação' },
  { progress: 25, x: 80, y: 43, title: 'Saia pela direita e siga reto pelo corredor lateral', dist: 'Distância: 30m', btn: 'Próximo Passo →' },
  { progress: 50, x: 45, y: 43, title: 'Vire à esquerda no corredor acima do Átrio', dist: 'Distância: 22m', btn: 'Próximo Passo →' },
  { progress: 75, x: 45, y: 28, title: 'Siga reto em direção ao estacionamento', dist: 'Distância: 18m', btn: 'Próximo Passo →' },
  { progress: 100, x: 45, y: 12, title: 'Chegou à Vaga A-145!', dist: 'Seu carro está estacionado aqui', btn: 'Finalizar 🏁' }
];

// Componente 1: Tela de Monitoramento
function MonitoramentoScreen({ onNavigateToRoute }) {
  return (
    <div className="bg-[#f8fafc] w-full max-w-[420px] rounded-[32px] p-[18px] shadow-2xl flex flex-col relative text-[#1e293b]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <button className="w-[38px] h-[38px] rounded-full border border-[#cbd5e1] bg-white flex items-center justify-center text-[#334155] shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-[1.1rem] font-extrabold text-[#0f172a]">Monitoramento</h1>
          <p className="text-[0.75rem] text-[#64748b]">Acompanhe seu estacionamento</p>
        </div>
      </div>

      {/* Botão com Link para o Mapa */}
      <button 
        onClick={onNavigateToRoute}
        className="w-full bg-white border border-[#2563eb] text-[#2563eb] font-bold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 mb-4 hover:bg-blue-50 transition-colors shadow-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Encontre meu Carro
      </button>

      {/* Card Vaga Atual */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] mb-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#2563eb]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div>
            <span className="text-[0.65rem] font-bold text-[#64748b] tracking-wider uppercase block">VAGA ATUAL</span>
            <span className="text-xl font-extrabold text-[#0f172a]">A145</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-[#2563eb] text-xs font-semibold mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Tempo
            </div>
            <div className="text-lg font-extrabold text-[#0f172a]">0h 50m</div>
          </div>

          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-[#16a34a] text-xs font-semibold mb-1">
              <span className="font-bold">$</span> Valor
            </div>
            <div className="text-lg font-extrabold text-[#16a34a]">R$ 7,02</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[0.7rem] text-[#64748b] font-medium mb-1">
            <span>Progresso até próxima hora</span>
            <span>10 min restantes</span>
          </div>
          <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
            <div className="bg-[#0f172a] h-full w-[83%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Detalhes da Estadia */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] mb-4 text-xs space-y-2.5">
        <h3 className="font-bold text-sm text-[#0f172a] mb-1">Detalhes da Estadia</h3>
        <div className="flex justify-between text-[#64748b]">
          <span>Check-In</span>
          <span className="font-bold text-[#0f172a]">21:44</span>
        </div>
        <div className="flex justify-between text-[#64748b]">
          <span>Hora Atual</span>
          <span className="font-bold text-[#0f172a]">21:58</span>
        </div>
        <div className="flex justify-between text-[#64748b]">
          <span>Taxa por hora</span>
          <span className="font-bold text-[#0f172a]">R$ 8,50</span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-[#f1f5f9]">
          <span className="font-bold text-[#0f172a]">Total a pagar</span>
          <span className="font-extrabold text-[#16a34a] text-base">R$ 7,02</span>
        </div>
      </div>

      {/* Botão Pagamento */}
      <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors mb-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
        Realizar Pagamento
      </button>

      <div className="text-center text-[0.68rem] text-[#64748b] flex items-center justify-center gap-1">
        <span>⏱️</span> Você terá 20 minutos após o pagamento para sair
      </div>
    </div>
  );
}

// Componente 2: Tela de Navegação do Mapa
function NavigationScreen({ onBackToMonitoramento }) {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const step = STEPS[currentIdx];

  const handleNext = () => {
    if (currentIdx < STEPS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
      onBackToMonitoramento();
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    } else {
      onBackToMonitoramento();
    }
  };

  return (
    <div className="app-card">
      <header className="header-nav">
        <button className="btn-back" onClick={handleBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="header-titles">
          <h1>Encontre meu Carro</h1>
          <p>Planta Baixa · Térreo</p>
        </div>
      </header>

      <div className="top-info-grid">
        <div className="info-card vaga">
          <span className="label">Vaga</span>
          <span className="val">A-145</span>
        </div>
        <div className="info-card andar">
          <span className="label">Pavimento</span>
          <span className="val">Térreo</span>
        </div>
        <div className="info-card setor">
          <span className="label">Setor</span>
          <span className="val">Setor A</span>
        </div>
      </div>

      <div className="map-card-wrapper">
        <div className="map-canvas">
          <div className="map-badge badge-left">Planta Baixa · Térreo</div>
          <div className="map-badge badge-right">Modo...</div>

          <div className="parking-zone top-parking">
            <div className="dashed-lines"></div>
          </div>

          <div className="target-vaga-marker">
            <span className="vaga-text-label">Vaga A-145</span>
            <div className="green-circle-target"></div>
          </div>

          <div className="building-card">
            <div className="building-row">
              <div className="store-box store-amer">Lojas Americanas</div>
              <div className="store-box store-carga">Carga & Serviços</div>
              <div className="store-box store-ca1">C&A</div>
            </div>

            <div className="building-row mid-row">
              <div className="atrium-oval">Praça Central / Átrio</div>
            </div>

            <div className="building-row">
              <div className="store-box store-ca2">C&A</div>
              <div className="store-box store-riach">Riachuelo</div>
            </div>
          </div>

          <div className="entrada-sul-label">ENTRADA SUL</div>

          <div className="parking-zone bottom-parking">
            <div className="dashed-lines"></div>
          </div>

          <svg className="route-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path 
              d="M 800 710 L 800 430 L 450 430 L 450 120" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="14" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>

          <div 
            className="user-pin-marker" 
            style={{ left: `${step.x}%`, top: `${step.y}%` }}
          ></div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${step.progress}%` }}></div>
        </div>
      </div>

      <div className="instruction-card">
        <div className="current-step-box">
          <div className="icon-step-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
          <div className="step-details">
            <h3>{step.title}</h3>
            <span className="distance-tag">{step.dist}</span>
          </div>
        </div>
      </div>

      <button className="btn-primary-action" onClick={handleNext}>
        {step.btn}
      </button>
    </div>
  );
}

// Componente Principal
function App() {
  const [screen, setScreen] = React.useState('monitoramento');

  return (
    <>
      {screen === 'monitoramento' ? (
        <MonitoramentoScreen onNavigateToRoute={() => setScreen('rota')} />
      ) : (
        <NavigationScreen onBackToMonitoramento={() => setScreen('monitoramento')} />
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);