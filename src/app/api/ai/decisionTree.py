import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
import pickle


data = pd.read_csv("training_data.csv")
data['Sex_en'] = LabelEncoder().fit_transform(data['Sex'])
data['ChestPainType_en'] = LabelEncoder().fit_transform(data['ChestPainType'])
data['ST_Slope_en'] = LabelEncoder().fit_transform(data['ST_Slope'])
data.head()

def Create_HeartAttack_Model(criterion='gini', max_depth=5):
    X = data.drop('HeartDisease', axis=1)

    X = X[[ 
        'Age', 
        'Sex_en', 
        'ChestPainType_en', 
        'Cholesterol', 
        'FastingBS', 
        'MaxHR', 
        'Oldpeak', 
        'ST_Slope_en' 
    ]]
    y = data['HeartDisease']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    DT_model = DecisionTreeClassifier(criterion=criterion, max_depth=max_depth)

    DT_model.fit(X_train, y_train)

    y_pred = DT_model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy:.4f}")
    return DT_model


model = Create_HeartAttack_Model(max_depth=5)

with open('heart_attack_model.pkl', 'wb') as file:
    pickle.dump(model, file)