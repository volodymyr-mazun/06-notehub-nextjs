
// ----------PREFETCH ТА КЕШУВАННЯ----------

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

import { HydrationBoundary, QueryClient, dehydrate, } from "@tanstack/react-query";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}