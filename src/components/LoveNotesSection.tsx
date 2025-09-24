import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Heart, Pin, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface LoveNote {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  isPinned: boolean;
  mood: string;
}

export function LoveNotesSection() {
  const [notes, setNotes] = useState<LoveNote[]>([
    {
      id: 1,
      title: 'Just Because',
      content: 'I was just thinking about how lucky I am to have you in my life. Your smile makes even the cloudiest days feel sunny. Thank you for being my person. ❤️',
      author: 'Alex',
      date: '2024-01-15',
      isPinned: true,
      mood: '😊'
    },
    {
      id: 2,
      title: 'After Our Hike',
      content: 'Today was absolutely perfect! Watching you conquer that trail with such determination was amazing. I love how adventurous you are and how you push me to try new things.',
      author: 'Sam',
      date: '2024-01-10',
      isPinned: false,
      mood: '🏔️'
    },
    {
      id: 3,
      title: 'Morning Coffee Thoughts',
      content: 'Waking up next to you never gets old. These quiet morning moments with our coffee are some of my favorite parts of the day. Here\'s to many more lazy Sunday mornings together.',
      author: 'Alex',
      date: '2024-01-08',
      isPinned: true,
      mood: '☕'
    }
  ]);

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<LoveNote | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    author: '',
    mood: '😊'
  });

  const moodOptions = ['😊', '❤️', '🥰', '😍', '🤗', '☕', '🏔️', '🌟', '🎉', '💕'];

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content || !newNote.author) {
      toast.error('Please fill in all fields');
      return;
    }

    const note: LoveNote = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      author: newNote.author,
      date: new Date().toISOString().split('T')[0],
      isPinned: false,
      mood: newNote.mood
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', author: '', mood: '😊' });
    setIsAddingNote(false);
    toast.success('Love note added!');
  };

  const handleEditNote = () => {
    if (!editingNote) return;

    setNotes(notes.map(note => 
      note.id === editingNote.id ? editingNote : note
    ));
    setEditingNote(null);
    toast.success('Love note updated!');
  };

  const togglePin = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
    toast.success('Note pin status updated!');
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success('Love note deleted');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const pinnedNotes = notes.filter(note => note.isPinned);
  const regularNotes = notes.filter(note => !note.isPinned);

  return (
    <section id="notes" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl mb-4">Love Notes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A collection of sweet messages, random thoughts, and love letters we've shared with each other.
          </p>
          
          <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Love Note</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Write a Love Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Title</label>
                  <Input
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Give your note a title..."
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Your Message</label>
                  <Textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Write your heartfelt message..."
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">From</label>
                    <Input
                      value={newNote.author}
                      onChange={(e) => setNewNote({ ...newNote, author: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Mood</label>
                    <div className="flex flex-wrap gap-2">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood}
                          onClick={() => setNewNote({ ...newNote, mood })}
                          className={`text-2xl p-2 rounded-lg hover:bg-muted transition-colors ${
                            newNote.mood === mood ? 'bg-primary/10 ring-2 ring-primary/20' : ''
                          }`}
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddNote}>
                    Add Note
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Pin className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-xl">Pinned Favorites</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedNotes.map((note) => (
                <Card key={note.id} className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{note.mood}</span>
                        <h4 className="font-medium">{note.title}</h4>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePin(note.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Pin className="w-4 h-4 fill-current" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingNote(note)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNote(note.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">From {note.author}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(note.date)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Notes */}
        <div>
          <h3 className="text-xl mb-6">All Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{note.mood}</span>
                      <h4 className="font-medium">{note.title}</h4>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePin(note.id)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <Pin className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingNote(note)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNote(note.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                    {note.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">From {note.author}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(note.date)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Edit Note Dialog */}
        <Dialog open={editingNote !== null} onOpenChange={() => setEditingNote(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Love Note</DialogTitle>
            </DialogHeader>
            {editingNote && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Title</label>
                  <Input
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Your Message</label>
                  <Textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">From</label>
                    <Input
                      value={editingNote.author}
                      onChange={(e) => setEditingNote({ ...editingNote, author: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Mood</label>
                    <div className="flex flex-wrap gap-2">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood}
                          onClick={() => setEditingNote({ ...editingNote, mood })}
                          className={`text-2xl p-2 rounded-lg hover:bg-muted transition-colors ${
                            editingNote.mood === mood ? 'bg-primary/10 ring-2 ring-primary/20' : ''
                          }`}
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingNote(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditNote}>
                    Update Note
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}