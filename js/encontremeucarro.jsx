const { useState } = React;

// --- DADOS DE NAVEGAÇÃO INTERNA FIEL À PLANTA ( image_15.png ) ---
const STEPS = [
  {
    id: 1,
    icon: "🚶‍♂️",
    title: "Saia pela Entrada Sul",
    dist: "Distância: 30m",
    detail: "Ao passar pela Entrada Sul, dobre à esquerda na via externa",
    mapPos: { x: 50, y: 78 } // Ponto azul na Entrada Sul ( image_8.png )
  },
  {
    id: 2,
    icon: "➔",
    title: "Siga direto contornando a fachada",
    dist: "Distância: 180m",
    detail: "Contorne a fachada das Lojas Americanas pela Alameda Oeste",
    mapPos: { x: 22, y: 55 } // Trajeto contornando ( image_8.png )
  },
  {
    id: 3,
    icon: "➔",
    title: "Vire à direita ao norte",
    dist: "Distância: 50m",
    detail: "Vire à direita ao norte para acessar o Bolsão do Setor A",
    mapPos: { x: 32, y: 22 } // Bolsão do Setor A ( image_8.png )
  },
  {
    id: 4,
    icon: "✅",
    title: "Você chegou!",
    dist: "Seu carro está à sua frente",
    detail: "Sua vaga A145 está localizada à sua direita no Setor A",
    mapPos: { x: 42, y: 15 } // Vaga A145 ( image_8.png )
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
    <div className="w-full max-w-md sm:max-w-lg app-card rounded-[32px] border border-white/20 shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-slate-800 font-sans mx-auto justify-between min-h-[640px]">
      
      {/* Header */}
      <header className="flex items-center gap-3">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-tight">Encontre meu Carro</h1>
          <p className="text-[11px] text-slate-500 font-medium">Navegação até seu veículo</p>
        </div>
      </header>

      {/* Grid de Informações Padronizado (Apenas Setor A) */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-2.5 rounded-2xl text-center border border-slate-100 shadow-xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">VAGA</p>
          <p className="text-base font-black text-blue-600 mt-0.5">A145</p>
        </div>
        <div className="bg-white p-2.5 rounded-2xl text-center border border-slate-100 shadow-xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SETOR</p>
          <p className="text-base font-black text-slate-900 mt-0.5">Setor A</p>
        </div>
      </div>

      {/* Card do Mapa SVG Interativo e Fiel à Planta */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ROTA ATÉ O VEÍCULO</span>
        </div>

        {/* Display do Mapa SVG */}
        <div className="relative w-full h-40 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/50">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* 1. Mapeamento dos Blocos Principais (Planta image_15.png ) */}
            {/* Bolsões de Estacionamento Externo */}
            <rect x="2" y="2" width="96" height="96" fill="#cbd5e1" rx="4" />
            
              {/* Lojas Principais (Anchors image_15.png ) */}
            <rect x="30" y="30" width="12" height="12" fill="#e2e8f0" rx="1.5" stroke="#94a3b8" /> {/* Lojas Americanas ( image_15.png ) */}
            <rect x="58" y="30" width="12" height="12" fill="#e2e8f0" rx="1.5" stroke="#94a3b8" /> {/* C&A ( image_15.png ) */}
            <rect x="30" y="58" width="12" height="12" fill="#e2e8f0" rx="1.5" stroke="#94a3b8" /> {/* C&A ( image_15.png ) */}
            <rect x="58" y="58" width="12" height="12" fill="#e2e8f0" rx="1.5" stroke="#94a3b8" /> {/* Riachuelo ( image_15.png ) */}
            
            <circle cx="50" cy="50" r="8" fill="#e2e8f0" stroke="#94a3b8" /> {/* Praça Central/Átrio ( image_15.png ) */}
            
            {/* 2. Trajeto SVG (image_8.png ) */}
            <path d="M 50 78 L 22 78 L 22 55 L 32 22 L 42 15" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />

            {/* 3. Marcador da Vaga A145 ( image_8.png ) */}
            <circle cx="42" cy="15" r="4" fill="#10b981" stroke="white" strokeWidth="1.5" />
            <text x="42" y="10" fontSize="6" textAnchor="middle" fill="#10b981" fontWeight="black">VAGA A145</text>

            {/* 4. Marcador da Posição Atual ( image_8.png ) */}
            <circle cx={activeData.mapPos.x} cy={activeData.mapPos.y} r="6" fill="#2563eb" className="animate-ping opacity-75" />
            <circle cx={activeData.mapPos.x} cy={activeData.mapPos.y} r="5" fill="#2563eb" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Barra de Progresso Gradiente Fiel ao Protótipo */}
        <div className="px-2 pt-1 pb-2">
          <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden flex items-center">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 px-1">
            <span className="text-[10px] font-bold text-slate-400">Passo {currentStep + 1} de {totalSteps}</span>
            <span className="text-[11px] font-extrabold text-blue-600">Encontre A145</span>
          </div>
        </div>
      </div>

      {/* Bloco de Instruções do Passo Atual */}
      <div className="flex flex-col gap-2">
        {!activeData.isArrival ? (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-xl shrink-0">
              {activeData.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-slate-900 truncate">{activeData.title}</h3>
              <p className="text-[10px] text-blue-600 font-bold mt-0.5">📍 {activeData.dist}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs text-center flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black text-2xl">
              {activeData.icon}
            </div>
            <div>
              <h2 className="text-base font-black text-emerald-600">{activeData.title}</h2>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{activeData.dist}</p>
            </div>
          </div>
        )}

        {/* Próximos Passos (se não for o último) */}
        {currentStep < totalSteps - 1 && (
          <div className="bg-white/60 rounded-2xl p-3 border border-slate-200/60 flex flex-col gap-2 opacity-50">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">PRÓXIMO PASSO</span>
            <div className="flex items-center gap-2 text-slate-500">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  {currentStep + 2}
                </div>
                <p className="text-xs font-semibold text-slate-700 truncate">{STEPS[currentStep + 1].title}</p>
            </div>
          </div>
        )}
      </div>

      {/* Botão de Ação Inferior */}
      <button 
        onClick={handleNext}
        className={`w-full py-4 rounded-2xl text-xs font-bold shadow-md transition-all text-white ${
          activeData.isArrival ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {activeData.isArrival ? 'Finalizar Rota' : 'Próximo Passo ➔'}
      </button>

    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<EncontreMeuCarroApp />);