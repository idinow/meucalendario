import React from 'react';
import FormsEvent from './formsEvent';


const CustomToolbar = ({ label, onNavigate, currentView,
  setCurrentView, isModalOpen, setIsModalOpen }) => {
  
  return(
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
      <button type="button" className="search-agenda-button" onClick={() => setCurrentView(
        currentView ==='agenda' ? 'week' : 'agenda')}>
      {currentView === 'agenda' ? 'Agenda' : 'Buscar'}
      </button>
    </span>
    <FormsEvent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  </div>
  )};

export default CustomToolbar;