import { useState, useEffect } from 'react';
import './Typewriter.css';
const Typewriter = ({ styles }) => {
  const [text, setText] = useState('');
  const strText = 'C-onnVerse';
  const speed = 350;

  useEffect(() => {
    let charIndex = 0;
    const typingEffect = setInterval(() => {
      if (charIndex < strText.length) {
        setText((prev) => prev + strText.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingEffect);
      }
    }, speed);
    return () => clearInterval(typingEffect);
  }, []);

  return (
    <h1 className="Typewriter">
      <span className="sm:text-battleGray sm:text-[7vw] text-eerieBlack text-[7vw] font-mova font-extrabold uppercase" style={{ color: '#f2b65d' }}>
        {text}
      </span>
    </h1>
  );
};

export default Typewriter;
