"""
SmartStay AI API Server - Powered by LangGraph
Exposes REST endpoints for the Hotel Booking System to communicate with AI agents

Architecture:
- LangGraph: State machine for conversation flow
- LangChain: RAG for knowledge retrieval
- Custom Agents: Negotiation, Sentiment, GraphRAG
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os
import uvicorn

from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.llms import Ollama

from negotiator_agent import NegotiatorAgent
from sentiment_agent import SentimentAnalyzer
from graphrag_engine import KnowledgeGraph, format_graph_context

# Import LangGraph workflow
from langgraph_workflow import (
    hotel_workflow,
    initialize_workflow_agents,
    create_initial_state,
    process_message
)

# Initialize FastAPI app
app = FastAPI(
    title="SmartStay AI API",
    description="AI-powered hotel assistant with LangGraph workflow, negotiation, sentiment analysis, and GraphRAG",
    version="2.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global instances
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(BASE_DIR, "chroma")

db = None
model = None
negotiator = None
sentiment_analyzer = None
knowledge_graph = None


# ============================================================================
# PYDANTIC MODELS
# ============================================================================

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None
    loyalty_status: Optional[str] = "none"
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    sentiment: str
    sentiment_score: float
    intent: str
    is_crisis_mode: bool
    needs_human_escalation: bool = False
    negotiation_data: Optional[Dict] = None
    metadata: Optional[Dict] = None


class NegotiationRequest(BaseModel):
    room_type: str
    guest_offer: float
    loyalty_status: Optional[str] = "none"


class SentimentRequest(BaseModel):
    text: str


class RecommendationRequest(BaseModel):
    query: str
    preferences: Optional[Dict] = None


# ============================================================================
# INITIALIZATION
# ============================================================================

@app.on_event("startup")
async def startup_event():
    """Initialize AI components on startup"""
    global db, model, negotiator, sentiment_analyzer, knowledge_graph
    
    print("=" * 60)
    print("[STARTING] SmartStay AI System v2.0 (LangGraph)")
    print("=" * 60)
    
    # Initialize embeddings and vector store
    print("[1/5] Initializing embeddings...")
    embedding_function = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    
    print("[2/5] Loading vector database...")
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
    
    # Initialize LLM (Ollama with llama2)
    print("[3/5] Connecting to Ollama LLM...")
    try:
        model = Ollama(model="llama2")
        # Test connection
        test_response = model.invoke("Hello")
        print("[OK] LLM (Ollama/llama2) connected and responding")
    except Exception as e:
        print(f"[WARNING] LLM initialization failed: {e}")
        print("         Make sure Ollama is running: `ollama serve`")
        model = None
    
    # Initialize agents
    print("[4/5] Initializing AI agents...")
    negotiator = NegotiatorAgent(db)
    sentiment_analyzer = SentimentAnalyzer(db)
    knowledge_graph = KnowledgeGraph()
    
    # Initialize LangGraph workflow with agents
    print("[5/5] Initializing LangGraph workflow...")
    initialize_workflow_agents(
        vector_db=db,
        llm=model,
        neg_agent=negotiator,
        sent_analyzer=sentiment_analyzer,
        kg=knowledge_graph
    )
    
    print("=" * 60)
    print("[OK] SmartStay AI System ready!")
    print("")
    print("Workflow Architecture:")
    print("  User Input -> Sentiment Analysis -> Intent Detection")
    print("             -> [Negotiation | Complaint | Recommend | Info]")
    print("             -> Format Response -> Output")
    print("")
    print("Features:")
    print("  - Multi-turn stateful negotiations (Game Theory)")
    print("  - Emotion-adaptive responses (Affective Computing)")
    print("  - Knowledge Graph recommendations (GraphRAG)")
    print("  - Crisis detection & escalation (HCI)")
    print("=" * 60)


# ============================================================================
# MAIN CHAT ENDPOINT (LangGraph Powered)
# ============================================================================

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint - processes messages through LangGraph workflow
    
    The workflow:
    1. Analyzes sentiment to understand emotional context
    2. Detects intent to route appropriately
    3. Processes through specialized handler (negotiation/complaint/recommendation/general)
    4. Returns formatted response with metadata for UI adaptation
    """
    if not model:
        raise HTTPException(
            status_code=503, 
            detail="LLM not available. Ensure Ollama is running with: ollama serve"
        )
    
    try:
        # Process through LangGraph workflow
        result = await process_message(
            user_input=request.message,
            user_id=request.user_id,
            loyalty_status=request.loyalty_status,
            session_id=request.session_id
        )
        
        return ChatResponse(
            response=result["response"],
            sentiment=result["sentiment"],
            sentiment_score=result["sentiment_score"],
            intent=result["intent"],
            is_crisis_mode=result["is_crisis_mode"],
            needs_human_escalation=result.get("needs_human_escalation", False),
            negotiation_data=result.get("negotiation_data"),
            metadata=result.get("metadata")
        )
        
    except Exception as e:
        print(f"[ERROR] Chat processing failed: {e}")
        # Graceful fallback
        return ChatResponse(
            response="I apologize, but I encountered an issue processing your request. Please contact our front desk at +94 77 123 4567 for immediate assistance.",
            sentiment="neutral",
            sentiment_score=0.0,
            intent="error",
            is_crisis_mode=False,
            needs_human_escalation=False,
            negotiation_data=None,
            metadata={"error": str(e)}
        )


# ============================================================================
# HEALTH & STATUS ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Health check endpoint with system status"""
    return {
        "status": "online",
        "service": "SmartStay AI API",
        "version": "2.0.0",
        "architecture": "LangGraph",
        "agents": {
            "negotiator": negotiator is not None,
            "sentiment_analyzer": sentiment_analyzer is not None,
            "knowledge_graph": knowledge_graph is not None,
            "llm": model is not None,
            "vector_db": db is not None
        },
        "workflow": {
            "nodes": ["analyze_sentiment", "detect_intent", "negotiation", "complaint", "recommendation", "general_info", "format_response"],
            "features": ["multi-turn-negotiation", "crisis-detection", "graphrag", "emotion-adaptive"]
        }
    }


@app.get("/health")
async def health_check():
    """Simple health check"""
    return {"status": "healthy", "llm_available": model is not None}


# ============================================================================
# INDIVIDUAL AGENT ENDPOINTS (Direct Access)
# ============================================================================

@app.post("/api/negotiate")
async def negotiate(request: NegotiationRequest):
    """
    Direct negotiation endpoint (bypasses workflow)
    Use this for single-turn price negotiations
    """
    if negotiator is None:
        raise HTTPException(status_code=503, detail="Negotiator not available")
    
    result = negotiator.negotiate_price(
        request.room_type,
        request.guest_offer,
        request.loyalty_status
    )
    return result


@app.post("/api/sentiment")
async def analyze_sentiment_endpoint(request: SentimentRequest):
    """
    Sentiment analysis endpoint
    Returns sentiment, score, complaint status, and severity
    """
    if sentiment_analyzer is None:
        raise HTTPException(status_code=503, detail="Sentiment analyzer not available")
    
    sentiment, score = sentiment_analyzer.analyze_sentiment(request.text)
    is_complaint = sentiment_analyzer.is_complaint(request.text)
    severity = sentiment_analyzer.detect_issue_severity(request.text)
    
    return {
        "sentiment": sentiment,
        "score": score,
        "is_complaint": is_complaint,
        "severity": severity
    }


@app.post("/api/recommend")
async def get_recommendations(request: RecommendationRequest):
    """
    GraphRAG recommendation endpoint
    Returns personalized recommendations based on knowledge graph
    """
    if knowledge_graph is None:
        raise HTTPException(status_code=503, detail="Knowledge graph not available")
    
    preferences = request.preferences or {}
    recommendations = knowledge_graph.query_itinerary(preferences)
    
    return {
        "recommendations": recommendations,
        "context": format_graph_context(recommendations, preferences)
    }


@app.get("/api/occupancy")
async def get_occupancy():
    """Get current occupancy data for pricing decisions"""
    if negotiator is None:
        raise HTTPException(status_code=503, detail="Negotiator not available")
    
    rate = negotiator.get_occupancy_rate()
    tier = negotiator.get_occupancy_tier(rate)
    
    tier_names = {
        1: "Critical Low (Monsoon)",
        2: "Low",
        3: "Good",
        4: "Full/Peak"
    }
    
    return {
        "occupancy_rate": rate,
        "occupancy_tier": tier,
        "status": tier_names.get(tier, "Unknown"),
        "pricing_flexibility": ["Very High", "High", "Limited", "None"][tier - 1]
    }


# ============================================================================
# DEBUG ENDPOINTS (Development Only)
# ============================================================================

@app.get("/api/debug/workflow")
async def debug_workflow():
    """Returns workflow structure for debugging"""
    return {
        "nodes": [
            {"name": "analyze_sentiment", "description": "Analyzes emotional context of user input"},
            {"name": "detect_intent", "description": "Routes to appropriate handler based on intent"},
            {"name": "negotiation", "description": "Multi-turn price negotiation with state"},
            {"name": "complaint", "description": "Empathetic complaint handling with escalation"},
            {"name": "recommendation", "description": "GraphRAG-powered local recommendations"},
            {"name": "general_info", "description": "RAG-based general information"},
            {"name": "format_response", "description": "Formats final response and updates history"}
        ],
        "edges": [
            {"from": "START", "to": "analyze_sentiment"},
            {"from": "analyze_sentiment", "to": "detect_intent"},
            {"from": "detect_intent", "to": "negotiation", "condition": "intent == 'negotiation'"},
            {"from": "detect_intent", "to": "complaint", "condition": "intent == 'complaint' or crisis"},
            {"from": "detect_intent", "to": "recommendation", "condition": "intent == 'recommendation'"},
            {"from": "detect_intent", "to": "general_info", "condition": "default"},
            {"from": "negotiation", "to": "format_response"},
            {"from": "complaint", "to": "format_response"},
            {"from": "recommendation", "to": "format_response"},
            {"from": "general_info", "to": "format_response"},
            {"from": "format_response", "to": "END"}
        ],
        "state_fields": [
            "messages", "user_input", "sentiment", "sentiment_score", 
            "is_complaint", "severity", "intent", "negotiation", 
            "response", "is_crisis_mode", "needs_human_escalation"
        ]
    }


@app.post("/api/debug/test-sentiment")
async def debug_test_sentiment(request: SentimentRequest):
    """Test sentiment analysis with detailed output"""
    if sentiment_analyzer is None:
        raise HTTPException(status_code=503, detail="Sentiment analyzer not available")
    
    text = request.text
    sentiment, score = sentiment_analyzer.analyze_sentiment(text)
    is_complaint = sentiment_analyzer.is_complaint(text)
    severity = sentiment_analyzer.detect_issue_severity(text)
    
    # Get matched keywords
    text_lower = text.lower()
    matched_positive = [w for w in sentiment_analyzer.positive_words if w in text_lower]
    matched_negative = [w for w in sentiment_analyzer.negative_words if w in text_lower]
    matched_negations = [p for p in sentiment_analyzer.negation_phrases if p in text_lower]
    
    return {
        "input": text,
        "result": {
            "sentiment": sentiment,
            "score": score,
            "is_complaint": is_complaint,
            "severity": severity
        },
        "analysis": {
            "matched_positive_words": matched_positive,
            "matched_negative_words": matched_negative,
            "matched_negation_phrases": matched_negations,
            "exclamation_count": text.count("!"),
            "question_marks": text.count("?")
        }
    }


# ============================================================================
# RUN SERVER
# ============================================================================

if __name__ == "__main__":
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
