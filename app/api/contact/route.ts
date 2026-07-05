import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "お名前を入力してください").max(100),
  company: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email("有効なメールアドレスを入力してください").max(254),
  message: z.string().trim().min(1, "ご相談内容を入力してください").max(5000),
  // honeypot：人間には見えないフィールド。値が入っていたらボット
  website: z.string().optional().default(""),
});

function buildSlackMessage(data: z.infer<typeof contactSchema>) {
  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📩 新しいご相談",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*お名前*\n${data.name}` },
          { type: "mrkdwn", text: `*会社名*\n${data.company || "（未入力）"}` },
        ],
      },
      {
        type: "section",
        fields: [{ type: "mrkdwn", text: `*メールアドレス*\n${data.email}` }],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*ご相談内容*\n${data.message}`,
        },
      },
    ],
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "リクエスト形式が不正です" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "入力内容を確認してください";
    return NextResponse.json(
      { success: false, error: firstError },
      { status: 400 }
    );
  }

  // ボットには成功を装って何もしない
  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("SLACK_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { success: false, error: "送信設定が完了していません" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildSlackMessage(parsed.data)),
    });

    if (!response.ok) {
      console.error("Slack webhook returned", response.status);
      return NextResponse.json(
        { success: false, error: "送信に失敗しました。時間をおいて再度お試しください" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Slack webhook request failed:", error);
    return NextResponse.json(
      { success: false, error: "送信に失敗しました。時間をおいて再度お試しください" },
      { status: 502 }
    );
  }
}
