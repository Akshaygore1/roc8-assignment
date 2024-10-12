import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { email, emailList } from "../lib/types";
import EmailItem from "./ui/EmailItem";
import { useOutletContext } from "react-router-dom";
import { fetchEmails } from "../lib/dataFetcher";

interface EmailListProps {
  filter: string | null;
}

function EmailList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { filter } = useOutletContext<EmailListProps>();

  const { data, isLoading } = useQuery<emailList, Error>({
    queryKey: ["emails", currentPage],
    queryFn: () => fetchEmails(currentPage),
    retry: 2,
    keepPreviousData: true,
  });

  const emails = data?.list || [];
  const totalPages = 2;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <p>Loading...</p>;

  const filteredEmails = emails.filter((email: email) => {
    if (!filter) return true;
    // Add your filter logic here
    return true;
  });

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-4">
        {filteredEmails.length ? (
          filteredEmails.map((email: email) => (
            <EmailItem key={email.id} email={email} />
          ))
        ) : (
          <p>No Emails</p>
        )}
      </div>
      <div className="flex justify-end items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded-full disabled:bg-gray-300 hover:bg-black hover:text-white"
        >
          <ChevronLeft />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded-full disabled:bg-gray-300 hover:bg-black hover:text-white"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default EmailList;
