import app from "./app.js";
import connectToDB from "./config/db.js";
const PORT=process.env.PORT || 1000


app.listen(PORT,async()=>{
    console.log(`http://localhost:${PORT}`)
    await connectToDB()
})
