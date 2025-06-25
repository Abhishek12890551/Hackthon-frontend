import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Button from '../components/Button';

const ScanProgress = () => {
  const { scanId } = useParams();
  const [scanStatus, setScanStatus] = useState('running');
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('initialization');
  const [logs, setLogs] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    total: 0
  });

  // Simulate scan progress
  useEffect(() => {
    if (scanStatus !== 'running') return;

    const phases = [
      'Initialization',
      'Port Scanning', 
      'Service Detection',
      'Vulnerability Analysis',
      'SQL Injection Testing',
      'XSS Detection',
      'Authentication Testing',
      'Authorization Checks',
      'Generating Report'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setScanStatus('completed');
          return 100;
        }
        
        const newProgress = prev + Math.random() * 5;
        const phaseIndex = Math.floor((newProgress / 100) * phases.length);
        
        if (phaseIndex < phases.length) {
          setCurrentPhase(phases[phaseIndex]);
          
          // Add random log entries
          if (Math.random() > 0.7) {
            const timestamp = new Date().toLocaleTimeString();
            const logMessages = [
              `[${timestamp}] Scanning endpoint: /api/users`,
              `[${timestamp}] Testing for SQL injection vulnerabilities`,
              `[${timestamp}] Checking authentication mechanisms`,
              `[${timestamp}] Analyzing response headers`,
              `[${timestamp}] Found potential XSS vulnerability`,
              `[${timestamp}] Testing input validation`,
              `[${timestamp}] Scanning for directory traversal`,
              `[${timestamp}] Checking for insecure configurations`
            ];
            
            setLogs(prev => [...prev.slice(-10), logMessages[Math.floor(Math.random() * logMessages.length)]]);
            
            // Randomly update vulnerability counts
            if (Math.random() > 0.8) {
              setVulnerabilities(prev => ({
                ...prev,
                [['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)]]: prev[['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)]] + 1,
                total: prev.total + 1
              }));
            }
          }
        }
        
        return Math.min(newProgress, 100);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [scanStatus]);

  const handlePauseScan = () => {
    setScanStatus(scanStatus === 'running' ? 'paused' : 'running');
  };

  const handleStopScan = () => {
    setScanStatus('stopped');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Scan Progress</h1>
          <p className="text-gray-400 mt-2">Scan ID: {scanId}</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handlePauseScan}
            disabled={scanStatus === 'completed' || scanStatus === 'stopped'}
          >
            {scanStatus === 'running' ? (
              <>
                <PauseIcon className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4 mr-2" />
                Resume
              </>
            )}
          </Button>
          <Button
            variant="danger"
            onClick={handleStopScan}
            disabled={scanStatus === 'completed' || scanStatus === 'stopped'}
          >
            <StopIcon className="w-4 h-4 mr-2" />
            Stop
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Progress Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">Progress</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              scanStatus === 'running' ? 'bg-blue-400/10 text-blue-400' :
              scanStatus === 'completed' ? 'bg-green-400/10 text-green-400' :
              scanStatus === 'paused' ? 'bg-yellow-400/10 text-yellow-400' :
              'bg-red-400/10 text-red-400'
            }`}>
              {scanStatus.charAt(0).toUpperCase() + scanStatus.slice(1)}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white font-semibold">{Math.round(progress)}%</span>
              <span className="text-gray-400 text-sm">{currentPhase}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Vulnerabilities Found */}
        {Object.entries(vulnerabilities).slice(0, 3).map(([severity, count]) => (
          <Card key={severity} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm capitalize">{severity} Issues</p>
                <p className={`text-2xl font-bold ${getSeverityColor(severity)}`}>{count}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center ${getSeverityColor(severity)}`}>
                <ExclamationTriangleIcon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Terminal Log */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Live Scan Log</h3>
          <div className="terminal rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
            <div className="text-green-400 mb-2">InviScan AI Security Scanner v2.0</div>
            <div className="text-green-400 mb-4">Starting scan for target: example.com</div>
            {logs.map((log, index) => (
              <div key={index} className="text-gray-300 mb-1">
                {log}
              </div>
            ))}
            {scanStatus === 'running' && (
              <div className="text-green-400 animate-pulse">
                <span className="inline-block w-2 h-4 bg-green-400 mr-1"></span>
                Scanning in progress...
              </div>
            )}
          </div>
        </Card>

        {/* Real-time Metrics */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Scan Metrics</h3>
          <div className="space-y-6">
            {/* Time Elapsed */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ClockIcon className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Time Elapsed</span>
              </div>
              <span className="text-white font-semibold">
                {Math.floor(progress * 0.5)}m {Math.floor((progress * 30) % 60)}s
              </span>
            </div>

            {/* URLs Scanned */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300">URLs Scanned</span>
              <span className="text-white font-semibold">{Math.floor(progress * 2.4)}</span>
            </div>

            {/* Requests Sent */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Requests Sent</span>
              <span className="text-white font-semibold">{Math.floor(progress * 15.7)}</span>
            </div>

            {/* Total Vulnerabilities */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
              <span className="text-gray-300 font-medium">Total Issues Found</span>
              <span className="text-white font-bold text-lg">{vulnerabilities.total}</span>
            </div>

            {/* Severity Breakdown */}
            <div className="space-y-2">
              {Object.entries(vulnerabilities).slice(0, 4).map(([severity, count]) => (
                <div key={severity} className="flex items-center justify-between">
                  <span className={`text-sm capitalize ${getSeverityColor(severity)}`}>
                    {severity}
                  </span>
                  <span className={`font-semibold ${getSeverityColor(severity)}`}>
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Action Section */}
      {scanStatus === 'completed' && (
        <Card className="p-6 bg-green-600/10 border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">Scan Completed Successfully</h3>
                <p className="text-gray-300">
                  Found {vulnerabilities.total} vulnerabilities across {Math.floor(progress * 2.4)} URLs
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link to="/app/reports">
                <Button>View Full Report</Button>
              </Link>
              <Link to="/app/patching">
                <Button variant="outline">Start Patching</Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ScanProgress;
