# ⚡ Quick Reference Cheat Sheet

## 🚀 Getting Started (30 seconds)

```bash
# 1. Open terminal
cd d:\RAG\langchain-rag-tutorial

# 2. Terminal 1 - Start Ollama
ollama serve

# 3. Terminal 2 - Run app
streamlit run streamlit_app.py

# 4. Open browser
# http://localhost:8501
```

---

## 😊 Test Each Feature

### Happy Guest
**Input**: "This is amazing! Great service!"
**Expected**: 😊 Green theme, enthusiastic response

### Angry Guest  
**Input**: "MY ROOM IS BROKEN!!!"
**Expected**: 😠 Red theme, 🚨 crisis badge, formal response

### Negotiation
**Input**: "Presidential Suite at $400?"
**Expected**: 💰 Price negotiation with value-adds

### Recommendation
**Input**: "Romantic vegan dinner nearby?"
**Expected**: 🗺️ Top 3 restaurant suggestions

---

## 🎨 Theme Colors Quick Reference

| Mood | Primary | Secondary | Background | Avatar |
|------|---------|-----------|------------|--------|
| Happy | #2ECC71 | #F39C12 | #F0FFF4 | 😊 |
| Neutral | #3498DB | #9B59B6 | #F8F9FA | 🤖 |
| Negative | #E74C3C | #E67E22 | #FFF5F5 | 😔 |
| Angry | #C0392B | #8B0000 | #2C3E50 | 🚨 |

---

## 📁 File Structure Cheat Sheet

```
streamlit_app.py      ← RUN THIS FILE
│
├─ negotiator_agent.py        (Pricing logic)
├─ sentiment_agent.py         (Emotion detection)
├─ graphrag_engine.py         (Knowledge graph)
│
├─ data/docs/
│  ├─ pricing_policy.md
│  ├─ compensation_policy.md
│  ├─ occupancy_current.md
│  └─ hotel_info.md
│
├─ .streamlit/config.toml     (UI config)
├─ requirements.txt           (Dependencies)
└─ chroma/                    (Vector database)
```

---

## 🧠 Core Algorithms at a Glance

### Sentiment Score
```
Score: -2.0 (Very angry) to +2.0 (Very happy)

Words weighted:
"great" = +2, "awful" = -2, "good" = +1, "bad" = -1
+ "!!!" multiplier = +30%
= Final score → Determine mood
```

### Negotiation Decision
```
price_offer < minimum → Reject
price_offer >= minimum AND occupancy_low → Accept
occupancy_tier=1 → Offer discounts + add-ons
occupancy_tier=4 → No discounts, premium only
```

### GraphRAG Query
```
User preferences → Extract cuisine, distance, ambiance
Query graph: [Restaurant] matches ALL criteria?
Score = rating × (1 - distance/max_distance)
Return top 3 by score
```

---

## 💾 Database Operations

### Add a New Restaurant
Edit `graphrag_engine.py`, line ~150:
```python
self.add_entity("Restaurant Name", "restaurant", {
    "distance_km": 0.5,
    "cuisine": ["vegan", "organic"],
    "rating": 4.9,
    "romantic": True,
    "hours": "18:00-23:00"
})
```

### Change Minimum Price
Edit `negotiator_agent.py`, line ~30:
```python
self.minimum_prices = {
    "standard": 120,      # Change these values
    "deluxe": 200,
    "presidential": 400
}
```

### Adjust Sentiment Weights
Edit `sentiment_agent.py`, line ~20:
```python
self.positive_words = {
    "great": 2,           # 0-3 scale
    "good": 1,
    ...
}
```

---

## 🎯 Intent Detection Quick Guide

| User Says | Intent | Handler |
|-----------|--------|---------|
| "Price?", "Too expensive" | negotiation | NegotiatorAgent |
| "Broken!", "Help!" | complaint | SentimentAnalyzer |
| "Restaurant", "dinner" | recommendation | GraphRAG |
| "When?", "What's available?" | general_info | Standard RAG |

---

## 🔧 Debugging Checklist

```bash
# Q: Nothing displays?
A: Check Ollama running in other terminal

# Q: Sentiment not changing?
A: Use strong emotional words ("great!", "terrible!!!")

# Q: Slow responses?
A: First query slow = normal (model loading)
   Subsequent = normal speed (2-5 seconds)

# Q: Database errors?
A: Run: python create_database.py

# Q: Port already in use?
A: streamlit run streamlit_app.py --server.port 8502
```

---

## 📊 Performance Tips

1. **First Run**: Model downloads (3-5 min), then runs
2. **Cached Resources**: Backend cached with @st.cache_resource
3. **Chat History**: Stored in st.session_state (cleared on app restart)
4. **Database**: Chroma indexed for fast similarity search

---

## 🎓 What Each File Does

| File | Purpose | Key Function |
|------|---------|--------------|
| `streamlit_app.py` | Main UI | Emotion-adaptive interface |
| `negotiator_agent.py` | Pricing | `negotiate_price()` |
| `sentiment_agent.py` | Emotions | `analyze_sentiment()` |
| `graphrag_engine.py` | Recommendations | `query_itinerary()` |
| `advanced_chatbot.py` | CLI version | Non-web chatbot |

---

## 🚀 Deployment in 3 Steps

### Local
```bash
streamlit run streamlit_app.py
# Visit http://localhost:8501
```

### Streamlit Cloud
```bash
git push  # to GitHub
# Connect repo to Streamlit Cloud
# Deploy button = automatic
```

### Docker
```bash
docker build -t vista-chatbot .
docker run -p 8501:8501 vista-chatbot
```

---

## 📈 Sentiment Score Examples

```
User Input                          | Score | Mood
"I love this! Excellent service!"   | +2.0  | 😊 Happy
"Good room, helpful staff"          | +1.0  | 😊 Happy
"How late is the restaurant?"       |  0.0  | 😐 Neutral
"Room is dirty, disappointed"       | -1.0  | 😔 Negative
"BROKEN!!! RUDE STAFF!!!"           | -2.0  | 😠 Angry
```

---

## 🎨 CSS Class Quick Guide

```css
.sentiment-badge      → Emotion indicator badge
.crisis-warning       → Red pulsing warning
.chat-message         → Message styling
.chat-message.user    → User message (colored)
.chat-message.assistant → Bot message (white bg)
.info-card           → Info box styling
.avatar              → Large emoji display
```

---

## 📝 Common Customizations

### Change Primary Color
`.streamlit/config.toml`, line 2:
```toml
primaryColor = "#YOUR-HEX-COLOR"
```

### Change Font Size
`streamlit_app.py`, `EmotionTheme.THEMES`:
```python
"font_size": "1.2em"  # Increase/decrease
```

### Add New Sentiment State
`streamlit_app.py`, `EmotionTheme.THEMES`:
```python
"excited": {
    "primary_color": "#FF6B6B",
    "emoji": "🎉",
    # ... more settings
}
```

---

## ✅ Verification Checklist

- [ ] `ollama serve` running in separate terminal
- [ ] `streamlit run streamlit_app.py` started
- [ ] App opens at `http://localhost:8501`
- [ ] Happy message → 😊 Green theme
- [ ] Angry message → 😠 Red crisis mode
- [ ] Pricing question → Price negotiation
- [ ] "Restaurant" request → Recommendations
- [ ] Chat history appears
- [ ] No errors in console

---

## 🆘 Error Messages & Solutions

| Error | Solution |
|-------|----------|
| `Connection refused` | Start `ollama serve` in other terminal |
| `Module not found` | Run `pip install -r requirements.txt` |
| `Port 8501 in use` | Use `--server.port 8502` flag |
| `Empty response` | First query slow, wait 5-10 seconds |
| `CSS not applying` | Refresh browser (Ctrl+F5) |

---

## 🎯 Feature Readiness

| Feature | Status | Time to Implement |
|---------|--------|-------------------|
| Negotiator | ✅ Ready | 1-2 hours |
| Crisis Manager | ✅ Ready | 1-2 hours |
| GraphRAG | ✅ Ready | 2-3 hours |
| Emotion UI | ✅ Ready | 2-3 hours |
| Tests | ✅ Ready | 30 min |
| Docs | ✅ Complete | Reference |

---

## 🚀 Next Steps

1. ✅ Install & run streamlit app
2. ✅ Test all 4 features
3. ✅ Customize colors/themes
4. ✅ Add your data to knowledge graph
5. ✅ Deploy to production

---

**Everything is ready to go! 🏨✨**

Questions? Check the full documentation in:
- `ADVANCED_FEATURES.md`
- `STREAMLIT_UI_GUIDE.md`
- `DEMO_SCENARIOS.md`
- `README_COMPLETE.md`
