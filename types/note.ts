
// ----------ЗАГАЛЬНІ ІНТЕРФЕЙСИ НОТАТКІВ----------

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// ----------Типізація обєкта----------
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}                                           

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tag: NoteTag;                             
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;                            
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}