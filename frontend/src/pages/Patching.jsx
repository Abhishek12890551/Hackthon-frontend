import React, { useState } from "react";
import {
  ShieldCheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";
import Card from "../components/Card";

const Patching = () => {
  const [selectedPatches, setSelectedPatches] = useState([]);
  const [patchingMode, setPatchingMode] = useState("manual"); // manual, automatic

  const vulnerabilities = [
    {
      id: "CVE-2024-1234",
      title: "SQL Injection in Login Form",
      severity: "Critical",
      description: "Unvalidated user input allows SQL injection attacks",
      affectedComponent: "Authentication Module",
      patchAvailable: true,
      patchStatus: "ready",
      estimatedTime: "5 minutes",
      dependencies: ["Database restart required"],
      riskLevel: "high",
    },
    {
      id: "CVE-2024-5678",
      title: "Cross-Site Scripting (XSS)",
      severity: "High",
      description: "Reflected XSS vulnerability in search functionality",
      affectedComponent: "Search Module",
      patchAvailable: true,
      patchStatus: "installing",
      estimatedTime: "3 minutes",
      dependencies: [],
      riskLevel: "medium",
    },
    {
      id: "CVE-2024-9012",
      title: "Insecure Direct Object Reference",
      severity: "Medium",
      description: "Users can access unauthorized resources",
      affectedComponent: "File Manager",
      patchAvailable: true,
      patchStatus: "completed",
      estimatedTime: "2 minutes",
      dependencies: [],
      riskLevel: "low",
    },
    {
      id: "CVE-2024-3456",
      title: "Weak Password Policy",
      severity: "Low",
      description: "Password requirements are insufficient",
      affectedComponent: "User Management",
      patchAvailable: false,
      patchStatus: "pending",
      estimatedTime: "Manual fix required",
      dependencies: ["Policy update needed"],
      riskLevel: "low",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "high":
        return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "low":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case "installing":
        return <ClockIcon className="w-5 h-5 text-yellow-400 animate-spin" />;
      case "ready":
        return <PlayIcon className="w-5 h-5 text-blue-400" />;
      case "pending":
        return <ExclamationTriangleIcon className="w-5 h-5 text-orange-400" />;
      default:
        return <PauseIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleSelectPatch = (id) => {
    setSelectedPatches((prev) =>
      prev.includes(id)
        ? prev.filter((patchId) => patchId !== id)
        : [...prev, id]
    );
  };

  const handleInstallSelected = () => {
    console.log("Installing patches:", selectedPatches);
    // Here you would implement the patching logic
  };

  const readyPatches = vulnerabilities.filter((v) => v.patchStatus === "ready");
  const installingPatches = vulnerabilities.filter(
    (v) => v.patchStatus === "installing"
  );
  const completedPatches = vulnerabilities.filter(
    (v) => v.patchStatus === "completed"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Security Patching
          </h1>
          <p className="text-gray-400">
            Manage and apply security patches to fix vulnerabilities
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => window.location.reload()}>
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Check for Updates
          </Button>
          <Button
            onClick={handleInstallSelected}
            disabled={selectedPatches.length === 0}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <PlayIcon className="w-4 h-4 mr-2" />
            Install Selected ({selectedPatches.length})
          </Button>
        </div>
      </div>

      {/* Patching Mode Toggle */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Patching Mode
            </h3>
            <p className="text-gray-400">
              Choose how patches should be applied
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="patchingMode"
                value="manual"
                checked={patchingMode === "manual"}
                onChange={(e) => setPatchingMode(e.target.value)}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-white">Manual</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="patchingMode"
                value="automatic"
                checked={patchingMode === "automatic"}
                onChange={(e) => setPatchingMode(e.target.value)}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-white">Automatic</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {readyPatches.length}
              </p>
              <p className="text-gray-400 text-sm">Ready to Install</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-500/20">
              <ClockIcon className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {installingPatches.length}
              </p>
              <p className="text-gray-400 text-sm">Installing</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {completedPatches.length}
              </p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-500/20">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {vulnerabilities.filter((v) => !v.patchAvailable).length}
              </p>
              <p className="text-gray-400 text-sm">Manual Fix Required</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Vulnerabilities List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            Available Patches
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPatches(readyPatches.map((v) => v.id))}
          >
            Select All Ready
          </Button>
        </div>

        <div className="space-y-4">
          {vulnerabilities.map((vulnerability) => (
            <div
              key={vulnerability.id}
              className="border border-purple-500/20 rounded-lg p-4 hover:border-purple-400/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {vulnerability.patchAvailable &&
                    vulnerability.patchStatus === "ready" && (
                      <input
                        type="checkbox"
                        checked={selectedPatches.includes(vulnerability.id)}
                        onChange={() => handleSelectPatch(vulnerability.id)}
                        className="mt-1 w-4 h-4 text-purple-600 rounded"
                      />
                    )}

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white">
                        {vulnerability.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(
                          vulnerability.severity
                        )}`}
                      >
                        {vulnerability.severity}
                      </span>
                      <span className="text-xs text-gray-400">
                        #{vulnerability.id}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">
                      {vulnerability.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-gray-300">
                        <strong>Component:</strong>{" "}
                        {vulnerability.affectedComponent}
                      </span>
                      <span className="text-gray-300">
                        <strong>Time:</strong> {vulnerability.estimatedTime}
                      </span>
                      {vulnerability.dependencies.length > 0 && (
                        <span className="text-yellow-400">
                          <strong>Dependencies:</strong>{" "}
                          {vulnerability.dependencies.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusIcon(vulnerability.patchStatus)}
                  <span className="text-sm capitalize text-gray-300">
                    {vulnerability.patchStatus}
                  </span>

                  {vulnerability.patchAvailable &&
                    vulnerability.patchStatus === "ready" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          console.log("Installing patch:", vulnerability.id)
                        }
                        className="ml-3"
                      >
                        <PlayIcon className="w-4 h-4 mr-2" />
                        Install
                      </Button>
                    )}

                  {!vulnerability.patchAvailable && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        console.log("Configure manual fix:", vulnerability.id)
                      }
                      className="ml-3"
                    >
                      <Cog6ToothIcon className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Patching;
