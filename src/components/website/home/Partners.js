import './Partners.css';
import '../../Root.css';
import React, { useState } from 'react';

function PartnersHP() {
    const firebaseUrls = [
        'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FpartnersHP-1.png?alt=media&token=03e4d06e-d214-438e-a047-1f2973b27a1d',
        'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FpartnersHP-3.png?alt=media&token=39302e87-2779-40d8-a6ec-5c314bcb03f4',
        'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FpartnersHP-4.png?alt=media&token=b9a5bf8b-5f0a-4ee4-a855-619b52ec0d6a',
        'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FpartnersHP-2.png?alt=media&token=cfd8bb43-b43e-4fc6-8d18-ce1293ffb244'
    ];
    const repeatedImages = Array.from({ length: 15 }, () => firebaseUrls).flat();

    return (
        <section className="partners-section">
            <div className="partners-content partners-content-mobile">
                {repeatedImages.map((url, index) => (
                    <img
                        key={index}
                        className="partners-img"
                        alt='third space builder web 3 no-code tools web3 platform'
                        src={url}
                    />
                ))}
            </div>
            <div className="partners-content partners-content-pc">
                {firebaseUrls.map((url, index) => (
                    <img
                        key={index}
                        className="partners-img"
                        alt='third space builder web 3 no-code tools web3 platform'
                        src={url}
                    />
                ))}
            </div>
        </section>
    );
}

export default PartnersHP;
