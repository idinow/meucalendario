
import moment from 'moment';
import React, { Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/pt-br'; // Importe a localização do Moment.js para o idioma português
import logo from '../../assets/calendarLogo.png'
import './calendar.scss';
import CustomToolbar from './toolbar';
import {fetchEvents} from './events';
import FormsEvent from './formsEvent';
import { FaSearch } from 'react-icons/fa';


const localizer = momentLocalizer(moment);


class MyCalendar extends Component {

  constructor(props){
    super(props);

    this.state = {
      isModalOpen: false,
      events: [],
      selectedEvent: null,
      currentView: 'week',
      searchQuery: '',
      foundEvents: [],
    }
  }

  componentDidMount() {
    this.unsubscribe = fetchEvents(this.updateEvents);
  }
  componentWillUnmount() {
    if(this.unsubscribe){
    this.unsubscribe();
    }
  }

  updateEvents = (events) => {
    this.setState({ events });
  };

  handleEventSelect = (event) => {
    this.setState({ isModalOpen: true, selectedEvent: event });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false, selectedEvent: null });
  
  };

  handleViewChange = (view) => {
    this.setState({ currentView: view });
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
  
    // Lógica de busca de eventos aqui
    const { searchQuery, events } = this.state;
    const foundEvents= events.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Faça o que desejar com os eventos encontrados
    this.setState({foundEvents, showModal:true, searchQuery: '' });
  };


  render() {
    const { isModalOpen, events, selectedEvent, currentView, searchQuery, foundEvents} = this.state;


    return (
      <div style={{ height: 'calc(80vh)' }}>
        <img src={logo} alt='' style={{ width: '75px', height: 'auto' }}/>
        <div className='search-bar'>
          <form onSubmit={this.handleSearchSubmit}>
            <input
            type='text'
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder='Digite um evento...'
            />
            <button type='submit'>
              <FaSearch />
            </button>
          </form>
        </div> 
        <div className='encontrarEventos'>
          {foundEvents.length > 0 && (
            <div>
              <h3>Eventos encontrados:</h3>
              <ul>
                {foundEvents.map((event) => (
                  <li key={event.id}>
                    {event.title} - {event.start.toLocaleDateString()}
                    <button onClick={() => this.handleEventSelect(event)}>
                      Acessar o Evento
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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
          /> 
        )}
      </div>
    );
  }
}

export default MyCalendar;



