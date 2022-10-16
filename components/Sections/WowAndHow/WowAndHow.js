import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser'
import Select, { components } from 'react-select'
import IconCaretTop from '@/svgs/caret-top.svg'
import { useRouter } from 'next/router';

const WowAndHow = ({ content }) => {
    const { header, subheader, copy, babyStage, ctaText, ctaUrl, showStars, backgroundColor } = {...content.fields}
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


    return (
        <section className="wow-and-how" data-background-color="teal">
            <div className="wow-and-how__container container">
                <div className="wow-and-how__image wow-and-how__image--desktop">
                    <div className="wow-and-how__grid">
                        <Image
                            src={`https:${imageGrid1}`}
                            alt={``}
                            width="465"
                            height="370"
                        />
                        <Image
                            src={`https:${imageGrid2}`}
                            alt={``}
                            width="215"
                            height="185"
                        />
                        <Image
                            src={`https:${imageGrid3}`}
                            alt={``}
                            width="215"
                            height="215"
                        />
                        <Image
                            src={`https:${imageGrid4}`}
                            alt={``}
                            width="465"
                            height="370"
                        />
                    </div>
                </div>
                <div className="wow-and-how__content">
                    <h6 className="wow-and-how__subheader">{ subheader }</h6>
                    {header && <h4 className="wow-and-how__header">{ parse(header) }</h4>}
                    <h5 className="wow-and-how__copy">{ copy }</h5>
                    <div className="wow-and-how__cta">
                        <Link href={ctaUrl}>
                            <button className="btn">
                                <span>{ ctaText }</span>
                            </button>
                        </Link>
                    </div>
                    <div className="wow-and-how__image wow-and-how__image--mobile">
                        <Image
                            src={`https://images.ctfassets.net/urdrzzac4igp/1PQUBAWs7qIxzxDQBgU0YE/b7e3f797e9a8a3212e879cc70abecb9d/Group_266.png`}
                            alt={``}
                            width="785"
                            height="770"
                        />
                    </div>
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
