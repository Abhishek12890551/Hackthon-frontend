import React, { useState, useRef } from "react";
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
import "jspdf-autotable";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const reportRef = useRef();

  // Sample report data based on the HTML report
  const reportData = {
    url: "https://pentest-ground.com:4280/",
    ip: "44.228.249.3",
    openPorts: ["80"],
    technologies: [
      "PHP (5.6.40-38+ubuntu20.04.1+deb.sury.org+1)",
      "nginx (1.19.0)",
    ],
    scanDate: "Feb 12, 2024 | 06:41:17 UTC",
    scanDuration: "1h 23m | 85MB bandwidth",
    scans: [
      {
        id: 1,
        type: "Remote File Inclusion",
        status: "CONFIRMED",
        vulnerabilitiesFound: 1,
        urlsScanned: 1,
        timeTaken: "74.53 seconds",
        vulnerabilityRate: 100,
        classification: "Critical",
        riskRating: "Critical",
        evidence: "Injecting the remote file URL",
        vulnerabilities: [
          {
            url: "https://pentest-ground.com:4280/",
            method: "GET",
            parameter: "file",
            payload: "https://pentest-ground.com/ssrfs/file_include.txt",
            evidence: "default_text=content_success_cwd_for_php",
            description:
              "The risk is that an attacker can run the application in an OS commands with the privileges of the vulnerable application.",
          },
        ],
      },
      {
        id: 2,
        type: "OS Command Injection",
        status: "CONFIRMED",
        vulnerabilitiesFound: 1,
        urlsScanned: 1,
        timeTaken: "45.30 seconds",
        vulnerabilityRate: 100,
        classification: "Critical",
        riskRating: "Critical",
        evidence: "Injected the shell",
        vulnerabilities: [
          {
            url: "https://pentest-ground.com:4280/",
            method: "POST",
            parameter: "cmd",
            payload: "id; ls -la; cat /etc/passwd",
            evidence: "uid=33(www-data) gid=33(www-data) groups=33(www-data)",
            description:
              "Injected the shell and the application in an OS command injection vulnerability.",
          },
        ],
      },
      {
        id: 3,
        type: "SQL Injection",
        status: "CONFIRMED",
        vulnerabilitiesFound: 2,
        urlsScanned: 5,
        timeTaken: "120.45 seconds",
        vulnerabilityRate: 40,
        classification: "High",
        riskRating: "High",
        evidence: "Boolean-based blind SQL injection",
        vulnerabilities: [
          {
            url: "https://pentest-ground.com:4280/",
            method: "GET",
            parameter: "id",
            payload:
              "1' AND (SELECT * FROM (SELECT COUNT(*),CONCAT(VERSION(),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a) --",
            evidence: "Database version: MySQL 5.7.34",
            description:
              "Injecting the status is a SQL injection vulnerability in the following script in this response.",
          },
          {
            url: "https://pentest-ground.com:4280/search",
            method: "POST",
            parameter: "query",
            payload: "admin' OR '1'='1",
            evidence: "Authentication bypass successful",
            description:
              "SQL injection allows authentication bypass and data extraction.",
          },
        ],
      },
      {
        id: 4,
        type: "Local File Inclusion",
        status: "CONFIRMED",
        vulnerabilitiesFound: 1,
        urlsScanned: 3,
        timeTaken: "32.15 seconds",
        vulnerabilityRate: 33,
        classification: "Medium",
        riskRating: "Medium",
        evidence: "File inclusion vulnerability",
        vulnerabilities: [
          {
            url: "https://pentest-ground.com:4280/file.php",
            method: "GET",
            parameter: "page",
            payload: "../../../etc/passwd",
            evidence: "root:x:0:0:root:/root:/bin/bash",
            description:
              "Local file inclusion allows reading sensitive system files.",
          },
        ],
      },
    ],
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    // Header with branding - matching the original report design
    doc.setFillColor(74, 85, 162); // Purple color
    doc.rect(0, 0, pageWidth, 35, "F");

    // Logo area (simulated)
    doc.setFillColor(255, 255, 255);
    doc.rect(10, 8, 25, 18, "F");
    doc.setTextColor(74, 85, 162);
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text("InviScan", 12, 18);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text("Website Vulnerability Scanner Report", pageWidth - 15, 20, {
      align: "right",
    });

    yPosition = 50;

    // Target URL section with border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(15, yPosition - 5, pageWidth - 30, 40);

    doc.setTextColor(0, 0, 0);
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPosition - 5, pageWidth - 30, 8, "F");

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Target Information", 17, yPosition);
    yPosition += 12;

    // Create a table-like layout for target info
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text("URL:", 17, yPosition);
    doc.text(reportData.url, 35, yPosition);
    yPosition += 5;

    doc.text("IP Address:", 17, yPosition);
    doc.text(reportData.ip, 35, yPosition);
    yPosition += 5;

    doc.text("Scan Date:", 17, yPosition);
    doc.text(reportData.scanDate, 35, yPosition);
    yPosition += 5;

    doc.text("Scan Duration:", 17, yPosition);
    doc.text(reportData.scanDuration, 35, yPosition);
    yPosition += 5;

    doc.text("Open Ports:", 17, yPosition);
    doc.text(reportData.openPorts.join(", "), 35, yPosition);
    yPosition += 8;

    yPosition += 10;

    // Summary section with colored boxes
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPosition - 5, pageWidth - 30, 8, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Summary", 17, yPosition);
    yPosition += 15;

    const totalVulns = reportData.scans.reduce(
      (sum, scan) => sum + scan.vulnerabilitiesFound,
      0
    );
    const totalUrls = reportData.scans.reduce(
      (sum, scan) => sum + scan.urlsScanned,
      0
    );
    const criticalCount = reportData.scans.filter(
      (scan) => scan.classification === "Critical"
    ).length;
    const highCount = reportData.scans.filter(
      (scan) => scan.classification === "High"
    ).length;
    const mediumCount = reportData.scans.filter(
      (scan) => scan.classification === "Medium"
    ).length;

    // Summary boxes - matching the original design
    const boxWidth = 35;
    const boxHeight = 20;
    const startX = 15;

    // Critical box (red)
    doc.setFillColor(220, 53, 69);
    doc.rect(startX, yPosition, boxWidth, boxHeight, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(criticalCount.toString(), startX + boxWidth / 2, yPosition + 8, {
      align: "center",
    });
    doc.setFontSize(8);
    doc.text("Critical", startX + boxWidth / 2, yPosition + 15, {
      align: "center",
    });

    // High box (orange)
    doc.setFillColor(255, 193, 7);
    doc.rect(startX + boxWidth + 5, yPosition, boxWidth, boxHeight, "F");
    doc.setTextColor(0, 0, 0);
    doc.text(
      highCount.toString(),
      startX + boxWidth + 5 + boxWidth / 2,
      yPosition + 8,
      { align: "center" }
    );
    doc.text("High", startX + boxWidth + 5 + boxWidth / 2, yPosition + 15, {
      align: "center",
    });

    // Medium box (green)
    doc.setFillColor(40, 167, 69);
    doc.rect(startX + (boxWidth + 5) * 2, yPosition, boxWidth, boxHeight, "F");
    doc.setTextColor(255, 255, 255);
    doc.text(
      mediumCount.toString(),
      startX + (boxWidth + 5) * 2 + boxWidth / 2,
      yPosition + 8,
      { align: "center" }
    );
    doc.text(
      "Medium",
      startX + (boxWidth + 5) * 2 + boxWidth / 2,
      yPosition + 15,
      { align: "center" }
    );

    yPosition += 35;

    // Additional summary info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text(
      `Total Vulnerabilities: ${totalVulns} | URLs Scanned: ${totalUrls}`,
      15,
      yPosition
    );
    yPosition += 15;

    // Findings section
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPosition - 5, pageWidth - 30, 8, "F");

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Findings", 17, yPosition);
    yPosition += 15;

    reportData.scans.forEach((scan) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 20;
      }

      // Vulnerability type header with colored status
      doc.setDrawColor(200, 200, 200);
      doc.rect(15, yPosition - 5, pageWidth - 30, 15);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(scan.type, 17, yPosition + 2);

      // Status badge
      const statusColors = {
        CONFIRMED: [220, 53, 69],
        POTENTIAL: [255, 193, 7],
        LOW: [40, 167, 69],
      };
      const statusColor = statusColors[scan.status] || [128, 128, 128];
      doc.setFillColor(...statusColor);
      doc.rect(pageWidth - 80, yPosition - 3, 25, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(scan.status, pageWidth - 67, yPosition + 1);

      yPosition += 15;

      // Vulnerability details using autoTable
      const vulnData = [
        ["Risk Rating", scan.riskRating],
        ["Vulnerabilities Found", scan.vulnerabilitiesFound.toString()],
        ["URLs Scanned", scan.urlsScanned.toString()],
        ["Time Taken", scan.timeTaken],
        ["Vulnerability Rate", `${scan.vulnerabilityRate}%`],
      ];

      doc.autoTable({
        startY: yPosition,
        head: [["Property", "Value"]],
        body: vulnData,
        margin: { left: 15, right: 15 },
        theme: "grid",
        headStyles: { fillColor: [74, 85, 162] },
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: "auto" },
        },
      });

      yPosition = doc.lastAutoTable.finalY + 10;

      // Individual vulnerabilities
      scan.vulnerabilities.forEach((vuln, vulnIndex) => {
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }

        // Vulnerability header
        doc.setFillColor(252, 248, 248);
        doc.rect(15, yPosition - 2, pageWidth - 30, 6, "F");
        doc.setTextColor(220, 53, 69);
        doc.setFontSize(10);
        doc.setFont(undefined, "bold");
        doc.text(`Vulnerability ${vulnIndex + 1}`, 17, yPosition + 2);
        yPosition += 8;

        // Vulnerability details table
        const vulnDetails = [
          ["URL", vuln.url],
          ["Method", vuln.method],
          ["Parameter", vuln.parameter],
          ["Payload", vuln.payload],
          ["Evidence", vuln.evidence],
        ];

        doc.autoTable({
          startY: yPosition,
          body: vulnDetails,
          margin: { left: 15, right: 15 },
          theme: "striped",
          styles: {
            fontSize: 8,
            cellPadding: 2,
          },
          columnStyles: {
            0: {
              cellWidth: 25,
              fontStyle: "bold",
              fillColor: [240, 240, 240],
            },
            1: {
              cellWidth: "auto",
              overflow: "linebreak",
            },
          },
        });

        yPosition = doc.lastAutoTable.finalY + 5;

        // Description
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont(undefined, "normal");
        const descLines = doc.splitTextToSize(
          `Description: ${vuln.description}`,
          pageWidth - 30
        );
        doc.text(descLines, 15, yPosition);
        yPosition += descLines.length * 4 + 8;
      });

      yPosition += 5;
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, pageHeight - 10, {
        align: "right",
      });
      doc.text(
        `Generated on ${new Date().toLocaleDateString()} by InviScan`,
        15,
        pageHeight - 10
      );
    }

    // Save the PDF
    doc.save(
      `vulnerability-report-${new Date().toISOString().split("T")[0]}.pdf`
    );
  };

  return (
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
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Download PDF Report
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
              {reportData.url}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ServerIcon className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">IP Address</span>
            </div>
            <p className="text-white font-mono">{reportData.ip}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">Open Ports</span>
            </div>
            <p className="text-white">{reportData.openPorts.join(", ")}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">Technologies</span>
            </div>
            <div className="space-y-1">
              {reportData.technologies.map((tech, index) => (
                <p key={index} className="text-white text-sm">
                  {tech}
                </p>
              ))}
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
            {reportData.scans.reduce(
              (sum, scan) => sum + scan.vulnerabilitiesFound,
              0
            )}
          </div>
          <p className="text-gray-400 text-sm">Across all scan types</p>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-400/20">
          <div className="flex items-center gap-3 mb-4">
            <EyeIcon className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">URLs Scanned</h3>
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {reportData.scans.reduce((sum, scan) => sum + scan.urlsScanned, 0)}
          </div>
          <p className="text-gray-400 text-sm">Total endpoints tested</p>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-400/20">
          <div className="flex items-center gap-3 mb-4">
            <ClockIcon className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Scan Duration</h3>
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2">
            {reportData.scans
              .reduce((sum, scan) => sum + parseFloat(scan.timeTaken), 0)
              .toFixed(2)}
            s
          </div>
          <p className="text-gray-400 text-sm">Total time taken</p>
        </Card>
      </div>

      {/* Detailed Scan Results */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Detailed Scan Results
        </h2>

        {reportData.scans.map((scan) => (
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
                  setSelectedReport(selectedReport === scan.id ? null : scan.id)
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
                <div className="text-gray-400 text-sm">Vulnerability Rate</div>
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
  );
};

export default Reports;
