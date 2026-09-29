-- English copy-edit for values stored in the database (header badge, counters band, pillars).
-- Each update only touches rows that still hold the previous default wording, so edits made in /admin are kept.

update public.site_settings
set value = '{"vi":"PEARSON APPROVED CENTRE","en":"PEARSON APPROVED CENTRE"}', updated_at = now()
where key = 'accreditation_badge'
  and (value #>> '{}' ilike '%PERSON APPROVED%' or value ->> 'vi' ilike '%PERSON APPROVED%' or value ->> 'en' ilike '%PERSON APPROVED%');

update public.impact_counters set label_en = 'formal qualifications', updated_at = now()
where label_en in ('recognised awards', 'recognized awards');

update public.impact_counters set label_en = 'savings on study costs', updated_at = now()
where label_en = 'cost efficiency';

update public.impact_counters set label_en = 'partner universities for transfer', updated_at = now()
where label_en = 'transfer universities';

update public.pillars set title_en = 'International progression', updated_at = now()
where title_en = 'International bridge';

update public.pillars
set description_en = '2+1 / 2+2 transfer to Keiser University (USA) and universities in the UK and Australia.', updated_at = now()
where description_en = '2+1 / 2+2 progression to Keiser (USA), the UK and Australia.';

update public.pillars set title_en = 'Careers with FDI companies', updated_at = now()
where title_en = 'FDI career outcomes';

update public.pillars
set description_en = 'Committed career guidance linked to our partner companies.', updated_at = now()
where description_en = 'Career guidance connected to partner enterprises.';
