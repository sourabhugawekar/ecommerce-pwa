import { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X, User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { NapModeToggle } from '@/components/NapModeToggle';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  cartItemCount: number;
}

export function Header({ cartItemCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              👶
            </motion.span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              BabyBliss
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {['home', 'categories', 'products', 'testimonials'].map((section, index) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-medium hover:text-primary transition-colors capitalize"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {section === 'products' ? 'Best Sellers' : section}
              </motion.button>
            ))}
          </nav>

          {/* Cart Icon & User Menu */}
          <div className="flex items-center gap-4">
            <NapModeToggle />
            
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <Badge
                          variant="destructive"
                          className="h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {cartItemCount}
                        </Badge>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="h-5 w-5" />
                </Button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
                    >
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link to="/baby-dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        <User className="h-4 w-4 inline mr-2" />
                        Baby Dashboard
                      </Link>
                      <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        <Settings className="h-4 w-4 inline mr-2" />
                        Baby Profile
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          <Settings className="h-4 w-4 inline mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                      >
                        <LogOut className="h-4 w-4 inline mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="md:hidden py-4 space-y-2 border-t"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {['home', 'categories', 'products', 'testimonials'].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors capitalize"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {section === 'products' ? 'Best Sellers' : section}
                </motion.button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
