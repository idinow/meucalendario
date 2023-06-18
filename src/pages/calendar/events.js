import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../services/firebaseConnection';


export const fetchEvents = (updatedEvents) => {
  const eventsCollection = collection(db, "event");
  const unsubscribe = onSnapshot(eventsCollection, (querySnapshot) => {
    const fetchedEvents = [];

    querySnapshot.forEach((doc) => {
      const eventData = doc.data();
      const event = {
        id: doc.id,
        title: eventData.title,
        start: new Date(eventData.startDate + "T" + eventData.startTime),
        end: new Date(eventData.endDate + "T" + eventData.endTime),
        description: eventData.description,
      };

      fetchedEvents.push(event);
    });

    updatedEvents(fetchedEvents);
  });

  return unsubscribe;
};

