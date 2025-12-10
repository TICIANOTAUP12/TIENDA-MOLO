FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY api/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY api /app/api

ENV FLASK_ENV=production \
    JWT_SECRET_KEY=change-me-in-env \
    CSRF_SECURE=true

EXPOSE 5088

CMD ["gunicorn", "-w", "3", "-b", "0.0.0.0:5088", "api.app:app"]
