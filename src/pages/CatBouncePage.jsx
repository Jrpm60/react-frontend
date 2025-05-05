import React, { useState } from "react";
import "./CatBounce.css";
import AppBarSelf from '../components/AppBarSelf';

const catUrls = [
  "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "https://media4.giphy.com/media/cfuL5gqFDreXxkWQ4o/giphy.gif",
  "https://media4.giphy.com/media/o0vwzuFwCGAFO/giphy.gif",
  "https://media3.giphy.com/media/Ov5NiLVXT8JEc/giphy.gif"
];

export default function CatBouncePage() {
  const [cats, setCats] = useState(generateCats(1));

  function getRandomCatUrl() {
    const randomIndex = Math.floor(Math.random() * catUrls.length);
    return catUrls[randomIndex];
  }

  function generateCats(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      url: getRandomCatUrl(),
      left: Math.random() * 90 + "%",
      duration: Math.random() * 2 + 1.5 + "s"
    }));
  }

  function addCat() {
    setCats((prev) => [
      ...prev,
      {
        id: prev.length,
        url: getRandomCatUrl(),
        left: Math.random() * 90 + "%",
        duration: Math.random() * 2 + 1.5 + "s"
      }
    ]);
  }

  function changeCat() {
    const newCatUrl = getRandomCatUrl();
    setCats((prevCats) =>
      prevCats.map((cat) => ({ ...cat, url: newCatUrl }))
    );
  }

  const appBarButtonsHome = [    
    { label: 'Página Principal', to: '/' },
  
  ];

  return (


    <div className="container">

        <AppBarSelf title="Mern/Reacrt/Pages/CatBouncePage.jsx" buttons={appBarButtonsHome} />

      {cats.map((cat) => (
        <img
          key={cat.id}
          src={cat.url}
          alt="bouncing cat"
          className="cat"
          style={{ left: cat.left, animationDuration: cat.duration }}
        />
      ))}
      <button onClick={addCat} className="add-button">Add Cat</button>
      <button onClick={changeCat} className="change-button">New Cat</button>
      <button className="media-button"> 🔀 Compartir</button>
    </div>
  );
}
