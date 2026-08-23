import os
import sys
import tempfile
from unittest.mock import patch

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from main import create_app


@pytest.fixture()
def client():
    handle, path = tempfile.mkstemp(suffix=".db")
    os.close(handle)
    app = create_app({"TESTING": True, "DATABASE_URL": f"sqlite:///{path}"})
    with app.test_client() as test_client:
        yield test_client
    os.unlink(path)


def create_session(client):
    response = client.post("/api/demo-sessions")
    assert response.status_code == 201
    return response.get_json()


def test_health_and_seeded_dashboard(client):
    health = client.get("/api/health")
    assert health.get_json()["status"] == "ok"
    assert health.headers["X-Content-Type-Options"] == "nosniff"
    data = create_session(client)
    assert data["summary"] == {"income": 5850.0, "expenses": 3096.0, "balance": 2754.0, "savingsRate": 47.1}
    assert data["goal"]["progress"] == 57.0
    assert len(data["transactions"]) == 9


def test_sessions_are_isolated(client):
    first, second = create_session(client), create_session(client)
    transaction_id = first["transactions"][0]["id"]
    response = client.delete(f"/api/demo-sessions/{second['sessionId']}/transactions/{transaction_id}")
    assert response.status_code == 404
    assert len(client.get(f"/api/demo-sessions/{first['sessionId']}/dashboard").get_json()["transactions"]) == 9


def test_add_delete_goal_and_reset(client):
    data = create_session(client)
    session_id = data["sessionId"]
    added = client.post(f"/api/demo-sessions/{session_id}/transactions", json={"type": "expense", "category": "Food", "description": "Coffee", "amount": 6.5, "occurredOn": "2026-08-22"})
    assert added.status_code == 201
    assert added.get_json()["summary"]["expenses"] == 3102.5
    created = next(item for item in added.get_json()["transactions"] if item["description"] == "Coffee")
    assert client.delete(f"/api/demo-sessions/{session_id}/transactions/{created['id']}").status_code == 200
    goal = client.put(f"/api/demo-sessions/{session_id}/goal", json={"target": 10000})
    assert goal.get_json()["goal"]["progress"] == 28.5
    reset = client.post(f"/api/demo-sessions/{session_id}/reset").get_json()
    assert reset["goal"]["target"] == 5000
    assert len(reset["transactions"]) == 9


@pytest.mark.parametrize("payload,code", [
    ({"type": "other", "category": "Food", "description": "Bad", "amount": 2, "occurredOn": "2026-08-22"}, "invalid_type"),
    ({"type": "expense", "category": "Salary", "description": "Bad", "amount": 2, "occurredOn": "2026-08-22"}, "invalid_category"),
    ({"type": "expense", "category": "Food", "description": "", "amount": 2, "occurredOn": "2026-08-22"}, "invalid_description"),
    ({"type": "expense", "category": "Food", "description": "Bad", "amount": -2, "occurredOn": "2026-08-22"}, "invalid_amount"),
    ({"type": "expense", "category": "Food", "description": "Bad", "amount": 2, "occurredOn": "not-a-date"}, "invalid_date"),
])
def test_transaction_validation(client, payload, code):
    session_id = create_session(client)["sessionId"]
    response = client.post(f"/api/demo-sessions/{session_id}/transactions", json=payload)
    assert response.status_code == 400
    assert response.get_json()["error"]["code"] == code


def test_invalid_and_expired_sessions(client):
    assert client.get("/api/demo-sessions/not-a-uuid/dashboard").status_code == 400
    assert client.get("/api/demo-sessions/00000000-0000-4000-8000-000000000000/dashboard").status_code == 404


def test_deterministic_insights_and_ai_fallback(client):
    session_id = create_session(client)["sessionId"]
    response = client.post(f"/api/demo-sessions/{session_id}/insights")
    assert response.status_code == 200
    assert response.get_json()["source"] == "rules"
    assert len(response.get_json()["insights"]) == 3
    with patch.dict(os.environ, {"OPENAI_API_KEY": "invalid"}):
        with patch("api.enhance", return_value=([{"title": "a", "observation": "b", "action": "c", "impact": "d", "priority": "low"}] * 3, False)):
            fallback = client.post(f"/api/demo-sessions/{session_id}/insights").get_json()
            assert fallback["source"] == "rules"


def test_insight_rate_limit(client):
    session_id = create_session(client)["sessionId"]
    for _ in range(5):
        assert client.post(f"/api/demo-sessions/{session_id}/insights").status_code == 200
    assert client.post(f"/api/demo-sessions/{session_id}/insights").status_code == 429
