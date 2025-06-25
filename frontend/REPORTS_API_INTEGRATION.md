# Reports Component - Backend Integration Guide

## Overview

The Reports component has been refactored to connect with a FastAPI backend for dynamic report data. All hardcoded sample data has been removed.

## API Integration Points

### Required API Endpoint

The component expects the following FastAPI endpoint:

```
GET /api/reports/latest
```

### Expected Response Format

The API should return a JSON object with the following structure:

```json
{
  "url": "https://example.com",
  "ip": "192.168.1.1",
  "openPorts": ["80", "443"],
  "technologies": ["PHP (8.1.0)", "nginx (1.20.1)"],
  "scanDate": "Feb 12, 2024 | 06:41:17 UTC",
  "scanDuration": "1h 23m | 85MB bandwidth",
  "scans": [
    {
      "id": 1,
      "type": "SQL Injection",
      "status": "CONFIRMED",
      "vulnerabilitiesFound": 2,
      "urlsScanned": 5,
      "timeTaken": "120.45",
      "vulnerabilityRate": 40,
      "classification": "High",
      "riskRating": "High",
      "evidence": "SQL injection found",
      "vulnerabilities": [
        {
          "url": "https://example.com/login",
          "method": "POST",
          "parameter": "username",
          "payload": "admin' OR '1'='1",
          "evidence": "Authentication bypass successful",
          "description": "SQL injection allows authentication bypass."
        }
      ]
    }
  ]
}
```

### Field Descriptions

#### Root Level Fields

- `url` (string): The target URL that was scanned
- `ip` (string): IP address of the target
- `openPorts` (array): List of open ports found
- `technologies` (array): Technologies detected on the target
- `scanDate` (string): When the scan was performed
- `scanDuration` (string): How long the scan took

#### Scan Object Fields

- `id` (number): Unique identifier for the scan
- `type` (string): Type of vulnerability scan (e.g., "SQL Injection", "XSS")
- `status` (string): Status of the scan (e.g., "CONFIRMED", "POTENTIAL")
- `vulnerabilitiesFound` (number): Number of vulnerabilities found
- `urlsScanned` (number): Number of URLs/endpoints scanned
- `timeTaken` (string/number): Time taken for this specific scan
- `vulnerabilityRate` (number): Percentage rate of vulnerabilities found
- `classification` (string): Severity classification ("Critical", "High", "Medium", "Low")
- `riskRating` (string): Risk rating (usually same as classification)
- `evidence` (string): Brief evidence description
- `vulnerabilities` (array): Detailed list of vulnerabilities found

#### Vulnerability Object Fields

- `url` (string): Specific URL where vulnerability was found
- `method` (string): HTTP method used (GET, POST, etc.)
- `parameter` (string): Parameter name that is vulnerable
- `payload` (string): The payload/attack vector used
- `evidence` (string): Evidence or proof of the vulnerability
- `description` (string): Detailed description of the vulnerability

## Configuration

### Environment Variables

Set the API base URL in your environment:

```bash
REACT_APP_API_URL=http://localhost:8000
```

### Development Mode

During development, if the API is not available, the component will show an error state. You can modify the error handling in the `fetchReports` function to use sample data for development.

## Error Handling

The component includes comprehensive error handling:

- **Loading State**: Shows spinner while fetching data
- **Error State**: Shows error message with retry button
- **Empty State**: Shows message when no reports are available
- **Safe Rendering**: All data access uses optional chaining to prevent crashes

## PDF Generation

The PDF generation feature works with dynamic data and includes:

- Professional header with branding
- Target information section
- Vulnerability summary with color-coded severity
- Detailed findings with tables
- Safe fallbacks for missing data

## Authentication

To add authentication, uncomment and modify the Authorization header in the `fetchReports` function:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
},
```

## Backend Implementation Notes

Your FastAPI backend should:

1. Implement the `/api/reports/latest` endpoint
2. Return data in the expected JSON format
3. Handle CORS for frontend requests
4. Implement proper error responses (4xx, 5xx)
5. Consider pagination for large datasets
6. Add authentication/authorization as needed

## Testing

To test the integration:

1. Start your FastAPI backend
2. Ensure it responds to `GET /api/reports/latest`
3. Start the React frontend
4. Navigate to the Reports page
5. Verify data loads correctly
6. Test PDF generation with real data

## Troubleshooting

### Common Issues

1. **CORS errors**: Configure CORS in your FastAPI backend
2. **404 errors**: Ensure the API endpoint is implemented
3. **Data format errors**: Verify response matches expected structure
4. **Loading forever**: Check network tab for API call failures

### Debug Mode

Enable debug mode by checking the browser console for detailed error messages and API response logging.
