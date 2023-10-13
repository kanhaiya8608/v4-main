import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Typewriter } from 'react-simple-typewriter';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion, useAOS } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  useAOS();
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Kanhaiya Verma</h2>;
  const three = (
    <h3 className="big-heading">
      <Typewriter
        words={[
          'Crafting digital dreams one at a time.',
          'Transforming ideas into digital reality.',
          'Designing tomorrow\'s solutions today.',
          'Elevating ideas through the artistry of programming.',
        ]}
        loop={0}
        cursor
        cursorStyle="_"
        typeSpeed={40}
        deleteSpeed={50}
        delaySpeed={8000}
      />
    </h3>
  );
  const four = (
    <>
      <p>
        I'm an India-based software developer with a passion for creative solutions and innovation.
        Let's work together to bring your digital ideas to life.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.linkedin.com/in/kanhaiyaverma/"
      target="_blank"
      rel="noreferrer">
      Get in touch!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div data-aos="fade-up" data-aos-delay={`${i * 100}`} key={i}>
              {item}
            </div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
