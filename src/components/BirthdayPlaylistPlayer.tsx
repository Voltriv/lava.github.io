import { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { motion } from 'motion/react';
import { Music2, SkipBack, SkipForward, Pause, Play, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const tracks = [
  {
    title: 'She (Piano Cover)',
    dedication: 'For the way you light up every room without trying.',
    url: 'https://www.youtube.com/watch?v=_kJbjb1vseY',
  },
  {
    title: 'Roses & Sunsets',
    dedication: 'The soundtrack of our beach walks in Dagupan.',
    url: 'https://www.youtube.com/watch?v=84tFJfY2_xQ',
  },
  {
    title: 'Slow Dancing in a Dream',
    dedication: 'Because every hug feels like a quiet waltz.',
    url: 'https://www.youtube.com/watch?v=w1oM3kQpXRo',
  },
];

export function BirthdayPlaylistPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const currentTrack = tracks[currentIndex];

  const playNext = () => setCurrentIndex((prev) => (prev + 1) % tracks.length);
  const playPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);

  return (
    <Card className="bg-gradient-to-br from-primary/20 via-pink-500/10 to-accent/20 border border-primary/20 shadow-lg">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/20 p-3">
            <Music2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              curated for annielyn
            </p>
            <h3 className="text-xl font-semibold">Birthday Playlist</h3>
          </div>
        </div>

        <motion.div
          key={currentTrack.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-inner"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-yellow-200" />
            <div>
              <p className="text-base font-semibold">{currentTrack.title}</p>
              <p className="text-sm text-white/80">{currentTrack.dedication}</p>
            </div>
          </div>
        </motion.div>

        <ReactPlayer
          url={currentTrack.url}
          playing={isPlaying}
          controls={false}
          width={0}
          height={0}
          onEnded={playNext}
        />

        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" onClick={playPrev} aria-label="Previous song">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full text-primary bg-white"
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" onClick={playNext} aria-label="Next song">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          {tracks.map((track, index) => (
            <button
              key={track.title}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
              className={`w-full rounded-xl border px-4 py-2 text-left transition-all ${
                currentIndex === index
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:bg-muted/30'
              }`}
            >
              <p className="font-medium">{track.title}</p>
              <p className="text-muted-foreground text-xs">{track.dedication}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
