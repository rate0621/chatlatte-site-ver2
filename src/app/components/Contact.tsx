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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Success message (mock submission)
    toast.success("お問い合わせを受け付けました。ありがとうございます！");
    
    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-center">
          Contact
        </h2>
        
        <p className="text-lg text-slate-600 text-center mb-12 leading-relaxed">
          「こんなこと頼めるのかな？」という段階でも大丈夫です。<br />
          課題の整理からお手伝いできますので、お気軽にご連絡ください。
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div className="space-y-2">
            <Label htmlFor="name">
              お名前 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">会社名</Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              メールアドレス <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full resize-none rounded-lg"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            送信する
          </Button>
        </form>
      </div>
    </section>
  );
}