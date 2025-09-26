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

  // Fetch events from API with improved error handling
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("/events.json");
        
        if (!res.ok) {
          throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        
        if (!data || (Array.isArray(data) && !data.length)) {
          throw new Error("No events data available");
        }
        
        setEvents(data.events || data);
        setFilteredEvents(data.events || data);
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
    setEvents((prevEvents) => [...prevEvents, newEvent]);
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
      setFilteredEvents(
        filteredEvents.map((event) => {
          if (event.id === eventId || event.id === parseInt(eventId)) {
            return {
              ...event,
              attendees: (event.attendees || 0) + 1,
              isRsvped: true
            };
          }
          return event;
        })
      );
      
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