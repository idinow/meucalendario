import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { collection, addDoc } from "firebase/firestore";
import db from '../../services/firebaseConnection';
import moment from 'moment';

const FormsEvent = ({ isModalOpen, setIsModalOpen, selectedEvent}) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setStartDate(moment(selectedEvent.start).format('YYYY-MM-DD'));
      setStartTime(moment(selectedEvent.start).format('HH:mm'));
      setEndDate(moment(selectedEvent.end).format('YYYY-MM-DD'));
      setEndTime(moment(selectedEvent.end).format('HH:mm'));
      setDescription(selectedEvent.description);
    } else {
      setTitle('');
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');
      setDescription('');
    }
  }, [selectedEvent]);

  async function handleAdd() {
    await addDoc(collection(db, "event"), {
      title: title,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      description: description
    })
    .then(() => {
    console.log("Dados registrados no banco" );
    setTitle('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setDescription('');
    
    })
    .catch((error) => {
    console.log("Gerou um erro ao adicionar" + error);
    });

    setIsModalOpen(false);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
    >
      <h2>Criar evento</h2>
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
      <button onClick={handleAdd}>Salvar</button>
      <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
    </Modal>
  )
};

export default FormsEvent;