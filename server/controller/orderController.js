const TELEGRAM_API = "https://api.telegram.org";

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function formatOrderMessage({ name, phone, productName, article, quantity, comment }) {
    const lines = [
        "<b>Новый заказ</b>",
        "",
        `<b>Имя:</b> ${escapeHtml(name)}`,
        `<b>Телефон:</b> ${escapeHtml(phone)}`,
        `<b>Товар:</b> ${escapeHtml(productName)}`,
        `<b>Артикул:</b> ${escapeHtml(article)}`,
        `<b>Количество:</b> ${quantity}`,
    ];

    if (comment) {
        lines.push(`<b>Комментарий:</b> ${escapeHtml(comment)}`);
    }

    return lines.join("\n");
}

function readOrder(body) {
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const productName = typeof body?.productName === "string" ? body.productName.trim() : "";
    const article = typeof body?.article === "string" ? body.article.trim() : "";
    const comment = typeof body?.comment === "string" ? body.comment.trim() : "";
    const quantity = Number(body?.quantity);

    if (!name) {
        return { error: "Укажите имя" };
    }
    if (!phone) {
        return { error: "Укажите телефон" };
    }
    if (!productName) {
        return { error: "Укажите товар" };
    }
    if (!article) {
        return { error: "Укажите артикул" };
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
        return { error: "Укажите количество больше 0" };
    }

    return {
        order: { name, phone, productName, article, quantity, comment },
    };
}

export const sendOrder = async (req, res) => {
    const parsed = readOrder(req.body);
    if (parsed.error) {
        res.status(400).json({ errorMessage: parsed.error });
        return;
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
        res.status(500).json({ errorMessage: "Telegram не настроен" });
        return;
    }

    try {
        const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: formatOrderMessage(parsed.order),
                parse_mode: "HTML",
            }),
        });
        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.ok) {
            console.error("Telegram sendMessage failed:", data?.description || response.status);
            res.status(502).json({ errorMessage: "Не удалось отправить заявку в Telegram" });
            return;
        }

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error("Telegram sendMessage failed:", error.message);
        res.status(500).json({ errorMessage: "Не удалось отправить заявку" });
    }
};