import { useMutation } from 'convex/react';
import { useState } from 'react';
import { FunctionReference } from "convex/server";

export const useApiMutation = <T extends FunctionReference<"mutation">>(mutationFunction: T) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload: T["_args"]): Promise<T["_returnType"]> => {
    setPending(true);
    return apiMutation(payload)
      .finally(() => setPending(false))
      .then((result) => {
        return result;
      })
      .catch((error: unknown) => {
        console.error(error); // Handle the error as needed.
        throw error; // Re-throw the error to be caught by the caller.
      })
  }
  return {
    mutate,
    pending,
  };
};