import { api } from "encore.dev/api";

export interface HelloResponse {
  message: string;
}

// Returns a simple greeting message.
export const hello = api<void, HelloResponse>(
  { expose: true, method: "GET", path: "/hello" },
  async () => {
    return {
      message: "Hello, World!"
    };
  }
);
