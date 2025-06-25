import React from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../components/Card";
import Button from "../components/Button";

const Dashboard = () => {
  const stats = [
    {
      title1: "Total Scans",
      value1: "1,247",
      change1: "+12%",
      icon1: MagnifyingGlassIcon,

      title2: "Vulnerabilities Found",
      value2: "89",
      change2: "-23%",
      icon2: ShieldExclamationIcon,

      color: "text-red-400",
    },
  ];

  const severityData = [
    { name: "Critical", value: 12, color: "#ef4444" },
    { name: "High", value: 23, color: "#f97316" },
    { name: "Medium", value: 34, color: "#eab308" },
    { name: "Low", value: 20, color: "#3b82f6" },
  ];

  const recentScans = [
    {
      id: 1,
      target: "api.example.com",
      status: "Completed",
      vulnerabilities: 5,
      time: "2 hours ago",
      severity: "Medium",
    },
    {
      id: 2,
      target: "app.dashboard.com",
      status: "In Progress",
      vulnerabilities: 0,
      time: "30 minutes ago",
      severity: "Low",
    },
    {
      id: 3,
      target: "secure.payment.com",
      status: "Completed",
      vulnerabilities: 12,
      time: "5 hours ago",
      severity: "Critical",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "text-red-400 bg-red-400/10";
      case "high":
        return "text-orange-400 bg-orange-400/10";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "low":
        return "text-blue-400 bg-blue-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Monitor your application security in real-time
          </p>
        </div>
        <Link to="/app/new-scan">
          <Button size="lg">
            <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
            Start New Scan
          </Button>
        </Link>
      </div>

      {/* Stats + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Combined Card */}
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 min-h-80 relative flex items-start "
          >
            <div
              className={`absolute top-4 right-4 w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center ${stat.color}`}
            >
              <stat.icon1 className="w-6 h-6" />
            </div>
<div className="space-y-16">
  <div>
    <p className="text-gray-400 text-lg">{stat.title1}</p>
    <p className="text-4xl font-bold text-white mt-2">{stat.value1}</p>
    <p
      className={`text-base mt-2 ${
        stat.change1.startsWith("+") ? "text-green-400" : "text-red-400"
      }`}
    >
      {stat.change1} from last month
    </p>
  </div>

  <div>
    <p className="text-gray-400 text-lg">{stat.title2}</p>
    <p className="text-4xl font-bold text-white mt-2">{stat.value2}</p>
    <p
      className={`text-base mt-2 ${
        stat.change2.startsWith("+") ? "text-green-400" : "text-red-400"
      }`}
    >
      {stat.change2} from last month
    </p>
  </div>
</div>

            
          </Card>
        ))}

        {/* Severity Distribution */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            Vulnerability Severity Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Scan History Table */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">
            Recent Scan History
          </h3>
          <Link to="/app/reports">
            <Button variant="outline">View All Reports</Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Target
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Vulnerabilities
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Severity
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan) => (
                <tr
                  key={scan.id}
                  className="border-b border-purple-500/10 hover:bg-purple-600/5"
                >
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">
                      {scan.target}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        scan.status === "Completed"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-yellow-400/10 text-yellow-400"
                      }`}
                    >
                      {scan.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white">{scan.vulnerabilities}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                        scan.severity
                      )}`}
                    >
                      {scan.severity}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-400">{scan.time}</span>
                  </td>
                  <td className="py-4 px-4">
                    <Link to={`/app/scan-progress/${scan.id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
