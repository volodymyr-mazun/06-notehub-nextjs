
// ----------КОМПОНЕНТ, ДЛЯ РОБОТИ З ФОРМОЮ ДОДАВАННЯ НОТАТКИ----------

import css from "./NoteForm.module.css";

import { createNote } from "@/lib/api";
import { Note, CreateNotePayload, NoteTag } from "../../types/note";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";

// ---------- Валідація форми ----------
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Note, Error, CreateNotePayload>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  interface NoteFormValues {
    title: string;
    content: string;
    tag: NoteTag;
  }

// ---------- Початкові значення форми ----------
  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: NoteFormValues, helpers: FormikHelpers<NoteFormValues>) => {
        mutation.mutate(values, {
          onSuccess: () => {
            helpers.resetForm();
            onClose();
          },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          {mutation.isError && (
            <div className={css.error}>
              {mutation.error instanceof Error ? mutation.error.message : "Failed to create note"}
            </div>
          )}

          <div className={css.actions}>
            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting || mutation.isPending}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;