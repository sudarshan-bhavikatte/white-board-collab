import { useSelf, useMutation } from "@liveblocks/react/suspense";

export const useDeleteLayers = () => {
    const selection = useSelf((self) => self.presence.selection);

    return useMutation((
        { storage, setMyPresence },
    ) => {
        const liveLayerIds = storage.get("layerIds");
        const liveLayers = storage.get("layers");
        for (const layerId of selection) {
            liveLayers.delete(layerId);
            const index = liveLayerIds.indexOf(layerId);
            if (index !== -1) {
                liveLayerIds.delete(index);
            }
        }
        setMyPresence({ selection: [] }, { addToHistory: true })
    }, [selection])
}