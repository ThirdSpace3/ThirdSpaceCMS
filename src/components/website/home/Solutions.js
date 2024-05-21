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
                    <img src="./images/solutions-1.png" alt="" class="solutions-img"/>
                </div>
                <h3 class="solutions-card-title">Intuitive Templates</h3>
                <p class="solutions-card-text">Templates made by professionals, use it as you want, All is prepared for you to input your infos.</p>
            </div>
            <div class="solutions-card">
                <div class="solutions-img-box">
                    <img src="./images/solutions-2.png" alt="" class="solutions-img"/>
                </div>
                <h3 class="solutions-card-title">Sections and Blocks</h3>
                <p class="solutions-card-text">Use a large amount of sections and  blocks, already set up for you to use. </p>
            </div>
            <div class="solutions-card">
                <div class="solutions-img-box">
                    <img src="./images/solutions-3.png" alt="" class="solutions-img"/>
                </div>
                 <h3 class="solutions-card-title">Starts from Scratch</h3>
                <p class="solutions-card-text">Create your entire site from nothing and be free from template constraints</p>
           </div>
        </div>
    
    </section>
    );
  }
  
  export default Solutions;
