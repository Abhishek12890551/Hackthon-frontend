import React, { useEffect, useRef } from 'react';
import { 
  CommandLineIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const ProgressTerminal = ({ logs = [], isActive = false, title = "Terminal Output" }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400 flex-shrink-0" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-400 flex-shrink-0" />;
      case 'info':
        return <InformationCircleIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />;
      default:
        return <span className="w-4 h-4 flex-shrink-0 text-gray-400">{'>'}</span>;
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-gray-300';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <CommandLineIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">{title}</span>
            {isActive && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-green-400">ACTIVE</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-80 overflow-y-auto p-4 font-mono text-sm bg-black/50"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: '#8b5cf6 transparent'
        }}
      >
        {logs.length === 0 ? (
          <div className="text-gray-500 italic">Waiting for output...</div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 ${getLogColor(log.type)} animate-fadeIn`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-xs text-gray-500 w-20 flex-shrink-0">
                  {formatTimestamp(log.timestamp)}
                </span>
                {getLogIcon(log.type)}
                <span className="flex-1 break-words">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Cursor */}
        {isActive && (
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-500 w-20">
              {formatTimestamp(new Date())}
            </span>
            <span className="text-gray-400">{'>'}</span>
            <span className="text-gray-300">
              <span className="animate-pulse">█</span>
            </span>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 px-4 py-2 border-t border-purple-500/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{logs.length} lines</span>
          <span>InviScan AI Terminal</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTerminal;
