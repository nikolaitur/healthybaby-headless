import { useEffect } from 'react'
import { useRouter } from 'next/router'

const JazzHR = () => {

  const router = useRouter()

  useEffect(() => {
    const widget = document.getElementById('resumator-wrapper').cloneNode(true)
    const section = document.getElementById('jazzhr-widget-section')
    section.appendChild(widget)
    router.events.on("hashChangeStart", (path) => {
      setTimeout(() => {
        const widget = document.getElementById('resumator-wrapper')
        const section = document.getElementById('jazzhr-widget-section')
        section.appendChild(widget)
      }, 1);
    });
    return () => {
      widget.remove()
      router.events.off('hashChangeStart', 0);
    }
  }, [router])

  return (
    <div id="jazzhr-widget-section" className="jazzhr-widget container">
      Join our Team
    </div>
  )
}

export default JazzHR