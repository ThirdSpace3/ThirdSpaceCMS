import '../../Root.css'
import './Solutions.css'
import React from 'react';

function Solutions() {
    return (
        <section class="solutions section">
                    <p className="section-label">Solutions</p>

        <h2 class="section-title">Our solution to boost your creativity</h2>
        <div class="solutions-row">
            <div class="solutions-card">
                <div class="solutions-img-box">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-1.png?alt=media&token=f6c5d4f0-90b5-4aa6-9cc0-83d295c11e8e" alt="" class="solutions-img"/>
                </div>
                <h3 class="solutions-card-title">Intuitive Templates</h3>
                <p class="solutions-card-text">Templates made by professionals, use it as you want, All is prepared for you to input your infos.</p>
            </div>
            <div class="solutions-card">
                <div class="solutions-img-box">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-2.png?alt=media&token=bdd13b7f-2e6c-4e01-ada7-fc363c708a32" alt="" class="solutions-img"/>
                </div>
                <h3 class="solutions-card-title">Sections and Blocks</h3>
                <p class="solutions-card-text">Use a large amount of sections and  blocks, already set up for you to use. </p>
            </div>
            <div class="solutions-card">
                <div class="solutions-img-box">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-3.png?alt=media&token=7960f71c-cd9b-4e60-b0c6-e16da75dd773" alt="" class="solutions-img"/>
                </div>
                 <h3 class="solutions-card-title">Starts from Scratch</h3>
                <p class="solutions-card-text">Create your entire site from nothing and be free from template constraints</p>
           </div>
        </div>
    
    </section>
    );
  }
  
  export default Solutions;
