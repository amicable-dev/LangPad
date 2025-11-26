import React, { useRef, useEffect, useState } from "react";
import type { DrawingPadProps } from "../types";

const DrawingPad: React.FC<DrawingPadProps> = ({ 
  selectedCharacter, 
  onSaveCharacter, 
  onSelectNewCharacter 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 360;
    canvas.height = 360;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [selectedCharacter]);

  const getPointer = (e: any) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left;
    const y = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top;
    return { x, y };
  };

  const start = (e: any) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const p = getPointer(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const move = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const p = getPointer(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const end = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const save = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const data = canvas.toDataURL("image/png");
    onSaveCharacter(selectedCharacter, data);
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-blue-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8 transform transition-all duration-300 hover:shadow-3xl">
          <div className="text-center space-y-4">
            <div className="inline-block">
              <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent animate-pulse">
                {selectedCharacter.character}
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {selectedCharacter.pinyin}
              </span>
              <span className="text-gray-400">•</span>
              <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {selectedCharacter.meaning}
              </span>
            </div>
          </div>
        </div>

        {/* Canvas Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-6 md:p-8 mb-6 transform transition-all duration-300 hover:shadow-3xl max-w-full">
  <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
    <canvas
      ref={canvasRef}
      className="w-full h-full border-4 border-black rounded-2xl shadow-inner touch-none transition-all duration-200 hover:border-blue-400 block"
      style={{
        cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"><line x1=\"8\" y1=\"0\" x2=\"8\" y2=\"16\" stroke=\"black\" stroke-width=\"2\"/><line x1=\"0\" y1=\"8\" x2=\"16\" y2=\"8\" stroke=\"black\" stroke-width=\"2\"/></svg>') 8 8, crosshair"
      }}
      onMouseDown={start}
      onMouseMove={move}
      onMouseUp={end}
      onMouseLeave={end}
      onTouchStart={start}
      onTouchMove={move}
      onTouchEnd={end}
    />
    {isDrawing && (
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
    )}
  </div>
</div>


        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Clear Button */}
          <button 
            onClick={clearCanvas}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>

          {/* Save Button */}
          <button 
            onClick={save}
            disabled={isSaving}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSaving ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>

          {/* Back Button */}
          <button 
            onClick={onSelectNewCharacter}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>

        {/* Helpful Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips
          </h3>
          <p className="text-sm text-gray-600">Use your mouse or touch screen to practice writing. Clear the canvas to start over, and save your best attempt!</p>
        </div>
      </div>
    </div>
  );
};

export default DrawingPad;