"use client";

import { useState } from "react";
import { Coffee, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";

const assurances = [
  { icon: ShieldCheck, text: "売り込みはしません" },
  { icon: Coffee, text: "課題が曖昧なままでOK" },
  { icon: Clock, text: "1営業日以内に返信します" },
] as const;

const messageTemplates = [
  "毎月の手作業をAIで自動化できるか知りたい",
  "ベンダーの見積もりが妥当か相談したい",
  "技術顧問について話を聞きたい",
  "何から頼めばいいか分からないので、まず話したい",
] as const;

interface ContactForm {
  name: string;
  company: string;
  email: string;
  message: string;
}

const emptyForm: ContactForm = {
  name: "",
  company: "",
  email: "",
  message: "",
};

export function Contact() {
  const [formData, setFormData] = useState({ ...emptyForm });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyTemplate = (template: string) => {
    setFormData({ ...formData, message: template });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // スパムボット対策：不可視フィールドに入力があれば送信せず成功扱い
    if (honeypot) {
      toast.success("お問い合わせを受け付けました。ありがとうございます！");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("必須項目を入力してください");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("有効なメールアドレスを入力してください");
      return;
    }

    const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      toast.error("送信設定が完了していません");
      return;
    }

    setIsSubmitting(true);

    try {
      const slackMessage = {
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
              { type: "mrkdwn", text: `*お名前*\n${formData.name}` },
              { type: "mrkdwn", text: `*会社名*\n${formData.company || "（未入力）"}` },
            ],
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*メールアドレス*\n${formData.email}` },
            ],
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*ご相談内容*\n${formData.message}`,
            },
          },
        ],
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: JSON.stringify(slackMessage),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      toast.success("受け付けました。1営業日以内にメールでご連絡します！");
      setFormData({ ...emptyForm });
    } catch {
      toast.error("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#F6F1E8] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display mb-4 text-center text-2xl font-bold tracking-wide text-[#33261C] md:text-3xl">
          コーヒー1杯分、話しませんか
        </h2>
        <p className="mb-8 text-center leading-loose text-[#6E5B4A]">
          30分の無料相談です。「ちょっと聞いていい？」の温度感で、そのままどうぞ。
        </p>

        {/* 不安解除の3点セット */}
        <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          {assurances.map((assurance) => {
            const Icon = assurance.icon;
            return (
              <div
                key={assurance.text}
                className="flex items-center gap-2 rounded-full border-2 border-[#E4D6C3] bg-[#FFFDF9] px-4 py-2 text-sm text-[#6E5B4A]"
              >
                <Icon className="h-4 w-4 text-[#B37A4C]" />
                {assurance.text}
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border-2 border-[#E4D6C3] bg-[#FFFDF9] p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="name">
              お名前 <span className="text-[#C07A5B]">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border-[#E4D6C3] focus:border-[#B37A4C] focus:ring-[#B37A4C]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">
              会社名 <span className="text-xs text-[#8A7461]">（任意）</span>
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-lg border-[#E4D6C3] focus:border-[#B37A4C] focus:ring-[#B37A4C]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              メールアドレス <span className="text-[#C07A5B]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border-[#E4D6C3] focus:border-[#B37A4C] focus:ring-[#B37A4C]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              ご相談内容 <span className="text-[#C07A5B]">*</span>
            </Label>
            <p className="text-xs leading-relaxed text-[#8A7461]">
              一言で大丈夫です。迷ったら、近いものをタップしてください。
            </p>
            <div className="flex flex-wrap gap-2 pb-1">
              {messageTemplates.map((template) => (
                <button
                  key={template}
                  type="button"
                  onClick={() => applyTemplate(template)}
                  className="cursor-pointer rounded-full border border-[#E4D6C3] bg-[#F6F1E8] px-3 py-1.5 text-xs text-[#6E5B4A] transition-colors hover:border-[#B37A4C] hover:text-[#B37A4C]"
                >
                  {template}
                </button>
              ))}
            </div>
            <Textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full resize-none rounded-lg border-[#E4D6C3] focus:border-[#B37A4C] focus:ring-[#B37A4C]"
            />
          </div>

          {/* honeypot：人間には見えない入力欄。ボットが埋めたら送信しない */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Webサイト</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#33261C] py-6 text-base font-bold text-[#F6F1E8] shadow-md transition-all hover:bg-[#4A382B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "送信中..." : "この内容で相談してみる"}
          </Button>

          <p className="text-center text-xs leading-relaxed text-[#8A7461]">
            送信後の流れ：① 1営業日以内にメールで返信 → ② 日程調整 →
            ③ オンラインで30分相談。合わなければ、それっきりで大丈夫です。
          </p>
        </form>

        {/* まだ相談するほどじゃない人の受け皿 */}
        <div className="mt-10 rounded-3xl border-2 border-dashed border-[#E4D6C3] p-6 text-center">
          <p className="mb-3 text-sm leading-relaxed text-[#6E5B4A]">
            「まだ相談するほどじゃない」という方は、Xで普段の発信をご覧ください。
            <br className="hidden md:block" />
            人柄の確認からで大丈夫です。
          </p>
          <a
            href="https://x.com/chatrate0621"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-[#B37A4C] transition-colors hover:text-[#9A6238]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @chatrate0621 をフォローする
          </a>
        </div>
      </div>
    </section>
  );
}
