import BrandIcon from '../../../svgs/brand-icon.svg'
import Twitter from '../../../svgs/twitter-logo.svg'
import Youtube from '../../../svgs/youtube-logo.svg'
import Facebook from '../../../svgs/facebook-logo.svg'
import Instagram from '../../../svgs/instagram-logo.svg'
import FooterDetail1 from '../../../svgs/footer-detail-1.svg'
import FooterDetail2 from '../../../svgs/footer-detail-2.svg'

const Footer = ({ content }) => {
    const { mainNavigation } = content.fields
    console.log(mainNavigation)
    return (
      <footer>
        <div className="footer">
            <div className="footer__container">
                <div className="footer__newsletter">
                    <div className="footer__eyebrow">OUR WEEKLY NEWSLETTER</div>
                    <div className="footer__header">Get expert insights, developmental activities, community events & personalized support</div>
                </div>
                <div className="footer__nav">
                    {mainNavigation.map((item, index) => (
                        <div className="footer__wrapper" key={index}>
                            <div className="footer__title">
                                {item.fields.title}
                            </div>
                            <div className="footer__links">
                                {item.fields.links.map((link, index) => (
                                    <div class="footer__link" key={index}>
                                        {link.fields.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="footer__wrapper footer__wrapper--brand">
                        <BrandIcon />
                    </div>
                </div>
                <div className="footer__copyright">
                    <div className='footer__legal'>
                        <div className="footer__copy">&copy; {new Date().getFullYear()} Fewer Better Things Inc.,  All Rights Reserved.</div>            
                        <div className="footer__policies">
                            <div className="footer__policy">Terms Of Use</div>
                            <div className="footer__policy">Privacy Policy</div>
                            <div className="footer__policy">Accessibility Statement  </div>
                        </div>
                    </div>
                    <div className='footer__social'>
                        <div className="footer__icon">
                            <Twitter/>
                        </div>
                        <div className="footer__icon">
                            <Youtube/>
                        </div>
                        <div className="footer__icon">
                            <Facebook/>
                        </div>
                        <div className="footer__icon">
                            <Instagram/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__detail footer__detail--1" >
                <FooterDetail1/>
            </div>
            <div className="footer__detail footer__detail--2" >
                <FooterDetail2/>
            </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;