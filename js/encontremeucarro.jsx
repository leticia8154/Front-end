const { useState } = React;

// --- DADOS DA NAVEGAÇÃO DE RETORNO À VAGA A145 ---
const STEPS = [
  {
    id: 1,
    title: "Saia pela Entrada Sul",
    dist: "Distância: 20m",
    instruction: "Siga em direção à área externa do shopping",
    mapPos: { x: 50, y: 82 }
  },
  {
    id: 2,
    title: "Caminhe até o Setor A",
    dist: "Distância: 150m",
    instruction: "Contorne o prédio pela Alameda Oeste",
    mapPos: { x: 10, y: 50 }
  },
  {
    id: 3,
    title: "Sua vaga é a A145",
    dist: "Distância: 10m",
    instruction: "O carro está logo à sua frente",
    mapPos: { x: 38, y: 12 }
  }
];

function EncontreMeuCarroApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [view, setView] = useState("2d");
  const totalSteps = STEPS.length;
  const isLast = currentStep === totalSteps - 1;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
    else window.location.href = "monitoramento.html";
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg app-card rounded-[32px] border border-white/20 shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-slate-800 font-sans mx-auto">
      
      {/* Header */}
      <header className="flex items-center gap-3">
        <button 
          onClick={() => window.location.href = "monitoramento.html"}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-base font-bold text-slate-900">Encontre meu Carro</h1>
          <p className="text-xs text-slate-500">Navegação até seu veículo</p>
        </div>
      </header>

      {/* Info Cards Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-2 rounded-xl text-center border border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold">Vaga</p>
          <p className="text-sm font-black text-blue-600">A145</p>
        </div>
        <div className="bg-white p-2 rounded-xl text-center border border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold">Andar</p>
          <p className="text-sm font-black text-slate-800">Térreo</p>
        </div>
        <div className="bg-white p-2 rounded-xl text-center border border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold">Setor</p>
          <p className="text-sm font-black text-slate-800">Norte</p>
        </div>
      </div>

      {/* Mapa / Área Visual */}
      <div className="relative bg-white rounded-3xl p-4 border border-slate-100 shadow-sm overflow-hidden min-h-[220px]">
        {/* Simulação do Mapa 2D/3D Simplificado */}
        <div className={`map-container h-40 w-full bg-slate-100 rounded-2xl relative ${view === '3d' ? '[transform:rotateX(45deg)]' : ''}`}>
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="20" y="30" width="60" height="40" fill="#cbd5e1" rx="2" /> {/* Prédio */}
                <circle cx={STEPS[currentStep].mapPos.x} cy={STEPS[currentStep].mapPos.y} r="4" fill="#3b82f6" /> {/* Usuário */}
                <circle cx="38" cy="12" r="3" fill="#22c55e" /> {/* Carro A145 */}
             </svg>
        </div>

        {/* Barra de Progresso do Protótipo */}
        <div className="mt-6 px-4">
          <div className="progress-container">
            <div className="progress-puck" style={{ left: `${(currentStep / (totalSteps - 1)) * 100}%` }}>
               <svg className="w-3 h-3 text-white m-auto mt-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"/></svg>
            </div>
          </div>
          <p className="text-center text-[10px] font-bold text-slate-400 mt-2">Passo {currentStep + 1} de {totalSteps}</p>
        </div>

        <button 
          onClick={() => setView(view === '2d' ? '3d' : '2d')}
          className="absolute top-6 right-6 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm border border-slate-200"
        >
          {view === '2d' ? '3D' : '2D'}
        </button>
      </div>

      {/* Cards de Comando (Fiel ao Protótipo) */}
      <div className="flex flex-col gap-3">
        {currentStep < totalSteps - 1 ? (
          <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-blue-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              →
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">{STEPS[currentStep].title}</p>
              <p className="text-[10px] text-slate-400 font-bold">📍 {STEPS[currentStep].dist}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 text-center border border-emerald-100 shadow-sm flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>
            </div>
            <h2 className="text-xl font-black text-emerald-600">Você chegou!</h2>
            <p className="text-xs text-slate-400 font-bold">Seu carro está à sua frente</p>
          </div>
        )}

        {/* Lista de Próximos Passos (se houver) */}
        {currentStep < totalSteps - 1 && (
          <div className="px-2">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Próximos Passos</p>
             <div className="flex items-center gap-3 opacity-40">
                <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center text-[10px] text-white">2</div>
                <p className="text-xs font-bold text-slate-600">{STEPS[currentStep + 1].title}</p>
             </div>
          </div>
        )}
      </div>

      {/* Botão de Ação */}
      <button 
        onClick={nextStep}
        className={`w-full py-4 rounded-2xl text-xs font-bold shadow-md transition-all ${
          isLast ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
        } text-white mt-auto`}
      >
        {isLast ? 'Finalizar Rota' : 'Próximo Passo'}
      </button>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<EncontreMeuCarroApp />);