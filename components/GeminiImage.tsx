import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface GeminiImageProps {
  prompt: string;
  cacheKey: string;
  alt: string;
  className?: string;
  children: React.ReactNode; // Fallback content
}

// Cache duration: 24 hours in milliseconds
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Simple placeholder component
const ImagePlaceholder: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg ${className}`} />
);

const GeminiImage: React.FC<GeminiImageProps> = ({ prompt, cacheKey, alt, className, children }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const generateAndCacheImage = async () => {
      // 1. Check cache first
      try {
        const cachedItem = localStorage.getItem(cacheKey);
        if (cachedItem) {
          const { dataUrl, timestamp } = JSON.parse(cachedItem);
          const isCacheValid = (Date.now() - timestamp) < CACHE_DURATION;
          
          if (dataUrl && isCacheValid) {
            setImageUrl(dataUrl);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Could not access or parse localStorage item. It might be in an old format or corrupted. Refetching.', e);
        // Clear potentially corrupted cache item
        try {
            localStorage.removeItem(cacheKey);
        } catch (removeError) {
            console.warn('Could not remove corrupted cache item.', removeError);
        }
      }

      // 2. If not in cache or invalid, generate image
      try {
        if (!process.env.API_KEY) {
            console.error("API_KEY environment variable not set.");
            throw new Error("API_KEY not set.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png', // PNG for transparency
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
          const base64ImageBytes = response.generatedImages[0].image.imageBytes;
          const dataUrl = `data:image/png;base64,${base64ImageBytes}`;
          setImageUrl(dataUrl);
          
          // 3. Cache the new result with a timestamp
          try {
            const cacheItem = {
              dataUrl: dataUrl,
              timestamp: Date.now()
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
          } catch (e) {
            console.warn('Could not write to localStorage for caching.', e);
          }
        } else {
            throw new Error('No images were generated.');
        }

      } catch (err) {
        console.error(`Failed to generate image for prompt "${prompt}":`, err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    generateAndCacheImage();
  }, [prompt, cacheKey]);

  if (isLoading) {
    return <ImagePlaceholder className={className} />;
  }

  if (error || !imageUrl) {
    // On error, render the fallback SVG icon
    return <>{children}</>;
  }

  return <img src={imageUrl} alt={alt} className={className} />;
};

export default GeminiImage;