import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { NoteLayer } from "@/types/canvas";

import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils"
import { useMutation } from "@liveblocks/react/suspense";


const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96
    const scaleFactor = 0.15
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;

    return Math.min(
        maxFontSize,
        fontSizeBasedOnHeight,
        fontSizeBasedOnWidth
    )

}

interface NoteProps {
    id: string;
    layer: NoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

export const Note = (
    {
        id,
        layer,
        onPointerDown,
        selectionColor,
    }: NoteProps
) => {
    const { x, y, width, height, fill, Value } = layer;

    const updateValue = useMutation(
        (
            { storage },
            newValue: string,
        ) => {
            const liveLayers = storage.get("layers");

            liveLayers.get(id)?.set("Value", newValue)
        },
        []
    )

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }
    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={
                {
                    outline: selectionColor ? `1px solid ${selectionColor}` : "none",
                }
            }
            className="shadow-md drop-shadow-lg"
        >
            <ContentEditable
                className={cn("h-full w-full flex items-center justify-center text-center outline-none",
                    font.className
                )}
                style={
                    {
                        fontSize: calculateFontSize(width, height),
                        backgroundColor: fill ? colorToCss(fill) : "#acb809ff",
                        color: fill ? getContrastingTextColor(fill) : "#000",
                    }
                }
                html={Value || "value"}
                onChange={handleContentChange}
            />
        </foreignObject>
    )
}