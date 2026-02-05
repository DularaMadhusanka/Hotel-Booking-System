# 🎨 Emotion-Adaptive UI Demo Guide

## Complete Test Scenarios

Test all three advanced features with their emotion-adaptive UI responses:

---

## 1. 😊 HAPPY MODE - Positive Guest

### Test Scenario
```
👤 You: This hotel is amazing! Your staff is wonderful and the view is incredible!
```

### Expected UI Response
✅ **Colors**: Bright green (#2ECC71), orange accents
✅ **Avatar**: 😊 Smiling
✅ **Background**: Light green (#F0FFF4)
✅ **Tone**: Enthusiastic, casual
✅ **Font Size**: 1.1em (slightly larger)
✅ **Message**: Warm and engaging

### Assistant Response Example
```
🏨 Assistant: I'm absolutely thrilled you're having such a wonderful experience! 
Your kind words truly make our day. 

Since you're enjoying your stay so much, may I suggest:
- Our sunset cocktails at the rooftop bar (6 PM)
- The spa's aromatherapy massage (extremely popular!)
- Breakfast reservations at our Michelin-recommended restaurant

Would you be interested in any of these? And please, do share your experience 
on TripAdvisor - reviews like yours help us continue serving guests like you!
```

### What Happens
1. ✅ Sentiment detected as POSITIVE (+1.5)
2. ✅ UI theme switches to HAPPY mode
3. ✅ Avatar becomes smiling face 😊
4. ✅ "Sentiment Badge" shows: "😊 HAPPY (+1.5)"
5. ✅ Background changes to light green
6. ✅ Bot becomes "brand advocate builder" mode
7. ✅ Suggestions are upsell-focused but warm

---

## 2. 😐 NEUTRAL MODE - Standard Inquiry

### Test Scenario
```
👤 You: What time is breakfast available?
```

### Expected UI Response
✅ **Colors**: Professional blue (#3498DB)
✅ **Avatar**: 🤖 Neutral robot
✅ **Background**: Light gray (#F8F9FA)
✅ **Tone**: Professional, helpful
✅ **Font Size**: 1.0em (standard)
✅ **No emotion badge**: Stays neutral

### Assistant Response Example
```
🏨 Assistant: Our breakfast service is available from 6:30 AM to 10:30 AM 
in the Grand Ballroom on the second floor.

We offer:
- Continental breakfast (included with select room types)
- À la carte premium menu (additional charge)
- In-room breakfast delivery (24-hour service)

Would you like me to arrange a breakfast reservation or provide the menu?
```

### What Happens
1. ✅ Sentiment detected as NEUTRAL (0.0)
2. ✅ UI remains standard professional theme
3. ✅ No emotion badge displayed
4. ✅ Bot stays in "Information Provider" mode
5. ✅ Response is factual and organized

---

## 3. 😔 NEGATIVE MODE - Unhappy Guest

### Test Scenario
```
👤 You: I'm really disappointed with my room. The temperature is too cold 
and the WiFi keeps disconnecting. I'm not happy.
```

### Expected UI Response
✅ **Colors**: Soft red (#E74C3C), orange-red accents
✅ **Avatar**: 😔 Sad/concerned face
✅ **Background**: Light red (#FFF5F5)
✅ **Tone**: Empathetic, supportive
✅ **Font Size**: 1.05em (slightly larger)
✅ **Font Style**: Italic (empathetic)
✅ **Message**: Acknowledges frustration

### Assistant Response Example
```
🏨 Assistant: I completely understand your frustration, and I sincerely 
apologize that you're not having the experience we promise.

Let me take immediate action:
✓ I'm sending our engineer to fix the WiFi - they'll be at your room in 5 minutes
✓ I'm adjusting your thermostat to your preferred temperature right now
✓ As a gesture of goodwill, we'd like to offer you a complimentary dinner 
  at our restaurant OR a $50 dining credit

Your satisfaction is extremely important to us. Will this help make things right?
```

### What Happens
1. ✅ Sentiment detected as NEGATIVE (-1.0)
2. ✅ UI theme switches to NEGATIVE mode
3. ✅ Avatar becomes sad 😔
4. ✅ Background changes to soft red
5. ✅ "Sentiment Badge" shows: "😔 NEGATIVE (-1.0)"
6. ✅ Bot switches to "Support Specialist" mode
7. ✅ Message severity: MODERATE
8. ✅ Compensation policy retrieved
9. ✅ Immediate solutions offered
10. ✅ Font becomes italic (empathetic)

---

## 4. 😠 ANGRY/CRISIS MODE - Furious Guest

### Test Scenario
```
👤 You: MY ROOM IS DISGUSTING!!! The shower is BROKEN, staff was rude 
to me, and NOBODY is helping!!! I WANT A MANAGER!!!
```

### Expected UI Response
✅ **Colors**: Dark red (#C0392B), dark blue-gray background (#2C3E50) ⚠️ CRISIS MODE
✅ **Avatar**: 🚨 Emergency siren/alert
✅ **Text**: Light gray (#ECF0F1) for contrast
✅ **Border**: 2px solid red around message
✅ **Warning Badge**: FLASHING 🚨 CRISIS MODE ACTIVATED
✅ **Tone**: Formal, action-oriented, apologetic
✅ **Font Style**: Bold (high priority)
✅ **Animation**: Pulsing warning badge draws attention

### Assistant Response Example
```
🚨 🏨 CRISIS MANAGEMENT AGENT - ACTIVATED

I sincerely apologize. This should NEVER have happened to you, and I take 
full responsibility.

IMMEDIATE ACTIONS (Next 15 minutes):
✓ Manager calling your room IMMEDIATELY
✓ Room change to premium suite AT NO CHARGE
✓ Full housekeeping team attending to your room
✓ Technical support fixing shower right now

COMPENSATION:
✓ Refund of 50% of your stay
✓ Complimentary spa treatment ($150 value)
✓ Dinner for two at our finest restaurant ($200 value)
✓ Free night on your next visit

Your name and experience are being logged. Our General Manager 
will personally call you within 30 minutes.

You have my word - we will make this right.
```

### What Happens
1. ✅ Sentiment detected as ANGRY (-2.0)
2. ✅ **CRITICAL ALERT**: UI switches to CRISIS MODE
3. ✅ Background becomes dark blue-gray (#2C3E50) ⚠️
4. ✅ Avatar becomes emergency siren 🚨
5. ✅ **RED FLASHING WARNING BADGE** appears at top
6. ✅ "Sentiment Badge" shows: "😠 ANGRY (-2.0)"
7. ✅ Issue severity: CRITICAL
8. ✅ Bot switches to "Crisis Manager" mode
9. ✅ Compensation policy: Level 4 (maximum)
10. ✅ Offers: Full refund, free night, compensation packages
11. ✅ Manager escalation promised
12. ✅ All text bold and formal
13. ✅ Pulsing animation on warning badge (captures attention)

---

## 5. 💰 NEGOTIATOR MODE - Price Discussion

### Test Scenario
```
👤 You: The Presidential Suite is too expensive at $500/night. 
Can you negotiate? What's your best price?
```

### Expected UI Response
**Sentiment**: NEUTRAL (logical discussion, not emotional)
**Avatar**: 🤖 Professional
**Colors**: Standard blue theme

### Assistant Response Example
```
🏨 Assistant: I appreciate you asking directly! Let me check our current situation.

Our Presidential Suite normally runs $500/night, and you're asking about availability 
and pricing. Here's what I can tell you:

📊 CURRENT STATUS:
• Hotel occupancy: 24.7% (LOW - this is our opportunity)
• Presidential Suites available: 4 out of 5
• Market demand: Currently soft

💎 SPECIAL OFFER FOR YOU:
Can I offer you the Presidential Suite at $420/night ($80 savings)?
PLUS complimentary:
✓ Full breakfast (worth $25)
✓ Late checkout until 4 PM (worth $35)
✓ Spa credit of $50
✓ Free room upgrade on next visit

Total value: $530+ vs. asking price of $420
That's a $110+ value on top of the discount!

What do you think? Shall we book this?
```

### What Happens
1. ✅ Intent detected: NEGOTIATION
2. ✅ NegotiatorAgent activated
3. ✅ Occupancy rate retrieved (24.7%)
4. ✅ Occupancy tier determined: Tier 1 (LOW)
5. ✅ Negotiation logic applied
6. ✅ Business rules enforced
7. ✅ Counter-offer with value-adds generated
8. ✅ Dynamic system prompt sent to LLM
9. ✅ Response balances firmness with flexibility

---

## 6. 🗺️ GRAPHRAG MODE - Recommendations

### Test Scenario
```
👤 You: I want a romantic dinner tonight with vegan food that's close 
to the hotel. Can you help?
```

### Expected UI Response
**Sentiment**: HAPPY (helpful, positive request)
**Avatar**: 😊 Helpful
**Colors**: Green/blue theme

### Assistant Response Example
```
🏨 Assistant: How wonderful! I have the perfect recommendation for you.

🌿 **THE GREEN LEAF** ⭐⭐⭐⭐⭐
Distance: Just 5 minutes away (0.3 km)
Cuisine: Farm-to-table, organic, vegan-focused
Atmosphere: Intimate, romantic, perfect for couples
Rating: 4.8/5.0 (exceptional reviews for ambiance)

WHY IT'S PERFECT FOR YOU:
✓ Exclusively vegan menu with wine pairings
✓ Candlelit tables with stunning city views
✓ Known for romantic celebrations
✓ Open until 11 PM tonight

🎫 RESERVATION:
I can book you a table for 2 at 7 PM immediately.

📍 ALTERNATIVE (if you prefer):
- Sakura Sushi: 5 min away, romantic, has vegetarian options
- Vegans Paradise: 8 min away, cozy, highly rated

May I reserve The Green Leaf for you? ✨
```

### What Happens
1. ✅ Intent detected: RECOMMENDATION
2. ✅ KnowledgeGraph activated
3. ✅ Preferences extracted: romantic=True, cuisine=vegan, distance=nearby
4. ✅ Graph traversal finds entities matching criteria
5. ✅ Results ranked by relevance score
6. ✅ Top 3 recommendations selected
7. ✅ Context formatted for LLM
8. ✅ Personalized recommendation generated
9. ✅ Booking assistance offered

---

## 7. 🔄 UI TRANSITION EXAMPLE

### Real-time UI Change During Conversation

```
Initial State:
👤 Guest: "Tell me about breakfast"
🏨 UI: NEUTRAL MODE (blue, standard)

Message 1: 
"Breakfast is at 6:30 AM. We have..."
🏨 UI: Still NEUTRAL (informational)

Guest Message 2:
"Actually, I need to complain about something. 
The AC isn't working properly."
🏨 UI: TRANSITIONING...

UI Change Sequence (0.3 seconds):
1. Sentiment detected: NEGATIVE
2. Colors fade from blue → red
3. Avatar morphs: 🤖 → 😔
4. Background changes: gray → light red
5. Font shifts: normal → italic
6. New greeting appears

🏨 Response adjusts to "Support Specialist" mode
Focus shifts to resolution instead of information
```

---

## 📊 Testing Checklist

### Color Transitions
- [ ] Happy → Green colors display correctly
- [ ] Neutral → Blue colors display correctly
- [ ] Negative → Red colors display correctly
- [ ] Angry → Dark red/gray CRISIS MODE activates

### Avatar Changes
- [ ] Smiling emoji (😊) for happy
- [ ] Neutral emoji (🤖) for neutral
- [ ] Sad emoji (😔) for negative
- [ ] Alarm emoji (🚨) for angry/crisis

### Font & Typography
- [ ] Happy mode: 1.1em, slightly larger
- [ ] Negative mode: 1.05em, italic
- [ ] Angry mode: bold, formal

### Sentiment Badge
- [ ] Displays only when sentiment ≠ neutral
- [ ] Shows emoji + sentiment + score
- [ ] Updates in real-time

### Crisis Mode (Angry only)
- [ ] Warning badge appears
- [ ] Pulsing animation plays
- [ ] Background darkens
- [ ] Text color inverts for contrast
- [ ] Compensation options offered

### Intent Routing
- [ ] Negotiation → NegotiatorAgent
- [ ] Complaint → Sentiment analyzer + Crisis mode
- [ ] Recommendation → GraphRAG
- [ ] General info → Standard RAG

### Features Demonstrated
- [ ] Dynamic pricing with occupancy
- [ ] Sentiment-driven UI changes
- [ ] Crisis management protocol
- [ ] GraphRAG recommendations
- [ ] Emotion-appropriate responses

---

## 🎯 Demo Sequence (15 minutes)

1. **Introduction** (2 min)
   - Show emotion-adaptive UI concept
   - Explain sentiment detection

2. **Happy Guest** (2 min)
   - Type positive message
   - Show color/emoji changes
   - Demonstrate brand advocacy tone

3. **Complaint Guest** (3 min)
   - Type complaint
   - Show negative theme activation
   - Show compensation logic
   - Demonstrate crisis response

4. **Pricing Negotiation** (3 min)
   - Ask about room pricing
   - Show NegotiatorAgent logic
   - Show occupancy-based offers

5. **GraphRAG Recommendation** (3 min)
   - Ask for dinner recommendation
   - Show knowledge graph querying
   - Show personalized suggestions

6. **Conclusion** (2 min)
   - Review all features
   - Highlight HCI principles
   - Show production readiness

---

## 🎓 Key Points to Highlight

✅ **Emotion-Driven Design**: UI adapts to user's emotional state
✅ **HCI Feedback**: Visual acknowledgment that system "understands"
✅ **Affective Computing**: Real-time sentiment analysis + response
✅ **Dynamic Prompting**: LLM receives context-specific instructions
✅ **Game Theory**: Occupancy-based pricing negotiation
✅ **GraphRAG**: Entity relationships for smarter recommendations
✅ **Crisis Management**: Escalation protocols for critical issues
✅ **Production-Ready**: Fully functional, deployable system

---

**Ready to impress! Each feature is independently testable and showcases advanced AI principles.**
