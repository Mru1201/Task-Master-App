FROM python:3.12-slim

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y gcc python3-dev

RUN pip install --no-cache-dir fastapi uvicorn sqlalchemy passlib[bcrypt] bcrypt==3.2.2 python-jose python-dotenv

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
