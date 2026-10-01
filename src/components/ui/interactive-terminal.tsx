"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Shield, CornerDownLeft, Sparkles } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

const HELP_TEXT = `Available Commands:
  • bio        - Who is Joyceson Danielraj?
  • skills     - Technical capabilities & mastery
  • projects   - View flagship deployed systems
  • spidersense- Trigger spider-sense radar alert
  • contact    - Get email & direct channels
  • clear      - Clear terminal output
  • sudo       - Try admin escalation`;

export function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-white/80">
          <p className="text-[#CC0000] font-bold">
            🕸️ SPIDER-OS [Version 2.0.4 - Web Slinger Edition]
          </p>
          <p className="text-white/50 text-xs">
            Type <span className="text-[#0047FF] font-semibold">"help"</span> to view available terminal directives.
          </p>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    spiderAudio.playBlip(680, 0.05);

    let result: React.ReactNode = "";

    switch (cmd) {
      case "help":
        result = <pre className="font-mono text-xs text-white/70 whitespace-pre-wrap">{HELP_TEXT}</pre>;
        break;
      case "bio":
        result = (
          <p className="text-xs text-white/80 leading-relaxed">
            Joyceson Danielraj — Frontend Engineer & Creative Technologist. Specializing in high-performance Next.js 16 architectures, React 19 concurrent state, and Three.js 3D web applications.
          </p>
        );
        break;
      case "skills":
        result = (
          <div className="text-xs space-y-1 text-white/80">
            <p><span className="text-[#CC0000] font-semibold">Frontend:</span> React 19, Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion</p>
            <p><span className="text-[#0047FF] font-semibold">3D & Creative:</span> Three.js, React Three Fiber, GLSL Shaders, Post-processing</p>
            <p><span className="text-white font-semibold">Backend:</span> Node.js, PostgreSQL, Prisma, MongoDB, REST/GraphQL</p>
          </div>
        );
        break;
      case "projects":
        result = (
          <div className="text-xs space-y-1 text-white/80">
            <p>1. <span className="text-[#CC0000] font-semibold">Kings LMS</span> — Enterprise virtual academy & analytics</p>
            <p>2. <span className="text-[#0047FF] font-semibold">Quiz Arena</span> — Real-time interactive quiz battleground</p>
            <p>3. <span className="text-white font-semibold">SmartBiz</span> — Business intelligence & automated invoicing</p>
          </div>
        );
        break;
      case "spidersense":
        spiderAudio.playRadarPing();
        result = (
          <div className="p-2 border border-[#CC0000] bg-[#CC0000]/10 rounded text-xs text-[#CC0000] font-bold animate-pulse">
            ⚠️ TINGLING DETECTED! Potential epic project incoming. Direct connection ready.
          </div>
        );
        break;
      case "contact":
        result = (
          <div className="text-xs space-y-1 text-white/80">
            <p>📧 Email: <a href="mailto:joycesondanielraj71@gmail.com" className="text-[#CC0000] underline">joycesondanielraj71@gmail.com</a></p>
            <p>🐙 GitHub: <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="text-[#0047FF] underline">github.com/Joyceson71</a></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
        result = (
          <p className="text-xs text-[#CC0000] font-mono">
            Permission denied: With great power comes great responsibility. Peter Parker is the only root user.
          </p>
        );
        break;
      default:
        result = (
          <p className="text-xs text-white/50 font-mono">
            Command not recognized: "{cmd}". Type <span className="text-[#CC0000]">help</span> for directives.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: input, output: result }]);
    setInput("");
  };

  return (
    <div className="web-panel rounded-md overflow-hidden border border-[#CC0000]/30 shadow-2xl">
      {/* Terminal Titlebar */}
      <div className="bg-[#0f0f1c] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#CC0000]/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="font-mono text-xs text-white/40 ml-2">spider-sh — bash — 80x24</span>
        </div>
        <div className="flex items-center gap-2 text-white/40 font-mono text-[10px]">
          <Terminal className="w-3 h-3 text-[#CC0000]" />
          <span>INTERACTIVE CONSOLE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 font-mono text-xs min-h-[220px] max-h-[340px] overflow-y-auto space-y-4">
        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-white/50">
              <span className="text-[#CC0000] font-bold">peter@spidynet:~$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command prompt input */}
      <form onSubmit={handleCommand} className="bg-[#0c0c18] border-t border-white/[0.08] px-4 py-2.5 flex items-center gap-2">
        <span className="text-[#CC0000] font-mono text-xs font-bold shrink-0">peter@spidynet:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help', 'bio', 'projects'..."
          className="flex-1 bg-transparent text-xs text-white font-mono outline-none placeholder:text-white/20"
        />
        <button type="submit" className="text-white/40 hover:text-[#CC0000] transition-colors p-1">
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
