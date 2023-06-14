import React from 'react';
import FormsEvent from './formsEvent';
import lupa from '../../assets/lupa.svg'


const CustomToolbar = ({ label, onNavigate, isModalOpen, setIsModalOpen }) => (
  
  
  <div className="rbc-toolbar">
    <span className="rbc-btn-group">
      <button type="button" onClick={() => onNavigate('PREV')}>
        {'<'}
      </button>
      <button type="button" onClick={() => onNavigate('TODAY')}>
        {label}
      </button>
      <button type="button" onClick={() => onNavigate('NEXT')}>
        {'>'}
      </button>
    </span>
    <span className="rbc-toolbar-right">
      <button type="button" className="add-event-button" onClick={() => setIsModalOpen(true)}>
        + Evento
      </button>
      <button type="button" className="search-button">
      <img src={lupa} alt='' style={{ width: '20px', height: 'auto' }}></img> Buscar
      </button>
    </span>
    <FormsEvent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  </div>
);

export default CustomToolbar;