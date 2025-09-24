import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Heart, Star, Gift, Home } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { ParallaxSection } from './ParallaxSection';

export function MilestonesSection() {
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');

  const milestones = [
    {
      id: 1,
      date: '2020-03-15',
      title: 'The Day We Met',
      location: 'Central Coffee, Downtown',
      description: 'A chance encounter that changed everything. Who knew spilled coffee could be so romantic?',
      category: 'first',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-red-500'
    },
    {
      id: 2,
      date: '2020-04-20',
      title: 'First Official Date',
      location: 'Mama Mia\'s Italian Restaurant',
      description: 'Nervous laughs, shared pasta, and the beginning of something beautiful.',
      category: 'first',
      icon: <Star className="w-5 h-5" />,
      color: 'bg-yellow-500'
    },
    {
      id: 3,
      date: '2020-07-10',
      title: 'Became Official',
      location: 'Central Park, Bow Bridge',
      description: 'Under the stars, we decided to make this official. Best decision ever!',
      category: 'relationship',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-pink-500'
    },
    {
      id: 4,
      date: '2020-12-23',
      title: 'First Christmas Together',
      location: 'Alex\'s Family Home',
      description: 'Meeting the family and starting new traditions together.',
      category: 'holiday',
      icon: <Gift className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      id: 5,
      date: '2021-03-10',
      title: 'Moved In Together',
      location: 'Oak Street Apartment',
      description: 'Our first shared space. Learning to live together and loving every minute of it.',
      category: 'home',
      icon: <Home className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      id: 6,
      date: '2021-08-15',
      title: 'First International Trip',
      location: 'Paris, France',
      description: 'Exploring the city of love together. Croissants, museums, and endless walks.',
      category: 'travel',
      icon: <MapPin className="w-5 h-5" />,
      color: 'bg-purple-500'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      first: 'bg-red-100 text-red-800',
      relationship: 'bg-pink-100 text-pink-800',
      holiday: 'bg-green-100 text-green-800',
      home: 'bg-blue-100 text-blue-800',
      travel: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="milestones" className="py-20 px-4 relative overflow-hidden">
      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-12 mb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl text-primary">
                <AnimatedCounter end={milestones.length} />
              </div>
              <p className="text-muted-foreground">Milestones</p>
            </motion.div>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl text-primary">
                <AnimatedCounter end={1826} />
              </div>
              <p className="text-muted-foreground">Days Together</p>
            </motion.div>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl text-primary">
                <AnimatedCounter end={12} />
              </div>
              <p className="text-muted-foreground">Adventures</p>
            </motion.div>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl text-primary">
                <AnimatedCounter end={1} suffix="M+" />
              </div>
              <p className="text-muted-foreground">Memories</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-4">Our Milestones</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Every relationship has its special moments. Here are the ones that shaped our journey together.
          </p>
          
          {/* View Toggle */}
          <div className="flex justify-center space-x-2">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              onClick={() => setViewMode('cards')}
              className="transition-all duration-300 hover:scale-105"
            >
              Card View
            </Button>
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'outline'}  
              onClick={() => setViewMode('timeline')}
              className="transition-all duration-300 hover:scale-105"
            >
              Timeline View
            </Button>
          </div>
        </motion.div>

        {viewMode === 'cards' ? (
          /* Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6 relative">
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    
                    <div className="flex items-start space-x-4 relative z-10">
                      <motion.div 
                        className={`p-3 rounded-full ${milestone.color} text-white flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {milestone.icon}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {formatDate(milestone.date)}
                          </span>
                        </div>
                        <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                          {milestone.title}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {milestone.location}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                          {milestone.description}
                        </p>
                        <Badge className={`${getCategoryColor(milestone.category)} transition-transform group-hover:scale-105`}>
                          {milestone.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Timeline View */
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Animated Timeline Line */}
              <motion.div 
                className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
                style={{ transformOrigin: "top" }}
              />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={milestone.id} 
                    className="relative flex items-start space-x-6"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Animated Timeline Dot */}
                    <motion.div 
                      className={`relative z-10 w-16 h-16 ${milestone.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                    >
                      {milestone.icon}
                      {/* Pulse effect */}
                      <motion.div
                        className={`absolute inset-0 ${milestone.color} rounded-full`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6 relative">
                          {/* Animated background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                          />
                          
                          <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                              <h3 className="font-medium group-hover:text-primary transition-colors">
                                {milestone.title}
                              </h3>
                              <div className="flex items-center space-x-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{formatDate(milestone.date)}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {milestone.location}
                              </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-3">
                              {milestone.description}
                            </p>
                            <Badge className={`${getCategoryColor(milestone.category)} transition-transform group-hover:scale-105`}>
                              {milestone.category}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}