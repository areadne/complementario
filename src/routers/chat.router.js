import { Router, response } from "express";
import messagesModel from "../dao/models/messages.model.js"

const router = Router()

router.get("/", async(resq, resp) => {

    const response = await messagesModel.find()
    console.log(response)
    resp.render('chat', {response})

})

export default router