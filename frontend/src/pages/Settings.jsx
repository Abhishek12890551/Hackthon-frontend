import React, { useState } from "react";
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  BellIcon,
  UserIcon,
  GlobeAltIcon,
  KeyIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";
import Card from "../components/Card";

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    theme: "dark",
    language: "en",
    timezone: "UTC",

    // Scan Settings
    defaultScanType: "comprehensive",
    maxConcurrentScans: 3,
    scanTimeout: 300,
    autoSaveReports: true,

    // Security Settings
    sessionTimeout: 30,
    twoFactorAuth: false,
    apiKeyRotation: 90,

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    slackIntegration: false,
    webhookUrl: "",

    // AI Assistant
    aiAssistantEnabled: true,
    autoSuggestions: true,
    learningMode: true,
  });

  const [activeTab, setActiveTab] = useState("general");

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings);
    // Here you would implement the API call to save settings
  };

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
    },
    {
      id: "scanning",
      label: "Scanning",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
    },
    {
      id: "security",
      label: "Security",
      icon: <KeyIcon className="w-5 h-5" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <BellIcon className="w-5 h-5" />,
    },
    { id: "ai", label: "AI Assistant", icon: <UserIcon className="w-5 h-5" /> },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Theme
        </label>
        <select
          value={settings.theme}
          onChange={(e) => handleSettingChange("theme", e.target.value)}
          className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400/50"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Language
        </label>
        <select
          value={settings.language}
          onChange={(e) => handleSettingChange("language", e.target.value)}
          className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400/50"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Timezone
        </label>
        <select
          value={settings.timezone}
          onChange={(e) => handleSettingChange("timezone", e.target.value)}
          className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400/50"
        >
          <option value="UTC">UTC</option>
          <option value="EST">Eastern (EST)</option>
          <option value="PST">Pacific (PST)</option>
          <option value="GMT">Greenwich (GMT)</option>
        </select>
      </div>
    </div>
  );

  const renderScanningSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Default Scan Type
        </label>
        <select
          value={settings.defaultScanType}
          onChange={(e) =>
            handleSettingChange("defaultScanType", e.target.value)
          }
          className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400/50"
        >
          <option value="quick">Quick Scan</option>
          <option value="standard">Standard Scan</option>
          <option value="comprehensive">Comprehensive Scan</option>
          <option value="custom">Custom Scan</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Max Concurrent Scans: {settings.maxConcurrentScans}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={settings.maxConcurrentScans}
          onChange={(e) =>
            handleSettingChange("maxConcurrentScans", parseInt(e.target.value))
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Scan Timeout (seconds)
        </label>
        <input
          type="number"
          value={settings.scanTimeout}
          onChange={(e) =>
            handleSettingChange("scanTimeout", parseInt(e.target.value))
          }
          className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400/50"
          min="60"
          max="3600"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Auto-save Reports</h4>
          <p className="text-sm text-gray-400">
            Automatically save scan reports when completed
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoSaveReports}
            onChange={(e) =>
              handleSettingChange("autoSaveReports", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) =>
            handleSettingChange("sessionTimeout", parseInt(e.target.value))
          }
          className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400/50"
          min="5"
          max="480"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-400">
            Add an extra layer of security to your account
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={(e) =>
              handleSettingChange("twoFactorAuth", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          API Key Rotation (days)
        </label>
        <select
          value={settings.apiKeyRotation}
          onChange={(e) =>
            handleSettingChange("apiKeyRotation", parseInt(e.target.value))
          }
          className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400/50"
        >
          <option value="30">30 days</option>
          <option value="60">60 days</option>
          <option value="90">90 days</option>
          <option value="180">180 days</option>
          <option value="365">1 year</option>
        </select>
      </div>

      <Card className="p-4 border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h4 className="text-yellow-400 font-medium">
              Security Recommendations
            </h4>
            <ul className="text-sm text-yellow-200 mt-2 space-y-1">
              <li>• Enable two-factor authentication</li>
              <li>• Use strong, unique passwords</li>
              <li>• Regularly rotate API keys</li>
              <li>• Monitor login activity</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Email Notifications</h4>
          <p className="text-sm text-gray-400">
            Receive scan results and alerts via email
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) =>
              handleSettingChange("emailNotifications", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Push Notifications</h4>
          <p className="text-sm text-gray-400">
            Browser notifications for real-time updates
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) =>
              handleSettingChange("pushNotifications", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Slack Integration</h4>
          <p className="text-sm text-gray-400">
            Send notifications to Slack channels
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.slackIntegration}
            onChange={(e) =>
              handleSettingChange("slackIntegration", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Webhook URL
        </label>
        <input
          type="url"
          value={settings.webhookUrl}
          onChange={(e) => handleSettingChange("webhookUrl", e.target.value)}
          placeholder="https://your-webhook-url.com/endpoint"
          className="w-full bg-gray-800/50 border border-purple-500/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50"
        />
      </div>
    </div>
  );

  const renderAISettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">AI Assistant</h4>
          <p className="text-sm text-gray-400">
            Enable AI-powered security guidance
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.aiAssistantEnabled}
            onChange={(e) =>
              handleSettingChange("aiAssistantEnabled", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Auto Suggestions</h4>
          <p className="text-sm text-gray-400">
            Get automatic remediation suggestions
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoSuggestions}
            onChange={(e) =>
              handleSettingChange("autoSuggestions", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Learning Mode</h4>
          <p className="text-sm text-gray-400">
            Allow AI to learn from your preferences
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.learningMode}
            onChange={(e) =>
              handleSettingChange("learningMode", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>
    </div>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "scanning":
        return renderScanningSettings();
      case "security":
        return renderSecuritySettings();
      case "notifications":
        return renderNotificationSettings();
      case "ai":
        return renderAISettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">
            Configure your InviScan preferences and security options
          </p>
        </div>
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              {tabs.find((tab) => tab.id === activeTab)?.label} Settings
            </h2>
            {renderActiveTabContent()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
