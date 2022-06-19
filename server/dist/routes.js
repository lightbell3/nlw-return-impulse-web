"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mailprovider_1 = require("./providers/nodemailer-mailprovider");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
const submit_feedback_use_case_1 = require("./use-cases/submit-feedback-use-case");
exports.routes = express_1.default.Router();
exports.routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedBackRepository = new prisma_feedbacks_repository_1.PrismFeedbacksRepository();
    const nodemailerProvider = new nodemailer_mailprovider_1.NodemailerMailProvider();
    const submitfeedbackUseCase = new submit_feedback_use_case_1.SubmitFeedbackUseCase(prismaFeedBackRepository, nodemailerProvider);
    await submitfeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    });
    return res.status(201).send();
});
