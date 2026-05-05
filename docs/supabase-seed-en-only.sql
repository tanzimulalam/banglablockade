-- Bangla Blockade seed data (ENGLISH ONLY)
-- Compatible with schema:
-- articles, article_localizations, article_paragraphs, article_methodology,
-- article_evidence, article_sources, pages, page_localizations

-- Optional cleanup
delete from public.article_sources;
delete from public.article_evidence;
delete from public.article_methodology;
delete from public.article_paragraphs;
delete from public.article_localizations;
delete from public.articles;
delete from public.page_localizations;
delete from public.pages;

-- Pages (English only)
insert into public.pages (slug, is_published) values
  ('about', true),
  ('contact', true);

insert into public.page_localizations (page_id, lang, title, description, body)
values
  (
    (select id from public.pages where slug = 'about'),
    'en',
    'About Us',
    'Bangla Blockade is an investigative media outlet focused on transparent reporting.',
    'Bangla Blockade is an investigative media outlet focused on verifying public claims with transparent evidence, sources, and context.'
  ),
  (
    (select id from public.pages where slug = 'contact'),
    'en',
    'Contact',
    'Write to us for tips, verification requests, or partnership inquiries.',
    'Use the contact form to submit tips, verification requests, partnership inquiries, and public-interest leads.'
  );

-- Articles
insert into public.articles
  (slug, category, image_url, verdict, claim_origin_en, claim_origin_bn, published_at, is_published)
values
  ('student-movement-gains-momentum', 'Digital Investigation', '/brand/logo-full.png', null, null, null, '2026-04-20', true),
  ('misinformation-campaign-targets-national-unity', 'Fact Check', '/brand/logo-mark.png', 'False',
   'Facebook posts and copied image cards shared in local groups', null, '2026-04-18', true),
  ('new-dawn-ideology-of-bangla-blockade', 'Opinion', '/brand/logo-mark.png', null, null, null, '2026-04-16', true),
  ('streets-to-digital-platforms-evolution-of-protest', 'Current Affairs', '/brand/logo-mark.png', null, null, null, '2026-04-14', true),
  ('voices-of-youth-stand-against-injustice', 'Opinion', '/brand/logo-mark.png', null, null, null, '2026-04-12', true),
  ('citizens-recording-truth-during-crisis', 'Digital Investigation', '/brand/logo-circle.png', null, null, null, '2026-04-10', true);

-- Article localizations (English only)
insert into public.article_localizations (article_id, lang, title, excerpt, author_name, conclusion)
values
  ((select id from public.articles where slug='student-movement-gains-momentum'),'en',
   'Student Movement Gains Momentum Across Bangladesh',
   'Campus coalitions are now coordinating nationwide actions for policy reform and accountability.',
   'Editorial Desk',
   null),

  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',
   'Misinformation Campaign Targets National Unity',
   'A coordinated network of pages reused fabricated visuals to frame false narratives.',
   'Verification Unit',
   'The campaign relied on manipulated context and edited visuals to spread a false narrative.'),

  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'en',
   'A New Dawn: The Ideology of Bangla Blockade',
   'The movement defines dignity, unity, and sacrifice as its non-negotiable political ethics.',
   'Opinion Board',
   null),

  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'en',
   'From Streets to Digital Platforms: The Evolution of Protest',
   'Youth organizers are combining offline mobilization with encrypted communities and open-source monitoring.',
   'Current Affairs Desk',
   null),

  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'en',
   'Voices of the Youth: Why We Stand Against Injustice',
   'A generation-wide call for dignity and fairness is reshaping the civic language of resistance.',
   'Community Voices',
   null),

  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'en',
   'Citizens Recording Truth During Crisis',
   'Open-source documentation by volunteers is preserving critical timelines and public evidence.',
   'Research Desk',
   null);

-- Paragraphs (English only)
insert into public.article_paragraphs (article_id, lang, sort_order, body)
values
  ((select id from public.articles where slug='student-movement-gains-momentum'),'en',1,'Student alliances in multiple districts have established synchronized protest calendars and digital communication hubs.'),
  ((select id from public.articles where slug='student-movement-gains-momentum'),'en',2,'Organizers say their strategy focuses on disciplined civic resistance, legal awareness, and transparent demands.'),

  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',1,'Our review found repeated use of out-of-context images and edited headlines shared in short intervals.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',2,'Fact-checking teams verified source archives and geolocation clues to debunk each major claim.'),

  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'en',1,'Bangla Blockade positions itself as a civic movement rooted in constitutional rights and social solidarity.'),
  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'en',2,'Its vision links national identity with inclusive justice and equal access to opportunity.'),

  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'en',1,'Digital tools have expanded the speed and reach of collective action without replacing physical participation.'),
  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'en',2,'Activists stress that secure communication and media literacy remain essential for long-term resilience.'),

  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'en',1,'Interviews across public universities reveal shared concerns over equity, accountability, and democratic participation.'),
  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'en',2,'Participants describe solidarity as both emotional strength and a strategic framework.'),

  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'en',1,'Field volunteers are cataloging witness videos, statements, and local reports in a verifiable archive.'),
  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'en',2,'The initiative aims to prevent historical erasure and support future accountability processes.');

-- Fact-check details (English only)
insert into public.article_methodology (article_id, lang, sort_order, item)
values
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',1,'We traced the first upload timestamps and compared versions across archives.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',2,'Two independent experts reviewed location clues and editing artifacts.');

insert into public.article_evidence (article_id, lang, sort_order, item)
values
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',1,'Original photo predates the claimed event by 18 months and was captured in another district.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',2,'Headline text was digitally altered; metadata indicates post-production edits.');

insert into public.article_sources (article_id, label, url, sort_order)
values
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'Reverse Image Trace Archive','https://example.com/source-archive',1),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'Expert Interview Notes','https://example.com/expert-notes',2),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'Platform Transparency Report','https://example.com/transparency-report',3);
