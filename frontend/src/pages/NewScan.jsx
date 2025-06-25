import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Button from '../components/Button';

const NewScan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    targetUrl: '',
    scanType: 'quick',
    autoPatching: false,
    scanDepth: 'medium',
    excludeUrls: '',
    customHeaders: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a mock scan ID
    const scanId = Math.random().toString(36).substr(2, 9);
    // Navigate to scan progress page
    navigate(`/app/scan-progress/${scanId}`);
  };

  const scanTypes = [
    {
      id: 'quick',
      name: 'Quick Scan',
      description: 'Fast vulnerability assessment (5-10 minutes)',
      icon: ClockIcon,
      recommended: false
    },
    {
      id: 'full',
      name: 'Full Scan',
      description: 'Comprehensive security analysis (30-60 minutes)',
      icon: MagnifyingGlassIcon,
      recommended: true
    },
    {
      id: 'custom',
      name: 'Custom Scan',
      description: 'Configurable scan with custom parameters',
      icon: Cog6ToothIcon,
      recommended: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">New Security Scan</h1>
        <p className="text-gray-400 mt-2">Configure and launch a new vulnerability assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Target URL Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Target Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Target URL
              </label>
              <input
                type="url"
                id="targetUrl"
                name="targetUrl"
                value={formData.targetUrl}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full input-field rounded-lg px-4 py-3 text-white placeholder-gray-500"
                required
              />
              <p className="text-sm text-gray-400 mt-1">
                Enter the full URL of the web application you want to scan
              </p>
            </div>

            {formData.scanType === 'custom' && (
              <div>
                <label htmlFor="excludeUrls" className="block text-sm font-medium text-gray-300 mb-2">
                  Exclude URLs (Optional)
                </label>
                <textarea
                  id="excludeUrls"
                  name="excludeUrls"
                  value={formData.excludeUrls}
                  onChange={handleInputChange}
                  placeholder="https://example.com/admin&#10;https://example.com/logout"
                  className="w-full input-field rounded-lg px-4 py-3 text-white placeholder-gray-500 h-24 resize-none"
                />
                <p className="text-sm text-gray-400 mt-1">
                  One URL per line. These paths will be excluded from scanning.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Scan Type Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Scan Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scanTypes.map((type) => (
              <label
                key={type.id}
                className={`relative cursor-pointer rounded-lg p-4 border transition-all ${
                  formData.scanType === type.id
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                <input
                  type="radio"
                  name="scanType"
                  value={type.id}
                  checked={formData.scanType === type.id}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <type.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-medium">{type.name}</h3>
                      {type.recommended && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{type.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Advanced Options */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Advanced Options</h2>
          
          <div className="space-y-6">
            {/* Auto Patching */}
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  id="autoPatching"
                  name="autoPatching"
                  type="checkbox"
                  checked={formData.autoPatching}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="autoPatching" className="text-white font-medium">
                  Enable Auto-Patching
                </label>
                <p className="text-gray-400 text-sm mt-1">
                  Automatically apply safe patches for detected vulnerabilities
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <InformationCircleIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">
                    Only safe, reversible patches will be applied automatically
                  </span>
                </div>
              </div>
            </div>

            {/* Scan Depth */}
            {formData.scanType === 'custom' && (
              <div>
                <label htmlFor="scanDepth" className="block text-sm font-medium text-gray-300 mb-2">
                  Scan Depth
                </label>
                <select
                  id="scanDepth"
                  name="scanDepth"
                  value={formData.scanDepth}
                  onChange={handleInputChange}
                  className="w-full input-field rounded-lg px-4 py-3 text-white"
                >
                  <option value="light">Light - Surface level scanning</option>
                  <option value="medium">Medium - Standard depth analysis</option>
                  <option value="deep">Deep - Comprehensive examination</option>
                </select>
              </div>
            )}

            {/* Custom Headers */}
            {formData.scanType === 'custom' && (
              <div>
                <label htmlFor="customHeaders" className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Headers (Optional)
                </label>
                <textarea
                  id="customHeaders"
                  name="customHeaders"
                  value={formData.customHeaders}
                  onChange={handleInputChange}
                  placeholder="Authorization: Bearer token123&#10;X-Custom-Header: value"
                  className="w-full input-field rounded-lg px-4 py-3 text-white placeholder-gray-500 h-24 resize-none"
                />
                <p className="text-sm text-gray-400 mt-1">
                  One header per line in format "Header-Name: value"
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Scan Summary */}
        <Card className="p-6 bg-purple-600/5 border-purple-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">Scan Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Target:</span>
              <p className="text-white font-medium">
                {formData.targetUrl || 'Not specified'}
              </p>
            </div>
            <div>
              <span className="text-gray-400">Scan Type:</span>
              <p className="text-white font-medium capitalize">
                {scanTypes.find(t => t.id === formData.scanType)?.name}
              </p>
            </div>
            <div>
              <span className="text-gray-400">Auto-Patching:</span>
              <p className="text-white font-medium">
                {formData.autoPatching ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Save as Template
          </Button>
          <Button type="submit" size="lg" disabled={!formData.targetUrl}>
            <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
            Start Scan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewScan;
