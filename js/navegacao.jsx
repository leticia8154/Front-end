const { useState } = React;

// 1. Dados e Estruturas do Estacionamento
const SECTORS = [
  {
    id: "A",
    title: "Setor A - Norte",
    sub: "Próx. Lojas Americanas",
    free: 51,
    total: 60,
    pricePerHour: 8.5,
    entry: { x: 30, y: 15 },
    spot: { x: 30, y: 12 },
    route: [
      { x: 50, y: 93 },
      { x: 28, y: 88 },
      { x: 24, y: 28 },
      { x: 24, y: 15 },
      { x: 30, y: 12 },
    ],
  },
  {
    id: "B",
    title: "Setor B - Leste",
    sub: "Próx. Praça de Alimentação",
    free: 35,
    total: 60,
    pricePerHour: 8.5,
    entry: { x: 68, y: 15 },
    spot: { x: 72, y: 12 },
    route: [
      { x: 50, y: 93 },
      { x: 72, y: 88 },
      { x: 76, y: 28 },
      { x: 72, y: 12 },
    ],
  },
  {
    id: "C",
    title: "Setor C - Sul",
    sub: "Próx. Cinema",
    free: 22,
    total: 60,
    pricePerHour: 8.5,
    entry: { x: 68, y: 81 },
    spot: { x: 72, y: 84 },
    route: [
      { x: 50, y: 93 },
      { x: 72, y: 88 },
      { x: 72, y: 84 },
    ],
  },
  {
    id: "D",
    title: "Setor D - Sudoeste",
    sub: "Próx. Supermercado",
    free: 5,
    total: 60,
    pricePerHour: 8.5,
    entry: { x: 30, y: 81 },
    spot: { x: 25, y: 84 },
    route: [
      { x: 50, y: 93 },
      { x: 28, y: 88 },
      { x: 25, y: 84 },
    ],
  },
];

const NAVIGATION_STEPS = [
  { id: 1, text: "Vire à direita na alameda oeste", dist: "Em 90m", sub: "90m", type: "turn" },
  { id: 2, text: "Contorne o bloco das Lojas Americanas", dist: "Em 30m", sub: "260m", type: "straight" },
  { id: 3, text: "Vire à direita no apron norte, corredor A", dist: "Em 60m", sub: "60m", type: "turn" },
  { id: 4, text: "Sua vaga está à esquerda", dist: "Chegada", sub: "Vaga A-145", type: "pin", isGreen: true },
];

function occupancy(sector) {
  return Math.round(((sector.total - sector.free) / sector.total) * 100);
}

function occupancyLevel(pct) {
  if (pct < 50) return "free";
  if (pct < 85) return "medium";
  return "busy";
}

const levelColor = {
  free: "#22c55e",
  medium: "#eab308",
  busy: "#ef4444",
};

// 2. Componente do Mapa SVG (FloorPlanMap)
function FloorPlanMap({ sector, progress, view }) {
  const pts = sector.route;
  const clampedIndex = Math.min(Math.max(0, progress), pts.length - 1);
  const puck = pts[clampedIndex] || { x: 50, y: 50 };

  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const done = pts
    .slice(0, clampedIndex + 1)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const gridLines = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-slate-100 shadow-inner">
      <div className={`h-full w-full transition-transform duration-500 ${view === "3d" ? "scale-105 rotate-x-12" : ""}`}>
        <svg viewBox="0 0 100 100" className="h-full w-full block">
          {/* Terreno */}
          <rect width="100" height="100" fill="#e2e8f0" />
          <rect x="4" y="4" width="92" height="92" rx="3" fill="#dcfce7" />

          {/* Vagas e Alamedas */}
          <rect x="6" y="6" width="88" height="20" rx="2" fill="#cbd5e1" />
          <rect x="6" y="74" width="88" height="20" rx="2" fill="#cbd5e1" />

          {gridLines.map((i) => (
            <g key={i} stroke="#f8fafc" strokeWidth="0.4">
              <line x1={8 + i * 4.8} y1="8" x2={8 + i * 4.8} y2="24" />
              <line x1={8 + i * 4.8} y1="76" x2={8 + i * 4.8} y2="92" />
            </g>
          ))}

          {/* Anéis de Circulação */}
          <g fill="#94a3b8">
            <rect x="5.5" y="27" width="7" height="46" />
            <rect x="87.5" y="27" width="7" height="46" />
            <rect x="5.5" y="88" width="89" height="6" />
            <rect x="46.5" y="93" width="7" height="7" />
          </g>

          {/* Portaria */}
          <g>
            <rect x="44" y="95.5" width="12" height="3" rx="1" fill="#2563eb" />
            <text x="50" y="97.9" textAnchor="middle" fontSize="2.2" fill="#ffffff" fontWeight="700">
              PORTARIA
            </text>
          </g>

          {/* Prédio Shopping */}
          <rect x="14" y="30" width="72" height="40" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
          <text x="50" y="52" textAnchor="middle" fontSize="3" fill="#64748b" fontWeight="600">
            Praça Central
          </text>

          {/* Badges de Setores */}
          {SECTORS.map((s) => {
            const pct = occupancy(s);
            const color = levelColor[occupancyLevel(pct)];
            const active = s.id === sector.id;

            return (
              <g key={s.id} opacity={active ? 1 : 0.75}>
                <rect
                  x={s.entry.x - 4.5}
                  y={s.entry.y - 4}
                  width="9"
                  height="8"
                  rx="2"
                  fill={color}
                  stroke={active ? "#2563eb" : "transparent"}
                  strokeWidth="0.8"
                />
                <text x={s.entry.x} y={s.entry.y - 0.8} textAnchor="middle" fontSize="3" fill="#ffffff" fontWeight="700">
                  {s.id}
                </text>
                <text x={s.entry.x} y={s.entry.y + 2.8} textAnchor="middle" fontSize="2.6" fill="#ffffff">
                  {s.free}
                </text>
              </g>
            );
          })}

          {/* Rota */}
          <path d={path} fill="none" stroke="#94a3b8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d={done} fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Marcador Vaga */}
          <g transform={`translate(${sector.spot.x}, ${sector.spot.y})`}>
            <circle cx="0" cy="0" r="3" fill="#22c55e" opacity="0.4" />
            <circle cx="0" cy="0" r="2" fill="#22c55e" stroke="#ffffff" strokeWidth="0.6" />
          </g>

          {/* Marcador Posição Atual */}
          <g transform={`translate(${puck.x}, ${puck.y})`}>
            <circle cx="0" cy="0" r="3.6" fill="#2563eb" opacity="0.3" />
            <circle cx="0" cy="0" r="2.4" fill="#2563eb" stroke="#ffffff" strokeWidth="0.7" />
          </g>
        </svg>
      </div>

      {/* Badges Flutuantes */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Vista {view.toUpperCase()} · Cidade Jardim
      </div>
    </div>
  );
}

// 3. Tela de Navegação Principal
function NavegacaoApp() {
  const [view, setView] = useState("3d");
  const [stepIndex, setStepIndex] = useState(0);

  const currentSector = SECTORS[0];
  const totalSteps = currentSector.route.length;
  const isLastStep = stepIndex >= totalSteps - 1;

  const handleNextStep = () => {
    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
    } else {
      window.location.href = "index.html"; // Redireciona para a página inicial
    }
  };

  const handleBack = () => {
    window.location.href = "index.html";
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-xl p-4 flex flex-col gap-3 text-slate-800 font-sans">
      
      {/* Header */}
      <header className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold truncate">Shopping Center Cidade Jardim</h1>
          <p className="text-[11px] text-slate-500 truncate">
            Rota até a vaga A-145 · {currentSector.title}
          </p>
        </div>
      </header>

      {/* Mapa */}
      <div className="relative">
        <FloorPlanMap sector={currentSector} progress={stepIndex} view={view} />
        
        {/* Botão de Alternar Câmera */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <button
            onClick={() => setView((prev) => (prev === "3d" ? "2d" : "3d"))}
            className="px-2 py-1 text-[10px] bg-white/90 rounded-full font-bold shadow-md hover:bg-white text-slate-700"
          >
            Modo {view === "3d" ? "2D" : "3D"}
          </button>
        </div>
      </div>

      {/* Card Setor Selecionado */}
      <div className="border-2 border-blue-600 rounded-2xl p-3 flex justify-between items-start bg-blue-50/50">
        <div>
          <div className="text-base font-extrabold text-slate-900">{currentSector.title}</div>
          <div className="text-[10px] text-slate-500 my-0.5">SCN · Asa Norte, Brasília - DF</div>
          <div className="text-[10px] text-blue-600 font-bold mt-1.5">
            {totalSteps} passos · Vaga A-145 · {currentSector.sub}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-blue-600">
            {isLastStep ? "0m" : `${(totalSteps - stepIndex) * 120}m`}
          </div>
          <div className="text-[9px] text-slate-500">até a vaga</div>
        </div>
      </div>

      {/* Lista de Passos */}
      <div className="flex flex-col gap-1.5">
        {NAVIGATION_STEPS.map((item, idx) => {
          const isActive = stepIndex === idx;
          return (
            <div
              key={item.id}
              className={`rounded-xl p-2 flex items-center gap-2.5 border transition-all ${
                item.isGreen
                  ? "border-green-500 bg-green-50"
                  : isActive
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 text-xs font-bold ${
                  item.isGreen ? "bg-green-500" : "bg-blue-600"
                }`}
              >
                {item.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[9px] font-bold ${item.isGreen ? "text-green-600" : "text-blue-600"}`}>
                  {item.dist}
                </div>
                <div className="text-[11px] font-bold text-slate-800 leading-tight truncate">
                  {item.text}
                </div>
                <div className="text-[9px] text-slate-400">{item.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botões do Rodapé */}
      <div className="flex gap-2.5 mt-2">
        <button
          onClick={handleBack}
          className="flex-1 border border-slate-300 rounded-full text-xs font-bold py-2.5 hover:bg-slate-50"
        >
          Voltar ao Mapa
        </button>
        <button
          onClick={handleNextStep}
          className={`flex-1 text-white rounded-full text-xs font-bold py-2.5 ${
            isLastStep ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLastStep ? "Finalizar Navegação" : "Próximo Passo"}
        </button>
      </div>

    </div>
  );
}

// 4. Montar a Aplicação na Div #root
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<NavegacaoApp />);