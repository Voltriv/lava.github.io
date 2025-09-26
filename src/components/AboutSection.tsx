import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Heart, MapPin, Calendar } from 'lucide-react';

export function AboutSection() {
  const timelineEvents = [
    {
      date: 'March 2020',
      title: 'First Met',
      description: 'Bumped into each other at a coffee shop in downtown',
      icon: '☕',
    },
    {
      date: 'April 2020',
      title: 'First Date',
      description: 'Dinner at that little Italian place we still love',
      icon: '🍝',
    },
    {
      date: 'July 2020',
      title: 'Made it Official',
      description: 'Under the stars at Central Park',
      icon: '⭐',
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">About Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every love story is beautiful, but ours is our favorite. Here's how it all began and where we're headed.
          </p>
        </div>

        {/* Mini Bios */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-6">
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/api/placeholder/150/150" alt="Elijah " />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl mb-2">Elijah</h3>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Dagupan, PH</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Just an Normal College Student.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Gamer</Badge>
                  <Badge variant="secondary">Biker</Badge>
                  <Badge variant="secondary">Athlete</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/api/placeholder/150/150" alt="Annielyn" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl mb-2">Annielyn</h3>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Dagupan, PH</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  She's a singer, a beautiful soul, and an academic achiever.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Singer</Badge>
                  <Badge variant="secondary">Beautiful</Badge>
                  <Badge variant="secondary">Academic Achiever</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How We Met */}
        <Card className="mb-16 p-8">
          <div className="text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl mb-4">How We Met</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We met at Food market in Dagupan City, a serendipitous encounter that sparked an instant connection.
              From that moment on, our journey together began, filled with laughter, shared dreams, and countless 
              unforgettable memories. Every day since has been a new chapter in our love story, and we can't wait to see
              where the next pages take us.
            </p>
          </div>
        </Card>

        {/* Timeline of Firsts */}
        <div>
          <h3 className="text-2xl text-center mb-8">Our Timeline of Firsts</h3>
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">{event.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  <h4 className="font-medium mb-1">{event.title}</h4>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}