import React, { useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'

export default function SwiperProductZoom({ images }) {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="grid grid-cols-12 md:grid-cols-1 gap-4">
      <div className="col-span-9 md:col-span-1 aspect-square">
        <img
          src={activeImage}
          className="h-full w-full object-contain bg-black"
        />
      </div>
      <div className="col-span-3 md:col-span-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {images.map((image: string, index: number) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${image})` }}
              className={`bg-cover w-full aspect-square bg-[#414141]  ${
                activeImage === image ? 'bg-blend-normal' : 'bg-blend-overlay'
              }`}
              onClick={() => setActiveImage(image)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

