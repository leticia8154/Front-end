function MonitoramentoApp() {
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

      {/* Link direto para encontrameucarro.html */}
      <a 
        href="encontrameucarro.html"
        className="w-full bg-white border border-[#2563eb] text-[#2563eb] font-bold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 mb-4 hover:bg-blue-50 transition-colors shadow-sm text-center"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Encontre meu Carro
      </a>

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MonitoramentoApp />);