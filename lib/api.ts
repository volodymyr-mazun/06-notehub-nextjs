
// ----------КОМПОНЕНТ, ДЛЯ HTTP ЗАПИТУ----------

import axios from "axios";
import type { Note, NoteTag } from "../types/note";

// Відповідь від GET /notes: масив нотаток та кількість загальних сторінок.
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Тіло запиту для створення нотатки: заголовок, зміст та тег.
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

// ----------Базовий URL, Токен доступу----------
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// ----------Отримати список нотаток----------
export async function fetchNotes({ page = 1, perPage = 12, search = "", }: { page?: number; perPage?: number; search?: string; }): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", { params: { page, perPage, search }, });
  return response.data;
}

export const getNotes = fetchNotes;

// ----------Створення нової нотатки  на сервері----------
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
}

// ----------Видалення нотатки за ID----------
export async function deleteNote(id: number | string): Promise<void> {
  await api.delete(`/notes/${id}`);
}

// ----------Отримати одну нотатку за її ID----------
export async function fetchNoteById(id: number | string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export const getNoteById = fetchNoteById;