"use client";

export default function Toolbar() {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4 z-10">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md gap-y-1">
        <div>pencil</div>
        <div>square</div>
        <div>circle</div>
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md gap-y-1">
        <div>undo</div>
        <div>redo</div>
      </div>
    </div>
  );
}
