import React, { useState } from 'react';
import { 
  EyeIcon, 
  DocumentArrowDownIcon, 
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import Button from './Button';

const ScanTable = ({ scans = [], showActions = true, onViewReport, onDownloadReport }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const sortedScans = [...scans].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      case 'in-progress':
        return <ClockIcon className="w-5 h-5 text-yellow-400" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'critical':
        return 'text-red-400 bg-red-400/10';
      case 'high':
        return 'text-orange-400 bg-orange-400/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'low':
        return 'text-green-400 bg-green-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-gray-900/80 to-purple-900/20 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-purple-900/30 to-purple-800/30">
            <tr>
              <th 
                className="px-6 py-4 text-left font-semibold text-gray-200 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('target')}
              >
                Target URL
              </th>
              <th 
                className="px-6 py-4 text-left font-semibold text-gray-200 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('type')}
              >
                Scan Type
              </th>
              <th 
                className="px-6 py-4 text-left font-semibold text-gray-200 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Date
                </div>
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-200">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-200">Risk Level</th>
              <th className="px-6 py-4 text-center font-semibold text-gray-200">Vulnerabilities</th>
              {showActions && (
                <th className="px-6 py-4 text-center font-semibold text-gray-200">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            {sortedScans.map((scan, index) => (
              <tr 
                key={scan.id || index}
                className="hover:bg-purple-500/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-white truncate max-w-xs">
                      {scan.target}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      ID: {scan.id || `scan-${index + 1}`}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200">
                    {scan.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {formatDate(scan.date)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(scan.status)}
                    <span className="capitalize text-gray-300">
                      {scan.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(scan.riskLevel)}`}>
                    {scan.riskLevel}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-white">
                      {scan.vulnerabilities || 0}
                    </span>
                    <span className="text-xs text-gray-400">found</span>
                  </div>
                </td>
                {showActions && (
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewReport?.(scan)}
                        className="p-2"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownloadReport?.(scan)}
                        className="p-2"
                      >
                        <DocumentArrowDownIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedScans.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <ExclamationTriangleIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No scans found</p>
        </div>
      )}
    </div>
  );
};

export default ScanTable;
