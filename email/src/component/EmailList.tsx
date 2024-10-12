import { email } from "../lib/types";
import EmailItem from "./ui/EmailItem";

interface EmailListProps {
  emails: email[];
  lastEmailRef: (node: HTMLDivElement) => void;
  isFetchingNextPage: boolean;
}

function EmailList({
  emails,
  lastEmailRef,
  isFetchingNextPage,
}: EmailListProps) {
  return (
    <div className="flex flex-col gap-6 py-6">
      {emails.length ? (
        emails.map((email, index) => {
          if (index === emails.length - 1) {
            return (
              <div ref={lastEmailRef} key={email.id}>
                <EmailItem email={email} />
              </div>
            );
          }
          return <EmailItem key={email.id} email={email} />;
        })
      ) : (
        <p>No Emails</p>
      )}
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
}

export default EmailList;
