const Card = ({ title, value, subtitle }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <p className="text-xs text-gray-400">{title}</p>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
    {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
  </div>
);

const ProgressSummaryCards = ({ dashboard }) => {
  const goal = dashboard?.goal || {};
  const streak = dashboard?.streak || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card
        title="Goal Progress"
        value={`${Number(goal.progressPercent || 0).toFixed(1)}%`}
        subtitle={(goal.goalType || "maintenance").replace("_", " ")}
      />
      <Card
        title="Current Weight"
        value={goal.currentWeight ? `${goal.currentWeight} kg` : "--"}
        subtitle={goal.targetWeight ? `Target ${goal.targetWeight} kg` : "Set a target in Goal"}
      />
      <Card
        title="Current Streak"
        value={`${streak.currentStreakDays || 0} days`}
        subtitle="Workout consistency"
      />
      <Card
        title="Longest Streak"
        value={`${streak.longestStreakDays || 0} days`}
        subtitle="Best performance"
      />
    </div>
  );
};

export default ProgressSummaryCards;
