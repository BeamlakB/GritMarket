from flask import Flask, request, jsonify,render_template
from Project import create_app

#app = Flask(__name__)
app = create_app()
@app.route('/', methods=['Get'])
def home():
    return render_template ("index.html")

@app.route('/AvoidScams.html', methods=['Get'])
def about():
    return render_template ("AvoidScams.html")

@app.route('/Support.html', methods=['Get'])
def support():
    return render_template ("Support.html")

@app.route('/FrequentlyAskedQuestions.html', methods=['Get'])
def FrequentlyAskedQuestions():
    return render_template ("FrequentlyAskedQuestions.html")

@app.route('/PersonalSafetyTips.html', methods=['Get'])
def Safteytips():
    return render_template ("PersonalSafetyTips.html")
if __name__ == '__main__':
    app.run (debug=True)