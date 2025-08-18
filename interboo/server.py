from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class Handler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()  # respond immediately to preflight

    def do_POST(self):
        self._set_headers()

        # Read request body
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        data = json.loads(body.decode("utf-8"))
        code = data.get("editors", "")
        # If it's a list of strings, join them
        if isinstance(code, list):
            code = "\n".join(code)
        
        # --- Python analysis ---
        analysis_text = f"Total characters: {len(code)}\nLines: {len(code.splitlines())}"
        # You can replace this with any custom analysis
        
        response = {"analysis": analysis_text}
        self.wfile.write(json.dumps(response).encode("utf-8"))

        # # editors = data.get("editors", [])
        # editors = data.get("editors", "")
        # # Run your "analysis" here (right now just echo back)
        # result = f"Analysis complete: received {len((data.get('editors','')))} editor(s)"
        # print("Length of received text:", len(editors))

        # response = {"analysis": result}
        # self.wfile.write(json.dumps(response).encode("utf-8"))

if __name__ == "__main__":
    server = HTTPServer(("localhost", 8765), Handler)
    print("Python server running on http://localhost:8765")
    server.serve_forever()
