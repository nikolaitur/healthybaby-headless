import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ArticleSources = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url
    return (
        <div className="article-sources">
            <div className="article-sources__title">Sources:</div>
            <div className="article-sources__items">
                <a href="https://www.mayoclinic.org/diseases-conditions/male-infertility/symptoms-causes/syc-20374773" target="_blank" className="article-sources__item">https://www.mayoclinic.org/diseases-conditions/male-infertility/symptoms-causes/syc-20374773</a> 
                <a href="https://www.nytimes.com/article/male-infertility-guide.html" target="_blank" className="article-sources__item">https://www.nytimes.com/article/male-infertility-guide.html</a>
                <a href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/male-infertility" target="_blank" className="article-sources__item">https://www.hopkinsmedicine.org/health/conditions-and-diseases/male-infertility</a>
                <a href="https://www.nichd.nih.gov/health/topics/menshealth/conditioninfo/infertility" target="_blank" className="article-sources__item">https://www.nichd.nih.gov/health/topics/menshealth/conditioninfo/infertility</a>
            </div>
        </div>
    )
}

export default ArticleSources
