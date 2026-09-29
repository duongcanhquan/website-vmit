-- Top bar badge was saved as "PERSON APPROVED CENTER"; use Pearson's official wording.
-- Only rewrites the misspelt value, so any other text set in /admin/cai-dat is kept.

update public.site_settings
set value = '"PEARSON APPROVED CENTRE"', updated_at = now()
where key = 'accreditation_badge'
  and upper(trim(
    case when jsonb_typeof(value) = 'string' then value #>> '{}' else coalesce(value ->> 'vi', '') end
  )) in ('PERSON APPROVED CENTER', 'PERSON APPROVED CENTRE');
