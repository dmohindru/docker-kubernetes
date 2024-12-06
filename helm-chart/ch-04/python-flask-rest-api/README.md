## 1. Build Docker image

```commandline
docker build -t python-rest-api .
```

## 2. Run Docker image

```commandline
docker run -p 9001:9001 python-rest-api
```

### 3. Tag Python Image

```shell
docker tag python-rest-api dmohindru/python-flash-rest-api-project:python-rest-api
```

### 4. Docker push

```shell
docker push dmohindru/python-flash-rest-api-project:python-rest-api
```

### 5. Docker pull

```shell
docker push dmohindru/python-flash-rest-api-project:python-rest-api
```
