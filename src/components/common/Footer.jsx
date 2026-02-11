import { Trophy } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-league-950 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-gold" />
          <span className="font-semibold text-white">ATA Basketball League</span>
        </div>
        <p className="text-sm">
          Stats powered by Google Sheets &middot; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
