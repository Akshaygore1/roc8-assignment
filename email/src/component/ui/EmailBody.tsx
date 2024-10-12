import dayjs from "dayjs";

type Props = {
  name: string;
  date: string;
  body: string;
};

function EmailBody({ name, date, body }: Props) {
  return (
    <div className="flex flex-col p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-4 justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
            {name[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-gray-600 text-sm">
              {dayjs(date).format("DD MMM YYYY HH:mm:A")}
            </p>
          </div>
        </div>
        <button className="self-end bg-accent text-sm text-white px-4 py-2 rounded-full mb-4">
          Mark as favorite
        </button>
      </div>

      <div className="p-6 rounded-lg">
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
    </div>
  );
}

export default EmailBody;
