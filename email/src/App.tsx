import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import FilterComponent from "./component/ui/FilterComponent";
import EmailList from "./component/EmailList";

async function fetchEmails({ pageParam = 1 }) {
  try {
    const res = await fetch(
      `https://flipkart-email-mock.now.sh/?page=${pageParam}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error", error.message);
      throw error; // Re-throw the error to be caught by React Query
    }
    throw new Error("An unknown error occurred");
  }
}

function App() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["emails"],
    retry: false,
    queryFn: fetchEmails,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.list?.length === 0) return undefined;
      return pages.length + 1;
    },
  });

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastEmailRef = useCallback(
    (email: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((emails) => {
        if (emails[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (email) intObserver.current.observe(email);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) return <p>Loading...</p>;

  const emails = data?.pages.flatMap((page) => page?.list || []) || [];

  return (
    <div className="p-16 bg-background h-screen">
      <div className="flex flex-row items-center py-4">
        <div className="pr-2">Filter By :</div>
        <div className="flex flex-row gap-1">
          <FilterComponent title="Unread" onClick={() => {}} />
          <FilterComponent title="Read" onClick={() => {}} />
          <FilterComponent title="Favorites" onClick={() => {}} />
        </div>
      </div>
      <EmailList
        emails={emails}
        lastEmailRef={lastEmailRef}
        isFetchingNextPage={isFetchingNextPage && !error}
      />
    </div>
  );
}

export default App;
