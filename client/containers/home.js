import React from 'react'

import hero from '../assets/hero.jpg'

export default function Home() {
  return (
    <div className={'home-container'}>
      <section id={'hero'}>
        <div className={'tag-line-container'}>
          <div className={'tag-line-content'}>
            <h1>Welcome to <span className={'logo-font'}>Street Share</span>, the community sharing app.</h1>
          </div>
          
        </div>
        <div className={'hero-image-container'}>
         <img src={hero} />
        </div>
      </section>
      <section id={'how-it-works'}>
      
      </section>
      <section>
      
      </section>
    </div>
  )
}
