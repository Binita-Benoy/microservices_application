from flask import Flask, jsonify
from flask_mysqldb import MySQL, MySQLdb
from datetime import date, datetime, timedelta

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Application Service is running!"})

app.config['MYSQL_HOST'] = 'localhost'  # or 'mysql' if both are in Docker
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'birth_cert'

mysql = MySQL(app)

@app.route('/citizens')
def get_citizens():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM citizen;")
    rows = cur.fetchall()
    cur.close()

    for row in rows:
        for key, value in row.items():
            if isinstance(value, (datetime, date, timedelta)):
                row[key] = str(value)

    return jsonify(rows)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
