import flask
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import traceback

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def get_db_connection():
    return psycopg2.connect(
        host='localhost',
        dbname='IMDB_Database',
        user='postgres',
        password='125914'  
    )

@app.route('/query', methods=['POST'])
def run_query():
    data = request.get_json()
    query = data['query']
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute(query)
        if cur.description:  # This checks if the cursor has results to fetch
            results = cur.fetchall()
            return jsonify(results)
        else:
            return jsonify({"success": "Query executed successfully"})
    except psycopg2.Error as e:
        return jsonify({'error': str(e.pgerror)}), 400
    finally:
        cur.close()
        conn.close()

@app.route('/title-basics', methods=['POST', 'PUT', 'DELETE'])
def manage_title_basics():
    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        if request.method == 'POST':
            cur.execute("""
                INSERT INTO public.title_basics (tconst, titletype, primarytitle, originaltitle, isadult, runtimeminutes, genres)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (data['tconst'], data['titleType'], data['primaryTitle'], data['originalTitle'], data['isAdult'], data['runtimeMinutes'], data['genres']))
        elif request.method == 'PUT':
            cur.execute("""
                UPDATE public.title_basics
                SET titletype=%s, primarytitle=%s, originaltitle=%s, isadult=%s, runtimeminutes=%s, genres=%s
                WHERE tconst=%s
            """, (data['titleType'], data['primaryTitle'], data['originalTitle'], data['isAdult'], data['runtimeMinutes'], data['genres'], data['tconst']))
        elif request.method == 'DELETE':
            cur.execute("DELETE FROM public.title_basics WHERE tconst=%s", (data['tconst'],))
        conn.commit()
        return jsonify({"success": "Operation successful"}), 200
    except Exception as e:
        conn.rollback()
        traceback.print_exc()  # Print the full traceback to help diagnose the issue
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)