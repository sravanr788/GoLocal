import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { EventsContext } from '../context/EventsContext';

// Reusable components
const HeroSection = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
    style={{ backgroundImage: "url('/background-noise.jpg')" }}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 text-center text-white px-4">
      <h1 className="text-5xl font-bold mb-4">Discover Local Events</h1>
      <p className="text-xl mb-8">Connect with your community and explore exciting events near you</p>
      <Link to="/events" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
        Browse Events
      </Link>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-6 rounded-lg shadow-md"
  >
    <div className="text-emerald-500 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const EventPreview = ({ event }) => (
  <motion.div 
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-lg overflow-hidden shadow-md"
  >
    <img 
      src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"}
      alt={event.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
      <p className="text-gray-700 text-sm mb-2">{event.date}</p>
      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
      <Link to={`/event/${event.id}`} className="text-emerald-500 font-medium hover:text-emerald-700">
        View Details →
      </Link>
    </div>
  </motion.div>
);

export default function Home() {
  const { events } = useContext(EventsContext);
  
  // Get featured events (limit to 3)
  const featuredEvents = events?.slice(0, 3) || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why GoLocal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<i className="fas fa-map-marker-alt">📍</i>}
              title="Discover Nearby"
              description="Find events happening right in your neighborhood and support local initiatives."
            />
            <FeatureCard 
              icon={<i className="fas fa-users">👥</i>}
              title="Build Community"
              description="Connect with like-minded individuals and build meaningful relationships."
            />
            <FeatureCard 
              icon={<i className="fas fa-calendar-alt">📅</i>}
              title="Stay Updated"
              description="Never miss out on exciting events with our timely notifications and reminders."
            />
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Link to="/events" className="text-emerald-500 hover:text-emerald-700 font-medium">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.length > 0 ? (
              featuredEvents.map(event => (
                <EventPreview key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No events available. Check back soon!</p>
                <Link to="/create" className="mt-4 inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg">
                  Create an Event
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-emerald-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to host your own event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Share your passion with the community and create unforgettable experiences.</p>
          <Link to="/create" className="bg-white text-emerald-500 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">
            Create Event
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="flex flex-col items-center bg-zinc-800 text-center text-white">
        <div className="container p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="mb-6 md:mb-0">
              <h5 className="mb-4 font-bold">GoLocal</h5>
              <p className="text-gray-300">
                Connecting communities through local events and experiences.
              </p>
            </div>
            
            <div className="mb-6 md:mb-0">
              <h5 className="mb-4 font-bold">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-300 hover:text-white transition">Events</Link>
                </li>
                <li>
                  <Link to="/create" className="text-gray-300 hover:text-white transition">Create Event</Link>
                </li>
              </ul>
            </div>
            
            <div className="mb-6 md:mb-0">
              <h5 className="mb-4 font-bold">Contact</h5>
              <p className="text-gray-300">
                <i className="fas fa-envelope mr-2">✉️</i> info@golocal.com
              </p>
              <p className="text-gray-300 mt-2">
                <i className="fas fa-phone mr-2">📞</i> (123) 456-7890
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-zinc-900 p-4 text-center">
          © 2025 Copyright: 
          <span className="font-semibold ml-1">GoLocal</span>
        </div>
      </footer>
    </motion.div>
  );
}
