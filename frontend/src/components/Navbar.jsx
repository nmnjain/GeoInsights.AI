import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Zap, 
  Globe,
  Mic, 
  Brain, 
  Code, 
  MessageCircle, 
  Trophy, 
  User,
  ChevronDown
} from 'lucide-react'

const Navbar = () => {
  
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home', icon: Zap },
    { path: '/earth', label: 'Earth Analyst', icon: Globe },
    { path: '/representation', label: 'Services', icon: Mic },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`mt-4 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 shadow-2xl shadow-purple-500/10' 
          : 'backdrop-blur-md bg-slate-800/40 border border-slate-600/30 shadow-xl shadow-cyan-500/5'
      } rounded-full w-fit`}>
        <div className="flex items-center justify-between h-14 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`w-8 h-8 bg-gradient-to-br transition-all duration-300 ${
              isScrolled 
                ? 'from-purple-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-purple-500/30' 
                : 'from-cyan-500 via-blue-500 to-indigo-500 shadow-lg shadow-cyan-500/30'
            } rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12`}>
              <Zap className="w-4 h-4 text-white drop-shadow" />
            </div>
            <span className={`text-lg font-bold tracking-wide transition-colors duration-300 ${
              isScrolled 
                ? 'text-purple-300' 
                : 'text-cyan-300'
            }`}>
              Geoinsights.AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 mx-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(path)
                    ? isScrolled
                      ? 'text-white bg-gradient-to-r from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30'
                      : 'text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* User dropdown */}
            

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-all duration-300 border ${
                isScrolled
                  ? 'bg-slate-800/70 hover:bg-slate-700/70 border-slate-600/50'
                  : 'bg-slate-700/50 hover:bg-slate-600/50 border-slate-500/30'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-slate-200" />
              ) : (
                <Menu className="w-5 h-5 text-slate-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-700/50 py-4">
            <div className="flex flex-col space-y-1 px-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(path)
                      ? isScrolled
                        ? 'text-white bg-gradient-to-r from-purple-500 to-violet-500 shadow-lg shadow-purple-500/20'
                        : 'text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar