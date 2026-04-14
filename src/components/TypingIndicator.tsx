'use client';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start animate-message-in">
      <div className="bg-bg-surface border-l-2 border-accent/40 rounded-2xl px-4 py-3">
        <span className="block text-[11px] font-mono text-accent/70 mb-1 uppercase tracking-wider">
          Coach Genesis
        </span>
        <div className="flex gap-1.5 py-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-accent/60"
              style={{
                animation: `bounce-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
