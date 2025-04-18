import { useFastMutation } from './useFastMutation';
import type { GrpcConnection } from '@yaakapp-internal/models';
import {useSetAtom} from "jotai";
import { invokeCmd } from '../lib/tauri';
import {grpcConnectionsAtom} from "./useGrpcConnections";
import {removeModelById} from "./useSyncModelStores";

export function useDeleteGrpcConnection(id: string | null) {
  const setGrpcConnections = useSetAtom(grpcConnectionsAtom);
  return useFastMutation<GrpcConnection>({
    mutationKey: ['delete_grpc_connection', id],
    mutationFn: async () => {
      return await invokeCmd('cmd_delete_grpc_connection', { id: id });
    },
    onSuccess: (connection) => {
      if (connection == null) return;

      setGrpcConnections(removeModelById(connection));
    }
  });
}
