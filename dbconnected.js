mongoose.connect(process.env.DBurl)
.then(() => console.log("✅ DB Connected"))
.catch(err => console.log("❌ DB Error:", err.message));
