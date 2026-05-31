import { useEffect, useRef, useState } from 'react';
import '../styles/contactName.css';

type Props = {
  nombre: string;
  apellido: string;
};

export const ContactName = ({ nombre, apellido }: Props) => {
  const fullName = `${nombre} ${apellido}`.trim();
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const element = textRef.current;

    const measure = () => {
      if (!element) {
        return;
      }

      const isOverflowing = element.scrollWidth > element.clientWidth;
      setShowTooltip(isOverflowing);
    };

    measure();

    if (typeof ResizeObserver !== 'undefined' && element) {
      const observer = new ResizeObserver(() => measure());
      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [fullName]);

  return (
    <span className="contact-name" data-tooltip={showTooltip ? fullName : ''}>
      <span ref={textRef} className="contact-name-text">
        {fullName}
      </span>
    </span>
  );
};
