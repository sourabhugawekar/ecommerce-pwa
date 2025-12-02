import { useState, Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene3D';

// Error Boundary for 3D Canvas
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('3D Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Silently fail for 3D background
    }
    return this.props.children;
  }
}

export function Hero() {
  const [notificationStatus, setNotificationStatus] = useState<string>('');

  const handleSendNotification = async () => {
    try {
      // Check if notifications are supported
      if (!('Notification' in window)) {
        setNotificationStatus('Notifications not supported in this browser');
        return;
      }

      // Request permission
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        // Get service worker registration
        const registration = await navigator.serviceWorker.getRegistration();
        
        if (registration) {
          // Show notification via service worker
          await registration.showNotification('BabyBliss – Special Offer! 🎉', {
            body: 'Get 20% off on all baby products today! Shop now for the best deals.',
            icon: '/icons/icon-192.png',
            badge: '/icons/icon-192.png',
            tag: 'babybliss-demo',
            requireInteraction: false
          });
          setNotificationStatus('Notification sent successfully! ✅');
        } else {
          setNotificationStatus('Service worker not registered yet. Please refresh.');
        }
      } else if (permission === 'denied') {
        setNotificationStatus('Notification permission denied');
      } else {
        setNotificationStatus('Notification permission dismissed');
      }
    } catch (error) {
      console.error('Notification error:', error);
      setNotificationStatus('Failed to send notification');
    }

    // Clear status after 3 seconds
    setTimeout(() => setNotificationStatus(''), 3000);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 md:py-28"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <ErrorBoundary>
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <Scene />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-10 left-10 text-6xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🍼
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 right-10 text-6xl"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🧸
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/4 text-4xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ⭐
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/4 text-4xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🎈
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main heading */}
          <motion.h2
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome to BabyBliss
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <p className="text-xl md:text-2xl text-gray-700">
              Your one-stop shop for premium baby products
            </p>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </motion.div>

          <motion.p
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Discover the finest collection of baby clothing, care essentials, toys, and more. 
            Everything your little one needs, delivered with love. 💝
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={scrollToProducts}
                className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ShoppingBag className="h-5 w-5" />
                Shop Best Sellers
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleSendNotification}
                className="w-full sm:w-auto gap-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Bell className="h-5 w-5" />
                Send Notification
              </Button>
            </motion.div>
          </motion.div>

          {/* Notification Status */}
          {notificationStatus && (
            <motion.div
              className="mt-4 p-3 bg-white/80 backdrop-blur rounded-lg border border-pink-200 text-sm font-medium shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {notificationStatus}
            </motion.div>
          )}

          {/* Demo Notice */}
          <motion.p
            className="text-xs text-gray-500 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            🎨 This is a demo Progressive Web App (PWA) for assessment purposes only
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
