import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion, useAOS } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useAOS();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript (ES6+)',
    'Java',
    'React',
    'Next.js',
    'Node.js',
    'WordPress/Webflow',
    'Formik',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 data-aos="fade-up" className="numbered-heading">
        About Me
      </h2>

      <div className="inner">
        <StyledText>
          <div data-aos="fade-up">
            <p>
              {' '}
              Hello! I'm Kanhaiya Verma, a Computer Science and Engineering graduate (2019-2022)
              from Lovely Professional University with a GPA of{' '}
              <a
                href="https://drive.google.com/file/d/1rn-nPIshVAPzEbLjl0BRu48mHNvTxsQO/view?usp=drive_link"
                target="_blank"
                rel="noreferrer">
                7.58/10
              </a>
              .
            </p>
            {/* <p>My journey into the world of web development ignited back in 2012 when I ambitiously attempted to recreate the Windows 8 launch page using HTML &amp; CSS. It was during these early days of experimentation that I uncovered the profound potential of coding and its ability to shape the digital landscape.</p> */}
            <p>
              I specialize in web development, with skills in JavaScript, Java, ReactJS, and more.
              During my time at{' '}
              <a href="https://vertocity.in/" target="_blank" rel="noreferrer">
                Ivar Kefi Ventures
              </a>
              , I contributed to web design and development, resulting in a 25% increase in
              click-through rates and a 30% improvement in website speed. As an intern at{' '}
              <a href="https://www.gailonline.com/" target="_blank" rel="noreferrer">
                GAIL (India) Ltd.
              </a>
              , I enhanced efficiency by 20% through technical reviews and innovation.
            </p>
            <p>
              I'm certified in{' '}
              <a
                href="https://www.coursera.org/user/98e3434025b2900b6f2ac538929ff7d0"
                target="_blank"
                rel="noreferrer">
                web development
              </a>{' '}
              and automation, aiming to create inclusive digital experiences. Let's collaborate on
              building exceptional digital solutions that make a difference.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills &&
              skills.map((skill, i) => (
                <li data-aos="fade-up" data-aos-delay={`${i * 50}`} key={i}>
                  {skill}
                </li>
              ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper" data-aos="fade-left">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              height={800}
              width={600}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
