import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-teal-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <a href="/" className="inline-flex items-center space-x-2 mb-6">
              <Plane className="w-10 h-10 text-orange-400" style={{ transform: 'rotate(45deg)' }} />
              <span className="text-2xl font-bold">Fidex</span>
            </a>
            <div className="space-y-2 text-gray-300">
              <p>
                <a href="mailto:fidexcourier.support@gmail.com" className="hover:text-orange-400 transition-colors duration-200">
                  fidexcourier.support@gmail.com
                </a>
              </p>
              <p>
                885 E. Fawn St.<br />
                Indio, CA 92201
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/logistics" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Logistics
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Air Freight
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Ocean Freight
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Road Transport
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors duration-200">
                  Warehousing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-6">Subscribe Newsletter</h3>
            <form action="#" className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full px-4 py-2 bg-teal-700 border border-teal-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-700 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Fidex Courier. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
