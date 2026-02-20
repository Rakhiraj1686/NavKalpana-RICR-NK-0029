import React from "react";

const About = () => {
  return (
    <div className="bg-(--color-background) text-white min-h-screen px-6 md:px-16 py-20">
      {/* Heading */}

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-(--color-primary)">
          About HealthUP
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          FitAI is an Adaptive Fitness Intelligence Platform designed to
          generate personalized workout and diet plans that evolve based on your
          habits, performance, and progress.
        </p>
      </div>

      {/* Vision Section */}

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-(--color-accent)">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to build a structured digital fitness companion that
            intelligently adjusts plans, prevents overtraining, tracks
            measurable transformation, and promotes sustainable health
            improvement.
          </p>
        </div>

        <div className="bg-(--color-primary) p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Why HealthUP?</h3>
          <ul className="space-y-3 text-gray-400">
            <li>✔ Adaptive workout generation</li>
            <li>✔ Smart macro-based diet plans</li>
            <li>✔ Habit intelligence tracking</li>
            <li>✔ Fatigue & recovery monitoring</li>
            <li>✔ AI-powered fitness assistant</li>
          </ul>
        </div>
      </div>

      {/* How It Works */}

      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-10 text-(--color-primary)">
          The Adaptive Loop
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-600">
          <div className="bg-(--color-primary)/40 px-6 py-4 rounded-lg">
            Profile
          </div>
          <div className="bg-(--color-primary)/40 px-6 py-4 rounded-lg">
            Plan
          </div>
          <div className="bg-(--color-primary)/40 px-6 py-4 rounded-lg">
            Track
          </div>
          <div className="bg-(--color-primary)/40 px-6 py-4 rounded-lg">
            Adjust
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
