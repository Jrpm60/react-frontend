import React, { useEffect, useState } from 'react';

export function useEmoji () {
  const [emoji, setEmoji] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/random-emoji')
      .then(response => response.json())
      .then(data => {
        setEmoji(data.emoji); 
      })
      .catch(error => {
        console.error('Error fetching the emoji:', error);
      });
  }, []); // Empty dependency array, so it runs once when the component mounts

  return {emoji};
}