import React, { useState } from 'react';
import '../css/setores.css';

export function TelaSetores() {
  // Estado para controlar qual setor está selecionado no momento
  const [sectorSelected, setSectorSelected] = useState('A');

  // Base de dados dinâmicos dos setores (Pronta para consumo de API back-end)
  const sectors = [
    { 
      id: 'A', 
      name: 'Setor A', 
      floor: '1º Andar', 
      vagas: 35, 
      total: 50, 
      badgeClass: 'badge-green', 
      occupancy: '30% ocupado' 
    },
    { 
      id: 'B', 
      name: 'Setor B', 
      floor: '1º Andar', 
      vagas: 8, 
      total: 50, 
      badgeClass: 'badge-red', 
      occupancy: '84% ocupado' 
    },
    { 
      id: 'C', 
      name: 'Setor C', 
      floor: '2º Andar', 
      vagas: 22, 
      total: 50, 
      badgeClass: 'badge-orange', 
      occupancy: '56% ocupado' 
    },
    { 
      id: 'D', 
      name: 'Setor D', 
      floor: '1º Andar', 
      vagas: 5, 
      total: 50, 
      badgeClass: 'badge-red', 
      occupancy: '90% ocupado' 
    },
  ];

  // Identifica o objeto completo do setor que está ativo
  const currentSector = sectors.find(sec => sec.id === sectorSelected);

  const handleNavigation = () => {
    alert(`Iniciando rota de navegação em tempo real para o ${currentSector.name}...`);
  };

  return (
    <main className="container">
      
      {/* Cabeçalho */}
      <header className="header-nav">
        <a href="principal.html" className="btn-back" aria-label="Voltar">‹</a>
        <div className="header-titles">
          <h1>Brasília Shopping</h1>
          <p>Selecione um setor</p>
        </div>
      </header>

      {/* Grid Superior do Mapa */}
      <section className="sectors-map-card">
        <div className="sectors-grid">
          {sectors.map((sec) => (
            <div 
              key={sec.id}
              className={`sector-box ${sectorSelected === sec.id ? 'selected' : ''}`}
              onClick={() => setSectorSelected(sec.id)}
            >
              <div className="sector-box-header">
                <span className="sector-box-title">{sec.name}</span>
              </div>
              <span className="sector-box-floor">{sec.floor}</span>
              <span className={`sector-box-badge ${sec.badgeClass}`}>
                {sec.vagas}/{sec.total}
              </span>
            </div>
          ))}
        </div>

        {/* Legenda Flutuante */}
        <div className="legend-floating-badge">
          <p className="legend-title">Disponibilidade</p>
          <div className="legend-item"><span class="dot dot-green"></span> Alta (&gt;70%)</div>
          <div className="legend-item"><span class="dot dot-orange"></span> Média (30-70%)</div>
          <div className="legend-item"><span class="dot dot-red"></span> Baixa (&lt;30%)</div>
        </div>
      </section>

      {/* Card de Detalhes Dinâmico do Setor Ativo */}
      {currentSector && (
        <section className="sector-details-card" key={currentSector.id}>
          <div className="details-header">
            <div className="details-info">
              <h2>{currentSector.name}</h2>
              <p>{currentSector.floor}</p>
            </div>
            <div className="details-vagas-count">
              <span className="vagas-number">{currentSector.vagas}</span>
              <p className="vagas-label">vagas livres</p>
            </div>
          </div>
          <button 
            className="btn-navigate" 
            type="button"
            onClick={handleNavigation}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
            </svg>
            <span>Navegar até o Setor</span>
          </button>
        </section>
      )}

      {/* Lista Inferior Sincronizada */}
      <section className="all-sectors-section">
        <h2 className="all-sectors-title">Todos os Setores</h2>
        <div className="sectors-list">
          {sectors.map((sec) => (
            <div 
              key={sec.id}
              className={`list-item-sector ${sectorSelected === sec.id ? 'selected' : ''}`}
              onClick={() => setSectorSelected(sec.id)}
            >
              <div className="list-item-left">
                <div className="sector-letter-badge">{sec.id}</div>
                <div className="sector-item-text">
                  <h3>{sec.name}</h3>
                  <p>{sec.floor}</p>
                </div>
              </div>
              <div className="list-item-right">
                <span className={`badge-circle-vagas ${sec.badgeClass}`}>
                  {sec.vagas}
                </span>
                <p className="occupancy-percentage">{sec.occupancy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}