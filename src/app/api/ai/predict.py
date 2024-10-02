import pickle
import pandas as pd
import sys
import json
    
def predict_heartattack(data_input):
    input_data = pd.DataFrame({
        "Age": [data_input[0]], 
        "Sex_en": [data_input[1]], 
        "ChestPainType_en": [data_input[2]], 
        "Cholesterol": [data_input[3]], 
        "FastingBS": [data_input[4]], 
        "MaxHR": [data_input[5]], 
        "Oldpeak": [data_input[6]], 
        "ST_Slope_en": [data_input[7]]
    })

    heartattack_model = pickle.load(open('src/app/api/ai/heart_attack_model_b.pkl', 'rb'))
    predicted_class = heartattack_model.predict(input_data)

    return predicted_class[0]

    
input_data = json.loads(sys.stdin.read())
print(predict_heartattack(input_data))