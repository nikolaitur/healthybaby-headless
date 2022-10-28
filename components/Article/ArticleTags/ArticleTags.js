import React from 'react'
import Link from 'next/link';

const ArticleTags = ({ content }) => {
    return (
        <div className="article-tags">
            <div className="article-tags__title">Posted In:</div>
            <div className="article-tags__items">
                <div className="article-tags__item">
                    <Link href="/">
                        <button className="article-tags__btn">Stage</button>
                    </Link>
                </div>
                <div className="article-tags__item">
                    <Link href="/">
                        <button className="article-tags__btn">Topic</button>
                    </Link>
                </div>
                <div className="article-tags__item">
                    <Link href="/">
                        <button className="article-tags__btn">Content Type</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ArticleTags
