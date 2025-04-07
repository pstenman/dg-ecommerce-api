import { Request, Response } from "express";
import axios from "axios";

export const searchGoogle = async (req: Request, res: Response): Promise<any> => {
    const searchText = req.query.q as string;

    if (!searchText) {
        return res.status(400).json({ error: "Invalid character"});
    }

    try {
        const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
            params: {
                q: searchText,
                key: process.env.GOOGLE_API_KEY,
                cx: process.env.GOOGLE_CX
            }    
        })

        if (response.data.items) {
            res.json({ items: response.data.items})
        } else {
            res.status(400).json({ error: "No search results found"});
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error"})
    }
}