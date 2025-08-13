
// ----------КОМПОНЕНТ, ДЛЯ РОБОТИ З ФОРМАМИ----------

import React from "react";
import css from "./NoteForm.module.css";

import { createNote } from "@/lib/api";
import { Note, CreateNotePayload } from "../../types/note";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface NoteFormProps {
  onClose: () => void;
}

// ----------Валідація введених значень----------
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm  ({ onClose }: NoteFormProps ){
  const queryClient = useQueryClient();

// ----------Хук UseMutation, Інвалідація КЕШУ----------
  const { mutate, isPending, isError, error } = useMutation< Note, Error, CreateNotePayload >({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

const titleId = "note-title";
const contentId = "note-content";
const tagId = "note-tag";

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => mutate(values as CreateNotePayload)}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={titleId}>Title</label>
            <Field id={titleId} name="title" type="text" className={css.input} />
            <ErrorMessage name={titleId} component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={contentId}>Content</label>
            <Field as="textarea" id={contentId} name="content" rows={8} className={css.textarea} />
            <ErrorMessage name={contentId} component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={tagId}>Tag</label>
            <Field as="select" id={tagId} name="tag" className={css.select}>
              <option value="" disabled>Select a tag</option>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name={tagId} component="span" className={css.error} />
          </div>

          {isError && (
            <div className={css.error}>
              {error instanceof Error ? error.message : "Failed to create note"}
            </div>
          )}

          <div className={css.actions}>
            <button type="button" onClick={onClose} disabled={isPending} className={css.cancelButton}>Cancel</button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting || isPending}>Create note</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};