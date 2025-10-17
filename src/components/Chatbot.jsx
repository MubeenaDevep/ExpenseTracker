import React, { useEffect, useRef, useReducer, useState } from 'react';

const uid = () => Math.random().toString(36).slice(2, 9);

function messagesReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload || [];
    case 'ADD':
      return [...state, action.payload];
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

// Helper: pick a random reply from a list
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Expense decision advice logic 🧠
function getDecisionReply(text) {
  const t = text.toLowerCase();

  if (t.includes('save') || t.includes('saving')) {
    return random([
      "💡 Try tracking your small daily spends — they add up fast!",
      "Tip: Set aside 10% of your income every month before spending.",
      "Maybe start by reducing your eating-out expenses — they often drain money silently.",
    ]);
  }

  if (t.includes('overspend') || t.includes('spent too much') || t.includes('too much')) {
    return random([
      "😬 Looks like you might be overspending! Try setting weekly limits.",
      "Consider cutting down variable costs like entertainment or online shopping.",
      "Maybe pause non-essential purchases this week to balance your budget.",
    ]);
  }

  if (t.includes('budget') || t.includes('plan')) {
    return random([
      "📊 A 50-30-20 rule might help: 50% needs, 30% wants, 20% savings.",
      "Plan your budget category-wise: food, transport, bills, and savings.",
      "Always keep a small emergency buffer — it saves you later.",
    ]);
  }

  if (t.includes('buy') || t.includes('purchase') || t.includes('afford')) {
    return random([
      "🤔 Ask yourself — do you really need it or just want it?",
      "If it’s not in your budget, maybe wait a week and see if you still want it.",
      "Check your monthly summary — if you’re near your limit, skip the purchase for now.",
    ]);
  }

  if (t.includes('tip') || t.includes('advice') || t.includes('idea')) {
    return random([
      "🌱 Automate your savings — it’s the easiest way to stay consistent.",
      "Carry cash for small expenses. It makes spending feel more real.",
      "Review your expenses every Sunday — small habits lead to big savings.",
    ]);
  }

  if (t.includes('hello') || t.includes('hi') || t.includes('hey')) {
    return random([
      "Hello there 👋 I'm your personal expense guide. Need help managing money today?",
      "Hi! Want a quick tip to improve your budget?",
      "Hey 👋 Ask me about saving, overspending, or planning your expenses!",
    ]);
  }

  return random([
    "I can help with money decisions — try asking 'Should I buy this?' or 'How can I save more?'",
    "Need financial clarity? Ask about budgeting, saving, or avoiding overspending.",
    "I'm here to help you make smarter expense choices 💰.",
  ]);
}

const VINTAGE = {
  bg: '#fdf6e3',
  card: '#f9f3e7',
  border: '#c9b79c',
  text: '#795548',
  muted: '#8b7561'
};

export default function VintageChatbot({
  initialOpen = false,
  storageKey = 'vintage_chat_messages',
}) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, dispatch] = useReducer(messagesReducer, []);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) dispatch({ type: 'INIT', payload: JSON.parse(raw) });
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

 useEffect(() => {
  if (listRef.current) {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }

  // 👋 Auto greeting when chat is opened for the first time
  if (open && messages.length === 0) {
    const greeting = [
      "👋 Hello there! I’m your expense advisor.",
      "Need help making a spending decision today?",
      "Ask me things like 'Should I buy this?' or 'How can I save more?' 💰"
    ];
    greeting.forEach((line, i) =>
      setTimeout(() => {
        const msg = { id: uid(), from: 'bot', text: line, time: Date.now() };
        dispatch({ type: 'ADD', payload: msg });
      }, i * 600)
    );
  }
}, [messages, open]);


  const botReply = (text) => {
    const msg = { id: uid(), from: 'bot', text, time: Date.now() };
    dispatch({ type: 'ADD', payload: msg });
  };

  const handleUserMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: uid(), from: 'user', text, time: Date.now() };
    dispatch({ type: 'ADD', payload: userMsg });

    const reply = getDecisionReply(text);
    setTimeout(() => botReply(reply), 400);
  };

  const onSend = () => {
    handleUserMessage(input);
    setInput('');
  };

  const rootStyle = {
    '--vintage-bg': VINTAGE.bg,
    '--vintage-card': VINTAGE.card,
    '--vintage-border': VINTAGE.border,
    '--vintage-text': VINTAGE.text,
    '--vintage-muted': VINTAGE.muted,
  };

  return (
    <div style={rootStyle}>
      {/* Toggle button */}
      <div className="fixed right-6 bottom-6 z-50">
        <button
          aria-label={open ? 'Close chat' : 'Open chat'}
          onClick={() => setOpen(!open)}
          className="shadow-lg p-3 rounded-2xl border-2 border-[var(--vintage-border)] bg-[var(--vintage-text)] hover:scale-105 transition-transform"
        >
          <div className="flex items-center gap-2 font-serif text-[var(--vintage-text)]">
            💬
          </div>
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className="fixed right-6 bottom-20 z-50 w-[340px] md:w-[420px] max-h-[70vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border-2"
             style={{ background: 'var(--vintage-bg)', borderColor: 'var(--vintage-border)' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b"
               style={{ background: 'var(--vintage-card)', borderBottom: '1px solid var(--vintage-border)' }}>
            <div className="text-sm font-serif text-[var(--vintage-text)]">Expense Advisor</div>
            <div className="text-xs text-[var(--vintage-muted)]">v2.0</div>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-3" style={{ background: 'var(--vintage-bg)' }}>
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="p-3 max-w-[80%] rounded-xl font-serif text-sm"
                     style={{ background: m.from === 'user' ? 'var(--vintage-border)' : 'var(--vintage-card)', color: 'var(--vintage-text)' }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 pt-2 pb-1 border-t" style={{ borderTop: '1px solid var(--vintage-border)', background: 'var(--vintage-card)' }}>
            <div className="flex gap-2 mb-2">
              <button onClick={() => handleUserMessage('How can I save more money?')} className="px-3 py-1 rounded-full text-xs font-serif border"
                      style={{ borderColor: 'var(--vintage-border)' }}>💡 Save tips</button>
              <button onClick={() => handleUserMessage('Am I overspending?')} className="px-3 py-1 rounded-full text-xs font-serif border"
                      style={{ borderColor: 'var(--vintage-border)' }}>⚖️ Overspending</button>
              <button onClick={() => handleUserMessage('Should I buy a new phone?')} className="px-3 py-1 rounded-full text-xs font-serif border"
                      style={{ borderColor: 'var(--vintage-border)' }}>📱 Buy advice</button>
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
                placeholder="Ask about saving, buying, or budgeting..."
                className="flex-1 p-2 rounded-xl text-sm font-serif outline-none"
                style={{ background: 'var(--vintage-card)', border: '1px solid var(--vintage-border)', color: 'var(--vintage-text)' }}
              />
              <button onClick={onSend} className="px-3 py-2 rounded-xl font-serif border"
                      style={{ borderColor: 'var(--vintage-border)', background: 'var(--vintage-card)' }}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
