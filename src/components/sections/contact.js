import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { getCalApi } from '@calcom/embed-react';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  useEffect(() => {
    (async function() {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#112240',
            'cal-text': '#020c1b', // White text
            'cal-text-emphasis': '#495670', // Orange text
            'cal-border-emphasis': '#112240', // Orange border
            'cal-text-error': '#f44336', // Red for errors
            'cal-border': '#38bdf8', // Dark blue border
            'cal-border-default': '#38bdf8', // Dark blue border
            'cal-border-subtle': '#0a192f', // Lighter blue border
            'cal-border-booker': '#0a192f', // Lighter blue border
            'cal-text-muted': '#6e7d92', // Gray text for muted elements
            'cal-bg-emphasis': '#38bdf8', // Orange background for emphasis
          },
        },
      });
    })();
  }, []);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 data-aos="fade-up" data-aos-delay="50" className="numbered-heading overline">
        What’s Next?
      </h2>

      <h2 data-aos="fade-up" data-aos-delay="100" className="title">
        Get In Touch
      </h2>

      <p data-aos="fade-up" data-aos-delay="150">
        I'm{' '}
        <b>
          <u>currently looking for any new opportunities</u>
        </b>
        , my inbox is always open. Whether you have a question or just want to say hi, I’ll try my
        best to get back to you!
      </p>

      <button
        className="email-link"
        data-cal-link="kanhaiya-verma/book-a-call"
        data-cal-config='{"layout":"month_view"}'>
        Book a Call
      </button>
    </StyledContactSection>
  );
};

export default Contact;
