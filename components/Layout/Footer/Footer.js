import Link from 'next/link';

import FooterNewsletter from './FooterNewsletter'
import FooterAccordion from './FooterAccordion'
import BrandIcon from '../../../svgs/brand-icon.svg'
import Twitter from '../../../svgs/twitter-logo.svg'
import Youtube from '../../../svgs/youtube-logo.svg'
import Facebook from '../../../svgs/facebook-logo.svg'
import Instagram from '../../../svgs/instagram-logo.svg'
import FooterDetail1 from '../../../svgs/footer-detail-1.svg'
import FooterDetail2 from '../../../svgs/footer-detail-2.svg'

const Footer = ({ content }) => {
    const { mainNavigation, newsletter, copyright, policy, social } = content.fields

    const getSocialIcon = (title) => {
        switch(title){
            case 'Twitter': 
                return <Twitter/>;
            case 'Youtube': 
                return <Youtube/>; 
            case 'Facebook': 
                return <Facebook/>; 
            case 'Instagram': 
                return <Instagram/>; 
        }
    }

    return (
      <footer>
        <div className="footer">
            <div className="footer__container container">
                <FooterNewsletter content={newsletter} />
                <div className="footer__nav">
                    {mainNavigation.map((item, index) => (
                        <div className="footer__wrapper footer__wrapper--main" key={index}>
                            <div className="footer__title">
                                {item.fields.title}
                            </div>
                            <div className="footer__links">
                                {item.fields.links.map((link, index) => (
                                    <div className="footer__link" key={index}>
                                        <Link href={link.fields.url}>
                                            {link.fields.title}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="footer__wrapper footer__wrapper--accordion">
                        {mainNavigation.map((item, index) => (
                            <FooterAccordion key={index} title={item.fields.title} links={item.fields.links} />
                        ))}
                    </div>
                    <div className="footer__wrapper footer__wrapper--brand">
                        <BrandIcon />
                    </div>
                </div>
                <div className="footer__copyright">
                    <div className='footer__legal'>
                        <div className="footer__copy">&copy; {new Date().getFullYear()} {copyright}</div>            
                        <div className="footer__policies">
                            {policy.map((item, index) => (
                                <Link href={item.fields.url} key={index}>
                                    <div className="footer__policy">{item.fields.title}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='footer__social'>
                        {social.map((item, index) => (
                            <Link href={item.fields.url} key={index}>
                                <div className="footer__icon">
                                    {getSocialIcon(item.fields.title)}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="footer__policy footer__policy--mobile">
                        <Link href={policy[0].fields.url}>
                            {policy[0].fields.title}  
                        </Link>
                        <span>|</span>
                        <Link href={policy[1].fields.url}>
                            {policy[1].fields.title}  
                        </Link>
                        <span>|</span>
                        <Link href={policy[2].fields.url}>
                            {policy[2].fields.title}  
                        </Link>
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