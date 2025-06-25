import React, { useState, useRef, useEffect } from "react";
import {
  PaperAirplaneIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";
import Card from "../components/Card";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm InviScan AI Assistant. I can help you understand security vulnerabilities, explain attack vectors, and provide guidance on security best practices. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    {
      icon: <ExclamationTriangleIcon className="w-5 h-5" />,
      title: "What is XSS?",
      question:
        "Explain Cross-Site Scripting (XSS) vulnerabilities and how to prevent them.",
    },
    {
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      title: "SQL Injection",
      question:
        "How does SQL injection work and what are the best practices to prevent it?",
    },
    {
      icon: <CodeBracketIcon className="w-5 h-5" />,
      title: "CSRF Protection",
      question:
        "What is Cross-Site Request Forgery (CSRF) and how can I protect my application?",
    },
    {
      icon: <LightBulbIcon className="w-5 h-5" />,
      title: "Security Headers",
      question:
        "What are the essential HTTP security headers I should implement?",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      const assistantMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question) => {
    const responses = {
      xss: `Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.

**Types of XSS:**
1. **Reflected XSS** - Occurs when user input is immediately returned by a web application
2. **Stored XSS** - Malicious script is permanently stored on the target server
3. **DOM-based XSS** - Vulnerability exists in client-side code rather than server-side

**Prevention Methods:**
• Input validation and sanitization
• Output encoding/escaping
• Content Security Policy (CSP)
• Use frameworks with built-in XSS protection
• Regular security testing`,

      sql: `SQL Injection is a code injection technique that exploits vulnerabilities in an application's database layer.

**How it works:**
Attackers insert malicious SQL code into application queries, potentially:
• Accessing unauthorized data
• Modifying or deleting data
• Executing administrative operations

**Prevention Best Practices:**
• Use parameterized queries/prepared statements
• Input validation and sanitization
• Principle of least privilege for database accounts
• Regular security audits
• Web Application Firewalls (WAF)
• ORM frameworks with built-in protection`,

      csrf: `Cross-Site Request Forgery (CSRF) tricks users into performing unwanted actions on applications where they're authenticated.

**How CSRF works:**
1. User logs into a legitimate website
2. Attacker tricks user into visiting malicious site
3. Malicious site sends requests to legitimate site using user's credentials

**Protection Methods:**
• CSRF tokens (synchronizer tokens)
• SameSite cookie attribute
• Double-submit cookies
• Custom headers validation
• Referer header validation
• User interaction confirmation for sensitive actions`,

      headers: `Essential HTTP Security Headers:

**Content-Security-Policy (CSP)**
\`Content-Security-Policy: default-src 'self'\`
Prevents XSS by controlling resource loading

**X-Frame-Options**
\`X-Frame-Options: DENY\`
Prevents clickjacking attacks

**X-Content-Type-Options**
\`X-Content-Type-Options: nosniff\`
Prevents MIME type sniffing

**Strict-Transport-Security (HSTS)**
\`Strict-Transport-Security: max-age=31536000; includeSubDomains\`
Enforces HTTPS connections

**X-XSS-Protection**
\`X-XSS-Protection: 1; mode=block\`
Enables XSS filtering in browsers

**Referrer-Policy**
\`Referrer-Policy: strict-origin-when-cross-origin\`
Controls referrer information`,
    };

    const lowercaseQuestion = question.toLowerCase();

    if (
      lowercaseQuestion.includes("xss") ||
      lowercaseQuestion.includes("cross-site scripting")
    ) {
      return responses.xss;
    } else if (
      lowercaseQuestion.includes("sql") ||
      lowercaseQuestion.includes("injection")
    ) {
      return responses.sql;
    } else if (
      lowercaseQuestion.includes("csrf") ||
      lowercaseQuestion.includes("cross-site request")
    ) {
      return responses.csrf;
    } else if (
      lowercaseQuestion.includes("header") ||
      lowercaseQuestion.includes("security header")
    ) {
      return responses.headers;
    }

    return `I understand you're asking about "${question}". Here's what I can tell you:

This is a comprehensive security topic that requires careful consideration. For specific vulnerabilities:

• **Assessment**: Identify the attack vector and potential impact
• **Mitigation**: Implement appropriate security controls
• **Testing**: Validate fixes through security testing
• **Monitoring**: Set up detection for similar attacks

Would you like me to elaborate on any specific aspect of this security concern? I can provide more detailed guidance on implementation, testing strategies, or related security topics.`;
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
          <SparklesIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            AI Security Assistant
          </h1>
          <p className="text-gray-400">
            Get expert guidance on security vulnerabilities and best practices
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Questions Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Questions
            </h3>
            <div className="space-y-3">
              {quickQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(item.question)}
                  className="w-full p-3 text-left rounded-lg border border-purple-500/20 hover:border-purple-400/40 hover:bg-purple-500/5 transition-all group"
                >
                  <div className="flex items-center gap-3 text-purple-400 group-hover:text-purple-300 mb-2">
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300">
                    {item.question.slice(0, 60)}...
                  </p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "bg-gray-800/50 border border-purple-500/20 text-gray-100"
                    }`}
                  >
                    {message.type === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <SparklesIcon className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-400">
                          InviScan AI
                        </span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-2 ${
                        message.type === "user"
                          ? "text-purple-200"
                          : "text-gray-400"
                      }`}
                    >
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">
                        InviScan AI
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-purple-500/20 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSendMessage(inputMessage)
                  }
                  placeholder="Ask about security vulnerabilities, best practices, or get help with specific issues..."
                  className="flex-1 bg-gray-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-6 bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
