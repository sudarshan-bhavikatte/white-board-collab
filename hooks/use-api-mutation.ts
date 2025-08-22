import { useMutation } from 'convex/react';
import {  useState } from 'react';

export const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    const mutate = (payload : any) => {
        setPending(true);
        return apiMutation(payload)
            .finally(()=> setPending(false))
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.error(error); // Handle the error as needed.
                throw error; // Re-throw the error to be caught by the caller.
            })
    }
  return {
    mutate,
    pending,
  };
};