import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import EmailList from "./EmailList";
import { fetchEmail, fetchEmails } from "../lib/dataFetcher";
import { email, emailList } from "../lib/types";
import EmailItem from "./ui/EmailItem";
import EmailBody from "./ui/EmailBody";

function Email() {
  const { id } = useParams<{ id: string }>();
  const [selectedId, setSelectedId] = useState<string | undefined>(id);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const emailState = location.state?.email as
    | { from: { name: string }; date: string; subject: string }
    | undefined;

  const {
    data: emailData,
    isLoading: emailLoading,
    error: emailError,
    refetch: emailRefetch,
  } = useQuery(["email", selectedId], () => fetchEmail(selectedId), {
    enabled: !!selectedId,
  });

  const { data, isLoading, error } = useQuery<emailList, Error>({
    queryKey: ["emails", currentPage],
    queryFn: () => fetchEmails(currentPage),
    retry: 2,
    keepPreviousData: true,
  });

  useEffect(() => {
    setSelectedId(id);
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error || emailError)
    return <div>Error: {error?.message || emailError?.message}</div>;

  return (
    <div className="flex flex-row gap-4">
      <div className="w-1/3 flex flex-col">
        <EmailList />
      </div>

      <div className="w-2/3 bg-white rounded-lg border border-border p-4 max-h-[85vh] overflow-y-auto">
        {emailData && emailState && (
          <EmailBody
            name={emailState.from.name}
            date={emailState.date}
            body={emailData.body}
          />
        )}
      </div>
    </div>
  );
}

export default Email;
