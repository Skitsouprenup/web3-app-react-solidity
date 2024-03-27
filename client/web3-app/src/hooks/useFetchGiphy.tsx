import { useEffect, useState } from 'react';

export const useFetchGiphy = ({keyword}: {keyword:string}) => {
  const [gifUrl, setGifUrl] = useState<string>('');

  const getGif = async () => {
    try {

      const API_KEY = import.meta.env.VITE_GIPHY_API;
  
      const fetchGif = 
        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.replace(/s/g, '')}&limit=1`);
      
      const { data } = await fetchGif.json();
      setGifUrl(data[0]?.images?.downsized_medium?.url)
      //setGifUrl('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjBweWkxYXhzNThmbjVsN2NsMWExejI0NXdzNm9pamdndTl0ZTF6YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.gif');
    }
    catch(error) {
      console.error(error);
      setGifUrl('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjBweWkxYXhzNThmbjVsN2NsMWExejI0NXdzNm9pamdndTl0ZTF6YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.gif');
    }
  }

  useEffect(() => {
    if(keyword) getGif();
  },[keyword]);

  return gifUrl;
}