
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DestinationGalleryProps {
  destination: string;
}

export const DestinationGallery: React.FC<DestinationGalleryProps> = ({ destination }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const getDestinationImages = (dest: string) => {
    const city = dest.toLowerCase();
    
    const imageData: { [key: string]: string[] } = {
      'goa': [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
      ],
      'manali': [
        'https://images.unsplash.com/photo-1486022419619-a57ad2aabc43?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544737151-6e4b99de2297?auto=format&fit=crop&w=800&q=80'
      ],
      'kerala': [
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
      ],
      'default': [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80'
      ]
    };

    for (const [key, images] of Object.entries(imageData)) {
      if (city.includes(key)) {
        return images;
      }
    }
    return imageData.default;
  };

  const images = getDestinationImages(destination);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        Explore {destination}
      </h3>
      <div className="relative max-w-4xl mx-auto">
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
          <img
            src={images[currentImage]}
            alt={`${destination} - ${currentImage + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          {images.length > 1 && (
            <>
              <Button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                size="sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                size="sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
