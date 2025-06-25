# FastAPI Backend Example for Reports Integration

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(title="Vulnerability Scanner API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for type safety
class Vulnerability(BaseModel):
    url: str
    method: str
    parameter: str
    payload: str
    evidence: str
    description: str

class Scan(BaseModel):
    id: int
    type: str
    status: str
    vulnerabilitiesFound: int
    urlsScanned: int
    timeTaken: str
    vulnerabilityRate: int
    classification: str
    riskRating: str
    evidence: str
    vulnerabilities: List[Vulnerability]

class Report(BaseModel):
    url: str
    ip: str
    openPorts: List[str]
    technologies: List[str]
    scanDate: str
    scanDuration: str
    scans: List[Scan]

# Sample data (replace with your database queries)
SAMPLE_REPORT = Report(
    url="https://example.com",
    ip="192.168.1.1",
    openPorts=["80", "443"],
    technologies=["PHP (8.1.0)", "nginx (1.20.1)"],
    scanDate=datetime.now().strftime("%b %d, %Y | %H:%M:%S UTC"),
    scanDuration="1h 23m | 85MB bandwidth",
    scans=[
        Scan(
            id=1,
            type="SQL Injection",
            status="CONFIRMED",
            vulnerabilitiesFound=1,
            urlsScanned=5,
            timeTaken="120.45",
            vulnerabilityRate=20,
            classification="High",
            riskRating="High",
            evidence="SQL injection found in login form",
            vulnerabilities=[
                Vulnerability(
                    url="https://example.com/login",
                    method="POST",
                    parameter="username",
                    payload="admin' OR '1'='1",
                    evidence="Authentication bypass successful",
                    description="SQL injection vulnerability allows authentication bypass and potential data extraction."
                )
            ]
        ),
        Scan(
            id=2,
            type="Cross-Site Scripting (XSS)",
            status="CONFIRMED",
            vulnerabilitiesFound=2,
            urlsScanned=3,
            timeTaken="89.30",
            vulnerabilityRate=67,
            classification="Medium",
            riskRating="Medium",
            evidence="XSS payload executed",
            vulnerabilities=[
                Vulnerability(
                    url="https://example.com/search",
                    method="GET",
                    parameter="q",
                    payload="<script>alert('XSS')</script>",
                    evidence="Script executed in browser",
                    description="Reflected XSS vulnerability allows execution of arbitrary JavaScript code."
                ),
                Vulnerability(
                    url="https://example.com/comment",
                    method="POST",
                    parameter="comment",
                    payload="<img src=x onerror=alert('XSS')>",
                    evidence="Image tag with onerror executed",
                    description="Stored XSS vulnerability in comment system."
                )
            ]
        )
    ]
)

@app.get("/")
async def root():
    return {"message": "Vulnerability Scanner API is running"}

@app.get("/api/reports/latest", response_model=Report)
async def get_latest_report():
    """
    Get the latest vulnerability scan report.
    Replace this with your actual database query.
    """
    try:
        # TODO: Replace with actual database query
        # Example:
        # report = await db.reports.find_latest()
        # if not report:
        #     raise HTTPException(status_code=404, detail="No reports found")
        
        return SAMPLE_REPORT
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/reports", response_model=List[Report])
async def get_all_reports(skip: int = 0, limit: int = 10):
    """
    Get all reports with pagination.
    """
    try:
        # TODO: Replace with actual database query
        # reports = await db.reports.find_all(skip=skip, limit=limit)
        
        return [SAMPLE_REPORT]  # Return list of reports
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/reports/{report_id}", response_model=Report)
async def get_report_by_id(report_id: int):
    """
    Get a specific report by ID.
    """
    try:
        # TODO: Replace with actual database query
        # report = await db.reports.find_by_id(report_id)
        # if not report:
        #     raise HTTPException(status_code=404, detail="Report not found")
        
        if report_id == 1:
            return SAMPLE_REPORT
        else:
            raise HTTPException(status_code=404, detail="Report not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

"""
To run this FastAPI server:

1. Install dependencies:
   pip install fastapi uvicorn

2. Save this file as main.py

3. Run the server:
   uvicorn main:app --reload

4. The API will be available at:
   - Main endpoint: http://localhost:8000
   - API docs: http://localhost:8000/docs
   - Latest report: http://localhost:8000/api/reports/latest

5. Update your React app's .env file:
   REACT_APP_API_URL=http://localhost:8000
"""
