import './Roadmap.css'
import '../../Root.css'
import React from 'react';

function Roadmap() {
    return (

        <section class="roadmap section" id="roadmap">

            <p class="section-label">Features Roadmap</p>
            <h2 class="section-title">Want to know what is coming ?</h2>

            <div class="roadmap-content">
                <div class="roadmap-content-row">
                    <div class="roadmap-dot-live"></div>
                    <div class="roadmap-content-right">
                        <p class="roadmap-label-live">Live</p>
                        <h3 class="roadmap-feature">Editable Template</h3>
                    </div>
                </div>
                <div class="roadmap-separator"></div>
                <div class="roadmap-content-row">
                    <div class="roadmap-dot"></div>
                    <div class="roadmap-content-right">
                        <p class="roadmap-label">Coming Soon</p>
                        <h3 class="roadmap-feature">CMS section by section</h3>
                    </div>
                </div>
                <div class="roadmap-content-row">
                    <div class="roadmap-dot"></div>
                    <div class="roadmap-content-right">
                        <p class="roadmap-label">Coming Soon</p>
                        <h3 class="roadmap-feature">CMS from scratch</h3>
                    </div>
                </div>
                <div class="roadmap-content-row">
                    <div class="roadmap-dot"></div>
                    <div class="roadmap-content-right">
                        <p class="roadmap-label">Coming Soon</p>
                        <h3 class="roadmap-feature">Help Center</h3>
                    </div>
                </div>
                <div class="roadmap-content-row">
                    <div class="roadmap-dot"></div>
                    <div class="roadmap-content-right">
                        <p class="roadmap-label">Coming Soon</p>
                        <h3 class="roadmap-feature">Chat Bot</h3>
                    </div>
                </div>
                <div class="roadmap-content-row">
                    <div class="roadmap-dot"></div>
                    <div class="roadmap-content-right">
                        <p class="roadmap-label">Coming Soon</p>
                        <h3 class="roadmap-feature">Add Analytics in dashboard</h3>
                    </div>
                </div>
                <div class="roadmap-content-row">
                    <div class="roadmap-dot"></div>
                    <div class="roadmap-content-right">
                        <p class="roadmap-label">Coming Soon</p>
                        <h3 class="roadmap-feature">Customable Marketplace</h3>
                    </div>
                </div>
            </div>

        </section>

    );
}

export default Roadmap;
