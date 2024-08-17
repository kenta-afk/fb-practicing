FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9-slim

COPY ./app /app

RUN apt-get update && \
    apt-get -y install gcc libmariadb-dev && \
    pip install --no-cache-dir --upgrade -r /app/requirements.txt
