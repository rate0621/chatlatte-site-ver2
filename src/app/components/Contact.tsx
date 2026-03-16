"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("必須項目を入力してください");
      return;
    }

    // Validate email format
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
              text: "📩 新しいお問い合わせ",
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
              text: `*お問い合わせ内容*\n${formData.message}`,
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

      toast.success("お問い合わせを受け付けました。ありがとうございます！");

      setFormData({
        name: "",
        company: "",
        email: "",
        message: "",
      });
    } catch {
      toast.error("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#f7fafa]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#4a5568] mb-6 text-center">
          お問い合わせ
        </h2>

        <p className="text-lg text-[#6b7280] text-center mb-12 leading-relaxed">
          「こんなこと頼めるのかな？」という段階でも大丈夫です。<br />
          課題の整理からお手伝いできますので、お気軽にご連絡ください。
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-[#e0eeec]">
          <div className="space-y-2">
            <Label htmlFor="name">
              お名前 <span className="text-[#d09999]">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border-[#e0eeec] focus:border-[#5BBFB3] focus:ring-[#5BBFB3]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">会社名</Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-lg border-[#e0eeec] focus:border-[#5BBFB3] focus:ring-[#5BBFB3]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              メールアドレス <span className="text-[#d09999]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border-[#e0eeec] focus:border-[#5BBFB3] focus:ring-[#5BBFB3]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              お問い合わせ内容 <span className="text-[#d09999]">*</span>
            </Label>
            <Textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full resize-none rounded-lg border-[#e0eeec] focus:border-[#5BBFB3] focus:ring-[#5BBFB3]"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-[#5BBFB3] hover:bg-[#4AA99E] text-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#6b7280] mb-3">Xからのお問い合わせもお待ちしております</p>
          <a
            href="https://x.com/chatrate0621"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#5BBFB3] hover:text-[#4AA99E] font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @chatrate0621
          </a>
        </div>
      </div>
    </section>
  );
}
