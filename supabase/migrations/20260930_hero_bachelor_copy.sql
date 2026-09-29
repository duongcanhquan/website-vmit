-- Homepage banner: "CHƯƠNG TRÌNH CỬ NHÂN ANH QUỐC" / "Lộ trình tới TOP 1% đại học Quốc tế."
-- Benefits block eyebrow: "CHƯƠNG TRÌNH HỌC THỰC HÀNH".
-- Only rewrites earlier default values, so custom text set in /admin/cai-dat is kept.

update public.site_settings
set value = '{"vi":"CHƯƠNG TRÌNH CỬ NHÂN ANH QUỐC","en":"UK BACHELOR''S DEGREE PROGRAMME"}', updated_at = now()
where key = 'hero_headline'
  and (
    value ->> 'vi' in ('Học mọi thứ', 'CỬ NHÂN THỰC HÀNH ANH QUỐC')
    or value ->> 'en' in ('Learn anything', 'UK PRACTICE-BASED BACHELOR', 'UK PRACTICE-BASED BACHELOR''S DEGREE')
  );

update public.site_settings
set value = '{"vi":"Lộ trình tới TOP 1% đại học Quốc tế.","en":"Your pathway to the TOP 1% of international universities."}',
    updated_at = now()
where key = 'hero_support'
  and (
    value ->> 'vi' in (
      'Cử nhân thực hành Anh Quốc ngay tại Việt Nam.',
      'Chương trình học từ Anh với lộ trình học đa dạng và thực tiễn.'
    )
    or value ->> 'en' in (
      'A UK practice-based bachelor pathway in Vietnam.',
      'UK-designed programmes with diverse, practical learning pathways.',
      'UK programmes with diverse, practical learning pathways.'
    )
  );

update public.site_settings
set value = '{"vi":"CHƯƠNG TRÌNH HỌC THỰC HÀNH","en":"PRACTICE-BASED LEARNING PROGRAMME"}', updated_at = now()
where key = 'home_benefits_eyebrow' and value ->> 'vi' = 'Chương trình học tập độc đáo';