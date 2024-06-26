import '../../Root.css'
import './Solutions.css'
import React from 'react';

function Solutions() {
    return (
        <section class="solutions">
        <div class="solutions-header">
            <p className="section-label">Features</p>
            <h2 class="section-title">What can you do with Third Space?</h2>
            <p class="section-text">Build landing pages, marketplaces, and dApps effortlessly with our no-code Web 3 tool.</p>
        </div>
                    
        <div class="solutions-content">
        <div class="solutions-row">
        <div class="solutions-row-card solutions-row-card-left">
        <div className='solutions-row-card-header'>
        <h3 className='solutions-row-card-title'>Intuitive Design & Layout Customization</h3>
        <p className='solutions-row-card-subtitle'>Customize layouts with easy drag-and-drop tools, no coding required.</p>  
        </div>
        <img className='solutions-row-card-img'      
        src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-row-card-1.png?alt=media&token=90c7be2f-3f67-42ea-9ebf-c92283200a72'></img>
            
            </div>
            <div class="solutions-row-card solutions-row-card-right">
            <div className='solutions-row-card-header'>
        <h3 className='solutions-row-card-title'>Extensive Template Library</h3>
        <p className='solutions-row-card-subtitle'>Choose from numerous professional templates for quick and easy customization.</p>  
        </div>
        <img className='solutions-row-card-img-2' 
        src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-row-card-2.png?alt=media&token=46237433-7c49-4491-a164-b3fec30ace8c'></img>
            </div>
        </div>
        <div class="solutions-row">
        <div class="solutions-row-card solutions-row-card-right">
            <div className='solutions-row-card-header'>
        <h3 className='solutions-row-card-title'>Seamless Wallet Integration</h3>
        <p className='solutions-row-card-subtitle'>Integrate popular Web 3 wallets for secure and easy user transactions.</p>  
        </div>
        <img className='solutions-row-card-img' 
        src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-row-card-3.png?alt=media&token=fb2d30e6-d6e4-455b-acee-e75fef30439b'></img>
            </div>
        <div class="solutions-row-card solutions-row-card-left">
        <div className='solutions-row-card-header'>
        <h3 className='solutions-row-card-title'>Efficient Domains Management</h3>
        <p className='solutions-row-card-subtitle'>Manage and customize your domains effortlessly from our platform.</p>  
        </div>
        <img className='solutions-row-card-img-4'      
        src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsolutions-row-card-4.png?alt=media&token=3e39e9f7-bb63-4ace-a52d-60f46f40e2b6'></img>
            
            </div>
            
        </div>
            
        </div>
    
    </section>
    );
  }
  
  export default Solutions;
