import { createContext, useState, useEffect } from "react";  

export const EventsContext = createContext({
  events: [],
  filteredEvents: [],
  setEvents: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  filters: {},
  setFilters: () => {},
  loading: false,
  error: null,
  addEvent: () => {},
  getEventById: () => {},
  rsvpToEvent: () => {},
});

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    startDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events from API with improved error handling and local storage
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get events from localStorage first
        const localEvents = localStorage.getItem('goLocalEvents');
        if (localEvents) {
          const parsedEvents = JSON.parse(localEvents);
          setEvents(parsedEvents);
          setFilteredEvents(parsedEvents);
          setLoading(false);
          return;
        }
        
        // If no local events, fetch from JSON file
        const res = await fetch(`${import.meta.env.BASE_URL}events.json`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        
        if (!data || (Array.isArray(data) && !data.length)) {
          throw new Error("No events data available");
        }
        
        const eventsData = data.events || data;
        setEvents(eventsData);
        setFilteredEvents(eventsData);
        
        // Save to localStorage
        localStorage.setItem('goLocalEvents', JSON.stringify(eventsData));
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "An unexpected error occurred while fetching events");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Filter events based on search term and filters
  useEffect(() => {
    if (!events.length) return;
    
    let result = [...events];
    
    // Apply search term (prioritize title, then description)
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (event) => 
          event.title.toLowerCase().includes(lowerSearchTerm) || 
          (event.description && event.description.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    // Apply type filter
    if (filters.type) {
      result = result.filter((event) => event.type === filters.type);
    }
    
    // Apply location filter
    if (filters.location) {
      const lowerLocation = filters.location.toLowerCase();
      result = result.filter(
        (event) => event.location.toLowerCase().includes(lowerLocation)
      );
    }
    
    // Apply date filter
    if (filters.startDate) {
      const filterDate = new Date(filters.startDate);
      result = result.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= filterDate;
      });
    }
    
    setFilteredEvents(result);
  }, [events, searchTerm, filters]);

  // Add a new event
  const addEvent = (newEvent) => {
    // Generate a unique ID for the new event
    const newId = Math.max(...events.map(event => event.id), 0) + 1;
    const eventWithId = {
      ...newEvent,
      id: newId,
      attendees: 0
    };
    
    // Update both events and filteredEvents states
    const updatedEvents = [...events, eventWithId];
    setEvents(updatedEvents);
    setFilteredEvents(prevFilteredEvents => [...prevFilteredEvents, eventWithId]);
    
    // Save to localStorage
    localStorage.setItem('goLocalEvents', JSON.stringify(updatedEvents));
    
    return eventWithId;
  };

  // Get event by ID
  const getEventById = (id) => {
    try {
      const event = events.find((event) => event.id === id || event.id === parseInt(id));
      if (!event) {
        throw new Error(`Event with ID ${id} not found`);
      }
      return event;
    } catch (err) {
      console.error("Error getting event by ID:", err);
      setError(err.message);
      return null;
    }
  };

  // RSVP to an event
  const rsvpToEvent = (eventId) => {
    try {
      // In a real app, this would be an API call
      const updatedEvents = events.map((event) => {
        if (event.id === eventId || event.id === parseInt(eventId)) {
          return {
            ...event,
            attendees: (event.attendees || 0) + 1,
            isRsvped: true
          };
        }
        return event;
      });
      
      setEvents(updatedEvents);
      const updatedFilteredEvents = filteredEvents.map((event) => {
        if (event.id === eventId || event.id === parseInt(eventId)) {
          return {
            ...event,
            attendees: (event.attendees || 0) + 1,
            isRsvped: true
          };
        }
        return event;
      });
      setFilteredEvents(updatedFilteredEvents);
      
      // Save to localStorage
      localStorage.setItem('goLocalEvents', JSON.stringify(updatedEvents));
      
      return true;
    } catch (err) {
      console.error("Error RSVPing to event:", err);
      setError(err.message || "Failed to RSVP to event");
      return false;
    }
  };

//   // RSVP to an event
//   const rsvpToEvent = (eventId) => {
//     setEvents((prevEvents) =>
//       prevEvents.map((event) =>
//         event.id === eventId ? { ...event, rsvp: true } : event
//       )
//     );
//   };

  return (
    <EventsContext.Provider
      value={{
        events,
        filteredEvents,
        setEvents,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        loading,
        error,
        addEvent,
        getEventById,
        rsvpToEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;