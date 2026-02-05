"""
Test script to validate all three advanced features
Run this before deploying to verify everything works correctly
"""

import sys
from negotiator_agent import NegotiatorAgent
from sentiment_agent import SentimentAnalyzer
from graphrag_engine import KnowledgeGraph, format_graph_context


def test_negotiator_agent():
    """Test the Negotiator Bot"""
    print("\n" + "="*70)
    print("TEST 1: NEGOTIATOR AGENT (Dynamic Pricing)")
    print("="*70)
    
    try:
        # Create mock database object
        class MockDB:
            def similarity_search(self, query, k=1):
                class MockDoc:
                    page_content = "Overall Occupancy Rate: 24.7%"
                return [MockDoc()]
        
        negotiator = NegotiatorAgent(MockDB())
        
        # Test 1: Extract price from user input
        print("\n[Test 1.1] Extract room type and price...")
        result = negotiator.extract_room_type_and_price(
            "The Presidential Suite is too expensive at $500. Can you do $400?"
        )
        assert result == ("presidential", 400.0), f"Expected ('presidential', 400.0), got {result}"
        print("✅ PASS: Correctly extracted Presidential Suite and $400 offer")
        
        # Test 2: Get occupancy rate
        print("\n[Test 1.2] Retrieve occupancy rate...")
        occ = negotiator.get_occupancy_rate()
        assert 0 <= occ <= 1, f"Occupancy rate {occ} out of bounds"
        print(f"✅ PASS: Retrieved occupancy rate: {occ*100:.1f}%")
        
        # Test 3: Occupancy tier calculation
        print("\n[Test 1.3] Calculate occupancy tier...")
        tier = negotiator.get_occupancy_tier(0.24)
        assert tier == 1, f"Expected tier 1 for 24% occupancy, got {tier}"
        print(f"✅ PASS: Occupancy tier: {tier} (Low)")
        
        # Test 4: Loyalty discount
        print("\n[Test 1.4] Calculate loyalty discount...")
        discount = negotiator.get_loyalty_discount("gold")
        assert discount == 0.15, f"Expected 0.15 for gold, got {discount}"
        print(f"✅ PASS: Gold member discount: {discount*100:.0f}%")
        
        # Test 5: Negotiate price (low occupancy)
        print("\n[Test 1.5] Negotiate price at low occupancy...")
        negotiation = negotiator.negotiate_price("presidential", 420, "none")
        assert negotiation["decision"] in ["accept", "counter", "counter_with_addons"]
        print(f"✅ PASS: Negotiation decision: {negotiation['decision'].upper()}")
        print(f"   Message: {negotiation['message'][:80]}...")
        
        print("\n✅ NEGOTIATOR AGENT: ALL TESTS PASSED")
        return True
        
    except Exception as e:
        print(f"\n❌ NEGOTIATOR AGENT TEST FAILED: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


def test_sentiment_analyzer():
    """Test the Sentiment-Adaptive Crisis Manager"""
    print("\n" + "="*70)
    print("TEST 2: SENTIMENT ANALYZER (Crisis Manager)")
    print("="*70)
    
    try:
        class MockDB:
            pass
        
        analyzer = SentimentAnalyzer(MockDB())
        
        # Test 1: Positive sentiment
        print("\n[Test 2.1] Analyze positive sentiment...")
        sentiment, score = analyzer.analyze_sentiment("Great stay! The view is wonderful!")
        assert sentiment == "positive", f"Expected positive, got {sentiment}"
        assert score > 0, f"Expected positive score, got {score}"
        print(f"✅ PASS: Detected {sentiment} sentiment (score: {score:.1f})")
        
        # Test 2: Angry sentiment
        print("\n[Test 2.2] Analyze angry sentiment...")
        sentiment, score = analyzer.analyze_sentiment("My room is BROKEN and staff was rude!!!")
        assert sentiment == "angry", f"Expected angry, got {sentiment}"
        assert score < 0, f"Expected negative score, got {score}"
        print(f"✅ PASS: Detected {sentiment} sentiment (score: {score:.1f})")
        
        # Test 3: Neutral sentiment
        print("\n[Test 2.3] Analyze neutral sentiment...")
        sentiment, score = analyzer.analyze_sentiment("What time is breakfast?")
        assert sentiment == "neutral", f"Expected neutral, got {sentiment}"
        print(f"✅ PASS: Detected {sentiment} sentiment")
        
        # Test 4: Complaint detection
        print("\n[Test 2.4] Detect complaint...")
        is_complaint = analyzer.is_complaint("My shower is broken")
        assert is_complaint == True, "Failed to detect complaint"
        print("✅ PASS: Complaint detected")
        
        # Test 5: Issue severity
        print("\n[Test 2.5] Detect issue severity...")
        severity = analyzer.detect_issue_severity("There's a security breach!")
        assert severity == "critical", f"Expected critical, got {severity}"
        print(f"✅ PASS: Severity level: {severity.upper()}")
        
        # Test 6: Generate system prompt
        print("\n[Test 2.6] Generate context-specific system prompt...")
        prompt = analyzer.generate_system_prompt("negative", True, "moderate")
        assert "apologize" in prompt.lower() or "complaint" in prompt.lower()
        print("✅ PASS: Generated crisis management prompt")
        print(f"   Prompt length: {len(prompt)} characters")
        
        print("\n✅ SENTIMENT ANALYZER: ALL TESTS PASSED")
        return True
        
    except Exception as e:
        print(f"\n❌ SENTIMENT ANALYZER TEST FAILED: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


def test_knowledge_graph():
    """Test the GraphRAG Knowledge Graph"""
    print("\n" + "="*70)
    print("TEST 3: KNOWLEDGE GRAPH (GraphRAG)")
    print("="*70)
    
    try:
        graph = KnowledgeGraph()
        
        # Test 1: Entity creation
        print("\n[Test 3.1] Check entity initialization...")
        assert "Grand Vista Hotel" in graph.entities, "Hotel not in graph"
        assert "The Green Leaf" in graph.entities, "Restaurant not in graph"
        print(f"✅ PASS: Graph initialized with {len(graph.entities)} entities")
        
        # Test 2: Find neighbors
        print("\n[Test 3.2] Query relationships...")
        neighbors = graph.find_neighbors("Grand Vista Hotel", "near")
        assert len(neighbors) > 0, "No nearby entities found"
        print(f"✅ PASS: Found {len(neighbors)} nearby entities")
        
        # Test 3: Find by attributes
        print("\n[Test 3.3] Find entities by attributes...")
        romantic_places = graph.find_entities_with_attributes(
            "restaurant", romantic=True
        )
        assert len(romantic_places) > 0, "No romantic restaurants found"
        print(f"✅ PASS: Found {len(romantic_places)} romantic restaurants")
        
        # Test 4: Query itinerary
        print("\n[Test 3.4] Query itinerary with preferences...")
        prefs = {
            "cuisine": ["vegan"],
            "romantic": True,
            "max_distance_km": 2.0
        }
        recommendations = graph.query_itinerary(prefs)
        assert len(recommendations) > 0, "No recommendations found"
        print(f"✅ PASS: Got {len(recommendations)} recommendations")
        for rec in recommendations:
            print(f"   - {rec['name']} (Rating: {rec['rating']}, {rec['distance_km']}km away)")
        
        # Test 5: Format context for LLM
        print("\n[Test 3.5] Format graph results for LLM...")
        context = format_graph_context(recommendations, prefs)
        assert len(context) > 0, "Context formatting failed"
        assert "The Green Leaf" in context or "restaurant" in context.lower()
        print("✅ PASS: Generated formatted context for LLM")
        print(f"   Context length: {len(context)} characters")
        
        print("\n✅ KNOWLEDGE GRAPH: ALL TESTS PASSED")
        return True
        
    except Exception as e:
        print(f"\n❌ KNOWLEDGE GRAPH TEST FAILED: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


def main():
    print("\n" + "="*70)
    print("  GRAND VISTA HOTEL - ADVANCED FEATURES TEST SUITE")
    print("="*70)
    
    results = []
    
    # Run all tests
    results.append(("Negotiator Agent", test_negotiator_agent()))
    results.append(("Sentiment Analyzer", test_sentiment_analyzer()))
    results.append(("Knowledge Graph", test_knowledge_graph()))
    
    # Summary
    print("\n" + "="*70)
    print("  TEST SUMMARY")
    print("="*70)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {name}")
    
    print("\n" + "-"*70)
    print(f"Total: {passed}/{total} test suites passed")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED! System is ready for deployment.")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test suite(s) failed. Please review errors above.")
        return 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
