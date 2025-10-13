import React from 'react';
import TransitionSystem from './TransitionSystem';

const TransitionDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Dimensional Transition */}
      <TransitionSystem
        sectionId="hero"
        animationType="explode"
        transitionType="dimensional"
        intensity="heavy"
        enableAdvancedEffects={true}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">
            In<span className="text-blue-400">TEMS</span>tellar
          </h1>
          <p className="text-xl opacity-80">Experience the Future of Web</p>
        </div>
      </TransitionSystem>

      {/* About Section with Morph Transition */}
      <TransitionSystem
        sectionId="about"
        animationType="morph"
        transitionType="morph"
        intensity="heavy"
        enableAdvancedEffects={true}
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900/20 to-purple-900/20"
      >
        <div className="max-w-4xl mx-auto text-center text-white p-8">
          <h2 className="text-4xl font-bold mb-6">About Our Vision</h2>
          <p className="text-lg leading-relaxed">
            We're pushing the boundaries of web experiences with cutting-edge 3D animations,
            immersive transitions, and spectacular visual effects that bring websites to life.
          </p>
        </div>
      </TransitionSystem>

      {/* Events Section with Spiral Transition */}
      <TransitionSystem
        sectionId="events"
        animationType="rotate"
        transitionType="spiral"
        intensity="heavy"
        enableAdvancedEffects={true}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20"
            >
              <h3 className="text-xl font-bold mb-4">Event {i}</h3>
              <p className="opacity-80">
                Experience dramatic 3D transitions and spectacular visual effects
                that make every interaction memorable.
              </p>
            </div>
          ))}
        </div>
      </TransitionSystem>

      {/* Contact Section with Cascade Transition */}
      <TransitionSystem
        sectionId="contact"
        animationType="scale"
        transitionType="cascade"
        intensity="heavy"
        enableAdvancedEffects={true}
        className="min-h-screen flex items-center justify-center bg-gradient-to-t from-slate-900 to-purple-900/50"
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg mb-8">Ready to transform your web experience?</p>
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Contact Us
          </button>
        </div>
      </TransitionSystem>
    </div>
  );
};

export default TransitionDemo;