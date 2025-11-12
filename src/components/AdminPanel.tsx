import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { createMediaEntry, MediaEntry, MediaType, subscribeToMediaEntries, uploadMediaFile } from '@/lib/mediaService';
import {
  LoveNoteRecord,
  addLoveNote,
  deleteLoveNote,
  subscribeToLoveNotes,
  togglePinLoveNote,
} from '@/lib/loveNotesService';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { auth, googleProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { Pin, Trash2 } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [loveNotes, setLoveNotes] = useState<LoveNoteRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<ReturnType<typeof auth['currentUser']> | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    mediaType: 'photo' as MediaType,
    textContent: '',
  });
  const [loveNoteForm, setLoveNoteForm] = useState({
    title: '',
    content: '',
    author: '',
    mood: '😊',
    isPinned: false,
  });
  const moodOptions = ['😊', '❤️', '🥰', '😍', '🤗', '☕', '🏔️', '🌟', '🎉', '💕'];

  useEffect(() => {
    const unsubscribeMedia = subscribeToMediaEntries(setEntries);
    const unsubscribeNotes = subscribeToLoveNotes(setLoveNotes);
    return () => {
      unsubscribeMedia();
      unsubscribeNotes();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      let url: string | undefined;
      if (file) {
        url = await uploadMediaFile(file);
      }
      await createMediaEntry({
        ...form,
        url,
      });
      toast.success('Entry saved');
      setForm({
        title: '',
        description: '',
        category: '',
        mediaType: form.mediaType,
        textContent: '',
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoveNoteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!loveNoteForm.title || !loveNoteForm.content || !loveNoteForm.author) {
      toast.error('Fill out all love note fields');
      return;
    }
    try {
      setIsSavingNote(true);
      await addLoveNote({
        title: loveNoteForm.title,
        content: loveNoteForm.content,
        author: loveNoteForm.author,
        isPinned: loveNoteForm.isPinned,
        mood: loveNoteForm.mood,
      });
      toast.success('Love note saved');
      setLoveNoteForm({ title: '', content: '', author: '', mood: '😊', isPinned: false });
    } catch (error) {
      console.error(error);
      toast.error('Failed to save love note');
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleTogglePinned = async (note: LoveNoteRecord) => {
    try {
      await togglePinLoveNote(note.id, !note.isPinned);
      toast.success('Pin updated');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update pin');
    }
  };

  const handleDeleteNote = async (note: LoveNoteRecord) => {
    try {
      await deleteLoveNote(note.id);
      toast.success('Love note removed');
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove love note');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10 space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Admin Panel</p>
          <h1 className="text-3xl font-semibold">Media & Stories</h1>
          <p className="text-muted-foreground max-w-2xl">
            Upload photos, videos, audio, or heartfelt text entries. Everything you add will be available across the gallery and love notes sections.
          </p>
        </div>
        <div className="flex gap-3">
          {user && (
            <Button variant="ghost" onClick={() => signOut(auth)}>
              Sign out ({user.displayName || user.email})
            </Button>
          )}
          <Button variant="outline" onClick={onBack}>
            Back to site
          </Button>
        </div>
      </div>

      {!user ? (
        <Card className="max-w-xl mx-auto">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-semibold">Sign in to manage the memories</h2>
            <p className="text-muted-foreground">
              Only authenticated admins can upload photos, videos, or love notes.
            </p>
            <Button className="w-full" onClick={() => signInWithPopup(auth, googleProvider)}>
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-[1fr,1.2fr]">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Add new entry</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Title</label>
                    <Input
                      required
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Description</label>
                    <Textarea
                      value={form.description}
                      onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Category</label>
                    <Input
                      placeholder="e.g. gallery, love-note"
                      value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Media type</label>
                    <Select
                      value={form.mediaType}
                      onValueChange={(value: MediaType) => setForm((prev) => ({ ...prev, mediaType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photo">Photo</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="text">Text only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {form.mediaType === 'text' ? (
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Text content</label>
                      <Textarea
                        required
                        value={form.textContent}
                        onChange={(e) => setForm((prev) => ({ ...prev, textContent: e.target.value }))}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Upload file</label>
                      <Input
                        type="file"
                        accept={form.mediaType === 'photo' ? 'image/*' : form.mediaType === 'audio' ? 'audio/*' : 'video/*'}
                        required
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving…' : 'Save entry'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <h2 className="text-xl font-semibold">Recent entries</h2>
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      className="rounded-2xl border border-border p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{entry.title}</p>
                        <span className="text-xs uppercase tracking-wide text-muted-foreground">{entry.mediaType}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                      {entry.url && (
                        <a href={entry.url} target="_blank" rel="noreferrer" className="text-primary text-sm">
                          View file
                        </a>
                      )}
                      {entry.textContent && (
                        <p className="mt-2 rounded-md bg-muted/50 p-2 text-sm">{entry.textContent}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Add love note</h2>
                <form className="space-y-4" onSubmit={handleLoveNoteSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Title</label>
                    <Input
                      required
                      value={loveNoteForm.title}
                      onChange={(e) => setLoveNoteForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Message</label>
                    <Textarea
                      required
                      rows={5}
                      value={loveNoteForm.content}
                      onChange={(e) => setLoveNoteForm((prev) => ({ ...prev, content: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Author</label>
                      <Input
                        required
                        value={loveNoteForm.author}
                        onChange={(e) => setLoveNoteForm((prev) => ({ ...prev, author: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Mood</label>
                      <div className="grid grid-cols-5 gap-2">
                        {moodOptions.map((mood) => (
                          <button
                            key={mood}
                            type="button"
                            onClick={() => setLoveNoteForm((prev) => ({ ...prev, mood }))}
                            className={`rounded-lg border p-2 ${
                              loveNoteForm.mood === mood ? 'border-primary bg-primary/10' : 'border-muted'
                            }`}
                          >
                            {mood}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="pin-note"
                      type="checkbox"
                      checked={loveNoteForm.isPinned}
                      onChange={(e) => setLoveNoteForm((prev) => ({ ...prev, isPinned: e.target.checked }))}
                    />
                    <label htmlFor="pin-note" className="text-sm text-muted-foreground">
                      Pin this note
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSavingNote}>
                    {isSavingNote ? 'Saving…' : 'Save love note'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <h2 className="text-xl font-semibold">Recent love notes</h2>
                <div className="space-y-3">
                  {loveNotes.map((note) => (
                    <motion.div
                      key={note.id}
                      className="rounded-2xl border border-border p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{note.title}</p>
                          <p className="text-xs text-muted-foreground">— {note.author}</p>
                        </div>
                        <span className="text-lg">{note.mood}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleTogglePinned(note)}>
                          <Pin className={`w-4 h-4 ${note.isPinned ? 'text-primary' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteNote(note)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
