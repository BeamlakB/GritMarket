from flask import Flask, request, jsonify,render_template
from Project import create_app

#app = Flask(__name__)
app = create_app()
@app.route('/', methods=['Get'])
def home():
    return render_template ("index.html")

@app.route('/about', methods=['Get'])
def about():
    return jsonify({'message': "About"})

@app.route('/contact', methods=['Get'])
def contact():
    return jsonify({'message': "Contact"})

if __name__ == '__main__':
    app.run (debug=True)