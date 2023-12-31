import Link from 'next/link';

import FooterNewsletter from './FooterNewsletter'
import FooterAccordion from './FooterAccordion'
import BrandIcon from '@/svgs/brand-icon.svg'
import Twitter from '@/svgs/twitter-logo.svg'
import Youtube from '@/svgs/youtube-logo.svg'
import Facebook from '@/svgs/facebook-logo.svg'
import Instagram from '@/svgs/instagram-logo.svg'
import FooterDetail1 from '@/svgs/footer-detail-1.svg'
import FooterDetail2 from '@/svgs/footer-detail-2.svg'
import FooterDetailMobile1 from '@/svgs/footer-detail-mobile-1.svg'
import FooterDetailMobile2 from '@/svgs/footer-detail-mobile-2.svg'
import FooterDetailMobile3 from '@/svgs/footer-detail-mobile-3.svg'

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
                    <div className="footer__nav-main">
                      {mainNavigation.map((item, index) => (
                          <div className="footer__wrapper footer__wrapper--main" key={index}>
                              <div className="footer__title">
                                  {item.fields.title}
                              </div>
                              {item.fields?.links ? (
                                  <div className="footer__links">
                                      {item.fields.links.map((link, index) => (
                                          <div className="footer__link" key={index}>
                                              <Link href={link?.fields?.url || ''}>
                                                  {link?.fields?.title || ''}
                                              </Link>
                                          </div>
                                      ))}
                                  </div>
                              ) : ""}

                          </div>
                      ))}
                    </div>
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
                        {content.fields?.policy ? (
                            <div className="footer__policies">
                                {policy.map((item, index) => (
                                    <Link href={item?.fields?.url || ''} key={index}>
                                        <div className="footer__policy">{item?.fields?.title || ''}</div>
                                    </Link>
                                ))}
                            </div>
                        ) : ""}
                    </div>
                    {content.fields?.social ? (
                        <div className='footer__social'>
                            {social.map((item, index) => (
                                <a className="footer__icon" target="_blank" rel="noreferrer" href={item.fields.url} key={index}>
                                    {getSocialIcon(item.fields.title)}
                                </a>
                            ))}
                        </div>
                    ) : "" }

                    <div className="footer__policy footer__policy--mobile">
                        {content.fields?.policy ? (
                            <Link href={policy[0]?.fields?.url || ''}>
                                {policy[0]?.fields?.title || ''}
                            </Link>
                        ) : ""}

                        {content.fields?.policy ? (
                            <>
                                <span>|</span>
                                <Link href={policy[1]?.fields?.url || ''}>
                                    {policy[1]?.fields?.title || ''}
                                </Link>
                            </>
                        ) : ""}

                        {content.fields?.policy ? (
                            <>
                                <span>|</span>
                                <Link href={policy[2]?.fields?.url || ''}>
                                    {policy[2]?.fields?.title || ''}
                                </Link>
                            </>
                        ) : ""}
                    </div>
                </div>
            </div>
            <div className="footer__detail footer__detail--desktop footer__detail--desktop-1">
                <FooterDetail1 />
            </div>
            <div className="footer__detail footer__detail--desktop footer__detail--desktop-2">
                <FooterDetail2 />
            </div>

            <div className="footer__detail footer__detail--mobile footer__detail--mobile-1">
                <FooterDetailMobile1 />
            </div>
            <div className="footer__detail footer__detail--mobile footer__detail--mobile-2">
                <FooterDetailMobile2 />
            </div>
            <div className="footer__detail footer__detail--mobile footer__detail--mobile-3">
                <FooterDetailMobile3 />
            </div>
        </div>
      </footer>
    );
  };

  export default Footer;