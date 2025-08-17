
"use client";

import React, { useState } from "react";
import css from "./NotesPage.module.css";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";

import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesClientProps {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient({ notes, totalPages }: NotesClientProps){
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, error, isLoading, isFetching } = useQuery<NotesResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, search: debouncedSearch }),
    placeholderData: { notes: [], totalPages: 1 },
    initialData: { notes, totalPages } as NotesResponse,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNoteCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    closeModal();
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>

      {isLoading && <Loader />}

      {error && (
        <div className={css.error}>
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </div>
      )}

      {data?.notes.length ? (
        <>
          <NoteList notes={data.notes} />

          {data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              onPageChange={handlePageChange}
              currentPage={page - 1}
            />
          )}
        </>

      ) : (
        !isLoading && <div className={css.noNotes}>No notes found</div>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={handleNoteCreated} />
        </Modal>
      )}

      {isFetching && !isLoading && <p>Updating...</p>}
    </div>
  );
}