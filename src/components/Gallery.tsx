
import React, { useState } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { FiZoomIn, FiShare2, FiHeart } from 'react-icons/fi'

const GalleryContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`

const GalleryItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  aspect-ratio: 1/1;

  &:hover {
    transform: scale(1.02);
  }
`

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`

const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90%;
  position: relative;
`

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`

const sampleImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', alt: 'Mountain landscape' },
  { id: 2, url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', alt: 'Forest path' },
  { id: 3, url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f', alt: 'Ocean waves' },
  { id: 4, url: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b', alt: 'Desert sunset' },
  { id: 5, url: 'https://images.unsplash.com/photo-1518562180175-34a163b1c9c1', alt: 'City skyline' },
  { id: 6, url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', alt: 'Waterfall' },
  { id: 7, url: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b', alt: 'Mountain lake' },
  { id: 8, url: 'https://images.unsplash.com/photo-1518562180175-34a163b1c9c1', alt: 'Beach sunset' },
  { id: 9, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', alt: 'Autumn forest' }
]

function Gallery({ theme }: { theme: string }) {
  const [selectedImage, setSelectedImage] = useState<{id: number, url: string, alt: string} | null>(null)

  return (
    <GalleryContainer>
      <h2>Featured Gallery</h2>
      <GalleryGrid>
        {sampleImages.map((image) => (
          <GalleryItem key={image.id} onClick={() => setSelectedImage(image)}>
            <LazyImage src={image.url} alt={image.alt} />
            <ImageOverlay>
              <IconButton><FiZoomIn /></IconButton>
              <IconButton><FiHeart /></IconButton>
              <IconButton><FiShare2 /></IconButton>
            </ImageOverlay>
          </GalleryItem>
        ))}
      </GalleryGrid>

      {selectedImage && (
        <Modal onClick={() => setSelectedImage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
            <ModalImage src={selectedImage.url} alt={selectedImage.alt} />
          </ModalContent>
        </Modal>
      )}
    </GalleryContainer>
  )
}

function LazyImage({ src, alt }: { src: string, alt: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px'
  })

  return (
    <div ref={ref}>
      {inView ? (
        <GalleryImage src={src} alt={alt} loading="lazy" />
      ) : (
        <GalleryImage src="" alt="" style={{ backgroundColor: '#f0f0f0' }} />
      )}
    </div>
  )
}

export default Gallery
