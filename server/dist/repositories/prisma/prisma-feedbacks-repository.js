"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismFeedbacksRepository = void 0;
const prisma_1 = require("../../services/prisma");
class PrismFeedbacksRepository {
    async create({ type, comment, screenshot }) {
        await prisma_1.prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            },
        });
    }
}
exports.PrismFeedbacksRepository = PrismFeedbacksRepository;
