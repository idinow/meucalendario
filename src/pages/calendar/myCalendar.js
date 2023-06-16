
import moment from 'moment';
import React, { Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/pt-br'; // Importe a localização do Moment.js para o idioma português
import logo from '../../assets/calendarLogo.png'
import './calendar.scss';
import CustomToolbar from './toolbar';
import { fetchEvents } from './events';
import FormsEvent from './formsEvent';


const localizer = momentLocalizer(moment);


class MyCalendar extends Component {

  constructor(props){
    super(props);

    this.state = {
      isModalOpen: false,
      events: [],
      selectedEvent: null,
      currentView: 'week'
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const fetchedEvents = await fetchEvents();
    this.setState({events: fetchedEvents});
  };

  handleEventSelect = (event) => {
    this.setState({ isModalOpen: true, selectedEvent: event });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false, selectedEvent: null });
    this.fetchData();
  };

  handleViewChange = (view) => {
    this.setState({ currentView: view });
  };

  render() {
    const { isModalOpen, events, selectedEvent, currentView } = this.state;

    return (
      <div style={{ height: 'calc(80vh)' }}>
        <img src={logo} alt='' style={{ width: '75px', height: 'auto' }}/>
        <Calendar
          localizer={localizer}
          views={['week', 'agenda']}
          view={currentView}
          events={events}
          onSelectEvent= {this.handleEventSelect}
          components={{
            toolbar: (props) => (
            <CustomToolbar {...props}
              currentView={currentView}
              setCurrentView={this.handleViewChange}
              isModalOpen={isModalOpen}
              setIsModalOpen={(value) => this.setState({ isModalOpen: value, selectedEvent: null })}/>
            ),
        }}
          messages={{
            noEventsInRange:'Não há eventos nesta faixa de datas.',
            date: 'Data',
            time: 'Hora',
            event: 'Evento',}}
        />
        {isModalOpen && (
          <FormsEvent
            isModalOpen={isModalOpen}
            setIsModalOpen={(value) => this.setState({ isModalOpen: value, selectedEvent: null })}
            selectedEvent={selectedEvent}
            setSelectedEvent={(event) => this.setState({ selectedEvent: event })}
          /> 
        )}
      </div>
    );
  }
}

export default MyCalendar;



