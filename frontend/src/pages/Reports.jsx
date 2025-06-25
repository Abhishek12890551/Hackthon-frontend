import React, { useState, useRef, useEffect } from "react";
import {
  DocumentTextIcon,
  ShieldExclamationIcon,
  ClockIcon,
  LinkIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  EyeIcon,
  GlobeAltIcon,
  ServerIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Card from "../components/Card";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  // Fetch reports from backend
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual FastAPI endpoint
      const response = await fetch("/api/reports/latest", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setReportData(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (rate) => {
    if (rate >= 80) return "text-red-400 border-red-400/30 bg-red-400/10";
    if (rate >= 50)
      return "text-orange-400 border-orange-400/30 bg-orange-400/10";
    if (rate >= 20)
      return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
    return "text-green-400 border-green-400/30 bg-green-400/10";
  };

  const getSeverityText = (rate) => {
    if (rate >= 80) return "Critical";
    if (rate >= 50) return "High";
    if (rate >= 20) return "Medium";
    return "Low";
  };

  // Helper functions for safe data calculations
  const calculateVulnerabilityTotals = (scans) => {
    if (!Array.isArray(scans)) return 0;
    return scans.reduce(
      (sum, scan) => sum + (scan.vulnerabilitiesFound || 0),
      0
    );
  };

  const calculateUrlTotals = (scans) => {
    if (!Array.isArray(scans)) return 0;
    return scans.reduce((sum, scan) => sum + (scan.urlsScanned || 0), 0);
  };

  const calculateTotalTime = (scans) => {
    if (!Array.isArray(scans)) return 0;
    return scans.reduce((sum, scan) => {
      const time = parseFloat(scan.timeTaken) || 0;
      return sum + time;
    }, 0);
  };

  const generatePDF = () => {
    if (!reportData) {
      alert("No report data available to generate PDF");
      return;
    }

    try {
      console.log("Starting PDF generation...");

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let yPosition = 20;

      // Simple professional header
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, pageWidth, 35, "F");

      // Simple logo placeholder
      doc.setFillColor(255, 255, 255);
      doc.rect(10, 8, 25, 18, "F");
      doc.setDrawColor(41, 128, 185);
      doc.setLineWidth(1);
      doc.rect(10, 8, 25, 18);

      // Simple logo text
      doc.setTextColor(41, 128, 185);
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text("InviScan", 12, 18);

      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.text("Website Vulnerability Scanner Report", pageWidth - 15, 18, {
        align: "right",
      });

      // Subtitle
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(
        `Generated on ${new Date().toLocaleDateString()}`,
        pageWidth - 15,
        25,
        {
          align: "right",
        }
      );

      yPosition = 45;

      // Simple target URL section
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");

      // Simple checkmark
      doc.setFillColor(46, 204, 113);
      doc.circle(15, yPosition, 3, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text("✓", 13.5, yPosition + 1);

      // Target URL
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(reportData.url, 25, yPosition);

      yPosition += 20;

      // Simple summary section
      doc.setFillColor(240, 240, 240);
      doc.rect(15, yPosition - 5, pageWidth - 30, 8, "F");

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Summary", 17, yPosition);
      yPosition += 15;

      // Create summary stats
      const criticalCount = reportData.scans.filter(
        (scan) => scan.classification === "Critical"
      ).length;
      const highCount = reportData.scans.filter(
        (scan) => scan.classification === "High"
      ).length;
      const mediumCount = reportData.scans.filter(
        (scan) => scan.classification === "Medium"
      ).length;

      // Simple classification boxes
      const startX = 15;
      const boxWidth = 30;
      const boxHeight = 15;

      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text("Classification Level", startX, yPosition);
      yPosition += 5;

      // Critical (Red)
      doc.setFillColor(231, 76, 60);
      doc.rect(startX, yPosition, boxWidth, boxHeight, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(criticalCount.toString(), startX + boxWidth / 2, yPosition + 9, {
        align: "center",
      });

      // High (Orange)
      doc.setFillColor(230, 126, 34);
      doc.rect(startX + boxWidth + 5, yPosition, boxWidth, boxHeight, "F");
      doc.setTextColor(255, 255, 255);
      doc.text(
        highCount.toString(),
        startX + boxWidth + 5 + boxWidth / 2,
        yPosition + 9,
        { align: "center" }
      );

      // Medium (Blue)
      doc.setFillColor(52, 152, 219);
      doc.rect(
        startX + (boxWidth + 5) * 2,
        yPosition,
        boxWidth,
        boxHeight,
        "F"
      );
      doc.setTextColor(255, 255, 255);
      doc.text(
        mediumCount.toString(),
        startX + (boxWidth + 5) * 2 + boxWidth / 2,
        yPosition + 9,
        { align: "center" }
      );

      // Low (Green)
      doc.setFillColor(46, 204, 113);
      doc.rect(
        startX + (boxWidth + 5) * 3,
        yPosition,
        boxWidth,
        boxHeight,
        "F"
      );
      doc.setTextColor(255, 255, 255);
      doc.text("0", startX + (boxWidth + 5) * 3 + boxWidth / 2, yPosition + 9, {
        align: "center",
      });

      yPosition += boxHeight + 5;

      // Labels for the boxes
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.setFont(undefined, "normal");
      doc.text("Critical", startX + boxWidth / 2, yPosition, {
        align: "center",
      });
      doc.text("High", startX + boxWidth + 5 + boxWidth / 2, yPosition, {
        align: "center",
      });
      doc.text(
        "Medium",
        startX + (boxWidth + 5) * 2 + boxWidth / 2,
        yPosition,
        { align: "center" }
      );
      doc.text("Low", startX + (boxWidth + 5) * 3 + boxWidth / 2, yPosition, {
        align: "center",
      });

      yPosition += 15;

      // Simple scan information box
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.rect(15, yPosition, pageWidth - 30, 35);

      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text("Scan Information", 17, yPosition + 8);

      doc.setFontSize(8);
      doc.setFont(undefined, "normal");
      doc.text(`Start time: ${reportData.scanDate}`, 17, yPosition + 15);
      doc.text(`Scan duration: ${reportData.scanDuration}`, 17, yPosition + 20);
      doc.text(
        `Open ports: ${reportData.openPorts.join(", ")}`,
        17,
        yPosition + 25
      );
      doc.text(
        `Technologies: ${reportData.technologies.slice(0, 2).join(", ")}`,
        17,
        yPosition + 30
      );

      yPosition += 45;

      // Simple findings section
      doc.setFillColor(240, 240, 240);
      doc.rect(15, yPosition - 5, pageWidth - 30, 8, "F");

      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Findings", 17, yPosition);
      yPosition += 15;

      // Individual vulnerability findings
      reportData.scans.forEach((scan) => {
        if (yPosition > pageHeight - 100) {
          doc.addPage();
          yPosition = 20;
        }

        // Simple vulnerability header (removed status badge)
        doc.setFillColor(231, 76, 60);
        doc.rect(15, yPosition - 3, 4, 8, "F");

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text(scan.type, 25, yPosition + 2);

        yPosition += 12;

        // Vulnerability details table
        const tableData = [
          ["URL", "Method", "Vulnerable Parameter", "Payload"],
        ];

        scan.vulnerabilities.forEach((vuln) => {
          tableData.push([
            vuln.url.length > 40 ? vuln.url.substring(0, 40) + "..." : vuln.url,
            vuln.method,
            vuln.parameter,
            vuln.payload.length > 50
              ? vuln.payload.substring(0, 50) + "..."
              : vuln.payload,
          ]);
        });

        autoTable(doc, {
          startY: yPosition,
          head: [tableData[0]],
          body: tableData.slice(1),
          margin: { left: 25, right: 25 }, // Centered positioning
          theme: "striped",
          headStyles: {
            fillColor: [41, 128, 185], // Changed to match header color
            textColor: [255, 255, 255],
            fontSize: 10,
            fontStyle: "bold",
            halign: "center",
          },
          bodyStyles: {
            fontSize: 9,
            cellPadding: 4,
            textColor: [0, 0, 0],
          },
          alternateRowStyles: {
            fillColor: [240, 248, 255], // Light blue alternating rows
          },
          styles: {
            lineColor: [41, 128, 185], // Matching border color
            lineWidth: 0.5,
          },
          columnStyles: {
            0: { cellWidth: 45, halign: "left" }, // URL column
            1: { cellWidth: 20, halign: "center" }, // Method column
            2: { cellWidth: 35, halign: "center" }, // Parameter column
            3: { cellWidth: 60, halign: "left" }, // Payload column (increased width)
          },
        });

        yPosition = doc.lastAutoTable.finalY + 10;

        // Check if we need a new page for risk description
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }

        // Simple risk description
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, "bold");
        doc.text("Risk description:", 15, yPosition);
        yPosition += 5;

        doc.setFont(undefined, "normal");
        const riskText =
          scan.vulnerabilities[0]?.description ||
          "High risk vulnerability found.";
        const riskLines = doc.splitTextToSize(riskText, pageWidth - 30);
        doc.text(riskLines, 15, yPosition);
        yPosition += Math.max(riskLines.length * 4, 12);

        // Check if we need a new page for recommendation
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        // Simple recommendation
        doc.setFont(undefined, "bold");
        doc.text("Recommendation:", 15, yPosition);
        yPosition += 5;

        doc.setFont(undefined, "normal");
        const recommendation =
          "Implement proper input validation and sanitization measures.";
        const recLines = doc.splitTextToSize(recommendation, pageWidth - 30);
        doc.text(recLines, 15, yPosition);
        yPosition += Math.max(recLines.length * 4, 12) + 10;
      });

      // Simple footer with reduced height
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        // Smaller footer background
        doc.setFillColor(248, 250, 252);
        doc.rect(0, pageHeight - 15, pageWidth, 15, "F");

        // Simple footer content
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.setFont(undefined, "normal");
        doc.text("Generated by InviScan", 15, pageHeight - 8);

        // Page numbers
        doc.setTextColor(71, 85, 105);
        doc.setFont(undefined, "bold");
        doc.text(`${i} / ${pageCount}`, pageWidth / 2, pageHeight - 8, {
          align: "center",
        });

        // Generation date
        doc.setTextColor(100, 116, 139);
        doc.setFont(undefined, "normal");
        doc.text(
          new Date().toLocaleDateString(),
          pageWidth - 15,
          pageHeight - 8,
          {
            align: "right",
          }
        );
      }

      console.log("Saving PDF...");
      doc.save(
        `vulnerability-report-${new Date().toISOString().split("T")[0]}.pdf`
      );
      console.log("PDF generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF: " + error.message);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading reports...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">
                  Error Loading Reports
                </h3>
                <p className="text-red-600 mt-1">{error}</p>
                <button
                  onClick={fetchReports}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // No data state
  if (!reportData) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Reports Available
            </h3>
            <p className="text-gray-600">
              No scan reports found. Run a vulnerability scan to generate
              reports.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8" ref={reportRef}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Security Reports
            </h1>
            <p className="text-gray-400">
              Detailed vulnerability assessment results
            </p>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download Enhanced PDF Report
          </button>
        </div>

        {/* Target Information */}
        <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
          <div className="flex items-center gap-3 mb-6">
            <GlobeAltIcon className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">
              Target Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400 text-sm">URL</span>
              </div>
              <p className="text-white font-mono text-sm break-all">
                {reportData?.url || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ServerIcon className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400 text-sm">IP Address</span>
              </div>
              <p className="text-white font-mono">{reportData?.ip || "N/A"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400 text-sm">Open Ports</span>
              </div>
              <p className="text-white">
                {reportData?.openPorts?.join(", ") || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400 text-sm">Technologies</span>
              </div>
              <div className="space-y-1">
                {reportData?.technologies?.map((tech, index) => (
                  <p key={index} className="text-white text-sm">
                    {tech}
                  </p>
                )) || <p className="text-white text-sm">N/A</p>}
              </div>
            </div>
          </div>
        </Card>

        {/* Scan Results Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-400/20">
            <div className="flex items-center gap-3 mb-4">
              <ShieldExclamationIcon className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">
                Total Vulnerabilities
              </h3>
            </div>
            <div className="text-3xl font-bold text-red-400 mb-2">
              {calculateVulnerabilityTotals(reportData?.scans)}
            </div>
            <p className="text-gray-400 text-sm">Across all scan types</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-400/20">
            <div className="flex items-center gap-3 mb-4">
              <EyeIcon className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">URLs Scanned</h3>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {calculateUrlTotals(reportData?.scans)}
            </div>
            <p className="text-gray-400 text-sm">Total endpoints tested</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-400/20">
            <div className="flex items-center gap-3 mb-4">
              <ClockIcon className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Scan Duration
              </h3>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {calculateTotalTime(reportData?.scans).toFixed(2)}s
            </div>
            <p className="text-gray-400 text-sm">Total time taken</p>
          </Card>
        </div>

        {/* Detailed Scan Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Detailed Scan Results
          </h2>

          {reportData?.scans?.map((scan) => (
            <Card
              key={scan.id}
              className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 border-gray-700/30"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {scan.type}
                  </h3>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(
                      scan.vulnerabilityRate
                    )}`}
                  >
                    <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                    {getSeverityText(scan.vulnerabilityRate)} Risk
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedReport(
                      selectedReport === scan.id ? null : scan.id
                    )
                  }
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  {selectedReport === scan.id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Scan Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-2xl font-bold text-red-400">
                    {scan.vulnerabilitiesFound}
                  </div>
                  <div className="text-gray-400 text-sm">Vulnerabilities</div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-2xl font-bold text-blue-400">
                    {scan.urlsScanned}
                  </div>
                  <div className="text-gray-400 text-sm">URLs Scanned</div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-2xl font-bold text-green-400">
                    {scan.timeTaken}
                  </div>
                  <div className="text-gray-400 text-sm">Duration</div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                  <div className="text-2xl font-bold text-yellow-400">
                    {scan.vulnerabilityRate}%
                  </div>
                  <div className="text-gray-400 text-sm">
                    Vulnerability Rate
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Vulnerability Rate</span>
                  <span>{scan.vulnerabilityRate}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scan.vulnerabilityRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Vulnerable URLs (shown when expanded) */}
              {selectedReport === scan.id && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Vulnerable URLs
                  </h4>
                  <div className="space-y-3">
                    {scan.vulnerabilities.map((vuln, index) => (
                      <div
                        key={index}
                        className="bg-red-900/20 border border-red-400/30 rounded-lg p-4 hover:bg-red-900/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <ExclamationTriangleIcon className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="mb-2">
                              <a
                                href={vuln.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 font-mono text-sm break-all underline"
                              >
                                {vuln.url}
                              </a>
                            </div>
                            <div className="bg-black/30 rounded p-2 border border-gray-600">
                              <span className="text-gray-400 text-xs">
                                Payload:
                              </span>
                              <code className="text-red-300 font-mono text-sm ml-2">
                                {vuln.payload}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
