"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUseCase = void 0;
class SubmitFeedbackUseCase {
    constructor(feedbacksRepository, mailProvider) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailProvider = mailProvider;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });
        if (!type) {
            throw new Error("Type is required");
        }
        if (!comment) {
            throw new Error("Comment is required");
        }
        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot format");
        }
        await this.mailProvider.sendMail({
            subject: "Feedback",
            body: [
                `<p>Tipo do Feedback: ${type}`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : '',
            ].join("\n"),
        });
    }
}
exports.SubmitFeedbackUseCase = SubmitFeedbackUseCase;
