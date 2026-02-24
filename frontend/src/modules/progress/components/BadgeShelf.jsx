const BadgeShelf = ({ badges = [] }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-3">Milestones & Badges</h3>

      {badges.length === 0 ? (
        <p className="text-sm text-gray-400">No badges earned yet. Keep tracking daily progress.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge._id}
              className="rounded-lg p-3 bg-purple-500/10 border border-purple-500/40"
            >
              <p className="text-sm font-semibold text-purple-300">{badge.badgeCode}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(badge.earnedAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeShelf;
