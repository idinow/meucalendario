import { collection, getDocs } from 'firebase/firestore';
import db from '../../services/firebaseConnection';

export const fetchEvents = async () => {
  const querySnapshot = await getDocs(collection(db, "event"));
  const fetchedEvents = [];

  querySnapshot.forEach((doc) => {
    const eventData = doc.data();
    const event = {
      title: eventData.title,
      start: new Date(eventData.startDate + "T" + eventData.startTime),
      end: new Date(eventData.endDate + "T" + eventData.endTime),
      description: eventData.description,
    };

    fetchedEvents.push(event);
  });

  return fetchedEvents;
};
