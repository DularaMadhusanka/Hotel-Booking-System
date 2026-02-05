# 🏨 Cloudy Hill Cottage - Smart Hotel Booking System

> An AI-powered hotel booking platform with intelligent chatbot, dynamic pricing negotiation, and sentiment-aware customer service.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Stack](https://img.shields.io/badge/stack-MERN%20%2B%20AI-green)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [System Architecture](#-system-architecture)
3. [Core Features & CRUD Operations](#-core-features--crud-operations)
4. [AI Integration & Problem Solving](#-ai-integration--problem-solving)
5. [Theoretical Foundations](#-theoretical-foundations)
6. [Novelty & Innovation](#-novelty--innovation)
7. [Technology Stack](#-technology-stack)
8. [Installation & Setup](#-installation--setup)
9. [API Documentation](#-api-documentation)
10. [Team Distribution](#-team-distribution)

---

## 🎯 Project Overview

Cloudy Hill Cottage is a comprehensive hotel booking system designed for a boutique homestay in Ella, Sri Lanka. The system goes beyond traditional booking platforms by integrating:

- **Intelligent AI Chatbot** with sentiment analysis and emotional intelligence
- **Dynamic Price Negotiation** powered by Game Theory principles
- **GraphRAG Recommendations** for personalized local experiences
- **Real-time Crisis Management** for guest complaints

### Problem Statement

Traditional hotel booking systems face several challenges:
1. **Impersonal Customer Service** - Generic responses that don't adapt to guest emotions
2. **Fixed Pricing Models** - No flexibility for price negotiation based on demand
3. **Information Overload** - Guests struggle to find relevant local recommendations
4. **Delayed Complaint Resolution** - Manual escalation processes cause frustration

### Our Solution

We developed an AI-powered system that:
- Detects guest sentiment in real-time and adapts responses accordingly
- Implements dynamic pricing with negotiation capabilities
- Uses Knowledge Graphs for contextual recommendations
- Automatically escalates critical issues with appropriate compensation

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │  Pages   │ │Components│ │ Context  │ │    AI Chatbot    │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVER (Node.js + Express)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │  Routes  │ │Controllers│ │  Models  │ │   AI Proxy       │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└──────────┬──────────────────────────────────────┬───────────────┘
           │                                      │
           ▼                                      ▼
┌──────────────────┐                  ┌───────────────────────────┐
│    MongoDB       │                  │   AI SERVICE (Python)     │
│  ┌────────────┐  │                  │  ┌─────────────────────┐  │
│  │   Users    │  │                  │  │  Sentiment Agent    │  │
│  │   Hotels   │  │                  │  │  Negotiator Agent   │  │
│  │   Rooms    │  │                  │  │  GraphRAG Engine    │  │
│  │  Bookings  │  │                  │  │  RAG + ChromaDB     │  │
│  │  Reviews   │  │                  │  │  Ollama LLM         │  │
│  │  Payments  │  │                  │  └─────────────────────┘  │
│  └────────────┘  │                  └───────────────────────────┘
└──────────────────┘
```

---

## 📦 Core Features & CRUD Operations

### Component Overview (6 Main Components)

| # | Component | Description | Team Member |
|---|-----------|-------------|-------------|
| 1 | **User Management** | Authentication, profiles, search history | Member 1 |
| 2 | **Hotel Management** | Hotel registration, details, ownership | Member 2 |
| 3 | **Room Management** | Room inventory, images, amenities | Member 3 |
| 4 | **Booking Management** | Reservations, availability, scheduling | Member 4 |
| 5 | **Review Management** | Guest feedback, ratings, responses | Member 5 |
| 6 | **Payment Management** | Transactions, refunds, receipts | Member 6 |

---

### 1. User Management (`/api/user`)

Handles user authentication via Clerk and user data management.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| **Create** | POST | `/api/clerk` | Webhook: Create user on Clerk registration |
| **Read** | GET | `/api/user` | Get current user's data |
| **Read** | GET | `/api/user/:id` | Get user by ID |
| **Read** | GET | `/api/user/all` | Get all users (admin) |
| **Update** | PUT | `/api/user/:id` | Update user profile |
| **Delete** | DELETE | `/api/user/:id` | Delete user account |

**Key Functions:**
```javascript
// userController.js
getUserData()              // Get current authenticated user
getUserById(id)            // Fetch specific user
getAllUsers()              // Admin: list all users
updateUser(id, data)       // Modify user profile
deleteUser(id)             // Remove user account
storeRecentSearchedCities() // Track search history for recommendations
```

---

### 2. Hotel Management (`/api/hotels`)

Manages hotel registration and ownership.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| **Create** | POST | `/api/hotels` | Register new hotel |
| **Read** | GET | `/api/hotels` | Get all hotels |
| **Read** | GET | `/api/hotels/:id` | Get hotel by ID |
| **Read** | GET | `/api/hotels/owner` | Get owner's hotel |
| **Update** | PUT | `/api/hotels/:id` | Update hotel details |
| **Delete** | DELETE | `/api/hotels/:id` | Delete hotel |

**Key Functions:**
```javascript
// hotelController.js
registerHotel()    // Create hotel & upgrade user to hotelOwner role
getAllHotels()     // List all registered hotels
getHotelById(id)   // Fetch specific hotel with owner details
getOwnerHotel()    // Get authenticated owner's hotel
updateHotel(id)    // Modify hotel information
deleteHotel(id)    // Remove hotel & reset owner role
```

---

### 3. Room Management (`/api/rooms`)

Manages room inventory with image upload via Cloudinary.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| **Create** | POST | `/api/rooms` | Add new room with images |
| **Read** | GET | `/api/rooms` | Get available rooms |
| **Read** | GET | `/api/rooms/all` | Get all rooms |
| **Read** | GET | `/api/rooms/:id` | Get room details |
| **Read** | GET | `/api/rooms/owner` | Get owner's rooms |
| **Update** | PUT | `/api/rooms/:id` | Update room details |
| **Delete** | DELETE | `/api/rooms/:id` | Delete room |

**Key Functions:**
```javascript
// roomController.js
createRoom()              // Add room with Cloudinary image upload
getRooms()                // Get all available (isAvailable: true) rooms
getAllRooms()             // Get all rooms including unavailable
getRoomById(id)           // Get specific room with hotel details
getOwnerRooms()           // Get rooms belonging to authenticated owner
updateRoom(id)            // Modify room with optional new images
deleteRoom(id)            // Remove room from inventory
toggleRoomAvailability()  // Quick toggle for room availability
```

---

### 4. Booking Management (`/api/bookings`)

Handles reservations with availability checking.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| **Create** | POST | `/api/bookings/book` | Create new booking |
| **Read** | GET | `/api/bookings` | Get all bookings (admin) |
| **Read** | GET | `/api/bookings/user` | Get user's bookings |
| **Read** | GET | `/api/bookings/hotel` | Get hotel's bookings (dashboard) |
| **Read** | GET | `/api/bookings/:id` | Get booking details |
| **Update** | PUT | `/api/bookings/:id` | Update booking |
| **Update** | PUT | `/api/bookings/:id/cancel` | Cancel booking |
| **Delete** | DELETE | `/api/bookings/:id` | Delete booking |

**Key Functions:**
```javascript
// bookingController.js
checkAvailability()    // Check if room is available for dates
createBooking()        // Create booking with price calculation
getAllBookings()       // Admin: view all bookings
getUserBookings()      // Get authenticated user's bookings
getHotelBookings()     // Owner dashboard with revenue stats
getBookingById(id)     // Get specific booking with authorization
updateBooking(id)      // Modify dates, guests, status
cancelBooking(id)      // Set status to 'cancelled'
deleteBooking(id)      // Permanently remove booking
```

**Availability Algorithm:**
```javascript
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  // Find overlapping bookings
  const bookings = await Booking.find({
    room,
    checkInDate: { $lte: checkOutDate },
    checkOutDate: { $gte: checkInDate },
    status: { $ne: "cancelled" }
  });
  return bookings.length === 0; // Available if no overlaps
};
```

---

### 5. Review Management (`/api/reviews`)

Manages guest feedback with rating aggregation.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| **Create** | POST | `/api/reviews` | Submit review after checkout |
| **Read** | GET | `/api/reviews` | Get all approved reviews |
| **Read** | GET | `/api/reviews/hotel/:id` | Get hotel reviews with stats |
| **Read** | GET | `/api/reviews/room/:id` | Get room reviews |
| **Read** | GET | `/api/reviews/user` | Get user's reviews |
| **Read** | GET | `/api/reviews/:id` | Get review details |
| **Update** | PUT | `/api/reviews/:id` | Update review |
| **Update** | PUT | `/api/reviews/:id/respond` | Owner responds to review |
| **Delete** | DELETE | `/api/reviews/:id` | Delete review |

**Key Functions:**
```javascript
// reviewController.js
createReview()        // Submit review (only after checkout date)
getAllReviews()       // Get approved reviews
getHotelReviews(id)   // Get reviews with aggregated stats
getRoomReviews(id)    // Get room-specific reviews
getUserReviews()      // Get authenticated user's reviews
getReviewById(id)     // Get specific review
updateReview(id)      // Modify review (owner only)
respondToReview(id)   // Hotel owner adds response
markReviewHelpful()   // Increment helpful votes
deleteReview(id)      // Remove review
```

**Review Schema Highlights:**
- Multiple rating categories (cleanliness, service, location, value)
- Owner response capability
- Helpful votes system
- Moderation status (isApproved)

---

### 6. Payment Management (`/api/payments`)

Handles transactions with refund capabilities.

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| **Create** | POST | `/api/payments` | Create payment record |
| **Read** | GET | `/api/payments` | Get all payments (admin) |
| **Read** | GET | `/api/payments/user` | Get user's payments |
| **Read** | GET | `/api/payments/hotel` | Get hotel payments with stats |
| **Read** | GET | `/api/payments/:id` | Get payment details |
| **Update** | PUT | `/api/payments/:id` | Update payment |
| **Update** | PUT | `/api/payments/:id/confirm` | Confirm cash payment |
| **Update** | PUT | `/api/payments/:id/refund` | Process refund |
| **Delete** | DELETE | `/api/payments/:id` | Delete pending payment |

**Key Functions:**
```javascript
// paymentController.js
createPayment()        // Record payment (auto-complete for non-cash)
getAllPayments()       // Admin: view all transactions
getUserPayments()      // Get authenticated user's payments
getHotelPayments()     // Owner dashboard with revenue stats
getPaymentByBooking()  // Get payment for specific booking
getPaymentById(id)     // Get transaction details
updatePayment(id)      // Modify payment info
confirmPayment(id)     // Owner confirms cash payment received
refundPayment(id)      // Process refund with reason
deletePayment(id)      // Remove pending/cancelled payment
```

---

## 🤖 AI Integration & Problem Solving

### AI System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                    SmartStay AI System                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐     ┌─────────────────┐                   │
│  │   RAG Engine    │     │   Knowledge     │                   │
│  │   (ChromaDB)    │────▶│     Graph       │                   │
│  │                 │     │   (GraphRAG)    │                   │
│  └────────┬────────┘     └────────┬────────┘                   │
│           │                       │                             │
│           ▼                       ▼                             │
│  ┌─────────────────────────────────────────┐                   │
│  │              Ollama LLM (Llama2)         │                   │
│  │         Natural Language Processing      │                   │
│  └─────────────────────────────────────────┘                   │
│           │                       │                             │
│           ▼                       ▼                             │
│  ┌─────────────────┐     ┌─────────────────┐                   │
│  │   Sentiment     │     │   Negotiator    │                   │
│  │    Analyzer     │     │     Agent       │                   │
│  │   (NLP/Rules)   │     │  (Game Theory)  │                   │
│  └─────────────────┘     └─────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Sentiment Analysis Agent

**Problem Solved:** Traditional chatbots provide uniform responses regardless of guest emotional state, leading to escalated frustrations.

**Solution:** Real-time sentiment detection that adapts response tone and offers appropriate compensation.

```python
class SentimentAnalyzer:
    def analyze_sentiment(self, text: str) -> Tuple[str, float]:
        """
        Analyzes text and returns sentiment classification
        
        Returns:
        - sentiment: "positive", "negative", "neutral", "angry"
        - score: -2.0 to +2.0
        """
        
        # 1. Check negation phrases first
        for phrase in self.negation_phrases:
            if phrase in text_lower:
                score -= 1.5  # Strong negative signal
        
        # 2. Count sentiment keywords
        for word, value in self.negative_words.items():
            if word in text_lower:
                score += value
        
        # 3. Detect intensity markers (!, !!)
        if "!" in text and score < 0:
            score *= 1.3  # Amplify negative emotions
        
        # 4. Classify sentiment
        if score >= 1:    return ("positive", score)
        elif score <= -1.5: return ("angry", score)
        elif score < -0.5:  return ("negative", score)
        else:               return ("neutral", score)
```

**Sentiment-Adaptive Response Strategy:**

| Sentiment | Response Strategy | Compensation Level |
|-----------|-------------------|-------------------|
| 😊 Positive | Enthusiastic, encourage reviews | None |
| 🤖 Neutral | Professional, informative | None |
| 😟 Negative | Empathetic, offer solutions | Level 1-2 |
| 🚨 Angry/Crisis | De-escalate, immediate action | Level 3-4 |

### 2. Negotiation Agent (Game Theory)

**Problem Solved:** Fixed pricing doesn't maximize revenue during low occupancy or accommodate budget-conscious guests.

**Solution:** Dynamic pricing negotiation using Game Theory principles.

```python
class NegotiatorAgent:
    def negotiate_price(self, room_type, guest_offer, loyalty_status):
        """
        Game Theory-based price negotiation
        
        Strategy: Stackelberg Game Model
        - Hotel (Leader): Sets price bounds based on occupancy
        - Guest (Follower): Makes offer within perceived range
        """
        
        # Get current market conditions
        occupancy_rate = self.get_occupancy_rate()
        occupancy_tier = self.get_occupancy_tier(occupancy_rate)
        
        # Calculate minimum acceptable price
        base_price = self.base_prices[room_type]
        min_price = self.minimum_prices[room_type]
        
        # Adjust based on occupancy (dynamic floor)
        if occupancy_tier == 1:      # Critical Low (<25%)
            dynamic_min = min_price * 0.85  # More flexible
        elif occupancy_tier == 2:    # Low (25-50%)
            dynamic_min = min_price * 0.95
        elif occupancy_tier == 3:    # Good (50-80%)
            dynamic_min = min_price
        else:                        # Full (>80%)
            dynamic_min = base_price  # No negotiation
        
        # Apply loyalty bonuses
        if loyalty_status == "gold":
            dynamic_min *= 0.90  # 10% additional discount
        
        # Decision logic
        if guest_offer >= base_price:
            return {"decision": "accept", "final_price": guest_offer}
        elif guest_offer >= dynamic_min:
            counter = (guest_offer + base_price) / 2
            return {"decision": "counter", "counter_offer": counter}
        else:
            return {"decision": "reject", "minimum": dynamic_min}
```

### 3. GraphRAG Recommendation Engine

**Problem Solved:** Text-based search fails to understand relationships between entities (e.g., "romantic dinner near hiking trail").

**Solution:** Knowledge Graph + RAG for contextual, relationship-aware recommendations.

```python
class KnowledgeGraph:
    def __init__(self):
        self.graph = nx.DiGraph()
        self._initialize_graph()
    
    def _initialize_graph(self):
        """Build knowledge graph with entities and relationships"""
        
        # Add entities
        self.graph.add_node("Ella Rock", type="attraction", 
                          difficulty="moderate", duration="3-4 hours")
        self.graph.add_node("Nine Arch Bridge", type="attraction",
                          best_time="6:00 AM", distance_km=6)
        self.graph.add_node("Cooking Class", type="activity",
                          includes=["3 curries", "yellow rice", "sambal"])
        
        # Add relationships
        self.graph.add_edge("Cloudy Hill Cottage", "Ella Rock",
                          relation="provides_directions", distance_km=6)
        self.graph.add_edge("Cooking Class", "Jackfruit Curry",
                          relation="teaches")
        self.graph.add_edge("Sunrise View", "Balcony",
                          relation="visible_from")
    
    def query_itinerary(self, preferences: dict) -> List[dict]:
        """
        Query graph for personalized recommendations
        
        Uses:
        - Shortest path algorithms for distance optimization
        - Node attribute filtering for preference matching
        - Relationship traversal for contextual suggestions
        """
        recommendations = []
        
        if preferences.get("romantic"):
            # Find paths that include romantic-tagged nodes
            romantic_nodes = [n for n, d in self.graph.nodes(data=True)
                           if d.get("romantic", False)]
            # Build itinerary connecting romantic spots
            ...
        
        return recommendations
```

### 4. RAG (Retrieval-Augmented Generation)

**Problem Solved:** LLMs have limited knowledge and may hallucinate hotel-specific information.

**Solution:** Ground LLM responses in verified hotel documentation.

```python
# Document Processing Pipeline
def build_knowledge_base():
    """
    1. Load documents (hotel info, policies, FAQs)
    2. Split into chunks (500 chars, 50 overlap)
    3. Generate embeddings (HuggingFace all-MiniLM-L6-v2)
    4. Store in ChromaDB vector database
    """
    
    documents = DirectoryLoader("./data/docs", glob="**/*.md").load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = text_splitter.split_documents(documents)
    
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    
    db = Chroma.from_documents(chunks, embeddings, 
                               persist_directory="./chroma")
    return db

# Query Pipeline
def answer_query(user_question: str):
    """
    1. Embed user question
    2. Find similar document chunks
    3. Include context in LLM prompt
    4. Generate grounded response
    """
    
    relevant_docs = db.similarity_search(user_question, k=3)
    context = "\n\n".join([doc.page_content for doc in relevant_docs])
    
    prompt = f"""Based on this hotel information:
    {context}
    
    Answer the guest's question: {user_question}
    """
    
    return llm.invoke(prompt)
```

---

## 📚 Theoretical Foundations

### 1. Game Theory - Stackelberg Competition Model

**Application:** Dynamic price negotiation between hotel and guest.

**Theory:**
- **Stackelberg Game:** A strategic game where one player (leader) moves first, and the other (follower) responds.
- **Nash Equilibrium:** The stable state where neither party can improve by changing strategy unilaterally.

**Implementation:**

```
Hotel (Leader)                    Guest (Follower)
     │                                  │
     │  1. Set price bounds             │
     │     based on:                    │
     │     - Occupancy rate             │
     │     - Season                     │
     │     - Loyalty status             │
     │                                  │
     ▼                                  │
┌─────────────────┐                     │
│ Base: $80/night │                     │
│ Min:  $60/night │                     │
│ Dynamic: $55    │                     │
└────────┬────────┘                     │
         │                              │
         │  2. Communicate range        │
         │────────────────────────────▶│
         │                              │
         │                              │ 3. Make offer
         │                              │    considering:
         │                              │    - Budget
         │                              │    - Perceived value
         │                              │    - Alternatives
         │                              ▼
         │                    ┌─────────────────┐
         │                    │ Offer: $65/night│
         │◀───────────────────┤                 │
         │                    └─────────────────┘
         │
         │ 4. Evaluate & respond
         ▼
   ┌───────────┐
   │  Accept   │ (if offer ≥ base)
   ├───────────┤
   │  Counter  │ (if min ≤ offer < base)
   ├───────────┤
   │  Reject   │ (if offer < min)
   └───────────┘
```

**Payoff Matrix:**

| | Guest Accepts | Guest Rejects |
|---|---|---|
| **Hotel Accepts** | (Hotel: revenue, Guest: room) | N/A |
| **Hotel Counters** | (Hotel: higher rev, Guest: room) | (Both: 0) |
| **Hotel Rejects** | N/A | (Both: 0) |

### 2. Human-Computer Interaction (HCI)

**Application:** Emotion-adaptive chatbot interface.

**Principles Applied:**

#### a) Norman's Emotional Design (3 Levels)

| Level | Implementation |
|-------|----------------|
| **Visceral** | Color-coded themes (green=happy, amber=concerned, red=crisis) |
| **Behavioral** | Quick action buttons, typing indicators, smooth animations |
| **Reflective** | Personalized responses, empathy statements, follow-up care |

#### b) Affective Computing (Picard, 1997)

```
User Input → Sentiment Analysis → Emotional State Detection → Adaptive Response
     │              │                     │                        │
     │         ┌────┴────┐          ┌─────┴─────┐            ┌─────┴─────┐
     │         │ Lexicon │          │ positive  │            │ Enthusiast│
     │         │ Analysis│          │ negative  │            │ Empathetic│
     │         │ Negation│          │ neutral   │            │ Urgent    │
     │         │ Detect  │          │ angry     │            │ Crisis    │
     │         └─────────┘          └───────────┘            └───────────┘
```

#### c) Usability Heuristics (Nielsen)

| Heuristic | Implementation |
|-----------|----------------|
| Visibility of system status | "AI Concierge Online" indicator, typing animation |
| Match real world | Natural language, emoji, conversational tone |
| User control | Clear chat, close button, quick actions |
| Error prevention | Input validation, fallback responses |
| Recognition over recall | Quick action buttons for common queries |

### 3. Natural Language Processing (NLP)

**Application:** Intent detection, entity extraction, sentiment analysis.

**Techniques:**

```python
# Intent Classification (Rule-based + Keyword)
def detect_intent(text: str) -> str:
    """
    Multi-class intent classification
    
    Classes:
    - negotiation: Price-related queries
    - complaint: Issues and problems
    - recommendation: Activity/restaurant queries
    - booking: Reservation queries
    - general_info: Everything else
    """
    
    # Keyword-based classification
    if any(word in text for word in ["price", "cost", "discount"]):
        return "negotiation"
    
    if sentiment_analyzer.is_complaint(text):
        return "complaint"
    
    # ... more rules
    
    return "general_info"
```

### 4. Information Retrieval (IR)

**Application:** RAG system for grounding LLM responses.

**Techniques:**

#### Vector Similarity Search

```python
# Embedding: Text → Dense Vector (384 dimensions)
# Model: sentence-transformers/all-MiniLM-L6-v2

def similarity_search(query: str, k: int = 3):
    """
    1. Embed query using same model as documents
    2. Compute cosine similarity with all document embeddings
    3. Return top-k most similar documents
    
    Similarity(A, B) = (A · B) / (||A|| × ||B||)
    """
    query_embedding = embed(query)
    
    results = []
    for doc in documents:
        similarity = cosine_similarity(query_embedding, doc.embedding)
        results.append((doc, similarity))
    
    return sorted(results, key=lambda x: x[1], reverse=True)[:k]
```

### 5. Knowledge Graphs

**Application:** GraphRAG for relationship-aware recommendations.

**Theory:** Semantic networks representing entities and their relationships.

```
                    ┌─────────────┐
                    │ Cloudy Hill │
                    │   Cottage   │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Ella Rock  │ │   Cooking   │ │   Sunrise   │
    │  (6km away) │ │    Class    │ │    View     │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           │               ▼               │
           │        ┌─────────────┐        │
           │        │  Jackfruit  │        │
           │        │    Curry    │        │
           │        └─────────────┘        │
           │                               │
           ▼                               ▼
    ┌─────────────┐                 ┌─────────────┐
    │ Nine Arch   │                 │   Balcony   │
    │   Bridge    │◀───────────────▶│    Room     │
    └─────────────┘  (view from)    └─────────────┘
```

---

## 🌟 Novelty & Innovation

### 1. Emotion-Adaptive UI (Novel Contribution)

**Innovation:** The chatbot UI dynamically changes its entire visual theme based on detected user sentiment.

| Sentiment | Theme | Visual Changes |
|-----------|-------|----------------|
| Positive | Green gradient | Celebratory icons, uplifting colors |
| Neutral | Blue gradient | Professional, calm appearance |
| Negative | Amber gradient | Concerned tone, solution-focused |
| Crisis | Red gradient + banner | Emergency mode, priority support |

**Why Novel:** Most chatbots have static UI regardless of conversation tone. Our system provides visual feedback that validates user emotions.

### 2. Integrated Negotiation in Conversation (Novel Contribution)

**Innovation:** Price negotiation happens naturally within the conversation flow, not through a separate interface.

```
User: "Can I get the deluxe room for $60?"
Bot:  "I appreciate your interest! Our Deluxe Room is normally $80/night.
       Given our current availability, I can offer it at $68/night.
       Would that work for you? 😊"
       
       [Accept $68] [Counter Offer] [See Other Rooms]
```

**Why Novel:** Traditional booking systems have fixed prices or require contacting sales. Our system enables real-time, conversational negotiation.

### 3. Crisis Auto-Escalation (Novel Contribution)

**Innovation:** Automatic detection and escalation of critical issues without human intervention.

```python
# Automatic escalation triggers
if sentiment == "angry" or severity == "critical":
    is_crisis_mode = True
    
    # Actions:
    # 1. Change UI to crisis theme
    # 2. Enable maximum compensation authority
    # 3. Log for management review
    # 4. Offer direct manager callback
```

**Why Novel:** Most systems require guests to explicitly request manager/escalation. Our system proactively identifies crises and responds appropriately.

### 4. GraphRAG for Local Recommendations (Novel Contribution)

**Innovation:** Combining Knowledge Graphs with RAG for contextually-aware local recommendations.

**Example:**
```
User: "What should I do this morning before checkout?"

GraphRAG Analysis:
- Time constraint: morning
- Activity type: before checkout (light activity)
- Relationships: 
  - Sunrise → best at 6 AM → visible from room balcony
  - Nine Arch Bridge → best at 6 AM → 6km away
  - Cooking Class → 2-3 hours → can do morning

Response: "Since you're checking out, I'd recommend watching the sunrise 
from your balcony at 6 AM - it's spectacular! Alternatively, if you wake 
early, the Nine Arch Bridge is magical at sunrise (6 AM train crossing). 
The cooking class is also possible if you have 2-3 hours."
```

### 5. Multi-Agent Architecture (Novel Contribution)

**Innovation:** Specialized AI agents that collaborate to handle different aspects of guest interaction.

```
                         ┌─────────────────┐
                         │  Intent Router  │
                         └────────┬────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼
   ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
   │  Sentiment  │        │ Negotiator  │        │  GraphRAG   │
   │   Agent     │        │   Agent     │        │   Agent     │
   │             │        │             │        │             │
   │ - Emotion   │        │ - Price     │        │ - Places    │
   │ - Severity  │        │ - Discounts │        │ - Routes    │
   │ - Crisis    │        │ - Loyalty   │        │ - Tips      │
   └─────────────┘        └─────────────┘        └─────────────┘
          │                       │                       │
          └───────────────────────┼───────────────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  Response       │
                         │  Synthesizer    │
                         │  (Ollama LLM)   │
                         └─────────────────┘
```

---

## 🛠 Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router | Navigation |
| Clerk React | Authentication |
| React Hot Toast | Notifications |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| Clerk Express | Auth Middleware |
| Cloudinary | Image Storage |
| Multer | File Upload |

### AI Service
| Technology | Purpose |
|------------|---------|
| Python 3.10 | Runtime |
| FastAPI | API Framework |
| Ollama | LLM (Llama2) |
| LangChain | LLM Orchestration |
| ChromaDB | Vector Database |
| HuggingFace | Embeddings |
| NetworkX | Knowledge Graph |

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB Atlas account
- Ollama installed locally
- Cloudinary account
- Clerk account

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/hotel-booking-system.git
cd hotel-booking-system
```

### 2. Backend Setup

```bash
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=3000
MONGO_URI=mongodb+srv://...
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
AI_API_URL=http://localhost:8000
EOF

npm run server
```

### 3. Frontend Setup

```bash
cd client
npm install

# Create .env file
cat > .env << EOF
VITE_BACKEND_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_CURRENCY=$
EOF

npm run dev
```

### 4. AI Service Setup

```bash
cd ../RAG/langchain-rag-tutorial

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Start Ollama (in separate terminal)
ollama serve

# Pull Llama2 model
ollama pull llama2

# Build knowledge base
python rebuild_database.py

# Start AI server
python api_server.py
```

### 5. Access Application

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- AI Service: http://localhost:8000

---

## 📖 API Documentation

### AI Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/chat` | POST | Main chat endpoint |
| `/api/ai/negotiate` | POST | Direct negotiation |
| `/api/ai/sentiment` | POST | Sentiment analysis |
| `/api/ai/recommend` | POST | Get recommendations |
| `/api/ai/occupancy` | GET | Get occupancy data |
| `/api/ai/health` | GET | Health check |

### Chat Request Example

```json
POST /api/ai/chat
{
  "message": "I'm not satisfied with my room",
  "userId": "user_123",
  "loyaltyStatus": "gold",
  "sessionId": "session_abc"
}
```

### Chat Response Example

```json
{
  "success": true,
  "response": "I'm truly sorry to hear that...",
  "sentiment": "negative",
  "sentimentScore": -1.5,
  "intent": "complaint",
  "isCrisisMode": false,
  "negotiationData": null
}
```

---

## 👥 Team Distribution

| Member | Component | CRUD Operations | AI Integration |
|--------|-----------|-----------------|----------------|
| 1 | User Management | 4 CRUDs | Search history for recommendations |
| 2 | Hotel Management | 4 CRUDs | Hotel info in knowledge base |
| 3 | Room Management | 4 CRUDs | Room data for negotiation |
| 4 | Booking Management | 4 CRUDs | Availability for dynamic pricing |
| 5 | Review Management | 4 CRUDs | Sentiment analysis integration |
| 6 | Payment Management | 4 CRUDs | Transaction logging |

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 🙏 Acknowledgments

- **Cloudy Hill Cottage, Ella** - For inspiring this project
- **Ollama** - For local LLM inference
- **LangChain** - For LLM orchestration
- **Clerk** - For authentication services

---

<div align="center">
  <b>Built with ❤️ for Cloudy Hill Cottage</b>
  <br>
  <i>Sooriyagahawatte Kithalella, Ella 90090, Sri Lanka</i>
</div>
