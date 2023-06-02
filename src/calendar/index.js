
import moment from 'moment';
import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Modal from 'react-modal'
import 'moment/locale/pt-br'; // Importe a localização do Moment.js para o idioma português
import logo from './calendarLogo.png'
import lupa from './lupa.svg'
import './index.scss';


const localizer = momentLocalizer(moment);


const MyCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)   // Verifica se o Modal está aberto

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const CustomToolbar = ({ label, onNavigate }) => (
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
        <button type="button" className="add-event-button" onClick={openModal}>
          + Evento
        </button>
        <button type="button" className="search-button">
        <img src={lupa} alt='' style={{ width: '20px', height: 'auto' }}></img> Buscar
        </button>
      </span>
      <Modal
        isOpen={isModalOpen} 
        onRequestClose={closeModal}
        className="custom-modal"
        overlayClassName="custo-modal-overlay"
      >
        <h2>Criar evento</h2>
        <form>
          <label>Titulo</label>
          <input type= "text"/> 
          <label>Data Inicio:</label>
          <input type = "date"/>
          <label>Data Fim:</label>
          <input type = "date"/>
          <label>Descriçao:</label>
          <input type = "text" />
        </form>
        <button onClick={closeModal}>Salvar</button>
      </Modal>
    </div>
  );

  return (
    <div style={{ height: 'calc(80vh)' }}>
      <img src={logo} alt='' style={{ width: '75px', height: 'auto' }}/>
      <Calendar
        localizer={localizer}
        views={['week']}
        defaultView='week'
        events={[]}
        components={{toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default MyCalendar;



