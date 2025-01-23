import cv2
import numpy as np
from pymongo import MongoClient
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity

# Load pre-trained face detection model
prototxt_path = 'models/deploy.prototxt'
model_path = 'models/res10_300x300_ssd_iter_140000.caffemodel'
face_net = cv2.dnn.readNet(model_path, prototxt_path)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["test"]
users_collection = db["users"]
attendance_collection = db["attendances"]

# Face detection function
def detect_face(frame):
    height, width = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104, 177, 123))
    face_net.setInput(blob)
    detections = face_net.forward()

    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.6:  # Increased confidence threshold
            box = detections[0, 0, i, 3:7] * np.array([width, height, width, height])
            (startX, startY, endX, endY) = box.astype("int")
            
            # Ensure bounding box is within frame
            startX, startY, endX, endY = max(0, startX), max(0, startY), min(width, endX), min(height, endY)
            
            face = frame[startY:endY, startX:endX]
            return face, (startX, startY, endX, endY)
    
    return None, None

# Capture face from webcam
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

# Normalize image
def preprocess_face(face):
    face_resized = cv2.resize(face, (200, 200))  # Resize to consistent size
    gray_face = cv2.cvtColor(face_resized, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    gray_face = cv2.equalizeHist(gray_face)  # Histogram equalization for contrast
    return gray_face.flatten().tolist()  # Flatten to 1D array

# Register face
def register_face(user_email):
    user = users_collection.find_one({"email": user_email})
    if not user:
        print("[ERROR] User not found in database!")
        return

    print("[INFO] Capturing face for registration...")
    frame = capture_face()
    face, bbox = detect_face(frame)

    if face is None:
        print("[ERROR] No face detected! Try again.")
        return

    face_features = preprocess_face(face)
    
    # Store in MongoDB
    users_collection.update_one(
        {"email": user_email},
        {"$set": {"faceData": face_features}}
    )
    
    print("[SUCCESS] Face registered successfully!")

# Verify face
def verify_face(user_email):
    user = users_collection.find_one({"email": user_email})
    if not user or "faceData" not in user:
        print("[ERROR] No face data found! Register first.")
        return

    stored_features = np.array(user["faceData"]).reshape(1, -1)  # Reshape for comparison

    print("[INFO] Capturing face for verification...")
    frame = capture_face()
    face, bbox = detect_face(frame)

    if face is None:
        print("[ERROR] No face detected! Try again.")
        return

    if bbox:
        (startX, startY, endX, endY) = bbox
        cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)
        cv2.imshow("Detected Face", frame)
        cv2.waitKey(2000)
        cv2.destroyAllWindows()

    current_features = np.array(preprocess_face(face)).reshape(1, -1)

    # Cosine similarity for better matching
    similarity = cosine_similarity(stored_features, current_features)[0][0]

    print(f"Similarity Score: {similarity:.2f}")

    if similarity > 0.75:  # More reliable threshold
        today = datetime.now().date()
        attendance_collection.update_one(
            {"user": user["_id"], "date": today.isoformat()},  # Convert date to string
            {"$set": {"status": "present", "faceVerified": True, "date": today.isoformat()}},
            upsert=True
        )
        print(f"[SUCCESS] Face Matched! Similarity: {similarity:.2f}")
    else:
        print(f"[ERROR] Face did not match! Similarity: {similarity:.2f}")
# Menu
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
