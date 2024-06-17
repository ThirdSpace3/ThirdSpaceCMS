import '../../Root.css'
import './Solutions.css'
import React from 'react';

function Solutions() {
    return (
        <section class="solutions">
        <div class="solutions-header">
            <p className="section-label">Features</p>
            <h2 class="section-title">What can you do with Third Space?</h2>
            <p class="section-text">Build landing pages, marketplaces, and dApps effortlessly with our no-code Web 3 platform.</p>
        </div>
                    
        <div class="solutions-content">
        <div class="solutions-row">
        <div class="solutions-row-card solutions-row-card-left">
        <div className='solutions-row-card-header'>
        <h3 className='solutions-row-card-title'>Intuitive Design & Layout Customization</h3>
        <p className='solutions-row-card-subtitle'>Customize layouts with easy drag-and-drop tools, no coding required.</p>  
        </div>
        <img className='solutions-row-card-img'      
        src='./images/solutions-row-card-1.png'></img>
            
            </div>
            <div class="solutions-row-card solutions-row-card-right">
            <div className='solutions-row-card-header'>
        <h3 className='solutions-row-card-title'>Extensive Template Library</h3>
        <p className='solutions-row-card-subtitle'>Choose from numerous professional templates for quick and easy customization.</p>  
        </div>
        <img className='solutions-row-card-img-2' 
        src='./images/solutions-row-card-2.png'></img>
            </div>
        </div>
        <div class="solutions-row">
        <div class="solutions-row-card solutions-row-card-right">
            <div className='solutions-row-card-header'>
        <h3 className='solutions-row-card-title'>Seamless Wallet Integration</h3>
        <p className='solutions-row-card-subtitle'>Integrate popular Web 3 wallets for secure and easy user transactions.</p>  
        </div>
        <img className='solutions-row-card-img solutions-row-card-img-3' 
        src='./images/solutions-row-card-3.png'></img>
            </div>
        <div class="solutions-row-card solutions-row-card-left">
        <div className='solutions-row-card-header'>
        <h3 className='solutions-row-card-title'>Efficient Domains Management</h3>
        <p className='solutions-row-card-subtitle'>Manage and customize your domains effortlessly from our platform.</p>  
        </div>
        <img className='solutions-row-card-img-4'      
        src='./images/solutions-row-card-4.png'></img>
            
            </div>
            
        </div>
            
        </div>
    
    </section>
    );
  }
  
  export default Solutions;
