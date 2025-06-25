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
