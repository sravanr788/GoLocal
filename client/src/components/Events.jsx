import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Events() {
  const {
    filteredEvents,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    loading,
    error,
  } = useContext(EventsContext);

  return (
    <motion.main
      className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12 transform-none">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Amazing
          <span className="text-blue-600 block">Local Events</span>
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Connect with your community and explore exciting events happening
          around you. From workshops to concerts, find your next adventure.
        </motion.p>
      </div>

      {/* Search Bar */}
      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative bg-white">
          <input
            type="text"
            placeholder="Search events by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            className="w-full p-4 pl-12 pr-10 text-gray-400 border shadow-xs placeholder-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="bg-white rounded-lg shadow-md mb-6 text-black"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button className="w-full md:hidden flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <i className="ri-filter-line mr-2 text-blue-600"></i>
            <span className="font-medium text-gray-900">Filters</span>
          </div>
          <i className="ri-arrow-down-s-line text-gray-400"></i>
        </button>

        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <i className="ri-filter-line mr-2 text-blue-600"></i>Filters
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <div className="relative">
                  <select
                    className="w-full p-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer"
                    value={filters.type}
                    onChange={(e) =>
                      setFilters({ ...filters, type: e.target.value })
                    }
                  >
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
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
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
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
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
            </div>
          </div>
        </div>
      </motion.div>

      {/* Events Listing */}
      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
            <p>Error loading events: {error}</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {filteredEvents.map((event) => (
              <Link to={`/event/${event.id}`} key={event.id} className="block">
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <EventCard event={event} />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center p-8 bg-gray-50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
              No events found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    type: "",
                    location: "",
                    startDate: "",
                  });
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Create Event Call to Action */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Create your own event and bring your community together. It's easy and
          free!
        </p>
        <Link to="/create">
          <motion.button
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="ri-add-circle-line mr-2"></i>Create Event
          </motion.button>
        </Link>
      </motion.div>
    </motion.main>
  );
}
