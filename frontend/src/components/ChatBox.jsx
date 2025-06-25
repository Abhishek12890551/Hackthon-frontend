import React, { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  CpuChipIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import Button from './Button';

const ChatBox = ({ messages = [], onSendMessage, isLoading = false }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatMessage = (text) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-purple-500/20 text-purple-200 px-1 rounded">$1</code>');
  };

  const quickActions = [
    "Analyze my latest scan results",
    "Suggest security improvements",
    "Explain vulnerability types",
    "Help with patch management"
  ];

  return (
    <div className="flex flex-col h-[600px] rounded-xl border border-purple-500/20 bg-gradient-to-br from-gray-900/90 to-purple-900/20 backdrop-blur-sm overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 px-6 py-4 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">InviScan AI Assistant</h3>
            <p className="text-sm text-gray-400">Your cybersecurity expert</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <SparklesIcon className="w-12 h-12 mx-auto text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Welcome to InviScan AI</h3>
            <p className="text-gray-400 mb-6">Ask me anything about your security scans, vulnerabilities, or cybersecurity best practices.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-md mx-auto">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(action)}
                  className="p-3 text-sm text-left rounded-lg border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 transition-colors text-gray-300 hover:text-white"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex-shrink-0">
                  <CpuChipIcon className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                      : 'bg-gray-800/80 text-gray-200 border border-purple-500/20'
                  }`}
                >
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: formatMessage(message.content) 
                    }}
                  />
                  
                  {message.sender === 'ai' && (
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="mt-2 text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                    >
                      <ClipboardDocumentIcon className="w-3 h-3" />
                      Copy
                    </button>
                  )}
                </div>
                
                <div className={`mt-1 text-xs text-gray-500 ${message.sender === 'user' ? 'text-right' : ''}`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 flex-shrink-0">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex-shrink-0">
              <CpuChipIcon className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gray-800/80 border border-purple-500/20 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-400">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-purple-500/20 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about vulnerabilities, security best practices, or scan results..."
              className="w-full px-4 py-3 bg-gray-800/80 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none min-h-[50px] max-h-32"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-3 rounded-xl"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
