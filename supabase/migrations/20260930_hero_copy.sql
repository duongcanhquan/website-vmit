-- Homepage hero copy: "CỬ NHÂN THỰC HÀNH ANH QUỐC", CTA "Nhận học bổng" (opens scholarship popup) + "Chương trình học".
-- Only rewrites values that still hold the previous defaults, so later edits made in /admin/cai-dat are kept.

update public.site_settings
set value = '"#hoc-bong"', updated_at = now()
where key = 'hero_cta_primary_href'
  and value #>> '{}' in ('/xet-tuyen', '/apply')
  and exists (
    select 1 from public.site_settings
    where key = 'hero_cta_primary_label' and value ->> 'vi' = 'Bắt đầu ngay'
  );

update public.site_settings
set value = '{"vi":"Nhận học bổng","en":"Get a scholarship"}', updated_at = now()
where key = 'hero_cta_primary_label' and value ->> 'vi' = 'Bắt đầu ngay';

update public.site_settings
set value = '{"vi":"CỬ NHÂN THỰC HÀNH ANH QUỐC","en":"UK PRACTICE-BASED BACHELOR"}', updated_at = now()
where key = 'hero_headline' and value ->> 'vi' = 'Học mọi thứ';

update public.site_settings
set value = '{"vi":"Chương trình học từ Anh với lộ trình học đa dạng và thực tiễn.","en":"UK-designed programmes with diverse, practical learning pathways."}',
    updated_at = now()
where key = 'hero_support' and value ->> 'vi' = 'Cử nhân thực hành Anh Quốc ngay tại Việt Nam.';

update public.site_settings
set value = '{"vi":"Chương trình học","en":"Programmes"}', updated_at = now()
where key = 'hero_cta_secondary_label' and value ->> 'vi' = 'Xem chương trình';

update public.site_settings
set value = '"/programs"', updated_at = now()
where key = 'hero_cta_secondary_href' and value #>> '{}' = '/chuong-trinh';

-- Third link used to duplicate the scholarship popup; point it at the admissions page instead.
update public.site_settings
set value = '"/apply"', updated_at = now()
where key = 'hero_cta_tertiary_href'
  and value #>> '{}' in ('#hoc-bong', '#scholarship')
  and exists (
    select 1 from public.site_settings
    where key = 'hero_cta_tertiary_label' and value ->> 'vi' = 'Nhận học bổng'
  );

update public.site_settings
set value = '{"vi":"Cổng xét tuyển","en":"Admissions portal"}', updated_at = now()
where key = 'hero_cta_tertiary_label' and value ->> 'vi' = 'Nhận học bổng';