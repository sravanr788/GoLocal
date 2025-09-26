import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { EventsContext } from "../context/EventsContext";
import { motion } from "framer-motion";

export default function EventDetails() {
  const { eventId } = useParams();
  const { getEventById, rsvpToEvent, loading, error } =
    useContext(EventsContext);
  const [event, setEvent] = useState(null);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [eventImage, setEventImage] = useState("");

  useEffect(() => {
    if (eventId) {
      const fetchedEvent = getEventById(eventId);
      if (fetchedEvent) {
        setEvent(fetchedEvent);
      }
    }
  }, [eventId, getEventById]);

  // Load event image based on event type or keywords
  useEffect(() => {
    const loadEventImage = async () => {
      if (!event) return;

      if (event.image) {
        setEventImage(event.image);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}event-images.json`);
        const imageData = await response.json();

        if (event.type && imageData.eventTypes[event.type]) {
          const typeImages = imageData.eventTypes[event.type];
          setEventImage(
            typeImages[Math.floor(Math.random() * typeImages.length)]
          );
          return;
        }

        const keywords = Object.keys(imageData.keywords);
        for (const keyword of keywords) {
          if (
            (event.title &&
              event.title.toLowerCase().includes(keyword.toLowerCase())) ||
            (event.description &&
              event.description.toLowerCase().includes(keyword.toLowerCase()))
          ) {
            const keywordImages = imageData.keywords[keyword];
            setEventImage(
              keywordImages[Math.floor(Math.random() * keywordImages.length)]
            );
            return;
          }
        }

        const defaultImages = imageData.keywords.default;
        setEventImage(
          defaultImages[Math.floor(Math.random() * defaultImages.length)]
        );
      } catch (error) {
        console.error("Error loading event images:", error);
        setEventImage(
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&h=900&fit=crop"
        );
      }
    };

    if (event) {
      loadEventImage();
    }
  }, [event]);

  const handleRsvp = () => {
    setRsvpLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      rsvpToEvent(eventId);
      setRsvpLoading(false);
      setShowRsvpModal(false);
      setRsvpSuccess(true);

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setRsvpSuccess(false);
      }, 3000);
    }, 800);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading event details
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Event not found
          </h3>
          <p className="mt-1 text-gray-500">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero section with parallax effect */}
      <motion.div
        className="relative h-96 bg-gray-900 overflow-hidden"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0">
          <img
            src={
              eventImage ||
              event.image ||
              "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&h=900&fit=crop"
            }
            alt={event.title}
            className="w-full h-full object-cover"
            style={{
              objectPosition: "center 30%",
              transform: "scale(1.1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex flex-col justify-end">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              {event.type}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Event details */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
        {/* Left decorative element */}
        <div className="hidden md:block absolute left-0 top-1/4 h-64 w-24">
          <svg
            className="w-full h-full text-blue-400"
            viewBox="0 0 100 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="30" r="15" fill="currentColor" opacity="0.6" />
            <circle cx="70" cy="70" r="10" fill="currentColor" opacity="0.4" />
            <path
              d="M30 100 Q 50 80, 70 100 T 100 120"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M10 150 Q 30 130, 50 150 T 80 170"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
            <circle cx="40" cy="180" r="12" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Right decorative element */}
        <div className="hidden md:block absolute right-0 top-1/3 h-64 w-24">
          <svg
            className="w-full h-full text-blue-400"
            viewBox="0 0 100 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="20" r="12" fill="currentColor" opacity="0.5" />
            <path
              d="M20 40 L 40 60 L 60 40 L 80 60"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <rect
              x="30"
              y="80"
              width="40"
              height="40"
              rx="5"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M20 140 Q 50 120, 80 140"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              opacity="0.7"
            />
            <circle cx="30" cy="170" r="15" fill="currentColor" opacity="0.4" />
            <circle cx="70" cy="180" r="10" fill="currentColor" opacity="0.5" />
          </svg>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Main content */}
          <motion.div
            className=""
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About this event
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {event.description}
              </p>

              {/* Host information */}
              <div className="mt-8 flex items-center justify-center">
                <img
                  src={
                    event.hostImage ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  }
                  alt={event.host}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Hosted by {event.host}
                  </h3>
                  <p className="text-gray-500 float-left">Event Organizer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="w-md md:w-lg mt-4 mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm sticky top-8">
              <div className="mb-6 place-items-center text-center">
                <h3 className="text-lg md:text-2xl font-medium font-mono text-blue-800 mb-2">
                  When and where
                </h3>
                <div className="flex mt-4 mr-4">
                  {/* <div className="flex-shrink-0"> */}
                  {/* </div> */}
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium flex gap-2">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {event.date}
                    </p>
                    <p className="text-gray-500">
                      {event.time || "6:00 PM - 9:00 PM"}
                    </p>
                  </div>
                </div>
                <div className="flex mt-4 mr-4">
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium flex gap-2">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </p>
                    <p className="text-gray-500">
                      {event.address || "123 Main St, City"}
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => setShowRsvpModal(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md cursor-pointer font-medium hover:bg-blue-700 focus:outline-none"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                RSVP to this event
              </motion.button>

              <div className="mt-4 text-center text-sm text-gray-500">
                {event.attendees || 42} people are attending
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to events button */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="mr-2 -ml-1 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to events
        </Link>
      </div>

      {showRsvpModal && (
        <div className="fixed inset-0 z-40 overflow-y-auto">
          {/* Semi-transparent overlay with blur effect */}
          <div
            className="fixed inset-0 bg-opacity-75 backdrop-blur-sm"
            onClick={() => setShowRsvpModal(false)}
            aria-hidden="true"
          ></div>

          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <motion.div
              className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      RSVP to {event.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to RSVP to this event? You'll
                        receive updates and reminders as the event approaches.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center cursor-pointer rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleRsvp}
                  disabled={rsvpLoading}
                >
                  {rsvpLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Confirm RSVP"
                  )}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border cursor-pointer border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowRsvpModal(false)}
                  disabled={rsvpLoading}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      {/* Success Alert */}
      {rsvpSuccess && (
        <motion.div
          className="fixed bottom-4 right-4 bg-green-50 p-4 rounded-md shadow-lg border-l-4 border-green-400 max-w-md"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                RSVP confirmed! You're all set for {event.title}.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
