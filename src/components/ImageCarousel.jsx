import React from 'react';
import ImageCard from './ImageCard';

const ImageCarousel = ({ images }) => {
    return (
        <div className="flex overflow-x-auto space-x-4 p-4">
            {images.map((image, index) => (
                <div key={index} className="flex-shrink-0">
                    <ImageCard 
                        Title={image.title}
                        src={image.src}
                        alt={image.alt}
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageCarousel;