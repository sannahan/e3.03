# README

## Use curl to test that too long todos are blocked by the backend

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"content":"Todo that is way over the defined character limit that is one hundred fourty characters long, so that the api returns an error 400 upon the post request"}' \
http://localhost:8084/todos
```

## Deploy to Kubernetes

Github Actions or 

```
kubectl apply -k .
```

(secret is not a part of Kustomize, you need deploy that by itself)

Initialize table with `CREATE TABLE todos (id SERIAL PRIMARY KEY, todo TEXT);`

The counter is persisted even when the Postgres StatefulSet is deleted

