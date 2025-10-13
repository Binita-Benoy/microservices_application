FROM python:3.11-slim
WORKDIR /app

# system deps (optional but useful for timezones, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends tzdata && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app
RUN mkdir -p /app/uploads
ENV PYTHONUNBUFFERED=1
EXPOSE 5010

CMD ["python", "app.py"]

