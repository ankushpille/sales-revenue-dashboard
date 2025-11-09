const app = require('./app');
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://ankushpille2_db_user:apSrgX85vFyoG2UR@cluster0.l4a3yxm.mongodb.net/?appName=Cluster0"; // <-- paste here

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch(err => console.log("❌ MongoDB Error:", err));
