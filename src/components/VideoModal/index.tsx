import React, { useRef } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  isYouTube?: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc, isYouTube = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-screen-xl h-[87%]"  // Increased max-width and max-height
        onClick={(e) => e.stopPropagation()}  // Prevents click events from reaching the outer div
      >
        <button
          className="absolute top-6 right-6 text-white text-3xl bg-black bg-opacity-75 rounded-full p-4 z-60"  // Increased size and padding
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {isYouTube ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoSrc}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video controls autoPlay className="w-full h-full object-contain">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
