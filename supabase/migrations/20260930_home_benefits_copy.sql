-- Homepage "benefits" block, counters band and pillar 1 copy.
-- Only rewrites values that still hold the previous wording, so edits made in /admin are kept. Safe to run twice.

-- Benefits heading (only if someone saved the old defaults in /admin/trang-chu)
update public.site_settings
set value = '{"vi":"Chương trình học tập độc đáo","en":"A distinctive learning programme"}', updated_at = now()
where key = 'home_benefits_eyebrow' and value ->> 'vi' in ('Học mọi thứ', 'Cử nhân thực hành Anh Quốc');

update public.site_settings
set value = '{"vi":"CÁC LỢI ÍCH KHI HỌC TẠI VIỆT MỸ","en":"BENEFITS OF STUDYING AT VIET MY"}', updated_at = now()
where key = 'home_benefits_title' and value ->> 'vi' = 'Lợi ích học tập tại VMIT';

-- Benefit cards saved from /admin/trang-chu
update public.site_settings
set value = replace(replace(replace(replace(value::text,
      'Cao đẳng Quốc gia APC', 'Cao đẳng chính quy'),
      'the national APC college award', 'a formal college diploma'),
      'Giảng viên thực chiến và mạng lưới doanh nghiệp FDI đồng hành tới việc làm.',
      'Hệ thống giảng viên và mạng lưới doanh nghiệp FDI đồng hành từ đào tạo tới việc làm.'),
      'Practitioner tutors and an FDI employer network toward employability.',
      'Our faculty and FDI employer network support you from training through to employment.')::jsonb,
    updated_at = now()
where key = 'home_benefits';

-- Counters band
update public.impact_counters
set label_vi = 'giới thiệu việc làm sau tốt nghiệp', label_en = 'job referrals after graduation', updated_at = now()
where label_vi = 'cam kết việc làm FDI';

insert into public.impact_counters (value_text, label_vi, label_en, sort_order, is_published)
select '+200', 'trường học chuyển tiếp', 'transfer universities',
       coalesce((select max(sort_order) from public.impact_counters), 0) + 1, true
where not exists (select 1 from public.impact_counters where value_text = '+200');

-- Pillar 1 (dual award)
update public.pillars
set description_vi = replace(description_vi, 'Cao đẳng Quốc gia APC', 'Cao đẳng chính quy'),
    description_en = replace(description_en, 'the national APC college award', 'a formal college diploma'),
    updated_at = now()
where description_vi like '%Cao đẳng Quốc gia APC%' or description_en like '%national APC college award%';

do $$
declare
  chips_type text;
begin
  select data_type into chips_type
  from information_schema.columns
  where table_schema = 'public' and table_name = 'pillars' and column_name = 'chips';

  if chips_type in ('json', 'jsonb') then
    execute format(
      $f$update public.pillars
         set chips = replace(replace(chips::text, 'Bằng Cao đẳng Quốc gia APC', 'Bằng Cao đẳng chính quy'),
                             'National APC college award', 'Formal college diploma')::%s
         where chips::text like '%%APC%%'$f$,
      chips_type
    );
  end if;
end $$;
