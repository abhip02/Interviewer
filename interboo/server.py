from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class CodeHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')  # <-- this fixes CORS
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_POST(self):
        self._set_headers()
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body)
            print("\n=== Received Code ===")
            for i, code in enumerate(data.get("editors", [])):
                print(f"\nEditor {i}:\n{code}")
        except Exception as e:
            print("Error parsing JSON:", e)

        self.wfile.write(b'OK')

if __name__ == '__main__':
    PORT = 8765
    print(f"🌍 Server listening on http://localhost:{PORT}")
    server = HTTPServer(('localhost', PORT), CodeHandler)
    server.serve_forever()
