import express  from "express"
import { searchGoogle } from "../controllers/searchController"
const router = express.Router()

router.get("/search", searchGoogle)

export default router;