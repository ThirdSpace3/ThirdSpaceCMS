import './Partners.css';
import '../../Root.css';
import React, { useState } from 'react';


function PartnersHP() {
    const images = [1, 3, 4, 2];
    const repeatedImages = Array.from({ length: 15 }, () => images);
    const flattenedImages = [].concat.apply([], repeatedImages);
  
    return (
      <section className="partners-section">
        <div className="partners-content partners-content-mobile">
          {flattenedImages.map((imageNumber) => (
            <img
              key={imageNumber}
              className="partners-img"
              src={`./images/partnersHP-${imageNumber}.png`}
            />
          ))}
        </div>
        <div className="partners-content partners-content-pc">
<img className="partners-img" src='./images/partnersHP-1.png'/>
<img className="partners-img" src='./images/partnersHP-3.png'/>
<img className="partners-img" src='./images/partnersHP-4.png'/>
<img className="partners-img" src='./images/partnersHP-2.png'/>
</div>
      </section>
    );
  }
  
  
  export default PartnersHP;