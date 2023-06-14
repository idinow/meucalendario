
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/pt-br'; // Importe a localização do Moment.js para o idioma português
import logo from '../../assets/calendarLogo.png'
import './calendar.scss';
import CustomToolbar from './toolbar';
import { fetchEvents } from './events';
import FormsEvent from './formsEvent';


const localizer = momentLocalizer(moment);


const MyCalendar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)   // Verifica se o Modal está aberto

  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 'calc(80vh)' }}>
      <img src={logo} alt='' style={{ width: '75px', height: 'auto' }}/>
      <Calendar
        localizer={localizer}
        views={['week']}
        defaultView='week'
        events={events}
        onSelectEvent= {(event) => {setIsModalOpen(true); setSelectedEvent(event);}} 
        components={{toolbar: props => <CustomToolbar {...props} 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}/>,
       }}
      />
      {isModalOpen && (
        <FormsEvent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedEvent={selectedEvent}
        /> 
      )}
    </div>
  );
};

export default MyCalendar;



