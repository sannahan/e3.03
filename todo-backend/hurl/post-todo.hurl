POST http://localhost:8084/todos
Content-Type: application/json

{
    "content": "Water plants"
}

HTTP/1.1 201
[Asserts]
jsonpath "$.todo" == "Water plants"
