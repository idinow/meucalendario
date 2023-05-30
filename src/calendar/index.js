import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/pt-br'; // Importe a localização do Moment.js para o idioma português
import logo from './calendarLogo.png'
import lupa from './lupa.svg'
import './index.scss';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
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
      <button type="button" className="add-event-button">
        + Evento
      </button>
      <button type="button" className="search-button">
      <img src={lupa} alt='' style={{ width: '20px', height: 'auto' }}></img> Buscar
      </button>
    </span>
  </div>
);


