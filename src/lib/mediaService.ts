import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { db, storage } from './firebase';

export type MediaType = 'photo' | 'video' | 'audio' | 'text';

export interface MediaEntry {
  id: string;
  title: string;
  description?: string;
  category?: string;
  mediaType: MediaType;
  url?: string;
  textContent?: string;
  createdAt?: Date;
}

export function subscribeToMediaEntries(
  callback: (items: MediaEntry[]) => void,
) {
  const mediaRef = collection(db, 'mediaEntries');
  const q = query(mediaRef, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const data: MediaEntry[] = snapshot.docs.map((doc) => {
      const raw = doc.data();
      return {
        id: doc.id,
        title: raw.title,
        description: raw.description,
        category: raw.category,
        mediaType: raw.mediaType,
        url: raw.url,
        textContent: raw.textContent,
        createdAt: raw.createdAt?.toDate?.(),
      };
    });
    callback(data);
  });
}

export async function uploadMediaFile(file: File, folder = 'media') {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytesResumable(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function createMediaEntry(entry: Omit<MediaEntry, 'id'>) {
  const mediaRef = collection(db, 'mediaEntries');
  return addDoc(mediaRef, {
    ...entry,
    createdAt: serverTimestamp(),
  });
}
