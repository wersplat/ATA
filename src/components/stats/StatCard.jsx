import { Star } from 'lucide-react';

export default function StatCard({ label, value, isCareerHigh = false, size = 'md' }) {
  const sizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };

  return (
    <div
      className={`bg-gray-800/50 border border-gray-700 rounded-xl ${sizes[size]} ${
        isCareerHigh ? 'border-gold/50 bg-gold/5' : ''
      }`}
    >
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
        {label}
        {isCareerHigh && <Star className="w-3 h-3 text-gold fill-gold" />}
      </div>
      <div
        className={`font-bold ${
          size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-lg'
        } ${isCareerHigh ? 'text-gold' : 'text-white'}`}
      >
        {value}
      </div>
    </div>
  );
}
