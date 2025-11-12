import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export interface LoveNoteRecord {
  id: string;
  title: string;
  content: string;
  author: string;
  date?: Date;
  isPinned: boolean;
  mood: string;
}

const notesCollection = collection(db, 'loveNotes');

export function subscribeToLoveNotes(callback: (notes: LoveNoteRecord[]) => void) {
  const q = query(notesCollection, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const records: LoveNoteRecord[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        content: data.content,
        author: data.author,
        date: data.createdAt?.toDate(),
        isPinned: data.isPinned ?? false,
        mood: data.mood ?? '😊',
      };
    });
    callback(records);
  });
}

export async function addLoveNote(note: Omit<LoveNoteRecord, 'id' | 'date'>) {
  await addDoc(notesCollection, {
    ...note,
    createdAt: serverTimestamp(),
  });
}

export async function updateLoveNote(note: LoveNoteRecord) {
  const noteRef = doc(db, 'loveNotes', note.id);
  await updateDoc(noteRef, {
    title: note.title,
    content: note.content,
    author: note.author,
    isPinned: note.isPinned,
    mood: note.mood,
  });
}

export async function togglePinLoveNote(id: string, value: boolean) {
  const noteRef = doc(db, 'loveNotes', id);
  await updateDoc(noteRef, { isPinned: value });
}

export async function deleteLoveNote(id: string) {
  const noteRef = doc(db, 'loveNotes', id);
  await deleteDoc(noteRef);
}
