import json
import os
import http.client
from dotenv import load_dotenv

root_dir = r"C:\Users\salom\projects\multilanguageapp"
env_path = os.path.join(root_dir, r"apps\web\frontend\.env.local")
json_path = os.path.join(root_dir, r"apps\web\frontend\app\data\practice.json")

load_dotenv(dotenv_path=env_path)

raw_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase_hostname = raw_url.replace("https://", "").replace("/", "") if raw_url else None

def upload_practice_data():
    print(f"🚀 Reading: {json_path}")
    
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        rows_to_insert = []
        for level_entry in data:
            level_id = level_entry.get('level')
            
            for key, val in level_entry.items():
                if key.startswith('question'):
                    options = val.get('options', {})
                    
                    rows_to_insert.append({
                        "practice_id": int(level_id),
                        "question_label": key,
                        "question_text": val.get('question'),
                        # Use .get(key, "") to provide an empty string if the option is missing
                        "option_a": options.get('A', ""),
                        "option_b": options.get('B', ""),
                        "option_c": options.get('C', ""), 
                        "option_d": options.get('D', ""),
                        "correct_answer": val.get('answer'),
                        "order_index": int(key.replace('question', ''))
                    })

        total_rows = len(rows_to_insert)
        print(f"📦 Total rows prepared: {total_rows}")

        batch_size = 500 # Smaller batches are safer for larger payloads
        conn = http.client.HTTPSConnection(supabase_hostname)
        
        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }

        for i in range(0, total_rows, batch_size):
            batch = rows_to_insert[i : i + batch_size]
            body = json.dumps(batch)
            
            conn.request("POST", "/rest/v1/practice_questions", body, headers)
            response = conn.getresponse()
            resp_body = response.read().decode()

            if response.status not in [200, 201, 204]:
                print(f"❌ Error at row {i}: Status {response.status}")
                print(f"📝 Server Message: {resp_body}")
                return 
                
            print(f"✅ Sync Progress: {min(i + batch_size, total_rows)} / {total_rows}")

        conn.close()
        print("✨ Database successfully updated!")

    except Exception as e:
        print(f"💀 Operation failed: {str(e)}")

if __name__ == "__main__":
    upload_practice_data()