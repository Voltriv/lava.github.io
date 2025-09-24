import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';


export function GallerySection() {
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const albums = [
    { id: 'all', name: 'All Photos', count: 12 },
    { id: 'trips', name: 'Trips', count: 4 },
    { id: 'dates', name: 'Dates', count: 4 },
    { id: 'favorites', name: 'Favorites', count: 4 },
  ];

  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1609561026486-f5d4a3c4c660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldCUyMGJlYWNofGVufDF8fHx8MTc1ODU3MDUzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Beach sunset',
      category: 'trips',
      caption: 'Sunset at Malibu Beach - our first weekend getaway',
      credit: 'Photo by Alex'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1629401681628-a37c83eb57d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBtb3VudGFpbiUyMGhpa2luZyUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTg1NzIxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Mountain adventure',
      category: 'trips',
      caption: 'Hiking in the Rockies - challenging but so worth it!',
      credit: 'Photo by Sam'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1758373149828-29620aebfea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMGNhbmRsZWxpZ2h0JTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NTg1NzIxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Romantic dinner',
      category: 'dates',
      caption: 'Anniversary dinner at Le Bernardin',
      credit: 'Photo by Restaurant Staff'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1706306688486-33506b105452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBjb2ZmZWUlMjBkYXRlJTIwY2FmZXxlbnwxfHx8fDE3NTg1NzIxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Coffee date',
      category: 'dates',
      caption: 'Sunday morning coffee run - our weekly tradition',
      credit: 'Photo by Cafe Owner'
    },
    // Duplicating photos for demo purposes with different categories
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1609561026486-f5d4a3c4c660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldCUyMGJlYWNofGVufDF8fHx8MTc1ODU3MDUzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Beach sunset favorite',
      category: 'favorites',
      caption: 'One of our all-time favorite moments',
      credit: 'Photo by Alex'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1629401681628-a37c83eb57d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBtb3VudGFpbiUyMGhpa2luZyUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTg1NzIxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Mountain favorite',
      category: 'favorites',
      caption: 'The view that took our breath away',
      credit: 'Photo by Sam'
    },  
  ];

  const filteredPhotos = selectedAlbum === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedAlbum);

  const nextImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % filteredPhotos.length);
    }
  };

  const prevImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage(lightboxImage === 0 ? filteredPhotos.length - 1 : lightboxImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Our Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of our favorite moments, adventures, and everyday magic captured through the lens.
          </p>
        </div>

        {/* Album Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {albums.map((album) => (
            <Button
              key={album.id}
              variant={selectedAlbum === album.id ? 'default' : 'outline'}
              onClick={() => setSelectedAlbum(album.id)}
              className="flex items-center space-x-2"
            >
              <span>{album.name}</span>
              <Badge variant="secondary" className="ml-2">
                {album.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <Card 
              key={photo.id} 
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
              onClick={() => setLightboxImage(index)}
            >
              <CardContent className="p-0 relative">
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <p className="text-center p-4">{photo.caption}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage !== null && (
          <Dialog open={lightboxImage !== null} onOpenChange={() => setLightboxImage(null)}>
            <DialogContent className="max-w-4xl w-full p-0">
              <div className="relative">
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <ImageWithFallback
                  src={filteredPhotos[lightboxImage].src}
                  alt={filteredPhotos[lightboxImage].alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                <div className="p-6 bg-background">
                  <p className="mb-2">{filteredPhotos[lightboxImage].caption}</p>
                  <p className="text-sm text-muted-foreground">{filteredPhotos[lightboxImage].credit}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}