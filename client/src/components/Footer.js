import React from 'react'
import './style/Footer.css'

import { YouTube, Twitter, LinkedIn, Facebook } from '@mui/icons-material'



function Footer() {
    return (
        <div className='footerSection'>
            <br/><br/>
            <hr/>
            <div className='footerSection-container'>
                <div className='footer-row'>
                    <div>The Box Movies</div>
                    <div className='footer-socialmedia-icons-container'>
                        <div><Facebook/></div>
                        <div><LinkedIn/></div>
                        <div><Twitter/></div>
                        <div><YouTube/></div>
                    </div>
                </div>
                <div className='footer-row'>
                    <div>Home</div>
                    <div>Why Mixmax?</div>
                </div>
                <div className='footer-row'>
                    <div>Product</div>
                    <div>Sequences + Engagement</div>
                    <div>Rules + Workflow</div>
                    <div>Reporting</div>
                    <div>Calendar + Scheduling</div>
                    <div>Integrations</div>
                </div>
                <div className='footer-row'>
                    <div>Role</div>
                    <div>Account Executive</div>
                    <div>Customer Success</div>
                    <div>Revenue Operations</div>
                    <div>Sales Development</div>
                    <div>Leadership</div>
                </div>
                <div className='footer-row'>
                    <div>Pricing</div>
                    <div>Resources</div>
                </div>
                <div className='footer-row'>
                    <div>Company</div>
                    <div>About</div>
                    <div>Careers</div>
                    <div>Support</div>
                    <div>Platform Status</div>
                    <div>Legal</div>
                </div>
            </div>
            <hr/>
            <br/><br/>
        </div>
    )
}

export default Footer
