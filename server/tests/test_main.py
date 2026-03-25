def test_docs(client):
    response = client.get("/docs")
    assert response.status_code == 200


def test_get_students(client):
    response = client.get("/students/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_student(client):
    response = client.post("/students/", json={"name": "John", "lastname": "Doe"})
    assert response.status_code == 200
    assert response.json()["name"] == "John"


def test_get_teachers(client):
    response = client.get("/teachers/")
    assert response.status_code == 200


def test_get_marks(client):
    response = client.get("/marks/")
    assert response.status_code == 200
