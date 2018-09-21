import React from 'react';
import "../styles/Landing.css"

const Landing = () => (

 <section className="landing row">
 <div className="col-sm-4 col-sm-offset-4 landing-banner">
 <div className="hero-title-wrapper"> 
 <img src = "assets/images/blurred_backgrounds/black-and-white-close-up-close-up-view-21323.JPG" />
  <h1 className="hero-title">Turn the music up!</h1>
  </div>
 </div>

  <section className="selling-points row">
  <div className="col-sm-4" >
  <div className="point">
    <h2 className="point-title">Choose your music</h2>
    <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
  </div>
  </div>

  <div className="col-sm-4" >
   <div className="point">
     <h2 className="point-title">Unlimited, streaming, ad-free</h2>
     <p className="point-description">No arbitrary limits. No distractions.</p>
   </div>
   </div>

   <div className="col-sm-4" >
   <div className="point">
     <h2 className="point-title">Mobile enabled</h2>
     <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
     </div>
     </div>

 </section>

</section>
);

export default Landing;
