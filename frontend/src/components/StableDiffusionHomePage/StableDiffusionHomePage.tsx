import React from 'react';
import './styles.css';

const StableDiffusionHomepage = () => {
  return (
    <div className="stable-diffusion-homepage">
      <header>
        <img src="https://i.imgur.com/1234567.png" alt="Clipdrop by stability.ai" />
        <h1>STABLE DIFFUSION XL</h1>
        <h2>SDXL 1.0: A Leap Forward in Al Image Generation</h2>
      </header>
      <main>
        <input type="text" placeholder="Enter your prompt" />
        <button type="button">Generate</button>
      </main>
    </div>
  );
};

export default StableDiffusionHomepage;
