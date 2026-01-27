"use client"

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
    return (
        <div
            className="flex flex-wrap gap-2
        items-center max-w-[200px]
        pr-2 mr-2 border-r border-neutral-200"
        >
            <ColorButton
                onClick={onChange}
                color={{ r: 255, g: 255, b: 0 }}
            />
            <ColorButton
                onClick={onChange}
                color={{ r: 255, g: 0, b: 255 }}
            />
            <ColorButton
                onClick={onChange}
                color={{ r: 0, g: 255, b: 255 }}
            />
            <ColorButton
                onClick={onChange}
                color={{ r: 0, g: 255, b: 0 }}
            />
            <ColorButton
                onClick={onChange}
                color={{ r: 255, g: 255, b: 255 }}
            />
            <ColorButton
                onClick={onChange}
                color={{ r: 0, g: 0, b: 0 }}
            />
        </div>
    )
}

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
    return (
        <button
            className="w-8 h-8 items-center justify-center hover:opacity-75 transition-opacity transition"
            onClick={() => onClick(color)}
            style={{
                width: 20,
                height: 20,
                backgroundColor: colorToCss(color)
            }}
        />
    )
}
