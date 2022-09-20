import React from 'react'

const ArticleContent = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url
    return (
        <div className="article-content">
            {content ? (
                <>
                    <h5>The Backstory</h5>
                    <p>After my water broke 16 weeks into my second pregnancy, doctors told me that we were losing my daughter and forced me onto bed rest for the remainder of the pregnancy. My Asha showed me with every scan that she was a fighter who would not take no for an answer, and she persisted on hope and everyone’s prayers until 38 weeks when she arrived, beautiful and healthy. </p>
                    <p>It was atypical for me–a workaholic entrepreneur CEO–to take maternity leave to bond and be together. When I had my son Zane in 2010, I was running one of the fastest growing businesses in America as the Founder & CEO of Happy Baby Organics. It was only after 10 days of maternity leave that I had to jump right back into the fray of building my business with my pump in tow. Not nearly enough time to recover from a c-section! At age 2 my son Zane was diagnosed with autism, which set in motion deep research about creating the optimal conditions for a healthy pregnancy and connected babies, all of which I used to inform my second pregnancy and ultimately my second business, Healthybaby. So when I had my daughter Asha in 2016 after an IVF marathon, I decided to take a full 3 months to rest, recover, and connect with my miracle baby.</p>
                    <blockquote>“Block quote our bed rest together, we really got to know each other. I told her everything I could think of, read her stories, and shared jokes together (I noticed she would kick more after Indian food). But we really hit it off after her birth.”</blockquote>
                    <p>Your child is much less likely to be happy with bedtime if she feels she is missing out on all the fun. If possible, plan evening activities after the kiddos are all in bed. Don't start your child's favorite movie unless you have adequate time to finish it. And try to get the entire family involved, even if there are other members of the family who go to bed later.</p>
                </>
            ) : (
                <>
                    <p>Here’s a few things I learned about bonding with your baby and what I encourage every parent to focus on for deeper connections with their child:</p>
                    <h6>1. First focus on yourself</h6>
                    <p>Distractions are everywhere, and we often forget to ground ourselves before connecting with our baby so we can be fully present. I like to focus on two things to ground myself: my breath and gratitude. There are so many great breathing exercises, but the one I like is called “box breathing:” Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds, repeat. For gratitude, I like to think of the prompt, “I am so thankful that my baby…” and fill in the blank. </p>
                    <h6>2. First focus on yourself</h6>
                    <p>Distractions are everywhere, and we often forget to ground ourselves before connecting with our baby so we can be fully present. I like to focus on two things to ground myself: my breath and gratitude. There are so many great breathing exercises, but the one I like is called “box breathing:” Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds, repeat. For gratitude, I like to think of the prompt, “I am so thankful that my baby…” and fill in the blank. </p>
                    <h6>3. First focus on yourself</h6>
                    <p>Distractions are everywhere, and we often forget to ground ourselves before connecting with our baby so we can be fully present. I like to focus on two things to ground myself: my breath and gratitude. There are so many great breathing exercises, but the one I like is called “box breathing:” Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds, repeat. For gratitude, I like to think of the prompt, “I am so thankful that my baby…” and fill in the blank. </p>
                    <h6>4. First focus on yourself</h6>
                    <p>Distractions are everywhere, and we often forget to ground ourselves before connecting with our baby so we can be fully present. I like to focus on two things to ground myself: my breath and gratitude. There are so many great breathing exercises, but the one I like is called “box breathing:” Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds, repeat. For gratitude, I like to think of the prompt, “I am so thankful that my baby…” and fill in the blank. </p>
                </>
            )}
        </div>
    )
}

export default ArticleContent
