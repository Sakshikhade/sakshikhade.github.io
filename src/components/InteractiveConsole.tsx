import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, HelpCircle, User, Award, ShieldAlert } from 'lucide-react';

interface LogLine {
  text: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success';
}

const initLogs = [
  { text: 'SYSTEM OVERLOAD RECOVERY: BOOTING KHADE_OS v2.6...', type: 'system' as const },
  { text: 'STATUS: GRADUATE_STUDENT_ASST_ACTIVE', type: 'system' as const },
  { text: 'NETWORKING: CONNECTED TO ASU_AI_LABS', type: 'system' as const },
  { text: 'Type "help" or click suggestions below to scan components.', type: 'output' as const }
];

export const InteractiveConsole: React.FC = () => {
  const [history, setHistory] = useState<LogLine[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isGameMode, setIsGameMode] = useState(false);
  
  // Game state
  const [dronePos, setDronePos] = useState({ x: 0, y: 0 });
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // 6x4 Grid Game map representation
  // 0: empty, 1: obstacle, 2: target
  const mapWidth = 6;
  const mapHeight = 4;
  const targetPos = { x: 5, y: 3 };
  const obstacles = [
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 1, y: 3 },
    { x: 4, y: 0 }
  ];

  useEffect(() => {
    setHistory(initLogs);
  }, []);

  useEffect(() => {
    // Auto scroll to bottom of terminal
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isGameMode, dronePos]);

  const addLog = (text: string, type: 'system' | 'input' | 'output' | 'error' | 'success' = 'output') => {
    setHistory((prev) => [...prev, { text, type }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    addLog(`$ ${cmd}`, 'input');

    if (isGameMode) {
      if (['up', 'u', 'w'].includes(trimmed)) moveDrone(0, -1);
      else if (['down', 'd', 's'].includes(trimmed)) moveDrone(0, 1);
      else if (['left', 'l', 'a'].includes(trimmed)) moveDrone(-1, 0);
      else if (['right', 'r', 'd_key'].includes(trimmed)) moveDrone(1, 0);
      else if (trimmed === 'exit') {
        setIsGameMode(false);
        addLog('Exited autonomous test suite.', 'system');
      } else {
        addLog('Controls in test suite: "up", "down", "left", "right" or click arrow buttons.', 'error');
      }
      setInputVal('');
      return;
    }

    switch (trimmed) {
      case 'help':
        addLog('Available commands:', 'system');
        addLog('  about   - Fetch credentials and academic background', 'output');
        addLog('  skills  - Highlight core competencies in AI & robotics', 'output');
        addLog('  secret  - Connect drone to testing bed (Interactive game)', 'output');
        addLog('  clear   - Wipe screen buffer', 'output');
        break;
      case 'about':
        addLog('Scanning Profile Database...', 'system');
        addLog('Candidate Name: Sakshi Sanjay Khade', 'output');
        addLog('Current Status: M.S. Candidate in Robotics & Autonomous Systems (AI) @ ASU', 'output');
        addLog('GPA Achievements: 3.81/4.00 Graduate Division', 'output');
        addLog('Key Objective: Accelerating AI pipelines and building robust robotic frameworks.', 'success');
        break;
      case 'skills':
        addLog('Core Specializations loaded:', 'system');
        addLog('  [Languages] Python, C, C++, JavaScript, TypeScript, SQL', 'output');
        addLog('  [AI & ML] CNN, LSTM, Transformers, Hugging Face, scikit-learn, TensorFlow', 'output');
        addLog('  [Data & Stack] Apache Spark, FastAPI, React, Node.js, AWS EC2, PocketBase', 'output');
        break;
      case 'secret':
        addLog('INITIALIZING DRONE NAVIGATION PLATFORM...', 'system');
        addLog('Warning: Manual override enabled. Pilot drone to landing pad [🏁]', 'system');
        addLog('Avoid Obstacles [🧱] and fly the Drone [🚁]', 'system');
        setDronePos({ x: 0, y: 0 });
        setIsGameMode(true);
        break;
      case 'clear':
        setHistory([]);
        break;
      default:
        addLog(`Command not recognized: "${trimmed}". Type "help" for a list of modules.`, 'error');
    }
    setInputVal('');
  };

  const moveDrone = (dx: number, dy: number) => {
    const newX = Math.max(0, Math.min(mapWidth - 1, dronePos.x + dx));
    const newY = Math.max(0, Math.min(mapHeight - 1, dronePos.y + dy));

    // Check obstacle collision
    const hitsObstacle = obstacles.some(obs => obs.x === newX && obs.y === newY);
    if (hitsObstacle) {
      addLog(`[COLLISION DETECTED] Impact at X:${newX} Y:${newY}. Navigation reset.`, 'error');
      setDronePos({ x: 0, y: 0 });
      return;
    }

    setDronePos({ x: newX, y: newY });

    // Check target reach
    if (newX === targetPos.x && newY === targetPos.y) {
      setIsGameMode(false);
      addLog('[SUCCESS] Target docking completed successfully!', 'success');
      addLog('Sakshi\'s Special Insight unlocked: "I built this interactive terminal to show that AI and Robotics is not just code—it\'s about moving bits in the virtual world to control things in the physical world! Feel free to hire me for your team!"', 'success');
    }
  };

  const drawMap = () => {
    const rows = [];
    for (let y = 0; y < mapHeight; y++) {
      let rowStr = '';
      for (let x = 0; x < mapWidth; x++) {
        if (dronePos.x === x && dronePos.y === y) {
          rowStr += '🚁 ';
        } else if (targetPos.x === x && targetPos.y === y) {
          rowStr += '🏁 ';
        } else if (obstacles.some(obs => obs.x === x && obs.y === y)) {
          rowStr += '🧱 ';
        } else {
          rowStr += '· ';
        }
      }
      rows.push(rowStr);
    }
    return rows;
  };

  return (
    <div className="w-full max-w-lg glass-panel rounded-2xl shadow-2xl p-4 sm:p-5 terminal-container terminal-glow border flex flex-col h-[380px] sm:h-[420px] font-mono text-xs sm:text-sm text-left">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-maroon-900/20 dark:border-gold-500/20">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-maroon-600 dark:text-gold-400" />
          <span className="font-semibold text-gray-900 dark:text-gray-200">sakshi_terminal v2.6</span>
        </div>
        <div className="flex space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-80" />
        </div>
      </div>

      {/* Terminal History */}
      <div className="flex-grow overflow-y-auto space-y-2 pr-1 scrollbar-hide">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'system'
                ? 'text-purple-600 dark:text-purple-400 font-bold'
                : line.type === 'input'
                ? 'text-blue-600 dark:text-cyan-400'
                : line.type === 'error'
                ? 'text-red-600 dark:text-red-400'
                : line.type === 'success'
                ? 'text-maroon-700 dark:text-gold-400 font-bold'
                : 'text-gray-800 dark:text-gray-300'
            }`}
          >
            {line.text}
          </div>
        ))}

        {/* Render Drone Navigation Game if Active */}
        {isGameMode && (
          <div className="my-3 p-3 bg-gray-900/50 dark:bg-black/60 rounded-xl border border-dashed border-maroon-800/40 dark:border-gold-500/30">
            <p className="text-gold-400 font-bold mb-2">--- Drone Test Field ---</p>
            <div className="space-y-1 mb-3 text-center sm:text-left text-base leading-none tracking-widest font-bold">
              {drawMap().map((row, idx) => (
                <div key={idx}>{row}</div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={() => moveDrone(0, -1)}
                className="px-2.5 py-1 bg-maroon-600 text-white rounded hover:bg-maroon-700 text-xs font-bold"
              >
                ▲ UP
              </button>
              <button
                onClick={() => moveDrone(0, 1)}
                className="px-2.5 py-1 bg-maroon-600 text-white rounded hover:bg-maroon-700 text-xs font-bold"
              >
                ▼ DOWN
              </button>
              <button
                onClick={() => moveDrone(-1, 0)}
                className="px-2.5 py-1 bg-maroon-600 text-white rounded hover:bg-maroon-700 text-xs font-bold"
              >
                ◀ LEFT
              </button>
              <button
                onClick={() => moveDrone(1, 0)}
                className="px-2.5 py-1 bg-maroon-600 text-white rounded hover:bg-maroon-700 text-xs font-bold"
              >
                ▶ RIGHT
              </button>
              <button
                onClick={() => handleCommand('exit')}
                className="px-2.5 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs font-bold"
              >
                EXIT
              </button>
            </div>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Suggested quick buttons */}
      {!isGameMode && (
        <div className="flex flex-wrap gap-1.5 py-2 border-t border-maroon-900/10 dark:border-gold-500/10 mt-2">
          <button
            onClick={() => handleCommand('about')}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-maroon-50 hover:bg-maroon-100 dark:bg-maroon-900/20 dark:hover:bg-maroon-900/40 text-maroon-700 dark:text-gold-400 transition-colors border border-maroon-700/10"
          >
            <User className="w-3.5 h-3.5" />
            <span>about</span>
          </button>
          <button
            onClick={() => handleCommand('skills')}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-maroon-50 hover:bg-maroon-100 dark:bg-maroon-900/20 dark:hover:bg-maroon-900/40 text-maroon-700 dark:text-gold-400 transition-colors border border-maroon-700/10"
          >
            <Award className="w-3.5 h-3.5" />
            <span>skills</span>
          </button>
          <button
            onClick={() => handleCommand('secret')}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-yellow-50 hover:bg-yellow-100 dark:bg-gold-500/10 dark:hover:bg-gold-500/20 text-maroon-700 dark:text-gold-400 transition-colors border border-gold-500/20"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-yellow-600 dark:text-gold-400 animate-pulse" />
            <span>secret</span>
          </button>
          <button
            onClick={() => handleCommand('help')}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-maroon-50 hover:bg-maroon-100 dark:bg-maroon-900/20 dark:hover:bg-maroon-900/40 text-maroon-700 dark:text-gold-400 transition-colors border border-maroon-700/10"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>help</span>
          </button>
        </div>
      )}

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        className="flex items-center space-x-2 mt-2 pt-2 border-t border-maroon-900/10 dark:border-gold-500/10"
      >
        <span className="text-maroon-600 dark:text-gold-400 font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={isGameMode ? "Type left, right, up, down..." : "Type help, about, secret..."}
          className="flex-grow bg-transparent outline-none border-none text-gray-800 dark:text-gray-200"
          autoFocus
        />
        <button
          type="submit"
          className="p-1 rounded text-maroon-600 hover:text-maroon-700 dark:text-gold-400 dark:hover:text-gold-300"
          aria-label="Send command"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default InteractiveConsole;
