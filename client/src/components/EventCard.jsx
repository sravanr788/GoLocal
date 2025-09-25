

const EventCard = ({ event }) => {
  return (
    <div className="font-Poppins">
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
        style={{ opacity: 1, transform: 'none', boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px' }}
      >
        <a
          className="block"
          href="/events/evt_002"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              alt="Tech Meetup: AI &; Machine Learning"
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&;h=400&;fit=crop"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {event.type}
              </span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <i className="ri-calendar-line mr-2"></i>
              <span>{event.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {event.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  alt="Rajesh Kumar"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&;h=150&;fit=crop&;crop=face"
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
        </a>
      </div>
    </div>
  );
};

export default EventCard;
