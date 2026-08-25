const { useState } = React;

// --- COMANDOS DE NAVEGAÇÃO INTERNA PELO SHOPPING ATÉ O SETOR A (Vaga A145) ---
const STEPS = [
  {
    id: 1,
    icon: "🏬",
    title: "Siga pelo corredor central",
    dist: "Distância: 50m",
    detail: "Caminhe pela praça central em direção às Lojas Americanas e C&A",
    mapPos: { x: 50, y: 52 } // Praça Central / Átrio
  },
  {
    id: 2,
    icon: "🚶‍♂️",
    title: "Passe entre Lojas Americanas e C&A",
    dist: "Distância: 40m",
    detail: "Continue reto pelo corredor Norte até o fim da galeria",
    mapPos: { x: 50, y: 35 } // Corredor entre as Lojas
  },
  {
    id: 3,
    icon: "🚪",
    title: "Saia pela Porta de Saída Norte",
    dist: "Distância: 15m",
    detail: "Atravesse as portas automáticas de acesso direto ao Setor A",
    mapPos: { x: 50, y: 22 } // Saída Norte
  },
  {
    id: 4,
    icon: "✅",
    title: "Você chegou!",
    dist: "Seu carro está à sua esquerda",
    detail: "Sua vaga A145 fica logo no início do Bolsão Norte (Setor A)",
    isArrival: true,
    mapPos: { x: 42, y: 16 } // Chegada na Vaga A145
  }
];

function EncontreMeuCarroApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = STEPS.length;
  const activeData = STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      window.location.href = "monitoramento.html";
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      window.location.href = "monitoramento.html";
    }
  };

  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-md sm:max-w-lg app-card rounded-[32px] border border-white/20 shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-slate-800 font-sans mx-auto min-h-[660px] justify-between">
      
      {/* Header */}
      <header className="flex items-center gap-3">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-slate-900 truncate">Encontre meu Carro</h1>
          <p className="text-xs text-slate-500 truncate">Navegação interna pelo Shopping</p>
        </div>
      </header>

      {/* Cards Superiores (Vaga A145 e Setor A) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-2xl text-center border border-slate-100 shadow-xs flex flex-col items-center justify-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">VAGA</p>
          <p className="text-lg font-black text-blue-600 mt-0.5">A145</p>
        </div>
        <div className="bg-white p-3 rounded-2xl text-center border border-slate-100 shadow-xs flex flex-col items-center justify-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SETOR</p>
          <p className="text-lg font-black text-slate-900 mt-0.5">Setor A</p>
        </div>
      </div>

      {/* Card do Mapa Interativo com Trajeto Interno */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ROTA INTERNA ➔ SETOR A</span>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Térreo</span>
        </div>

        {/* Canvas / SVG do Mapa da Planta */}
        <div className="relative w-full h-48 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Estacionamento Externo (Fundo) */}
            <rect x="2" y="2" width="96" height="96" fill="#cbd5e1" rx="6" />
            
            {/* Bloco Central do Shopping */}
            <rect x="24" y="24" width="52" height="52" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" rx="4" />

            {/* Lojas Internas */}
            <rect x="27" y="27" width="20" height="18" fill="#ffffff" stroke="#cbd5e1" rx="1.5" />
            <text x="37" y="37" fontSize="3" textAnchor="middle" fill="#475569" fontWeight="bold">Americanas</text>

            <rect x="53" y="27" width="20" height="18" fill="#ffffff" stroke="#cbd5e1" rx="1.5" />
            <text x="63" y="37" fontSize="3.5" textAnchor="middle" fill="#475569" fontWeight="bold">C&A</text>

            <rect x="27" y="55" width="20" height="18" fill="#ffffff" stroke="#cbd5e1" rx="1.5" />
            <text x="37" y="65" fontSize="3.5" textAnchor="middle" fill="#475569" fontWeight="bold">C&A</text>

            <rect x="53" y="55" width="20" height="18" fill="#ffffff" stroke="#cbd5e1" rx="1.5" />
            <text x="63" y="65" fontSize="3.5" textAnchor="middle" fill="#475569" fontWeight="bold">Riachuelo</text>

            {/* Praça Central / Átrio (Ponto de Partida) */}
            <ellipse cx="50" cy="52" rx="11" ry="6" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.8" />
            <text x="50" y="53" fontSize="2.8" textAnchor="middle" fill="#166534" fontWeight="bold">Praça Central</text>

            {/* Saída Norte (Saída mais próxima do Setor A) */}
            <rect x="42" y="22" width="16" height="3" fill="#1e3a8a" rx="0.8" />
            <text x="50" y="20" fontSize="2.5" textAnchor="middle" fill="#1e3a8a" fontWeight="black">SAÍDA NORTE</text>

            {/* Traçado da Rota Interna (Do centro até o Setor A) */}
            <path 
              d="M 50 52 L 50 22 L 42 22 L 42 16" 
              fill="none" 
              stroke="#2563eb" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeDasharray="3 2" 
            />

            {/* Marcador da Vaga A145 no Setor A */}
            <circle cx="42" cy="16" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.2" />
            <text x="42" y="10" fontSize="4.5" textAnchor="middle" fill="#047857" fontWeight="black">VAGA A145</text>

            {/* Marcador do Usuário/Posição Atual */}
            <circle cx={activeData.mapPos.x} cy={activeData.mapPos.y} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx={activeData.mapPos.x} cy={activeData.mapPos.y} r="8" fill="#2563eb" className="animate-ping opacity-40" />
          </svg>
        </div>

        {/* Barra de Progresso */}
        <div className="px-1 pt-1">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-[10px] font-bold text-slate-400">
            <span>Passo {currentStep + 1} de {totalSteps}</span>
            <span className="text-blue-600">{activeData.dist}</span>
          </div>
        </div>
      </div>

      {/* Card da Instrução Atual */}
      <div className="flex flex-col gap-2">
        {!activeData.isArrival ? (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
              {activeData.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-slate-900 truncate">{activeData.title}</h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{activeData.detail}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex items-center gap-3 text-emerald-800">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
              {activeData.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-black text-emerald-700 truncate">{activeData.title}</h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{activeData.detail}</p>
            </div>
          </div>
        )}

        {/* Previsão do Próximo Passo */}
        {currentStep < totalSteps - 1 && (
          <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-200/50 flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider shrink-0">A SEGUIR:</span>
            <p className="text-[11px] font-semibold text-slate-600 truncate">{STEPS[currentStep + 1].title}</p>
          </div>
        )}
      </div>

      {/* Botão de Navegação */}
      <button 
        onClick={handleNext}
        className={`w-full mt-auto py-3.5 rounded-2xl text-xs font-bold shadow-md transition-all text-white flex items-center justify-center gap-2 ${
          activeData.isArrival ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {activeData.isArrival ? 'Concluir Navegação' : 'Próximo Passo ➔'}
      </button>

    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<EncontreMeuCarroApp />);