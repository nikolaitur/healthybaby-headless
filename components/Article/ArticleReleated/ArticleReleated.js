import React from 'react'
import Link from 'next/link';

import ContentCard from '../../Cards/ContentCard'

let contentData = {
    fields: {
        title: "test title",
        topic: "test topic",
        stage: "test stage",
        image: {
            fields: {
                file: {
                    url: "//images.ctfassets.net/urdrzzac4igp/10EmvyqxiPhFZI4lmw8omv/e1a8ecad90a3edf9a15eaf59ad9ae2d8/Mask_group__14_.png"
                }
            }
        }
    }
}

const ArticleRelated = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url
    return (
        <div className="article-related">
            <div className="article-related__container container">
                <h5 className="article-related__title">More on <i>Topic</i></h5>
                <div className="article-related__items">
                    <ContentCard content={contentData} />
                    <ContentCard content={contentData} />
                    <ContentCard content={contentData} />
                    <ContentCard content={contentData} />
                </div>
                <div className="article-related__cta">
                    <button className="btn secondary">
                        Show More
                    </button>
                </div>
            </div>

            
        </div>
    )
}

export default ArticleRelated
