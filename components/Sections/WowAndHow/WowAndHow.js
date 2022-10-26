import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser'
import Select, { components } from 'react-select'
import IconCaretTop from '@/svgs/caret-top.svg'
import { useRouter } from 'next/router';
import ThreeStarsIcon from '@/svgs/three-stars.svg'
import TwoStarsIcon from '@/svgs/two-stars.svg'
import ThreeStarsReversesIcon from '@/svgs/three-stars-reverse.svg'
import OneStarIcon from '@/svgs/one-star.svg'

const WowAndHow = ({ content }) => {
    const { header, subheader, copy, babyStage, ctaText, ctaUrl, displayStars } = {...content.fields}
    const imageGrid1 = content.fields.imageGrid1.fields.file.url
    const imageGrid2 = content.fields.imageGrid2.fields.file.url
    const imageGrid3 = content.fields.imageGrid3.fields.file.url
    const imageGrid4 = content.fields.imageGrid4.fields.file.url
    const router = useRouter()

    // if(backgroundColor.indexOf('#') !== 0) {
    //     backgroundColor = "#C7E0E5"
    // }

    const DropdownIndicator = props => {
        return (
          components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
              <div className="dropdown-selector__arrow-open"><IconCaretTop /></div>
            </components.DropdownIndicator>
          )
        )
      }

    const colourStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected || state.isFocused ? '#00B188' : '#fff',
            color: state.isSelected || state.isFocused ? '#fff' : '#3D3331',
        }),
    }

    const buildImages = (view) => {
        return (
            <div className={`wow-and-how__image wow-and-how__image--${view}`}>
                <div className="wow-and-how__grid">
                    <div className="wow-and-how__upper-grid">
                        <div className="wow-and-how__grid-image">
                            {displayStars && <div className="wow-and-how__stars">
                                <ThreeStarsReversesIcon />
                            </div>}
                            <Image
                                src={`https:${imageGrid1}`}
                                alt={``}
                                layout="fill"
                                sizes="60vw"
                            />
                        </div>
                        <div className="wow-and-how__grid-image">
                            {displayStars && <div className="wow-and-how__stars">
                                <TwoStarsIcon />
                            </div>}
                            <Image
                                src={`https:${imageGrid2}`}
                                alt={``}
                                layout="fill"
                                sizes="27vw"
                            />
                        </div>
                    </div>
                    <div className="wow-and-how__lower-grid">
                        <div className="wow-and-how__grid-image">
                            {displayStars && <div className="wow-and-how__stars">
                                <OneStarIcon />
                            </div>}
                            <Image
                                src={`https:${imageGrid3}`}
                                alt={``}
                                layout="fill"
                                sizes="27vw"
                            />
                        </div>
                        <div className="wow-and-how__grid-image">
                            {displayStars && <div className="wow-and-how__stars">
                                <ThreeStarsIcon />
                            </div>}
                            <Image
                                src={`https:${imageGrid4}`}
                                alt={``}
                                layout="fill"
                                sizes="60vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="wow-and-how" data-background-color={content.fields?.backgroundColor ? content.fields.backgroundColor.toLowerCase() : ""}>
            <div className="wow-and-how__container container">
                {buildImages('desktop')}
                <div className="wow-and-how__content">
                    <h6 className="wow-and-how__subheader">{ subheader }</h6>
                    {header && <h2 className="wow-and-how__header">{ parse(header) }</h2>}
                    <h5 className="wow-and-how__copy">{ copy }</h5>
                    <div className="wow-and-how__cta">
                        <Link href={ctaUrl}>
                            <button className="btn">
                                <span>{ ctaText }</span>
                            </button>
                        </Link>
                    </div>
                    {buildImages('mobile')}
                    <div className="wow-and-how__subheader">BROWSE BY STAGE</div>
                    <div className="wow-and-how__stages">
                        <Select
                            onChange={(e) => {
                                router.push(e.value)
                            }}
                            className={`select-dropdown-selector`}
                            classNamePrefix="react-select"
                            options={babyStage.map(stage => ({
                                value: stage.fields.ctaUrl,
                                label: stage.fields.ctaText
                            }))}
                            value={''}
                            components={{ DropdownIndicator }}
                            placeholder={'Select A Stage'}
                            styles={colourStyles}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WowAndHow
