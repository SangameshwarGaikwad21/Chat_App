import connectToDB from "./config/db.js";
import { server } from "./utils/socket.js";
const PORT=process.env.PORT || 1000


server.listen(PORT,async()=>{
    console.log(`http://localhost:${PORT}`)
    await connectToDB()
})
