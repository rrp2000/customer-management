import express from "express"
import * as customerController from "../controllers/customerController.js"
import * as cardController from "../controllers/cardController.js"

const router = express.Router()

router.post("/customer",customerController.createCustomer)
router.get("/customer", customerController.getCustomers)
router.delete("/customer/:id", customerController.deleteCustomer) 


router.post("/card", cardController.createCard)
router.get("/card", cardController.getCards)

export default router

