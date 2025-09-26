import { useEffect, useState } from "react";

const EventCard = ({ event }) => {
  const [eventImage, setEventImage] = useState("");

  useEffect(() => {
    const loadEventImage = async () => {
      try {
        const response = await fetch("/event-images.json");
        const imageData = await response.json();

        if (event.type && imageData.eventTypes[event.type]) {
          const typeImages = imageData.eventTypes[event.type];
          setEventImage(typeImages[Math.floor(Math.random() * typeImages.length)]);
          return;
        }

        const keywords = Object.keys(imageData.keywords);
        for (const keyword of keywords) {
          if (
            (event.title && event.title.toLowerCase().includes(keyword.toLowerCase())) ||
            (event.description && event.description.toLowerCase().includes(keyword.toLowerCase()))
          ) {
            const keywordImages = imageData.keywords[keyword];
            setEventImage(keywordImages[Math.floor(Math.random() * keywordImages.length)]);
            return;
          }
        }

        const defaultImages = imageData.keywords.default;
        setEventImage(defaultImages[Math.floor(Math.random() * defaultImages.length)]);
      } catch ( error ) {
        console.error("Error loading event images:", error);
        setEventImage("https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop");
      }
    };

    loadEventImage();
  }, [event]);

  const typeColors = {
    "Workshop": "bg-purple-100 text-purple-800 border-purple-300",
    "Conference": "bg-blue-100 text-blue-800 border-blue-300",
    "Meetup": "bg-green-100 text-green-800 border-green-300",
    "Concert": "bg-pink-100 text-pink-800 border-pink-300",
    "Exhibition": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "Party": "bg-red-100 text-red-800 border-red-300",
    "Sports": "bg-orange-100 text-orange-800 border-orange-300",
    "Networking": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "Seminar": "bg-teal-100 text-teal-800 border-teal-300",
    "Festival": "bg-amber-100 text-amber-800 border-amber-300"
  };

  const defaultTypeColor = "bg-gray-100 text-gray-800 border-gray-300";
  const typeColorClass = typeColors[event.type] || defaultTypeColor;

  return (
    <div className="font-Poppins h-full">
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-[340px] flex flex-col"
        style={{
          opacity: 1,
          transform: 'none',
          boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px'
        }}
      >
        <div className="block flex-grow flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img
              alt={event.title}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              src={eventImage || "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop"}
            />
            <div className="absolute top-3 left-0">
              <span className={`px-3 py-1 rounded-r-full text-xs font-medium border-l-4 ${typeColorClass}`}>
                {event.type}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-800 shadow-md">
                {event.date}
              </span>
            </div>
          </div>
          <div className="p-5 flex-grow flex flex-col overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow overflow-hidden">
              {event.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center">
                <img
                  alt={event.host}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                />
                <span className="text-sm text-gray-600 truncate">
                  {event.host}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <i className="ri-map-pin-line mr-2"></i>
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
