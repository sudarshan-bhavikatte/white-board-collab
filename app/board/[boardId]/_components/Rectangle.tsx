import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface ReactangleProps {
  id : string;
  layer : RectangleLayer;
  onPointerDown : (e : React.PointerEvent, id : string) => void;
  selectionColor? : string;
}

export const Rectangle = ({id,layer,onPointerDown,selectionColor} : ReactangleProps) => {
    return (
    <rect
        className="drop-shadow-md"
        onPointerDown = {(e) => onPointerDown(e, id)}
        style = {{
            transform : `translate(${layer.x}px, ${layer.y}px)`,
        }}
        x={0}
        y={0}
        width={layer.width}
        height={layer.height}
        strokeWidth={1}
        fill={layer.fill ? colorToCss(layer.fill) : "#000"}
        stroke={ selectionColor || "transparent"}
    />
  );
};