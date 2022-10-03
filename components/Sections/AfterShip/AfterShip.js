import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AfterShip = () => {

  const router = useRouter()

  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'aftership-widget'
    script.innerHTML = (function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n))return;r=e.createElement(t);r.id=n;r.src="https://button.aftership.com/all.js";i.parentNode.insertBefore(r,i)})(document,"script","aftership-jssdk")
    script.async = true;
    document.body.appendChild(script);
    if (window && window.aftership) {
      aftership.buttonCreator.create()
    }
    return () => {
      document.body.removeChild(script);
    };

  }, [router])

  return (
    <div className="aftership-widget">
      <div id="as-root"></div>
      <div className="as-track-button" data-size="medium" data-domain="healthynesting.aftership.com" data-look-up-option="both" data-btn-bg-color="#00b38f" data-hide-icon="true" data-center="true"></div>
    </div>
  )
}

export default AfterShip