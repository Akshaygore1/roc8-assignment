import { emailList } from "./types";

export async function fetchEmails(page: number): Promise<emailList> {
  try {
    const res = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function fetchEmail(id: string | undefined) {
  if (!id) return;
  const res = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data;
}
