import React, { useState, useEffect, useRef } from 'react';
// The 'X' icon for the close button is imported here
import { Linkedin, Youtube, Instagram, ArrowUpRight, X } from 'lucide-react';
// The animation components are imported from framer-motion here
import { motion, AnimatePresence } from 'framer-motion';

// --- Main Components ---

const P5Sketch = () => {
  const sketchRef = useRef();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";
    script.async = true;
    script.onload = () => {
      const sketch = (p) => {
        const spacing = 20; const dotSize = 2;
        p.setup = () => p.createCanvas(p.windowWidth, p.windowHeight).parent(sketchRef.current);
        p.draw = () => {
          p.background(18, 18, 18, 150);
          let offsetX = p.map(p.mouseX, 0, p.width, -spacing/5, spacing/5);
          let offsetY = p.map(p.mouseY, 0, p.height, -spacing/5, spacing/5);
          p.fill(209, 213, 219); p.noStroke();
          for (let x = -spacing; x < p.width + spacing; x += spacing) {
            for (let y = -spacing; y < p.height + spacing; y += spacing) {
              p.ellipse(x + offsetX, y + offsetY, dotSize, dotSize);
            }
          }
        };
        p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
      let p5Instance = new window.p5(sketch);
      return () => p5Instance.remove();
    };
    document.body.appendChild(script);
    return () => { if(document.body.contains(script)) document.body.removeChild(script); }
  }, []);
  return <div ref={sketchRef} className="p5-canvas-container" />;
};

const SocialLink = ({ href, icon: Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#EF253C] transition-colors duration-300">
    <Icon size={28} />
  </a>
);

const ContactCard = ({ opacityClass }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className={`md:col-span-3 ${opacityClass} p-8 flex flex-col justify-between relative overflow-hidden group min-h-[250px]`}
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`absolute inset-0 p-8 flex flex-col justify-between transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                 <div className="flex justify-between items-center">
                    <p className="font-montserrat-alt text-white">Have some questions?</p>
                    <ArrowUpRight className="text-white transform transition-transform duration-300 group-hover:rotate-45" size={32} />
                </div>
                <h2 className="font-montserrat-alt text-5xl md:text-6xl text-white leading-tight">Let's get <br/> in touch</h2>
            </div>
             <div className={`absolute inset-0 p-8 flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="font-montserrat-alt text-5xl md:text-6xl text-white">email:</h3>
                <p className="font-montserrat-alt text-xl text-white mt-2">srivatsa.pidaparthi@gmail.com</p>
            </div>
        </div>
    );
};

const ImageCard = ({ opacityClass, onOpen }) => (
    <div className={`md:col-span-2 ${opacityClass} overflow-hidden group relative cursor-pointer`} onClick={onOpen}>
        <img 
            src="https://static1.squarespace.com/static/5cfb0f8783523500013c5639/t/60391a67844f10416b040f2f/1614355064391/Headshots-photographer-vancouver-1.jpg?format=1500w" 
            alt="Project placeholder"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-montserrat-alt text-3xl">About Me</p>
        </div>
    </div>
);

const WorkButtonCard = ({ opacityClass }) => (
    <div className={`md:col-span-2 ${opacityClass} p-8 flex flex-col justify-end items-start cursor-pointer group`}>
        <div className="flex justify-between items-end w-full">
            <h2 className="font-montserrat-alt text-4xl md:text-5xl text-white leading-tight">
                View my<br />work
            </h2>
            <ArrowUpRight className="text-white transform transition-transform duration-300 group-hover:rotate-45" size={48} />
        </div>
    </div>
);

const AboutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        // The modal now uses the same glassmorphism effect as the other cards
                        className="bg-[--dark-card-bg] backdrop-blur-sm rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
                        <h2 className="text-4xl font-cal-sans text-white mb-6">About Me</h2>
                        <div className="text-gray-300 font-montserrat-alt text-lg space-y-4">
                            <p>
                                I am a passionate creator and technologist specializing in the intersection of art, design, and immersive technologies. With a background in interactive design and software development, I thrive on building experiences that are not only visually stunning but also deeply engaging and playful.
                            </p>
                            <p>
                                My work explores how we interact with digital spaces, from augmented reality games that merge the real and virtual, to generative art that responds to its environment. I believe that technology should be a tool for wonder and connection.
                            </p>
                            <p>
                                Let's build something amazing together.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const HomePage = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const darkCardClass = `bg-[--dark-card-bg] backdrop-blur-sm rounded-2xl`;
  const redCardClass = `bg-[--red-card-bg] backdrop-blur-sm rounded-2xl`;

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 md:gap-6">
        <header className={`${darkCardClass} flex-[2_1_0%] flex items-center justify-center`}>
            <h1 className="font-cal-sans text-4xl md:text-5xl text-[#D7D6D7]">Srivatsa Pidaparthi</h1>
        </header>
        <main className="flex-[15_1_0%] grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-h-0">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
            <div className={`${darkCardClass} md:col-span-3 p-8 flex flex-col justify-end`}>
              <h2 className="font-cal-sans text-4xl md:text-5xl text-[#D7D6D7] leading-tight">Crafting <br />
                <span className="font-montserrat-alt font-extralight font-style-italic text-7xl md:text-8xl text-[#EF253C]">play</span> <br />
                with immersive <br /> technology.
              </h2>
            </div>
            <ImageCard opacityClass={darkCardClass} onOpen={() => setIsAboutModalOpen(true)} />
            <WorkButtonCard opacityClass={darkCardClass} />
            <ContactCard opacityClass={redCardClass} />
          </div>
          <div className="lg:col-span-1 grid grid-rows-6 gap-4 md:gap-6">
              <div className={`${darkCardClass} row-span-5`}></div>
              <div className={`${darkCardClass} row-span-1 flex items-center justify-evenly`}>
                  <SocialLink href="https://www.linkedin.com" icon={Linkedin} />
                  <SocialLink href="https://www.youtube.com" icon={Youtube} />
                  <SocialLink href="https://www.instagram.com" icon={Instagram} />
              </div>
          </div>
        </main>
      </div>
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <P5Sketch />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cal+Sans&family=Montserrat+Alternates:ital,wght@0,200;0,400;0,700;1,400&display=swap');
        :root {
            --dark-card-bg: rgba(40, 39, 40, 0.25);
            --red-card-bg: rgba(239, 37, 60, 0.70);
        }
        .p5-canvas-container {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1;
        }
        body { background-color: #121212; }
        .font-cal-sans { font-family: 'Cal Sans', sans-serif; }
        .font-montserrat-alt { font-family: 'Montserrat Alternates', sans-serif; }
        .font-style-italic { font-style: italic; }
      `}</style>
      <div className="container w-full max-w-[1920px] h-screen max-h-[950px] relative z-10 p-6">
        <HomePage />
      </div>
    </div>
  );
}
