"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Sparkles, Cpu } from "lucide-react";
import { spiderAudio } from "@/lib/spider-audio";
import { useStore } from "@/lib/store";
import { SKINS, type SkinMode } from "@/lib/constants";

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

const HELP_TEXT = `Available Directives:
  • bio          - Who is Joyceson Danielraj?
  • skills       - Technical capabilities & stack mastery
  • projects     - Flagship deployed architectures
  • suit <name>  - Override suit (classic, miles, venom, iron)
  • sfx <on|off> - Control tactical audio telemetry
  • stats        - View live suit & runtime telemetry
  • spidersense  - Trigger spider-sense radar alert
  • socials      - External neural communication channels
  • matrix       - Execute web-verse digital stream
  • contact      - Direct transmission coordinates
  • clear        - Purge terminal buffer
  • sudo         - Root permission escalation`;

export function InteractiveTerminal() {
  const sfxEnabled = useStore((s) => s.sfxEnabled);
  const toggleSfx = useStore((s) => s.toggleSfx);
  const skin = useStore((s) => s.skin);
  const setSkin = useStore((s) => s.setSkin);
  const scrollProgress = useStore((s) => s.scrollProgress);

  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-white/80">
          <p className="font-bold flex items-center gap-1.5" style={{ color: "var(--skin-primary, #CC0000)" }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>🕸️ SPIDER-OS [Version 2.1.0 - Web Slinger Edition]</span>
          </p>
          <p className="text-white/50 text-xs">
            Type <span className="font-semibold" style={{ color: "var(--skin-accent, #0047FF)" }}>"help"</span> to view available terminal directives. Hotkeys: <span className="text-white/80 font-mono">[1-4]</span> Suits, <span className="text-white/80 font-mono">[M]</span> SFX.
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
    const rawInput = input.trim();
    if (!rawInput) return;

    const parts = rawInput.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const arg = parts[1];

    if (sfxEnabled) spiderAudio.playBlip(680, 0.05);

    let result: React.ReactNode = "";

    switch (cmd) {
      case "help":
        result = <pre className="font-mono text-xs text-white/70 whitespace-pre-wrap">{HELP_TEXT}</pre>;
        break;

      case "bio":
        result = (
          <p className="text-xs text-white/80 leading-relaxed">
            Joyceson Danielraj — Full-Stack Engineer &amp; 3D Creative Technologist. Specializing in high-performance Next.js 16 architectures, React 19 concurrent state, and Three.js 3D web applications.
          </p>
        );
        break;

      case "skills":
        result = (
          <div className="text-xs space-y-1 text-white/80">
            <p><span className="font-semibold" style={{ color: "var(--skin-primary, #CC0000)" }}>Frontend:</span> React 19, Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion</p>
            <p><span className="font-semibold" style={{ color: "var(--skin-accent, #0047FF)" }}>3D &amp; Creative:</span> Three.js, React Three Fiber, GLSL Shaders, Post-processing</p>
            <p><span className="text-white font-semibold">Backend:</span> Node.js, PostgreSQL, Prisma, Supabase, WebSockets, OpenAI / Claude SDK</p>
          </div>
        );
        break;

      case "projects":
        result = (
          <div className="text-xs space-y-1 text-white/80">
            <p>1. <span className="font-semibold" style={{ color: "var(--skin-primary, #CC0000)" }}>Kings LMS</span> — Enterprise virtual academy &amp; automated analytics</p>
            <p>2. <span className="font-semibold" style={{ color: "var(--skin-accent, #0047FF)" }}>Quiz Arena</span> — Real-time interactive quiz battleground (WebSockets)</p>
            <p>3. <span className="font-semibold" style={{ color: "var(--skin-primary, #CC0000)" }}>SmartBiz OS</span> — Financial engine &amp; invoicing cockpit (100 Lighthouse)</p>
            <p>4. <span className="font-semibold" style={{ color: "var(--skin-accent, #0047FF)" }}>NeuralDesk AI</span> — Multi-model SSE streaming chat dashboard</p>
            <p>5. <span className="font-semibold" style={{ color: "var(--skin-primary, #CC0000)" }}>Verlet Physics &amp; Shaders</span> — Kinetic 3D web strand simulations</p>
          </div>
        );
        break;

      case "suit":
      case "skins":
      case "theme": {
        const validSkins: SkinMode[] = ["classic", "miles", "venom", "iron"];
        if (arg && validSkins.includes(arg as SkinMode)) {
          setSkin(arg as SkinMode);
          if (sfxEnabled) spiderAudio.playWebShoot();
          result = (
            <div className="p-2 border rounded text-xs" style={{ borderColor: "var(--skin-primary, #CC0000)", background: "rgba(255,255,255,0.04)" }}>
              <span className="font-bold" style={{ color: "var(--skin-primary, #CC0000)" }}>[SUIT ENGAGED]</span> Switched active suit to{" "}
              <span className="font-bold uppercase text-white">{arg}</span> ({SKINS[arg as SkinMode].tag}).
            </div>
          );
        } else {
          result = (
            <div className="text-xs space-y-1.5 text-white/80">
              <p className="text-white/50">Current Suit: <span className="font-bold text-white uppercase">{skin}</span></p>
              <p>Usage: <code className="text-white font-bold">suit &lt;classic | miles | venom | iron&gt;</code></p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {validSkins.map((s) => (
                  <div key={s} className="p-1.5 rounded bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <span className="capitalize font-semibold text-white/90">{s}</span>
                    <span className="text-[10px] text-white/40">{SKINS[s].tag}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        break;
      }

      case "sfx":
      case "sound":
      case "audio": {
        if (arg === "on" || arg === "enable") {
          if (!sfxEnabled) toggleSfx();
          spiderAudio.playBlip(880, 0.05);
          result = <p className="text-xs text-emerald-400 font-mono">🔊 Tactical sound effects ENABLED.</p>;
        } else if (arg === "off" || arg === "disable" || arg === "mute") {
          if (sfxEnabled) toggleSfx();
          result = <p className="text-xs text-amber-400 font-mono">🔇 Tactical sound effects MUTED.</p>;
        } else {
          toggleSfx();
          result = (
            <p className="text-xs font-mono" style={{ color: "var(--skin-accent, #0047FF)" }}>
              Tactical sound effects toggled: {!sfxEnabled ? "ENABLED" : "MUTED"}.
            </p>
          );
        }
        break;
      }

      case "stats":
      case "telemetry": {
        result = (
          <div className="text-xs space-y-1 font-mono p-2 rounded bg-white/[0.03] border border-white/10 text-white/80">
            <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-white/10" style={{ color: "var(--skin-primary, #CC0000)" }}>
              <Cpu className="w-3.5 h-3.5" />
              <span className="font-bold">SYSTEM TELEMETRY REPORT</span>
            </div>
            <p>• Suit Mode: <span className="text-white font-semibold uppercase">{skin}</span> ({SKINS[skin].label})</p>
            <p>• Tactical Audio: <span className={sfxEnabled ? "text-emerald-400" : "text-amber-400"}>{sfxEnabled ? "ONLINE" : "MUTED"}</span></p>
            <p>• Nanite Mesh Integrity: <span className="text-white">{Math.round(100 - scrollProgress * 30)}%</span></p>
            <p>• Sector Scroll: <span className="text-white">{Math.round(scrollProgress * 100)}%</span></p>
            <p>• Primary Frequency: <span style={{ color: "var(--skin-primary, #CC0000)" }}>{SKINS[skin].primary}</span></p>
            <p>• Status: <span className="text-emerald-400">SYS_NOMINAL // ZERO GC OVERHEAD</span></p>
          </div>
        );
        break;
      }

      case "spidersense":
        if (sfxEnabled) spiderAudio.playRadarPing();
        result = (
          <div 
            className="p-2 border rounded text-xs font-bold animate-pulse"
            style={{ 
              borderColor: "var(--skin-primary, #CC0000)", 
              background: "rgba(204,0,0,0.15)",
              color: "var(--skin-primary, #CC0000)" 
            }}
          >
            ⚠️ TINGLING DETECTED! Potential high-impact project incoming. Direct connection ready.
          </div>
        );
        break;

      case "socials":
      case "links":
        result = (
          <div className="text-xs space-y-1.5 text-white/80">
            <p>🐙 <span className="font-semibold text-white">GitHub:</span> <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="underline" style={{ color: "var(--skin-accent, #0047FF)" }}>github.com/Joyceson71</a></p>
            <p>💼 <span className="font-semibold text-white">LinkedIn:</span> <a href="https://www.linkedin.com/in/joyceson-danielraj/" target="_blank" rel="noreferrer" className="underline" style={{ color: "var(--skin-primary, #CC0000)" }}>linkedin.com/in/joyceson-danielraj</a></p>
            <p>📧 <span className="font-semibold text-white">Email:</span> <a href="mailto:joycesondanielraj71@gmail.com" className="underline text-emerald-400">joycesondanielraj71@gmail.com</a></p>
          </div>
        );
        break;

      case "contact":
        result = (
          <div className="text-xs space-y-1 text-white/80">
            <p>📧 Email: <a href="mailto:joycesondanielraj71@gmail.com" className="underline" style={{ color: "var(--skin-primary, #CC0000)" }}>joycesondanielraj71@gmail.com</a></p>
            <p>🐙 GitHub: <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="underline" style={{ color: "var(--skin-accent, #0047FF)" }}>github.com/Joyceson71</a></p>
            <p className="text-white/40 text-[10px] mt-1">Or scroll down to Section 08 // Transmission to send an instant dispatch.</p>
          </div>
        );
        break;

      case "matrix":
        result = (
          <pre className="font-mono text-[10px] leading-tight text-emerald-400/90 whitespace-pre">
{`01001010 01001111 01011001 01000011 01000101 01010011 01001111 01001110
🕷️  ====================================================== 🕷️
   W E B - V E R S E   C O N C U R R E N T   S T R E A M
   R3F Canvas // Float32Array // Zero GC Pipeline // 60 FPS
🕷️  ====================================================== 🕷️
10110101 11010010 01101001 10010110 01011001 11010010 01010101 10101100`}
          </pre>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "sudo":
        result = (
          <p className="text-xs font-mono" style={{ color: "var(--skin-primary, #CC0000)" }}>
            Permission denied: With great power comes great responsibility. Peter Parker is the only root user.
          </p>
        );
        break;

      default:
        result = (
          <p className="text-xs text-white/50 font-mono">
            Command not recognized: "{rawInput}". Type <span style={{ color: "var(--skin-primary, #CC0000)" }}>help</span> for directives.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawInput, output: result }]);
    setInput("");
  };

  return (
    <div 
      className="web-panel rounded-md overflow-hidden border shadow-2xl transition-colors duration-300"
      style={{ borderColor: "var(--skin-primary, #CC0000)40" }}
    >
      {/* Terminal Titlebar */}
      <div className="bg-[#0f0f1c] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "var(--skin-primary, #CC0000)" }} />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="font-mono text-xs text-white/40 ml-2">spider-sh — bash — 80x24</span>
        </div>
        <div className="flex items-center gap-2 text-white/40 font-mono text-[10px]">
          <Terminal className="w-3 h-3" style={{ color: "var(--skin-primary, #CC0000)" }} />
          <span>INTERACTIVE CONSOLE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 font-mono text-xs min-h-[220px] max-h-[320px] overflow-y-auto space-y-4 bg-[#080812]/80">
        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-white/50">
              <span className="font-bold" style={{ color: "var(--skin-primary, #CC0000)" }}>peter@spidynet:~$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command prompt input */}
      <form onSubmit={handleCommand} className="bg-[#0c0c18] border-t border-white/[0.08] px-4 py-2.5 flex items-center gap-2">
        <span className="font-mono text-xs font-bold shrink-0" style={{ color: "var(--skin-primary, #CC0000)" }}>peter@spidynet:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help', 'suit miles', 'stats', 'matrix'..."
          className="flex-1 bg-transparent text-xs text-white font-mono outline-none placeholder:text-white/20"
        />
        <button 
          type="submit" 
          aria-label="Submit command"
          className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
