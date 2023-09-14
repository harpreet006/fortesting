import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const InDoorImages = ({ inDoor }) => {
  const [images, setImages] = useState([]);
  const _renderImage=(item)=> {
    return (
      <div >
       
            <div className='video-wrapper'>
               
                <img src={item.original} alt="whs"/>
                    <button>Save To Waresheet</button> 
               
                </div>
         
      </div>
    );
  }
  useEffect(() => {
    if (inDoor && inDoor.length > 0) {
      let imgArr = [];
      for (let i = 0; i < inDoor.length; i++) {
        imgArr.push({
          original: inDoor[i].url,
          thumbnail: inDoor[i].url,
          renderItem:_renderImage
        });
      }
      setImages(imgArr)
    }
  }, [inDoor]);

  

  return <ImageGallery items={images} />;
};

export default InDoorImages;
