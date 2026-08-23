const { useState } = React;

function CheckinApp() {
  const [isScanning, setIsScanning] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simula o escaneamento do QR Code
  const handleSimulateScan = () => {
    setIsScanning(false);
    // Simula a confirmação e atualização das vagas no sistema
    setTimeout(() => {
      setIsSuccess(true);
    }, 1200);
  };

  const handleFinish = () => {
    // Redireciona de volta para a tela inicial ou de setores
    window.location.href = "setores.html";
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg bg-[#fbf8f3] rounded-[32px] border border-slate-200/80 shadow-2xl p-4 sm:p-6 flex flex-col gap-4 text-slate-800 font-sans mx-auto">
      
      {/* Header com Botão Voltar */}
      <header className="flex items-center gap-3">
        <button
          onClick={() => (window.location.href = "navegacao.html")}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-slate-900 truncate">Check-in de Vaga</h1>
          <p className="text-xs text-slate-500 truncate">Setor A - Norte · Vaga A-145</p>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL: SCANNER OU CONFIRMAÇÃO */}
      {!isSuccess ? (
        <div className="flex flex-col gap-4">
          {/* Viewfinder da Câmera / QR Code */}
          <div className="relative aspect-square w-full rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner">
            
            {/* Canto Visual da Câmera (Mira) */}
            <div className="absolute inset-8 border-2 border-dashed border-white/30 rounded-xl pointer-events-none flex flex-col justify-between p-2">
              <div className="flex justify-between">
                <div className="w-4 h-4 border-t-2 border-l-2 border-blue-500" />
                <div className="w-4 h-4 border-t-2 border-r-2 border-blue-500" />
              </div>
              <div className="flex justify-between">
                <div className="w-4 h-4 border-b-2 border-l-2 border-blue-500" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-blue-500" />
              </div>
            </div>

            {/* Linha Vermelha/Azul do Scanner */}
            {isScanning && (
              <div className="absolute left-6 right-6 h-0.5 bg-blue-500 shadow-[0_0_12px_#3b82f6] animate-scan-line" />
            )}

            {/* Ilustração / Preview de QR Code Central */}
            <div className="w-32 h-32 bg-white/10 rounded-lg p-2 backdrop-blur-xs flex items-center justify-center border border-white/10 opacity-80">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v2h-1v-2zm-3 0h2v1h-2v-1zm1 3h2v3h-2v-3zm2 1h1v2h-1v-2zm-3 1h1v1h-1v-1zm1 1h2v1h-2v-1zm-4-4h1v1h-1v-1zm0 2h1v2h-1v-2zm-2-2h1v1h-1v-1zm0 2h1v1h-1v-1z"/>
              </svg>
            </div>

            <span className="absolute bottom-3 text-[11px] text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-md">
              Posicione o QR Code da vaga no centro
            </span>
          </div>

          {/* Card Informativo da Vaga */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase">Vaga Selecionada</span>
              <div className="text-xl font-black text-slate-900">Vaga A-145</div>
              <div className="text-xs text-slate-500">Setor A - Norte (Próx. Lojas Americanas)</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
              P
            </div>
          </div>

          {/* Botão para Simular a Leitura */}
          <button
            onClick={handleSimulateScan}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3.5 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Simular Leitura do QR Code
          </button>
        </div>
      ) : (
        /* SUCCESSO / VAGA OCUPADA COM SUCESSO */
        <div className="flex flex-col items-center text-center py-6 gap-4">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">Veículo Registrado!</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Sua vaga <strong className="text-slate-800">A-145</strong> foi confirmada. O mapa do shopping foi atualizado com <strong>-1 vaga disponível</strong> no Setor A.
            </p>
          </div>

          <div className="w-full bg-white rounded-2xl p-4 border border-slate-200/80 text-left flex flex-col gap-2 mt-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Entrada:</span>
              <span className="font-bold text-slate-700">Hoje, 14:32</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Tarifa:</span>
              <span className="font-bold text-slate-700">R$ 8,50 / hora</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Tolerância:</span>
              <span className="font-bold text-emerald-600">15 min grátis</span>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-3.5 text-xs font-bold shadow-md transition-all mt-2"
          >
            Concluir e Ir ao Início
          </button>
        </div>
      )}

    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<CheckinApp />);