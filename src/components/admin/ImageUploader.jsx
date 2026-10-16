import { useState, useRef } from 'react';
import { Upload, X, Loader2, Star } from 'lucide-react';
import { uploadImage } from '../../lib/api';
import toast from 'react-hot-toast';

export default function ImageUploader({ images = [], onChange }) {
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef(null);

    const handleFiles = async (files) => {
        if (!files || files.length === 0) return;

        // Validate each file
        const validFiles = Array.from(files).filter((f) => {
            if (f.size > 5 * 1024 * 1024) {
                toast.error(`${f.name} is over 5MB`);
                return false;
            }
            if (!/image\/(jpeg|jpg|png|webp)/.test(f.type)) {
                toast.error(`${f.name} is not a valid image`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        setUploading(true);
        try {
            // Upload all valid files in parallel
            const results = await Promise.all(
                validFiles.map(async (file) => {
                    const res = await uploadImage(file);
                    return {
                        url: res.data.data.url,
                        key: res.data.data.key,
                        isPrimary: false, // Will set after
                    };
                })
            );

            // Mark first new image as primary if none exists yet
            const hasExistingPrimary = images.some((img) => img.isPrimary);
            const newImages = results.map((r, i) => ({
                ...r,
                isPrimary: !hasExistingPrimary && i === 0,
            }));

            onChange([...images, ...newImages]);
            toast.success(`${results.length} image(s) uploaded`);
        } catch (err) {
            console.error('Upload failed:', err);
            toast.error(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeImage = (index) => {
        const updated = images.filter((_, i) => i !== index);
        // If primary was removed, make first one primary
        if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
            updated[0] = { ...updated[0], isPrimary: true };
        }
        onChange(updated);
    };

    const setPrimary = (index) => {
        const updated = images.map((img, i) => ({
            ...img,
            isPrimary: i === index,
        }));
        onChange(updated);
    };

    const moveImage = (from, to) => {
        if (to < 0 || to >= images.length) return;
        const updated = [...images];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        onChange(updated);
    };

    return (
        <div>
            {/* Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => !uploading && inputRef.current?.click()}
                className="border-2 border-dashed p-8 text-center cursor-pointer transition-colors hover:border-[var(--gold)]"
                style={{
                    borderColor: 'var(--line-strong)',
                    background: 'var(--bg2)',
                }}
            >
                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2
                            size={32}
                            className="animate-spin"
                            style={{ color: 'var(--gold)' }}
                        />
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>
                            Uploading…
                        </p>
                    </div>
                ) : (
                    <>
                        <Upload
                            size={32}
                            className="mx-auto mb-3"
                            style={{ color: 'var(--gold)' }}
                        />
                        <p className="font-medium mb-1">Click or drop images here</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>
                            JPEG, PNG or WebP · Max 5MB each · Max 10 images
                        </p>
                    </>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                />
            </div>

            {/* Preview Grid */}
            {images.length > 0 && (
                <>
                    <p className="text-xs mt-4 mb-2" style={{ color: 'var(--muted)' }}>
                        {images.length} image{images.length > 1 ? 's' : ''} · Click{' '}
                        <Star size={10} className="inline" /> to set as main
                    </p>

                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {images.map((img, i) => (
                            <div
                                key={i}
                                className="relative group aspect-square overflow-hidden border"
                                style={{
                                    borderColor: img.isPrimary
                                        ? 'var(--gold)'
                                        : 'var(--line)',
                                }}
                            >
                                <img
                                    src={img.url}
                                    alt={`Product ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Primary badge */}
                                {img.isPrimary && (
                                    <span
                                        className="absolute top-1 left-1 px-1.5 py-0.5 text-[8px] tracking-wider uppercase font-medium"
                                        style={{ background: 'var(--gold)', color: '#fff' }}
                                    >
                                        Main
                                    </span>
                                )}

                                {/* Position badge */}
                                <span
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full text-[10px] flex items-center justify-center"
                                    style={{ background: 'rgba(0,0,0,0.7)', color: '#fff' }}
                                >
                                    {i + 1}
                                </span>

                                {/* Actions overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 flex-wrap p-2">
                                    {!img.isPrimary && (
                                        <button
                                            type="button"
                                            onClick={() => setPrimary(i)}
                                            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:bg-[var(--gold)] hover:text-white"
                                            title="Set as main image"
                                        >
                                            <Star size={13} />
                                        </button>
                                    )}

                                    {i > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => moveImage(i, i - 1)}
                                            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:bg-[var(--gold)] hover:text-white text-xs"
                                            title="Move left"
                                        >
                                            ←
                                        </button>
                                    )}

                                    {i < images.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={() => moveImage(i, i + 1)}
                                            className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:bg-[var(--gold)] hover:text-white text-xs"
                                            title="Move right"
                                        >
                                            →
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full"
                                        title="Remove image"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}