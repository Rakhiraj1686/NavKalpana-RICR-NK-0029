import React from "react";

const disclaimerMap = {
  overview:
    "Overview data is informational and may not reflect real-time medical status. Use it for general tracking only.",
  goal: "Goal projections are estimate-based and depend on consistent logging, adherence, and individual response variability.",
  plan: "Plan recommendations are general fitness guidance and should be adjusted with a qualified coach or clinician when needed.",
  progression:
    "Progression timelines are predictive and not guaranteed outcomes. Training load should be modified if pain or fatigue increases.",
  analytics:
    "Analytics insights are trend-based interpretations, not diagnostic conclusions or clinical assessments.",
  progress:
    "Progress metrics rely on user-entered data and may be inaccurate if logs are incomplete or inconsistent.",
  profile:
    "Profile and health fields are user-managed; please keep them accurate for better recommendations and safer guidance.",
  support:
    "Support responses are informational and product-related. For medical emergencies, contact licensed professionals immediately.",
};

const DashboardDisclaimer = ({ section }) => {
  const text =
    disclaimerMap[section] ||
    "⚠ This platform provides general wellness guidance and does not replace professional medical advice.";

  return (
    <div className="flex justify-center">
      <div className="mb-8 lg:max-w-4xl rounded-2xl border border-amber-500/20 bg-amber-500/10 lg:px-8 px-4 py-2 text-amber-100 backdrop-blur-md">
        <div>
          <h4 className="text-sm font-semibold tracking-wide text-amber-300">
            Medical Disclaimer :
          </h4>
          <p className="mt-1 text-xs text-amber-100/90 sm:text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardDisclaimer;
