import { IconUser } from '../types';

interface IconBarProps {
  users: IconUser[];
}

export function IconBar({ users }: IconBarProps) {
  return (
    <div className="w-12 bg-[var(--bg-iconbar)] flex flex-col items-center py-3 gap-2 flex-shrink-0">
      {/* Cloud icon */}
      <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      </button>

      {/* Home icon */}
      <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors mb-2">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>

      {/* User avatars */}
      {users.map((user) => (
        <button
          key={user.id}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold hover:ring-2 hover:ring-white/30 transition-all"
          style={{ backgroundColor: user.color }}
          title={user.initials}
        >
          {user.initials}
        </button>
      ))}
    </div>
  );
}
