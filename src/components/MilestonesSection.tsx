import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Heart, Star, Gift, Home, Sparkles, Cake, PartyPopper } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { ParallaxSection } from './ParallaxSection';

export function MilestonesSection() {
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');

  const birthdayHighlight = {
    dateLabel: 'December 14, 2025',
    location: 'Dagupan Boardwalk',
    theme: 'Celestial Bloom Evening',
    promise: 'A slow, love-soaked celebration with music, letters, and dessert under fairy lights.',
  };

  const birthdayMoments = [
    {
      title: 'Wish Jar Ceremony',
      detail: '24 grateful notes—one for every hour that you will glow on your day.',
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: 'Birthday Cake & Serenade',
      detail: 'Homemade cake + my acoustic cover of your favorite song.',
      icon: <Cake className="h-5 w-5" />,
    },
    {
      title: 'Midnight Toast',
      detail: 'Polaroid selfie + sparkling juice as we seal a new year of us.',
      icon: <PartyPopper className="h-5 w-5" />,
    },
  ];

  const birthdayTimeline = [
    { time: '6:00 AM', plan: 'Sunrise letter at Tondaligan Beach' },
    { time: '3:00 PM', plan: 'Gallery date & favorite merienda' },
    { time: '8:00 PM', plan: 'Celestial picnic + candle-lit wishes' },
  ];

  const milestones = [
    {
      id: 0,
      date: '2025-12-14',
      title: 'Annielyn\'s Birthday Celebration',
      location: 'Dagupan Boardwalk',
      description: 'A candle-lit picnic with polaroids, music, and wishes for the year ahead.',
      category: 'celebration',
      icon: <Gift className="w-5 h-5" />,
      color: 'bg-fuchsia-500'
    },
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
      travel: 'bg-purple-100 text-purple-800',
      celebration: 'bg-fuchsia-100 text-fuchsia-800'
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
          className="relative mb-16 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-rose-500/20 to-accent/30 p-8 shadow-[0_25px_65px_-35px_rgba(244,114,182,0.9)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-20">
            {[...Array(16)].map((_, index) => (
              <motion.span
                key={index}
                className="absolute text-rose-300"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 18 + 8}px`,
                }}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random(),
                }}
              >
                *
              </motion.span>
            ))}
          </div>

          <div className="relative z-10 grid gap-10 md:grid-cols-[1.4fr,1fr] items-start text-slate-900">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-700">
                <Sparkles className="h-4 w-4 text-rose-500" />
                Birthday Spotlight
              </div>
              <h3 className="mt-5 text-3xl font-semibold md:text-4xl">
                {birthdayHighlight.theme}
              </h3>
              <p className="mt-3 max-w-xl text-slate-700">
                {birthdayHighlight.promise}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="rounded-2xl border border-rose-100 bg-white/90 px-4 py-3 shadow-inner">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Date</p>
                  <p className="text-lg font-medium">{birthdayHighlight.dateLabel}</p>
                </div>
                <div className="rounded-2xl border border-rose-100 bg-white/90 px-4 py-3 shadow-inner">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Location</p>
                  <p className="text-lg font-medium">{birthdayHighlight.location}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {birthdayMoments.map((moment) => (
                  <div
                    key={moment.title}
                    className="flex gap-3 rounded-2xl bg-white/90 p-3 shadow-sm border border-rose-100"
                  >
                    <div className="mt-1">{moment.icon}</div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">{moment.title}</p>
                      <p className="text-sm text-slate-600">{moment.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-rose-200 bg-white/80 p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Birthday itinerary</p>
              <h4 className="mt-2 text-2xl font-semibold text-slate-900">Promise timeline</h4>
              <div className="mt-6 space-y-4">
                {birthdayTimeline.map((item) => (
                  <div key={item.time} className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-rose-500">{item.time}</p>
                    </div>
                    <div className="h-full w-px bg-rose-200" />
                    <p className="flex-1 text-sm text-slate-600">{item.plan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

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
