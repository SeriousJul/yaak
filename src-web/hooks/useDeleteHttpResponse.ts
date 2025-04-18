import { useFastMutation } from './useFastMutation';
import type { HttpResponse } from '@yaakapp-internal/models';
import {useSetAtom} from "jotai";
import { invokeCmd } from '../lib/tauri';
import {httpResponsesAtom} from "./useHttpResponses";
import {removeModelById} from "./useSyncModelStores";

export function useDeleteHttpResponse(id: string | null) {
  const setHttpResponses = useSetAtom(httpResponsesAtom);
  return useFastMutation<HttpResponse>({
    mutationKey: ['delete_http_response', id],
    mutationFn: async () => {
      return await invokeCmd('cmd_delete_http_response', { id: id });
    },
    onSuccess: (response) => {
      setHttpResponses(removeModelById(response));
    }
  });
}
