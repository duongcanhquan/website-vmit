# VMIT Website

Website tuyển sinh **VMIT** — Next.js App Router · TypeScript · Tailwind · brand VMIT.

## Local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Env

Copy `.env.example` → `.env.local` (không commit secrets).  
Supabase + R2: xem docs trong monorepo workspace / `SETUP_CREDENTIALS.local.md`.

## Deploy

Repo: [duongcanhquan/website-vmit](https://github.com/duongcanhquan/website-vmit) → Vercel (Root Directory = `.`).

## Routes

| Path | Trang |
|------|--------|
| `/` | Trang chủ |
| `/ve-vmit` | Về VMIT |
| `/chuong-trinh` | Chương trình |
| `/lo-trinh` | Lộ trình & bằng cấp |
| `/hoc-phi` | Học phí & học bổng |
| `/xet-tuyen` | Cổng xét tuyển |
