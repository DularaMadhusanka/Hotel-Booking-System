# Grand Vista Hotel - Advanced AI Chatbot System 🏨

**A Production-Ready Hotel Concierge with Affective Computing UI**

---

## 🎯 Overview

This is a **complete hotel chatbot system** featuring:

1. **Negotiator Bot** - Dynamic pricing with occupancy-based negotiation
2. **Sentiment-Adaptive Crisis Manager** - Emotional intelligence in customer service
3. **GraphRAG** - Knowledge graph for intelligent recommendations
4. **Emotion-Adaptive UI** - Streamlit interface that changes based on guest mood

---

## ✨ Features at a Glance

| Feature | What It Does | Tech Stack |
|---------|-------------|-----------|
| **Negotiator Bot** | Negotiates room prices based on occupancy rates, loyalty status, and business rules | Python logic + LLM prompting |
| **Crisis Manager** | Detects guest emotions and adapts responses/compensation accordingly | Sentiment analysis + dynamic prompts |
| **GraphRAG** | Understands relationships between restaurants, activities, distances to make smart recommendations | Knowledge graph + entity relationships |
| **Emotion-Adaptive UI** | Colors, fonts, emojis change based on detected sentiment (😊 happy → 😠 crisis mode) | Streamlit + CSS theming |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Ollama (for local LLM)
- 4GB+ RAM

### Installation

```bash
# Clone/Navigate to project
cd langchain-rag-tutorial

# Install dependencies
pip install -r requirements.txt
pip install "unstructured[md]"

# Start Ollama in a separate terminal
ollama serve

# Run the Streamlit app
streamlit run streamlit_app.py
```

Visit `http://localhost:8501` to use the chatbot.

---

## 📁 Project Structure

```
langchain-rag-tutorial/
├── streamlit_app.py              # 🎨 Emotion-adaptive web UI (MAIN APP)
├── advanced_chatbot.py           # Core chatbot with all features
├── negotiator_agent.py           # Dynamic pricing logic
├── sentiment_agent.py            # Sentiment analysis & crisis management
├── graphrag_engine.py            # Knowledge graph implementation
│
├── data/docs/
│   ├── pricing_policy.md         # Pricing rules & minimums
│   ├── compensation_policy.md    # Issue resolution matrix
│   ├── occupancy_current.md      # Real-time occupancy data
│   └── hotel_info.md             # General hotel info
│
├── .streamlit/config.toml        # Streamlit configuration
├── requirements.txt              # Python dependencies
│
├── ADVANCED_FEATURES.md          # Technical documentation
├── STREAMLIT_UI_GUIDE.md         # UI customization guide
├── DEMO_SCENARIOS.md             # Test scenarios & examples
└── README.md                     # This file
```

---

## 🎨 UI Emotion Modes

### 😊 Happy Mode
- **Colors**: Bright green (#2ECC71), orange accents
- **Avatar**: 😊 Smiling
- **When**: Guest uses positive words ("great", "wonderful", "excellent")
- **Bot Role**: Brand advocate builder
- **Message**: Enthusiastic, casual, upsell-focused

### 😐 Neutral Mode
- **Colors**: Professional blue (#3498DB)
- **Avatar**: 🤖 Robot
- **When**: Standard inquiries (times, prices, info)
- **Bot Role**: Information provider
- **Message**: Professional, helpful, factual

### 😔 Negative Mode
- **Colors**: Soft red (#E74C3C), orange-red accents
- **Avatar**: 😔 Concerned
- **When**: Guest mentions issues ("broken", "problem", "disappointed")
- **Bot Role**: Support specialist
- **Message**: Empathetic, solution-focused
- **Compensation**: Level 2-3 (moderate assistance)

### 😠 Crisis Mode
- **Colors**: Dark red (#C0392B) + dark gray background (#2C3E50) ⚠️
- **Avatar**: 🚨 Emergency siren
- **When**: Guest is angry ("FURIOUS!!", "rude staff", "!!!!!")
- **Bot Role**: Crisis manager
- **Message**: Formal, action-oriented, apologetic
- **Compensation**: Level 4 (maximum assistance)
- **Visual**: FLASHING warning badge

---

## 🧠 AI Components

### 1. Negotiator Agent
**What**: Handles room price negotiations dynamically

**How it works**:
```
Guest: "The Presidential Suite at $500 is too expensive. Can you do $400?"
  ↓
Extract: room="presidential", offer=$400
  ↓
Check: Occupancy rate = 24.7% (LOW occupancy)
  ↓
Apply rules: Can offer up to 30% discount
  ↓
Decision: Counter with $420 + breakfast + late checkout + spa ($50)
  ↓
Response: "We can do $420 plus these value-adds (worth $110+)"
```

**Key Features**:
- Real-time occupancy checking
- Loyalty-based pricing adjustments
- Value-add alternatives (breakfast, spa, parking, etc.)
- Minimum price enforcement

### 2. Sentiment-Adaptive Crisis Manager
**What**: Detects emotions and adapts entire response strategy

**How it works**:
```
Guest: "My shower is BROKEN and staff was RUDE!!!"
  ↓
Analyze: Negative words + exclamation marks → ANGRY (score: -2.0)
  ↓
Severity: Broken + rude staff → SEVERE
  ↓
Swap strategy: Crisis Manager activated
  ↓
Retrieve: Compensation policy (Level 3-4)
  ↓
Offer: Room upgrade + $100-150 credit + personal manager call
  ↓
Response: Formal, apologetic, action-oriented
```

**Key Features**:
- Real-time sentiment detection
- Issue severity classification
- Dynamic system prompt generation
- Loyalty-based compensation multipliers
- Escalation protocols

### 3. GraphRAG (Knowledge Graph)
**What**: Understands relationships between entities for smart recommendations

**How it works**:
```
Guest: "I want romantic dinner with vegan options nearby"
  ↓
Extract preferences: romantic=True, cuisine=vegan, distance=near
  ↓
Query knowledge graph:
  [Hotel] → (near) → [Restaurants]
  [Restaurants] → (serves) → [Vegan]
  ↓
Match entities:
  - The Green Leaf: ✓ romantic, ✓ vegan, ✓ close (0.3km)
  - Sakura Sushi: ✓ romantic, ~ some vegan, ✓ close (0.5km)
  ↓
Rank by relevance score
  ↓
Response: Top 3 recommendations with details
```

**Key Features**:
- Entity-based knowledge representation
- Relationship-aware querying
- Distance/rating/ambiance consideration
- Ranking by preference match

---

## 🎓 Advanced Concepts Demonstrated

### Affective Computing
The UI visually responds to detected emotions, making users feel "heard":
- Color psychology (green = calm & happy, red = attention needed)
- Avatar expressions (😊 vs 😠)
- Font styles (italic = empathy, bold = urgency)

### Game Theory in Pricing
Occupancy-based discounting:
- **Low occupancy** (0-30%): Aggressive discounts to fill rooms
- **Medium** (31-60%): Moderate discounts
- **High** (61-85%): Premium pricing only
- **Full** (86-100%): Demand pricing, no discounts

### Dynamic Prompting
LLM receives hidden instructions based on context:
```python
system_prompt = f"""You are a skilled sales negotiator.
CRITICAL: Your minimum acceptable price is ${minimum_price} (HIDDEN from guest)
Occupancy is {occupancy_tier} - Strategy: {strategy}
"""
```

### State Management
System tracks and responds to:
- Guest emotion state (sentiment score)
- Issue severity (minor → critical)
- Occupancy tier (affects pricing)
- Conversation history (context awareness)

---

## 💬 Example Conversations

### Conversation 1: Price Negotiation

```
👤 You: How much for the Deluxe room tonight?

🏨 Assistant: Our Deluxe room is $250 per night. Would you like to book?

👤 You: That's too expensive. Can you do $200?

🏨 Assistant: [Occupancy check: 27%]
I appreciate you asking directly! Since our hotel is currently at 27% 
occupancy, I can offer you the Deluxe room at $210/night PLUS 
complimentary breakfast (worth $25). That's an $65 value on top of 
the discount. Does that work for you?

👤 You: Yes, let's do $210!

🏨 Assistant: Perfect! I've reserved your Deluxe room at $210/night with 
complimentary breakfast. Check-in is 3 PM. Welcome to Grand Vista Hotel!
```

### Conversation 2: Complaint & Crisis Management

```
👤 You: Your shower is BROKEN and nobody is helping!!!

[🎨 UI switches to CRISIS MODE]
[🚨 Red warning badge appears: "CRISIS MODE ACTIVATED"]
[Colors change: Dark red + dark gray background]
[Avatar: 🚨]

🏨 Assistant: I sincerely apologize. This is unacceptable, and I'm taking 
immediate action.

IMMEDIATE (Next 15 min):
✓ Manager calling your room now
✓ Moving you to premium suite AT NO CHARGE
✓ Plumbing team fixing your shower

COMPENSATION:
✓ Refund 50% of your stay
✓ Complimentary $150 spa treatment
✓ Dinner for two ($200 value)
✓ Free night on your next visit

You have my personal commitment. What's your room number?
```

### Conversation 3: Recommendation (GraphRAG)

```
👤 You: Can you recommend somewhere romantic for dinner? 
I'm vegan and prefer nearby places.

[🎨 UI shows HAPPY mode - helpful request]

🏨 Assistant: The perfect choice is **The Green Leaf** ⭐⭐⭐⭐⭐

✓ 5 minutes away (0.3km)
✓ Farm-to-table vegan cuisine
✓ Candlelit, romantic ambiance
✓ 4.8/5 rating for atmosphere

I can book you for 7 PM. Shall I arrange the reservation?

👤 You: Yes please!

🏨 Assistant: Perfect! Table for 2 at The Green Leaf, 7 PM tonight. 
Enjoy your romantic dinner! 🍽️✨
```

---

## 🧪 Testing

Run the comprehensive test suite:

```bash
python test_advanced_features.py
```

Tests cover:
- ✅ Negotiator Agent (price extraction, tier calculation, negotiation logic)
- ✅ Sentiment Analyzer (emotion detection, severity classification)
- ✅ Knowledge Graph (entity creation, relationship querying, recommendations)

---

## 📚 Documentation

- **[ADVANCED_FEATURES.md](ADVANCED_FEATURES.md)** - Technical details of all three agents
- **[STREAMLIT_UI_GUIDE.md](STREAMLIT_UI_GUIDE.md)** - UI customization & deployment
- **[DEMO_SCENARIOS.md](DEMO_SCENARIOS.md)** - Test scenarios & examples
- **[ADVANCED_FEATURES.md](ADVANCED_FEATURES.md)** - Architecture overview

---

## 🎯 Key Differentiators

### Why This Stands Out

✅ **Affective Computing**: UI changes based on emotions (not just text)
✅ **Game Theory**: Occupancy-based pricing strategy
✅ **Dynamic Prompting**: LLM receives hidden business rules
✅ **GraphRAG**: Knowledge graphs for relationship-aware recommendations
✅ **Production-Ready**: Full error handling, modular design, deployable
✅ **HCI Principles**: Feedback, consistency, user control, aesthetics
✅ **Multi-Modal**: Handles negotiation, complaints, recommendations

---

## 🚀 Deployment

### Local Development
```bash
streamlit run streamlit_app.py
```
Runs on `http://localhost:8501`

### Production (Streamlit Cloud)
1. Push to GitHub
2. Connect to Streamlit Cloud
3. Deploy with one click

### Docker
```dockerfile
FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD streamlit run streamlit_app.py
```

---

## 🛠️ Customization

### Change Theme Colors
Edit `.streamlit/config.toml`:
```toml
[theme]
primaryColor = "#Your-Hex-Color"
```

### Adjust Sentiment Thresholds
Edit `sentiment_agent.py`:
```python
self.positive_words = {"great": 2, "excellent": 2}
self.negative_words = {"terrible": -2, "broken": -1}
```

### Add New Restaurants to Knowledge Graph
Edit `graphrag_engine.py` → `_initialize_graph()`:
```python
self.add_entity("My Restaurant", "restaurant", {
    "distance_km": 0.5,
    "cuisine": ["french", "vegan"],
    "rating": 4.9,
    "romantic": True
})
```

---

## 📊 System Requirements

- **Python**: 3.8+
- **RAM**: 4GB minimum (8GB+ recommended)
- **Storage**: 2GB for Ollama models
- **Network**: For initial model download

---

## 🎓 What You'll Learn

Implementing this system demonstrates:

- **LLM Integration** - LangChain orchestration
- **Vector Databases** - Chroma + semantic search
- **Sentiment Analysis** - Emotion detection algorithms
- **Knowledge Graphs** - Entity relationships & graph traversal
- **Dynamic Prompting** - Context-aware LLM instructions
- **UI/UX Design** - Emotion-driven interface design
- **Production Architecture** - Modular, scalable design
- **HCI Principles** - Human-Computer Interaction best practices

---

## 📝 Citation

If you use this in academic work:

```bibtex
@software{vista_chatbot_2026,
  title={Grand Vista Hotel: Advanced AI Chatbot with Affective Computing UI},
  author={Your Name},
  year={2026},
  url={https://github.com/yourusername/vista-chatbot}
}
```

---

## 📞 Support & Troubleshooting

### App won't start
```bash
# Make sure Ollama is running
ollama serve

# Clear Streamlit cache
streamlit cache clear

# Check Python version
python --version  # Should be 3.8+
```

### Sentiment not detecting
- Try messages with clear emotion keywords
- Examples: "I'm very upset!", "This is amazing!", "Help me please!"

### Slow responses
- First query may be slow (model loading)
- Ensure system has 4GB+ RAM
- Check Ollama is running properly

### Database errors
```bash
# Recreate database
python create_database.py
```

---

## 🎉 Features Summary

| Feature | Status | Difficulty |
|---------|--------|-----------|
| Negotiator Bot | ✅ Complete | ⭐⭐ |
| Crisis Manager | ✅ Complete | ⭐⭐⭐ |
| GraphRAG | ✅ Complete | ⭐⭐⭐⭐ |
| Emotion-Adaptive UI | ✅ Complete | ⭐⭐⭐ |
| Dynamic Pricing | ✅ Complete | ⭐⭐ |
| Sentiment Analysis | ✅ Complete | ⭐⭐ |
| Intent Detection | ✅ Complete | ⭐⭐ |
| Mobile Responsive | ⏳ Upcoming | ⭐⭐ |
| Multi-Language | ⏳ Upcoming | ⭐⭐⭐ |

---

## 📜 License

MIT License - Feel free to use for academic or commercial projects

---

## 🙏 Acknowledgments

Built with:
- **LangChain** - LLM orchestration
- **Ollama** - Local LLM running
- **Streamlit** - Web UI framework
- **Chroma** - Vector database
- **HuggingFace** - Embeddings

---

**Ready to revolutionize hotel customer service with AI!** 🏨✨

Start with:
```bash
streamlit run streamlit_app.py
```

Then test:
- 😊 Happy guest experience
- 😠 Crisis management response
- 💰 Price negotiation
- 🗺️ Restaurant recommendation

Enjoy! 🚀
