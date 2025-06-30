import React from 'react';

const ImageCard = ({ Title, src, alt }) => {
    return (
        <div className="bg-background text-on-background w-lg border-solid border-primary border-2 rounded-lg shadow-md grid justify-items-stretch p-4 m-2">
            {Title && <h2 className="text-xl font-bold mb-2 text-center">{Title}</h2>}
            <div className="overflow-hidden rounded-lg">
                <img 
                    src={src} 
                    alt={alt} 
                    className="w-full h-auto object-cover" 
                />
            </div>
        </div>
    );
};

export default ImageCard;