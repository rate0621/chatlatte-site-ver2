export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly summary: string;
  readonly category: string;
}

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "gtm-guide",
    title: "GTM（Googleタグマネージャー）導入・活用ガイド",
    date: "2026-02-20",
    summary: "Googleタグマネージャーの基本的な導入方法から、実践的な活用テクニックまでを解説します。タグ管理を効率化し、マーケティング施策をスムーズに運用するためのポイントを紹介します。",
    category: "マーケティング",
  },
  {
    slug: "ga4-setup",
    title: "GA4の基本設定と活用ポイント",
    date: "2026-02-18",
    summary: "Googleアナリティクス4の初期設定から、データ分析に活かすための設定ポイントまでを解説します。イベントベースの計測モデルを理解し、サイト改善に役立てましょう。",
    category: "マーケティング",
  },
  {
    slug: "dx-for-small-business",
    title: "中小企業のDX推進ガイド",
    date: "2026-02-15",
    summary: "中小企業がDXを推進するためのステップと、よくある課題への対処法を解説します。限られたリソースで最大の効果を得るための実践的なアプローチを紹介します。",
    category: "DX推進",
  },
  {
    slug: "no-code-tools",
    title: "ノーコード・ローコードツール比較と選び方",
    date: "2026-02-13",
    summary: "代表的なノーコード・ローコードツールの特徴を比較し、業務内容や目的に応じた選び方のポイントを解説します。開発コストを抑えながらシステム構築を実現する方法を紹介します。",
    category: "ツール活用",
  },
  {
    slug: "website-improvement",
    title: "Webサイト運用改善チェックリスト",
    date: "2026-02-10",
    summary: "Webサイトの運用品質を向上させるためのチェックリストを紹介します。表示速度・SEO・ユーザビリティの観点から、見落としがちな改善ポイントを網羅的に解説します。",
    category: "Web運用",
  },
  {
    slug: "marketing-foundation",
    title: "マーケティング基盤構築の進め方",
    date: "2026-02-08",
    summary: "効果的なマーケティング活動のための基盤づくりについて解説します。データ収集・分析・施策実行のサイクルを回すための仕組みと、導入時の注意点を紹介します。",
    category: "マーケティング",
  },
  {
    slug: "ai-business-tools",
    title: "AIツールを活用した業務改善の実践法",
    date: "2026-02-05",
    summary: "ChatGPTをはじめとするAIツールを業務で活用するための実践的な方法を紹介します。文書作成・データ整理・カスタマーサポートなど、具体的なユースケースと導入のコツを解説します。",
    category: "AI活用",
  },
  {
    slug: "sql-basics",
    title: "データ分析入門：SQL基礎ガイド",
    date: "2026-02-03",
    summary: "データ分析の第一歩として、SQLの基本的な構文と実践的な使い方を解説します。SELECT文から集計関数まで、ビジネスで使える基礎知識を身につけましょう。",
    category: "データ分析",
  },
  {
    slug: "slack-tips",
    title: "Slack活用術：チーム連携を効率化する方法",
    date: "2026-01-30",
    summary: "Slackをチームコミュニケーションで最大限に活用するためのテクニックを紹介します。チャンネル設計・ワークフロー・連携アプリの活用方法を解説します。",
    category: "ツール活用",
  },
  {
    slug: "project-management",
    title: "フリーランスのプロジェクト管理術",
    date: "2026-01-28",
    summary: "フリーランスが複数のプロジェクトを効率的に管理するための手法を紹介します。タスク管理・スケジューリング・クライアント対応のコツを実践的に解説します。",
    category: "業務効率化",
  },
  {
    slug: "spreadsheet-tips",
    title: "Googleスプレッドシート業務活用テクニック",
    date: "2026-01-25",
    summary: "Googleスプレッドシートを業務で効果的に使うためのテクニックを紹介します。関数・ピボットテーブル・自動化など、生産性を高める活用法を解説します。",
    category: "ツール活用",
  },
  {
    slug: "automation-start",
    title: "業務自動化の始め方：最初の一歩ガイド",
    date: "2026-01-22",
    summary: "業務の自動化をこれから始める方に向けた入門ガイドです。自動化すべき業務の見極め方から、ツールの選定、最初のワークフロー構築までを段階的に解説します。",
    category: "業務効率化",
  },
] as const;
