import React, { useState, useEffect } from 'react'
import style from './ImageFileList.module.css';
import API from '../../api/index';

function ImageFileList({ clickFunc }) {
  const [ filePathList, setFilePathList ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.IMAGE_LIST.GET();
      setFilePathList(data);
    };

    fetchData();
  }, []);

  const images = filePathList.map(o => {
    return (
      <img className={style['thumbnail']} 
           key={o.id} 
           src={o.imageUrl} 
           onClick={() => clickFunc(o.imageUrl)}
           alt="Thumbnail"
      />
    );
  });

  return (
    <div className={style['image-file-list']}>
      {images}
    </div>
  )
}

export default ImageFileList
