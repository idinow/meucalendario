import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/pt-br'; // Importe a localização do Moment.js para o idioma português
import logo from './calendarLogo.png'
import './index.scss';

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
  return (
    <div style={{ height: 'calc(90vh)' }}>
      <img src={logo} alt='' style={{ width: 'calc(10vh)', height: 'auto' }}/>
      <Calendar
        localizer={localizer}
        views={['week']}
        defaultView="week"
        events={[]}
        components={{toolbar: CustomToolbar,
          // day: {header: ({ label }) => (
          //   <CustomDayHeader label={label} formatHeader={dayHeaderFormat} />
          // )}
        }}
        style={{ margin: '100px' }}
      />
    </div>
  );
};
// // Defina o formato do cabeçalho para exibir apenas o dia da semana
// const dayHeaderFormat = (date, culture, localizer) =>
//   localizer.format(date, 'dddd', culture);

// // Componente personalizado para o cabeçalho do dia
// const CustomDayHeader = ({ label, formatHeader }) => (
//   <div>{formatHeader(label)}</div>
// );

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
        Buscar
      </button>
    </span>
  </div>
);

export default MyCalendar;
