const { useState } = React;

// --- DADOS DOS SETORES E ROTA REALISTA ---
const SECTOR = {
  id: "A",
  title: "Setor A - Norte",
  sub: "Próx. Lojas Americanas",
  free: 51,
  total: 60,
  pricePerHour: 8.5,
  spotNumber: "A-145",
  // Rota realista pelas vias externas do shopping (Sem atravessar a área construída)
  routePoints: [
    { x: 50, y: 92, label: "Portaria Sul" },             // Passo 0: Entrada
    { x: 12, y: 92, label: "Acesso Alameda Oeste" },    // Passo 1: Curva à esquerda na via externa
    { x: 12, y: 15, label: "Corredor Norte" },           // Passo 2: Siga reto até a Alameda Norte
    { x: 32, y: 15, label: "Entrada Corredor A" },       // Passo 3: Curva no setor A
    { x: 32, y: 22, label: "Vaga A-145" }                // Passo 4: Estacionado
  ]
};

const NAVIGATION_STEPS = [
  {
    id: 1,
    dist: "Em 50m",
    text: "Passe pela Portaria Sul e vire à esquerda na Alameda Oeste",
    sub: "Siga pela via de circulação externa",
    icon: "↳"
  },
  {
    id: 2,
    dist: "Em 200m",
    text: "Siga reto contornando o prédio pelas Lojas Americanas",
    sub: "Mantenha-se na faixa da direita",
    icon: "↑"
  },
  {
    id: 3,
    dist: "Em 60m",
    text: "Vire à direita na Alameda Norte e entre no Setor A",
    sub: "Acesso ao corredor de vagas A-100",
    icon: "↱"
  },
  {
    id: 4,
    dist: "Chegada",
    text: "Sua vaga A-145 está à sua direita",
    sub: "Estacionamento livre no Setor A",
    icon: "📍",
    isGreen: true
  }
];

// --- COMPONENTE DO MAPA SVG 2D/3D ---
function FloorPlanMap({ progress, view }) {
  const pts = SECTOR.routePoints;
  const clampedIndex = Math.min(Math.max(0, progress), pts.length - 1);
  const currentPos = pts[clampedIndex];

  // String para o trajeto total (linha cinza)
  const fullPath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  // String para o trajeto percorrido (linha azul)
  const donePath = pts
    .slice(0, clampedIndex + 1)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-inner">
      <div
        className={`h-full w-full transition-all duration-700 ease-out ${
          view === "3d"
            ? "scale-105 origin-bottom [transform:rotateX(28deg)_rotateZ(-4deg)]"
            : "scale-100 [transform:rotateX(0deg)]"
        }`}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full block">
          {/* Terreno de Fundo */}
          <rect width="100" height="100" fill="#e2e8f0" />

          {/* Vias de Circulação Externa (Asfalto / Ruas) */}
          <rect x="5" y="5" width="90" height="18" rx="2" fill="#cbd5e1" />
          <rect x="5" y="77" width="90" height="18" rx="2" fill="#cbd5e1" />
          <rect x="5" y="5" width="14" height="90" rx="2" fill="#cbd5e1" />
          <rect x="81" y="5" width="14" height="90" rx="2" fill="#cbd5e1" />

          {/* Demarcação das Vagas do Setor Norte (Setor A) */}
          <g stroke="#94a3b8" strokeWidth="0.4">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={i} x1={22 + i * 5.5} y1="7" x2={22 + i * 5.5} y2="20" />
            ))}
            {/* Demarcação no Setor Sul (Setor C/D) */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={i} x1={22 + i * 5.5} y1="80" x2={22 + i * 5.5} y2="93" />
            ))}
          </g>

          {/* Prédio Principal do Shopping (Área Construída) */}
          <rect
            x="22"
            y="26"
            width="56"
            height="48"
            rx="3"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="0.8"
          />
          <text x="50" y="51" textAnchor="middle" fontSize="3.5" fill="#64748b" fontWeight="700">
            Praça Central
          </text>
          <text x="50" y="56" textAnchor="middle" fontSize="2.2" fill="#94a3b8">
            (Área Interna do Shopping)
          </text>

          {/* Guarita / Portaria Sul */}
          <g>
            <rect x="42" y="90" width="16" height="5" rx="1.5" fill="#1d4ed8" />
            <text x="50" y="93.5" textAnchor="middle" fontSize="2.2" fill="#ffffff" fontWeight="700">
              PORTARIA
            </text>
          </g>

          {/* Indicadores de Outros Setores */}
          <g opacity="0.8">
            {/* Setor B */}
            <rect x="74" y="8" width="8" height="6" rx="1.5" fill="#22c55e" />
            <text x="78" y="12" textAnchor="middle" fontSize="2.5" fill="#fff" fontWeight="700">B 35</text>
            
            {/* Setor C */}
            <rect x="68" y="84" width="8" height="6" rx="1.5" fill="#eab308" />
            <text x="72" y="88" textAnchor="middle" fontSize="2.5" fill="#fff" fontWeight="700">C 22</text>
            
            {/* Setor D */}
            <rect x="24" y="84" width="8" height="6" rx="1.5" fill="#ef4444" />
            <text x="28" y="88" textAnchor="middle" fontSize="2.5" fill="#fff" fontWeight="700">D 5</text>
          </g>

          {/* Trajeto Completo (Linha Guia Cinza) */}
          <path
            d={fullPath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 1.5"
          />

          {/* Trajeto Percorrido (Linha Ativa Azul) */}
          <path
            d={donePath}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ponto Final - Vaga A-145 */}
          <g transform={`translate(${pts[pts.length - 1].x}, ${pts[pts.length - 1].y})`}>
            <circle cx="0" cy="0" r="3.5" fill="#22c55e" opacity="0.3" />
            <circle cx="0" cy="0" r="2.2" fill="#22c55e" stroke="#ffffff" strokeWidth="0.6" />
            <text x="0" y="-3.5" textAnchor="middle" fontSize="2.5" fill="#15803d" fontWeight="800">
              Vaga A-145
            </text>
          </g>

          {/* Carrinho / Posição Atual */}
          <g transform={`translate(${currentPos.x}, ${currentPos.y})`}>
            <circle cx="0" cy="0" r="4" fill="#1d4ed8" opacity="0.25" />
            <circle cx="0" cy="0" r="2.6" fill="#1d4ed8" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* Badge Flutuante no Mapa */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur-xs border border-slate-200/60">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Vista {view.toUpperCase()} · Cidade Jardim
      </div>
    </div>
  );
}

// --- TELA PRINCIPAL DE NAVEGAÇÃO ---
function NavegacaoApp() {
  const [view, setView] = useState("2d");
  const [stepIndex, setStepIndex] = useState(0);

  const totalSteps = NAVIGATION_STEPS.length;
  const isLastStep = stepIndex >= totalSteps - 1;

  const handleNextStep = () => {
    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
    } else {
      window.location.href = "setores.html";
    }
  };

  const handleBackToSetores = () => {
    window.location.href = "setores.html";
  };

  // Cálculo da distância até a vaga
  const remainingMeters = (totalSteps - 1 - stepIndex) * 100;

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-[#fbf8f3] rounded-[32px] border border-slate-200/80 shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-slate-800 font-sans mx-auto transition-all">
      
      {/* Header com Botão Voltar Idêntico à Tela de Setores */}
      <header className="flex items-center gap-3">
        <button
          onClick={handleBackToSetores}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors"
          aria-label="Voltar para setores"
        >
          {/* Chevron Esquerda */}
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-slate-900 truncate">Shopping Center Cidade Jardim</h1>
          <p className="text-xs text-slate-500 truncate">
            Rota até a vaga {SECTOR.spotNumber} · {SECTOR.title}
          </p>
        </div>
      </header>

      {/* Container do Mapa com Troca de Mapeamento 2D/3D */}
      <div className="relative">
        <FloorPlanMap progress={stepIndex} view={view} />

        {/* Botão de Alternar Câmera 2D / 3D */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={() => setView((prev) => (prev === "3d" ? "2d" : "3d"))}
            className="px-3 py-1.5 text-xs font-bold bg-white/95 rounded-full shadow-md text-slate-700 hover:bg-white border border-slate-200/60 transition-all"
          >
            Modo {view === "3d" ? "2D" : "3D"}
          </button>
        </div>
      </div>

      {/* Card Resumo do Setor */}
      <div className="rounded-2xl p-3.5 flex justify-between items-center bg-white border border-slate-200/80 shadow-xs">
        <div>
          <div className="text-base font-extrabold text-slate-900">{SECTOR.title}</div>
          <div className="text-xs text-slate-500">SCN · Asa Norte, Brasília - DF</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">
            {totalSteps} passos · Vaga {SECTOR.spotNumber} · {SECTOR.sub}
          </div>
        </div>
        <div className="text-right pl-2">
          <div className="text-2xl font-black text-blue-600 leading-none">
            {isLastStep ? "0m" : `${remainingMeters}m`}
          </div>
          <div className="text-[10px] font-medium text-slate-400 mt-1">até a vaga</div>
        </div>
      </div>

      {/* Lista de Passos Guiados */}
      <div className="flex flex-col gap-2">
        {NAVIGATION_STEPS.map((item, idx) => {
          const isActive = stepIndex === idx;
          const isDone = stepIndex > idx;

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-3 flex items-center gap-3 border transition-all ${
                item.isGreen && (isActive || isDone)
                  ? "border-emerald-500 bg-emerald-50/60"
                  : isActive
                  ? "border-blue-600 bg-blue-50/60 shadow-xs"
                  : isDone
                  ? "border-slate-200 bg-slate-50 opacity-70"
                  : "border-slate-200/80 bg-white"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 text-sm font-bold ${
                  item.isGreen ? "bg-emerald-500" : isActive ? "bg-blue-600" : "bg-slate-400"
                }`}
              >
                {item.id}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[10px] font-bold ${
                    item.isGreen ? "text-emerald-600" : "text-blue-600"
                  }`}
                >
                  {item.dist}
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight truncate">
                  {item.text}
                </div>
                <div className="text-[10px] text-slate-400">{item.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ações de Navegação */}
      <div className="flex gap-3 mt-1">
        <button
          onClick={handleBackToSetores}
          className="flex-1 border border-slate-300 rounded-full text-xs font-bold py-3 text-slate-700 bg-white hover:bg-slate-50 shadow-xs transition-colors"
        >
          Voltar ao Mapa
        </button>
        <button
          onClick={handleNextStep}
          className={`flex-1 text-white rounded-full text-xs font-bold py-3 shadow-md transition-all ${
            isLastStep
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLastStep ? "Finalizar Navegação" : "Próximo Passo"}
        </button>
      </div>

    </div>
  );
}

// Monta o React no elemento #root
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<NavegacaoApp />);