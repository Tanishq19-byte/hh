from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import FoodLabelAnalysisResponse, LabelScanRequest
from app.services.ai_engine import parse_label_text

app = FastAPI(
    title="FoodVigil AI & OCR Microservice",
    description="AI-powered food label analysis, additive explanation, and allergen extraction engine.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "service": "FoodVigil AI Microservice",
        "status": "online",
        "engine": "FastAPI + OCR Parser"
    }

@app.post("/analyze-label", response_model=FoodLabelAnalysisResponse)
def analyze_label(request: LabelScanRequest):
    try:
        raw_text = request.raw_text or "Instant Noodle Wheat Flour Palm Oil E621 Monosodium Glutamate Salt 10015011002345"
        analysis = parse_label_text(raw_text)
        return FoodLabelAnalysisResponse(**analysis)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
