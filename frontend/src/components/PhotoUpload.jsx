import { useState } from "react";
import Icon from "./Icon";

export default function PhotoUpload({ photo, showPhoto, onPhotoChange, onToggleShowPhoto }) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      onPhotoChange(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onPhotoChange(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-faca-700" />
        <h3 className="font-heading font-semibold text-faca-900">Fotografía de perfil</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        <label className="relative group cursor-pointer">
          <div
            className={`relative w-32 h-32 rounded-full overflow-hidden border-4 transition-all duration-200 ${
              dragActive ? "border-accent-700 bg-accent-50" : "border-faca-700/20 bg-faca-50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {photo ? (
              <img
                src={photo}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Icon name="User" className="w-10 h-10 mb-2 opacity-50" size={1} />
                <span className="text-xs font-medium">Subir foto</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>
          {showPhoto && (
            <button
              type="button"
              onClick={() => onToggleShowPhoto(false)}
              className="absolute -right-1 -bottom-1 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 transition-colors"
              aria-label="Eliminar foto"
            >
              <Icon name="X" className="w-3 h-3 text-slate-600" size={0.375} />
            </button>
          )}
        </label>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={showPhoto}
            onChange={onToggleShowPhoto}
            className="w-4 h-4 rounded border-faca-700 text-faca-700 focus:ring-faca-700"
          />
          <label className="text-sm font-medium text-slate-700 cursor-pointer select-none">
            Incluir fotografía en el CV
          </label>
        </div>

        {photo && !showPhoto && (
          <button
            type="button"
            onClick={() => onToggleShowPhoto(true)}
            className="px-3 py-1.5 rounded bg-faca-50 text-faca-700 text-xs font-medium border border-faca-200 hover:bg-faca-100 transition-colors"
          >
            <Icon name="User" className="w-3 h-3 mr-1" size={0.375} /> Mostrar foto
          </button>
        )}
      </div>
    </div>
  );
}