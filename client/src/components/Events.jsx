import { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12 transform-none">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-8">
          Discover Amazing
          <span className="text-blue-600 block">Local Events</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-8">
          Connect with your community and explore exciting events happening
          around you. From workshops to concerts, find your next adventure.
        </p>
      </div>
      // Filters
      <div className="bg-white rounded-lg shadow-md mb-6 text-black">
        <button className="w-full md:hidden flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <i className="ri-filter-line mr-2 text-blue-600"></i>
            <span className="font-medium text-gray-900">Filters</span>
          </div>
          <i className="ri-arrow-down-s-line text-gray-400"></i>
        </button>
        <div className="hidden md:block p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <i className="ri-filter-line mr-2 text-blue-600"></i>Filters
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <div className="relative">
                  <select className="w-full p-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer">
                    <option value="">All Types</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Other">Other</option>
                  </select>
                  <i className="ri-arrow-down-s-line float-right absolute right-2 bottom-1/8 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <input
                    placeholder="City or address..."
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    type="text"
                    defaultValue=""
                  />
                  <i className="ri-map-pin-line float-left absolute left-2 bottom-1/8 text-gray-400 text-sm"></i>
                </div>
              </div>
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    id="startDate"
                    type="date"
                    defaultValue=""
                    className="w-full pl-8 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  {/* Left icon */}
                  <i className="ri-calendar-line absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                  {/* Right icon (clickable trigger) */}
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("startDate")?.showPicker?.()
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <i className="ri-calendar-fill"></i>
                  </button>
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <input
                    id="endDate"
                    type="date"
                    defaultValue=""
                    className="w-full pl-8 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  {/* Left icon */}
                  <i className="ri-calendar-line absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                  {/* Right icon (clickable trigger) */}
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("endDate")?.showPicker?.()
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <i className="ri-calendar-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // Events Listing
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      // Create Event Call to Action
      <div
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Create your own event and bring your community together. It's easy and
          free!
        </p>
        <button
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          tabindex="0"
        >
          <i className="ri-add-circle-line mr-2"></i>Create Event
        </button>
      </div>
    </main>
  );
}
