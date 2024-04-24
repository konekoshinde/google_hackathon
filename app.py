import numpy as np
import pandas as pd
import joblib as joblib
from xgboost import XGBClassifier
from flask import Flask, request, jsonify
app = Flask(__name__)

def ValuePredictor(t):
    reg = joblib.load('C:\\Users\\konek\\Desktop\\google_hackathon\\myproject\\.venv\\model\\model.joblib')
    a=np.array([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]])
    for i in t:
        a[0][i]=1
    a=pd.DataFrame(a,columns=['skin',' continuous_sneezing', ' blurred_and_distorted_vision',' cramps', ' pain_during_bowel_movements','shivering','low appetite/weight loss','urine issues',' depression',' stomach_pain', ' acidity',' vomiting',' chest_pain',' yellowish_skin',' passage_of_gases',' indigestion',' high_fever',' irregular_sugar_level',' sunken_eyes',' diarrhoea',' breathlessness',' headache',' nausea',' stiff_neck',' back_pain',' muscle_pain',' neck_pain',' joint_pain',' muscle_weakness',' knee_pain',' lack_of_concentration',' anxiety',' mild_fever',' cough',' obesity',' constipation',' fast_heart_rate'])
    predictions = reg.predict(a)
    return predictions

@app.route("/model",methods=['POST'])
def hello_world():
    if request.method == 'POST':
        t=request.get_json()
        
        result=ValuePredictor(t['symptoms'])
        return jsonify({"result":str(result[0])})
        
if __name__ == '__main__':
    app.run(debug=True, port=80)