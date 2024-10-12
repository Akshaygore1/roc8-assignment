export type email = {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
};

export type emailList = {
  emails: email[] | [];
};
