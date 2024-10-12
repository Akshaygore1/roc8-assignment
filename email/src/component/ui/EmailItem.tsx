import { email } from "../../lib/types";
import dayjs from "dayjs";

const EmailItem = ({ email }: { email: email }) => {
  return (
    <div className="bg-white rounded-lg border border-border p-4 flex items-start space-x-4">
      <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
        <span className="text-lg font-semibold">
          {email.from.name[0].toUpperCase()}
        </span>
      </div>
      <div className="flex-grow">
        <p className="text-sm text-text">
          From :
          <span className="font-medium text-black px-2">{email.from.name}</span>
          <span className="font-medium text-black">
            &lt;{email.from.email}&gt;
          </span>
        </p>

        <p className="text-sm font-medium text-text">
          Subject :{" "}
          <span className="font-medium text-black">{email.subject}</span>
        </p>
        <p className="text-sm text-text mt-1">{email.short_description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">
            {dayjs(email.date).format("DD MMM YYYY hh:mm A")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;
