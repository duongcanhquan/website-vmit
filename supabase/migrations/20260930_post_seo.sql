-- SEO fields for published news articles. Site-wide SEO lives in site_settings.

alter table public.posts
  add column if not exists seo_title_vi text,
  add column if not exists seo_title_en text,
  add column if not exists seo_description_vi text,
  add column if not exists seo_description_en text;
