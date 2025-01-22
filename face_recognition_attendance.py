import os
import site
import sys

# Add the site-packages to path
site_packages = site.getsitepackages()[0]
models_path = os.path.join(site_packages, 'face_recognition_models')
sys.path.append(models_path)

import cv2
import numpy as np
import face_recognition
from pymongo import MongoClient

from datetime import datetime

# 🔹 Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["test"]
users_collection = db["users"]
attendance_collection = db["attendances"]

# 🔹 Open Camera
def capture_face():
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        cv2.imshow('Face Capture - Press "q" to Capture', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    return frame

# 🔹 Extract Face Embeddings
def get_face_encoding(image):
    face_encodings = face_recognition.face_encodings(image)
    return face_encodings[0] if face_encodings else None

# 🔹 Register Face (First-Time Enrollment)
def register_face(user_email):
    user = users_collection.find_one({"email": user_email})
    if not user:
        print("User not found in the database!")
        return

    print("[INFO] Capturing Face for Registration...")
    frame = capture_face()
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    face_encoding = get_face_encoding(frame_rgb)
    if face_encoding is None:
        print("[ERROR] No face detected! Try again.")
        return

    users_collection.update_one(
        {"email": user_email},
        {"$set": {"faceData": face_encoding.tolist()}}
    )
    print("[SUCCESS] Face registered successfully!")

# 🔹 Verify Face & Mark Attendance
def verify_face(user_email):
    user = users_collection.find_one({"email": user_email})
    if not user or "faceData" not in user:
        print("[ERROR] No face data found! Register first.")
        return

    registered_encoding = np.array(user["faceData"])
    
    print("[INFO] Capturing Face for Attendance...")
    frame = capture_face()
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    current_encoding = get_face_encoding(frame_rgb)
    if current_encoding is None:
        print("[ERROR] No face detected! Try again.")
        return

    # 🔹 Compare Faces
    result = face_recognition.compare_faces([registered_encoding], current_encoding, tolerance=0.5)

    if result[0]:  # Face Matched ✅
        today = datetime.now().date()
        attendance_collection.update_one(
            {"user": user["_id"], "date": today},
            {"$set": {"status": "present", "faceVerified": True}},
            upsert=True
        )
        print("[SUCCESS] Face Matched! Attendance Marked ✅")
    else:
        print("[ERROR] Face did not match! ❌")

# 🔹 Main Menu
if __name__ == "__main__":
    print("1. Register Face\n2. Verify Attendance")
    choice = input("Enter choice (1/2): ")

    user_email = input("Enter Employee Email: ")

    if choice == "1":
        register_face(user_email)
    elif choice == "2":
        verify_face(user_email)
    else:
        print("Invalid choice!")
