import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Clothing',
    emoji: '👶',
    description: 'Soft & comfortable wear',
    color: 'from-pink-400 to-pink-600'
  },
  {
    name: 'Diapers & Care',
    emoji: '🩱',
    description: 'Essential care products',
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'Feeding',
    emoji: '🍼',
    description: 'Bottles, bibs & more',
    color: 'from-green-400 to-green-600'
  },
  {
    name: 'Toys',
    emoji: '🧸',
    description: 'Fun & educational',
    color: 'from-purple-400 to-purple-600'
  },
  {
    name: 'Nursery',
    emoji: '🎵',
    description: 'Comfort & décor',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    name: 'Bath',
    emoji: '🛁',
    description: 'Bath time essentials',
    color: 'from-cyan-400 to-cyan-600'
  }
];

export function CategoryGrid() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our carefully curated categories to find exactly what you need for your baby
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer hover:shadow-xl transition-shadow duration-300 h-full"
                onClick={scrollToProducts}
              >
                <CardHeader className="text-center pb-3">
                  <motion.div
                    className={`text-5xl mb-2 bg-gradient-to-br ${category.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="filter drop-shadow-lg">{category.emoji}</span>
                  </motion.div>
                  <CardTitle className="text-base md:text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-xs md:text-sm">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
