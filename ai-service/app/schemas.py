from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class AdditiveDetail(BaseModel):
    code: str
    name: str
    purpose: str
    safetyCategory: str = Field(..., description="Informational, Attention, or High attention")
    simpleExplanation: str
    consumerNote: str

class AttentionItem(BaseModel):
    item: str
    severity: str
    note: str

class FoodLabelAnalysisResponse(BaseModel):
    productName: str = "Not detected"
    brand: Optional[str] = "Not detected"
    ingredients: List[Dict[str, Any]] = []
    additives: List[AdditiveDetail] = []
    allergens: List[str] = []
    nutrition: Dict[str, Any] = {}
    licenseNumber: str = "Not detected"
    licenseVerified: bool = False
    observations: List[str] = []
    attentionItems: List[AttentionItem] = []
    explanation: str = "Not detected"
    confidence: float = 0.0

class LabelScanRequest(BaseModel):
    image_base64: Optional[str] = None
    raw_text: Optional[str] = None
    preset_key: Optional[str] = None
