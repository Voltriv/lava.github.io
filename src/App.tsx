import { useEffect, useState } from 'react';
import { BirthdayBanner } from './components/BirthdayBanner';
import { BirthdayPlaylistPlayer } from './components/BirthdayPlaylistPlayer';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { MilestonesSection } from './components/MilestonesSection';
import { LoveNotesSection } from './components/LoveNotesSection';
import { Navigation } from './components/Navigation';
import { FloatingHearts } from './components/FloatingHearts';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Button } from './components/ui/button';
import { AdminPanel } from './components/AdminPanel';
import { Toaster } from './components/ui/sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';

type ViewMode = 'birthday' | 'story' | 'admin';

export default function App() {
  const [view, setView] = useState<ViewMode>('birthday');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  if (view === 'admin') {
    return <AdminPanel onBack={() => setView('birthday')} />;
  }

  if (view === 'story') {
    return (
      <div className="min-h-screen bg-background text-foreground relative">
        <ScrollProgressBar />
        <FloatingHearts />
        <InteractiveBackground />
        <Navigation darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />

        <main className="pt-24 pb-16 space-y-16">
          <section className="px-4 text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Our story</p>
            <h1 className="text-4xl md:text-5xl font-semibold">Elijah & Annielyn</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our love story, captured in pixels and preserved in memories.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setView('birthday')}>
              Back to birthday surprise
            </Button>
          </section>

          <div className="space-y-16">
            <AboutSection />
            <GallerySection />
            <MilestonesSection />
            <LoveNotesSection />
          </div>
        </main>

        <footer className="bg-gradient-to-r from-muted/20 via-accent/10 to-muted/20 py-10 px-4 text-center text-sm text-muted-foreground">
          Crafted with ♥ for Annielyn.
        </footer>

        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-100 text-foreground">
      <BirthdayBanner
        onOpenStory={() => setView('story')}
        onOpenPlaylist={() => setShowPlaylist(true)}
      />

      <div className="flex justify-center px-4">
        <Button variant="ghost" onClick={() => setView('admin')}>
          Go to admin
        </Button>
      </div>

      <Dialog open={showPlaylist} onOpenChange={setShowPlaylist}>
        <DialogContent className="max-w-2xl w-[90vw] bg-background">
          <DialogHeader className="pb-2">
            <DialogTitle>Birthday Playlist</DialogTitle>
            <DialogDescription>Little songs for every version of your smile.</DialogDescription>
          </DialogHeader>
          <BirthdayPlaylistPlayer />
        </DialogContent>
      </Dialog>

      <footer className="px-4 py-8 text-center text-xs text-muted-foreground">
        Crafted with love for Annielyn&apos;s birthday.
      </footer>

      <Toaster />
    </div>
  );
}
