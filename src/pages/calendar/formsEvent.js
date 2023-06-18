import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import db from '../../services/firebaseConnection';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { fetchEvents } from './events';

const FormsEvent = ({ isModalOpen, setIsModalOpen, selectedEvent}) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [idEvent, setIdEvent] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (selectedEvent) {
      setIdEvent(selectedEvent.id);
      setTitle(selectedEvent.title);
      setStartDate(moment(selectedEvent.start).format('YYYY-MM-DD'));
      setStartTime(moment(selectedEvent.start).format('HH:mm'));
      setEndDate(moment(selectedEvent.end).format('YYYY-MM-DD'));
      setEndTime(moment(selectedEvent.end).format('HH:mm'));
      setDescription(selectedEvent.description);
    } else {
      setIdEvent(null);
      setTitle('');
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');
      setDescription('');
    }
  }, [selectedEvent]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'event'), (snapshot) => {
      const updatedEvents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Atualiza a lista de eventos com os dados mais recentes
      setEvents(updatedEvents);
    });

    return () => {
      unsubscribe(); // Cancela o listener quando o componente for desmontado
    };
  }, []);

  async function handleAdd() {
    let eventData = {
      title: title,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      description: description
    };
  
    if (idEvent !== null) {
      const eventRef = doc(db, "event", idEvent);
      await updateDoc(eventRef, eventData)
    } else {
      await addDoc(collection(db, "event"), eventData)
      console.log("Novo Evento")
    }
    setIsModalOpen(false);
  }
  async function handleDelete() {
    setShowDeleteConfirmation(true)
  }

  async function confirmDelete() {
    setShowDeleteConfirmation(false);
    if (idEvent !== null) {
      const eventRef = doc(db, "event", idEvent);
      await deleteDoc(eventRef);
      setIsModalOpen(false);
      alert('Evento excluído com sucesso!');
      fetchEvents(setEvents);
    }
  }

  function cancelDelete() {
    setShowDeleteConfirmation(false);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
    >
      <h2>{selectedEvent ? 'Editar Evento' : 'Criar Evento'}</h2>
      <form>
        <label>Título</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className="form-row">
          <div className="form-column">
            <label>Data Início:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-column">
            <label>Hora Início:</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label>Data Fim:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
          </div>
          <div className="form-column">
            <label>Hora Fim:</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
          </div>
        </div>
        
        <label>Descrição:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </form>
      <button onClick={handleAdd}>{selectedEvent ? 'Atualizar': 'Salvar'}</button>
      {selectedEvent && (
        <button onClick={handleDelete} style ={{marginLeft:'10px'}}>Excluir</button>
      )}  
      <button onClick={() => setIsModalOpen(false) }>Cancelar</button>
      {showDeleteConfirmation && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h2>Confirmar exclusão</h2>
            <p>Você tem certeza que deseja excluir o evento "{selectedEvent.title}"?</p>
            <div>
              <button onClick={confirmDelete}>Sim</button>
              <button onClick={cancelDelete}>Não</button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default FormsEvent;
