import { useContext, useState } from "react";
import { EventsContext } from "../context/EventsContext";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

export default function AddEvent() {
  const {events, setEvents } = useContext(EventsContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    date: "",
    time: "",
    city: "",
    address: "",
    host: "",
    imageUrl: "",
    capacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      ...formData,
    };

    try {
      // This assumes you have a backend running on /api/events (Next.js API or Express)
      // const res = await fetch(
      //   "https://mp48c59a7ff018d5b37b.free.beeceptor.com/events",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(newEvent),
      //   }
      // );
      setEvents([...events, newEvent]);

      // if (!res.ok) throw new Error("Failed to save event");

      alert("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        type: "",
        date: "",
        time: "",
        city: "",
        address: "",
        host: "",
        imageUrl: "",
        capacity: "",
      });
      navigate('/')
    } catch (err) {
      console.error(err);
      alert("Error creating event.");
    }
  };

  return (
    <motion.main 
      className="max-w-2xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Event
        </h1>
        <p className="text-gray-600">
          Share your event with the community and bring people together
        </p>
      </motion.div>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-left text-black"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
              placeholder="Enter event title..."
              type="text"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none border-gray-300"
              placeholder="Describe your event..."
              required
            ></textarea>
          </div>

          {/* Event Type */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer border-gray-300"
              required
            >
              <option value="">Select event type</option>
              <option value="Workshop">Workshop</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Fitness">Fitness</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Meetup">Meetup</option>
              <option value="Other">Other</option>
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 bottom-1/25 -translate-y-1/2 text-gray-600 pointer-events-none"></i>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min="2025-09-26"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                  type="date"
                  id="date"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("date")?.showPicker?.()
                  }
                  className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <i className="ri-calendar-fill"></i>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="relative">
                <input
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                  type="time"
                  id="time"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("time")?.showPicker?.()
                  }
                  className="absolute right-4 cursor-pointer z-index-1 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <i className="ri-time-line"></i>
                </button>
              </div>
            </div>
          </div>

          {/* City & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                placeholder="Enter city..."
                type="text"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                placeholder="Enter address..."
                type="text"
                required
              />
            </div>
          </div>

          {/* Host */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Host Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              name="host"
              value={formData.host}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
              placeholder="Enter host name..."
              type="text"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Image URL
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
              placeholder="https://example.com/image.jpg"
              type="url"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Use a high-quality image URL (recommended: 800x400px)
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors cursor-pointer flex items-center justify-center"
            >
              <i className="ri-add-circle-line mr-2"></i>
              Create Event
            </button>
          </div>
        </form>
      </motion.div>
      
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Events
        </button>
      </motion.div>
    </motion.main>
  );
}
