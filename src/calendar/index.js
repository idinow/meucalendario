import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/pt-br'; // Importe a localização do Moment.js para o idioma português
import './index.scss';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  return (
    <div style={{ height: 'calc(90vh)' }}>
      <Calendar
        localizer={localizer}
        style={{ margin: '50px' }}
      />
    </div>
  );
};

export default MyCalendar;
