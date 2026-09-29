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

-- Drop "APC" and the "Hanoi" suffix from the college name everywhere it is stored.
update public.pathway_steps
set note_vi = replace(note_vi, 'Song bằng VMIT · APC', 'Song bằng Cao đẳng chính quy · Pearson'),
    note_en = replace(replace(note_en, 'VMIT · APC dual award', 'Dual award · College diploma · Pearson'),
                      'Dual award · VMIT · APC', 'Dual award · College diploma · Pearson'),
    updated_at = now()
where note_vi like '%APC%' or note_en like '%APC%';

update public.pathway_steps
set title_vi = regexp_replace(replace(title_vi, ' · APC', ''), '\s*\mAPC\M', '', 'g'),
    title_en = regexp_replace(replace(title_en, ' · APC', ''), '\s*\mAPC\M', '', 'g'),
    note_vi = regexp_replace(replace(note_vi, ' · APC', ''), '\s*\mAPC\M', '', 'g'),
    note_en = regexp_replace(replace(note_en, ' · APC', ''), '\s*\mAPC\M', '', 'g'),
    updated_at = now()
where title_vi like '%APC%' or title_en like '%APC%' or note_vi like '%APC%' or note_en like '%APC%';

update public.pillars
set description_vi = regexp_replace(description_vi, '\s*\mAPC\M', '', 'g'),
    description_en = regexp_replace(description_en, '\s*\mAPC\M', '', 'g'),
    updated_at = now()
where description_vi like '%APC%' or description_en like '%APC%';

update public.site_settings
set value = replace(replace(regexp_replace(replace(value::text, ' · APC', ''), '\s*\mAPC\M', '', 'g'),
                            'Việt Mỹ Hà Nội', 'Việt Mỹ'),
                    'Viet My College Hanoi', 'Viet My College')::jsonb,
    updated_at = now()
where value::text like '%APC%' or value::text like '%Việt Mỹ Hà Nội%' or value::text like '%College Hanoi%';
