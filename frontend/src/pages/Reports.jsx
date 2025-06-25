import React, { useState } from 'react';
import { 
  DocumentTextIcon,
  DocumentArrowDownIcon,
  EnvelopeIcon,
  FunnelIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Button from '../components/Button';
import ScanTable from '../components/ScanTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterPeriod, setFilterPeriod] = useState('30days');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Mock data
  const recentScans = [
    {
      id: 'scan-001',
      target: 'https://example.com',
      type: 'Full Security Scan',
      date: '2024-01-15T10:30:00Z',
      status: 'completed',
      riskLevel: 'High',
      vulnerabilities: 12
    },
    {
      id: 'scan-002',
      target: 'https://api.company.com',
      type: 'API Security Scan',
      date: '2024-01-14T14:20:00Z',
      status: 'completed',
      riskLevel: 'Medium',
      vulnerabilities: 5
    },
    {
      id: 'scan-003',
      target: 'https://admin.site.com',
      type: 'Web Application Scan',
      date: '2024-01-13T09:15:00Z',
      status: 'completed',
      riskLevel: 'Critical',
      vulnerabilities: 23
    },
    {
      id: 'scan-004',
      target: 'https://mobile.app.com',
      type: 'Mobile API Scan',
      date: '2024-01-12T16:45:00Z',
      status: 'failed',
      riskLevel: 'Unknown',
      vulnerabilities: 0
    }
  ];

  const vulnerabilityTrends = [
    { month: 'Oct', critical: 8, high: 15, medium: 22, low: 35 },
    { month: 'Nov', critical: 6, high: 12, medium: 18, low: 28 },
    { month: 'Dec', critical: 4, high: 10, medium: 15, low: 25 },
    { month: 'Jan', critical: 3, high: 8, medium: 12, low: 20 }
  ];

  const riskDistribution = [
    { name: 'Critical', value: 8, color: '#ef4444' },
    { name: 'High', value: 15, color: '#f97316' },
    { name: 'Medium', value: 22, color: '#eab308' },
    { name: 'Low', value: 35, color: '#22c55e' }
  ];

  const reportStats = {
    totalScans: 47,
    totalVulnerabilities: 156,
    averageRiskScore: 7.2,
    patchedVulnerabilities: 89
  };

  const handleViewReport = (scan) => {
    setSelectedReport(scan);
  };

  const handleDownloadPDF = async (scan) => {
    setIsGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(20);
      pdf.text('InviScan AI Security Report', 20, 20);
      
      // Add scan details
      pdf.setFontSize(12);
      pdf.text(`Target: ${scan.target}`, 20, 40);
      pdf.text(`Scan Type: ${scan.type}`, 20, 50);
      pdf.text(`Date: ${new Date(scan.date).toLocaleDateString()}`, 20, 60);
      pdf.text(`Status: ${scan.status}`, 20, 70);
      pdf.text(`Risk Level: ${scan.riskLevel}`, 20, 80);
      pdf.text(`Vulnerabilities Found: ${scan.vulnerabilities}`, 20, 90);
      
      // Add summary
      pdf.text('Executive Summary:', 20, 110);
      pdf.text('This automated security scan identified several vulnerabilities', 20, 120);
      pdf.text('that require immediate attention. Please review the detailed', 20, 130);
      pdf.text('findings and implement the suggested patches.', 20, 140);
      
      // Save the PDF
      pdf.save(`InviScan-Report-${scan.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailReport = (scan) => {
    const subject = `Security Report - ${scan.target}`;
    const body = `Please find the security scan report for ${scan.target}.\n\nScan Details:\n- Type: ${scan.type}\n- Date: ${new Date(scan.date).toLocaleDateString()}\n- Vulnerabilities: ${scan.vulnerabilities}\n- Risk Level: ${scan.riskLevel}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const filteredScans = recentScans.filter(scan => {
    if (filterStatus !== 'all' && scan.status !== filterStatus) return false;
    
    const scanDate = new Date(scan.date);
    const now = new Date();
    const daysAgo = (now - scanDate) / (1000 * 60 * 60 * 24);
    
    switch (filterPeriod) {
      case '7days':
        return daysAgo <= 7;
      case '30days':
        return daysAgo <= 30;
      case '90days':
        return daysAgo <= 90;
      default:
        return true;
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Reports</h1>
          <p className="text-gray-400">Comprehensive vulnerability reports and analytics</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex items-center gap-2"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Print Summary
          </Button>
          <Button
            onClick={() => handleDownloadPDF(recentScans[0])}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            {isGeneratingPDF ? 'Generating...' : 'Export PDF'}
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Scans</p>
              <p className="text-2xl font-bold text-white">{reportStats.totalScans}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-purple-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Vulnerabilities</p>
              <p className="text-2xl font-bold text-white">{reportStats.totalVulnerabilities}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Average Risk Score</p>
              <p className="text-2xl font-bold text-white">{reportStats.averageRiskScore}/10</p>
            </div>
            <ClockIcon className="w-8 h-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Patched Issues</p>
              <p className="text-2xl font-bold text-white">{reportStats.patchedVulnerabilities}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Vulnerability Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vulnerabilityTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="critical" stackId="a" fill="#ef4444" />
              <Bar dataKey="high" stackId="a" fill="#f97316" />
              <Bar dataKey="medium" stackId="a" fill="#eab308" />
              <Bar dataKey="low" stackId="a" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Scan Reports</h3>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-purple-500/20 rounded-lg text-white text-sm"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-purple-500/20 rounded-lg text-white text-sm"
            >
              <option value="all">All statuses</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>

        <ScanTable
          scans={filteredScans}
          onViewReport={handleViewReport}
          onDownloadReport={handleDownloadPDF}
        />
      </Card>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Detailed Report</h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Scan Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Target:</span> <span className="text-white">{selectedReport.target}</span></p>
                    <p><span className="text-gray-400">Type:</span> <span className="text-white">{selectedReport.type}</span></p>
                    <p><span className="text-gray-400">Date:</span> <span className="text-white">{new Date(selectedReport.date).toLocaleString()}</span></p>
                    <p><span className="text-gray-400">Status:</span> <span className="text-white capitalize">{selectedReport.status}</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Risk Assessment</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Risk Level:</span> <span className={`font-semibold ${selectedReport.riskLevel === 'Critical' ? 'text-red-400' : selectedReport.riskLevel === 'High' ? 'text-orange-400' : 'text-yellow-400'}`}>{selectedReport.riskLevel}</span></p>
                    <p><span className="text-gray-400">Vulnerabilities:</span> <span className="text-white">{selectedReport.vulnerabilities} found</span></p>
                    <p><span className="text-gray-400">Score:</span> <span className="text-white">7.2/10</span></p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Executive Summary</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This security scan identified {selectedReport.vulnerabilities} vulnerabilities across various categories. 
                  The scan detected potential security risks including SQL injection vulnerabilities, cross-site scripting (XSS) issues, 
                  and outdated software components. Immediate attention is recommended for critical and high-risk findings to maintain 
                  the security posture of the application.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleDownloadPDF(selectedReport)}
                  disabled={isGeneratingPDF}
                  className="flex items-center gap-2"
                >
                  <DocumentArrowDownIcon className="w-4 h-4" />
                  {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleEmailReport(selectedReport)}
                  className="flex items-center gap-2"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  Email Report
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;
