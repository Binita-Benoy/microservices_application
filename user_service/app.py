import os
import sys
import logging 
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash

load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://<192.168.1.21>:3000",   # React dev server on port 3000
            #"http://<192.168.1.21>:5173",   # Vite dev server (if they use Vite)
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ]
    }
})

# Force logs to stdout (Docker captures this)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)
handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
app.logger.handlers.clear()
app.logger.addHandler(handler)
app.logger.setLevel(logging.INFO)


DB_CFG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "user_db"),
    "connection_timeout": 8,
}

def get_db():
    return mysql.connector.connect(**DB_CFG)

@app.get("/health")
def health():
    try:
        db = get_db(); db.close()
        return {"status": "ok", "db": "connected", "service": "user_service"}
    except Exception as e:
        return {"status": "error", "db_error": str(e)}, 500

@app.post("/api/users/register")
def register():

    app.logger.info(">> %s %s", request.method, request.path)
    data = request.get_json(silent=True) or request.form.to_dict()
    app.logger.info(">> payload: %s", data)
    print(">> payload:", data, flush=True)

    required = ["firstname","lastname","email","contactno","idno","password"]
    missing = [k for k in required if not data.get(k)]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400
    if len(data["password"]) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    pwd_hash = generate_password_hash(data["password"])
    try:
        db = get_db(); cur = db.cursor()
        cur.execute(
            """INSERT INTO users (firstname, lastname, email, contactno, idno, password_hash)
               VALUES (%s, %s, %s, %s, %s, %s)""",
            (
                data["firstname"].strip(),
                data["lastname"].strip(),
                data["email"].strip().lower(),
                data["contactno"].strip(),
                data["idno"].strip().upper(),
                pwd_hash,
            ),
        )
        user_id = cur.lastrowid
        db.commit(); cur.close(); db.close()
     
        return jsonify({"message": "Registered", "user_id": user_id}), 201
    
    except Error as e:
        if getattr(e, "errno", None) == 1062:
            msg = "Email already exists" if "email" in str(e).lower() else \
                  "ID number already exists" if "idno" in str(e).lower() else \
                  "Duplicate entry"
            return jsonify({"error": msg}), 409
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5005)
