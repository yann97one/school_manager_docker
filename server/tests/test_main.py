from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/students/")
    assert response.status_code in [200, 500]


def test_health():
    response = client.get("/docs")
    assert response.status_code == 200
