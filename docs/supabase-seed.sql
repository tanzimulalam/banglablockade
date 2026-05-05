-- Bangla Blockade seed data for schema:
-- articles, article_localizations, article_paragraphs, article_methodology,
-- article_evidence, article_sources, pages, page_localizations

-- Optional: clear old rows first (safe order)
delete from public.article_sources;
delete from public.article_evidence;
delete from public.article_methodology;
delete from public.article_paragraphs;
delete from public.article_localizations;
delete from public.articles;
delete from public.page_localizations;
delete from public.pages;

-- Pages
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
    (select id from public.pages where slug = 'about'),
    'bn',
    'আমাদের সম্পর্কে',
    'বাংলা Blockade একটি অনুসন্ধানী সংবাদমাধ্যম, যার কাজ প্রমাণভিত্তিক প্রতিবেদন প্রকাশ।',
    'বাংলা Blockade একটি অনুসন্ধানী সংবাদমাধ্যম। আমাদের কাজ হলো যাচাইযোগ্য দলিল, তথ্যসূত্র এবং প্রেক্ষাপটসহ জনস্বার্থের দাবি মূল্যায়ন করা।'
  ),
  (
    (select id from public.pages where slug = 'contact'),
    'en',
    'Contact',
    'Write to us for tips, verification requests, or partnership inquiries.',
    'Use the contact form to submit tips, verification requests, partnership inquiries, and public-interest leads.'
  ),
  (
    (select id from public.pages where slug = 'contact'),
    'bn',
    'যোগাযোগ',
    'টিপস, যাচাইয়ের অনুরোধ বা যেকোনো অনুসন্ধানের জন্য আমাদের লিখুন।',
    'যোগাযোগ ফর্ম ব্যবহার করে টিপস, যাচাইয়ের অনুরোধ, পার্টনারশিপ প্রস্তাব এবং জনস্বার্থসংশ্লিষ্ট তথ্য পাঠান।'
  );

-- Articles
insert into public.articles
  (slug, category, image_url, verdict, claim_origin_en, claim_origin_bn, published_at, is_published)
values
  (
    'student-movement-gains-momentum',
    'Digital Investigation',
    '/brand/logo-full.png',
    null,
    null,
    null,
    '2026-04-20',
    true
  ),
  (
    'misinformation-campaign-targets-national-unity',
    'Fact Check',
    '/brand/logo-mark.png',
    'False',
    'Facebook posts and copied image cards shared in local groups',
    'স্থানীয় গ্রুপে শেয়ার হওয়া ফেসবুক পোস্ট ও কপি করা ইমেজ কার্ড',
    '2026-04-18',
    true
  ),
  (
    'new-dawn-ideology-of-bangla-blockade',
    'Opinion',
    '/brand/logo-mark.png',
    null,
    null,
    null,
    '2026-04-16',
    true
  ),
  (
    'streets-to-digital-platforms-evolution-of-protest',
    'Current Affairs',
    '/brand/logo-mark.png',
    null,
    null,
    null,
    '2026-04-14',
    true
  ),
  (
    'voices-of-youth-stand-against-injustice',
    'Opinion',
    '/brand/logo-mark.png',
    null,
    null,
    null,
    '2026-04-12',
    true
  ),
  (
    'citizens-recording-truth-during-crisis',
    'Digital Investigation',
    '/brand/logo-circle.png',
    null,
    null,
    null,
    '2026-04-10',
    true
  );

-- Article localizations
insert into public.article_localizations (article_id, lang, title, excerpt, author_name, conclusion)
values
  ((select id from public.articles where slug='student-movement-gains-momentum'),'en','Student Movement Gains Momentum Across Bangladesh','Campus coalitions are now coordinating nationwide actions for policy reform and accountability.','Editorial Desk',null),
  ((select id from public.articles where slug='student-movement-gains-momentum'),'bn','বাংলাদেশজুড়ে ছাত্র আন্দোলনের গতি বাড়ছে','নীতিগত সংস্কার ও জবাবদিহি নিশ্চিত করতে ক্যাম্পাসভিত্তিক জোটগুলো এখন দেশব্যাপী কর্মসূচি সমন্বয় করছে।','সম্পাদকীয় ডেস্ক',null),

  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en','Misinformation Campaign Targets National Unity','A coordinated network of pages reused fabricated visuals to frame false narratives.','Verification Unit','The campaign relied on manipulated context and edited visuals to spread a false narrative.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'bn','জাতীয় ঐক্যকে লক্ষ্য করে বিভ্রান্তিমূলক প্রচারণা','সমন্বিত কিছু পেজ মিথ্যা বর্ণনা ছড়াতে বিকৃত ভিজ্যুয়াল পুনর্ব্যবহার করেছে।','যাচাই ইউনিট','মিথ্যা বয়ান ছড়াতে এই প্রচারণায় বিকৃত প্রেক্ষাপট ও সম্পাদিত ভিজ্যুয়াল ব্যবহার করা হয়েছে।'),

  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'en','A New Dawn: The Ideology of Bangla Blockade','The movement defines dignity, unity, and sacrifice as its non-negotiable political ethics.','Opinion Board',null),
  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'bn','নতুন ভোর: বাংলা ব্লকেডের আদর্শ','মর্যাদা, ঐক্য ও ত্যাগকে এই আন্দোলন অনড় রাজনৈতিক নৈতিকতা হিসেবে চিহ্নিত করে।','মতামত বোর্ড',null),

  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'en','From Streets to Digital Platforms: The Evolution of Protest','Youth organizers are combining offline mobilization with encrypted communities and open-source monitoring.','Current Affairs Desk',null),
  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'bn','রাজপথ থেকে ডিজিটাল প্ল্যাটফর্ম: প্রতিবাদের বিবর্তন','তরুণ সংগঠকেরা অফলাইন জনমোবিলাইজেশনকে এনক্রিপ্টেড কমিউনিটি ও ওপেন-সোর্স মনিটরিংয়ের সাথে যুক্ত করছেন।','সমসাময়িক ডেস্ক',null),

  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'en','Voices of the Youth: Why We Stand Against Injustice','A generation-wide call for dignity and fairness is reshaping the civic language of resistance.','Community Voices',null),
  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'bn','তরুণদের কণ্ঠ: কেন আমরা অন্যায়ের বিরুদ্ধে','মর্যাদা ও ন্যায্যতার দাবি তরুণ প্রজন্মের প্রতিরোধের ভাষাকে নতুনভাবে নির্মাণ করছে।','জনকণ্ঠ',null),

  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'en','Citizens Recording Truth During Crisis','Open-source documentation by volunteers is preserving critical timelines and public evidence.','Research Desk',null),
  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'bn','সংকটে সত্য লিপিবদ্ধ করছেন নাগরিকরা','স্বেচ্ছাসেবকদের ওপেন-সোর্স ডকুমেন্টেশন গুরুত্বপূর্ণ টাইমলাইন ও জনস্বার্থের প্রমাণ সংরক্ষণ করছে।','গবেষণা ডেস্ক',null);

-- Article paragraphs
insert into public.article_paragraphs (article_id, lang, sort_order, body)
values
  ((select id from public.articles where slug='student-movement-gains-momentum'),'en',1,'Student alliances in multiple districts have established synchronized protest calendars and digital communication hubs.'),
  ((select id from public.articles where slug='student-movement-gains-momentum'),'en',2,'Organizers say their strategy focuses on disciplined civic resistance, legal awareness, and transparent demands.'),
  ((select id from public.articles where slug='student-movement-gains-momentum'),'bn',1,'বিভিন্ন জেলায় ছাত্রজোটগুলো সমন্বিত কর্মসূচির ক্যালেন্ডার ও ডিজিটাল যোগাযোগকেন্দ্র গড়ে তুলেছে।'),
  ((select id from public.articles where slug='student-movement-gains-momentum'),'bn',2,'আয়োজকদের ভাষ্য, তাদের কৌশল শৃঙ্খলাবদ্ধ নাগরিক প্রতিরোধ, আইনগত সচেতনতা ও স্বচ্ছ দাবির ওপর ভিত্তি করে।'),

  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',1,'Our review found repeated use of out-of-context images and edited headlines shared in short intervals.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',2,'Fact-checking teams verified source archives and geolocation clues to debunk each major claim.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'bn',1,'আমাদের পর্যালোচনায় দেখা গেছে, প্রেক্ষাপটহীন ছবি ও সম্পাদিত শিরোনাম অল্প সময়ে বারবার শেয়ার করা হয়েছে।'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'bn',2,'ফ্যাক্ট-চেক টিম সূত্রের আর্কাইভ ও জিওলোকেশন ক্লু যাচাই করে বড় দাবিগুলো খণ্ডন করেছে।'),

  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'en',1,'Bangla Blockade positions itself as a civic movement rooted in constitutional rights and social solidarity.'),
  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'en',2,'Its vision links national identity with inclusive justice and equal access to opportunity.'),
  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'bn',1,'বাংলা ব্লকেড নিজেকে সংবিধানিক অধিকার ও সামাজিক সংহতিতে ভিত্তিক নাগরিক আন্দোলন হিসেবে স্থাপন করে।'),
  ((select id from public.articles where slug='new-dawn-ideology-of-bangla-blockade'),'bn',2,'এর ভিশন জাতীয় পরিচয়কে অন্তর্ভুক্তিমূলক ন্যায়বিচার ও সমান সুযোগের সাথে যুক্ত করে।'),

  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'en',1,'Digital tools have expanded the speed and reach of collective action without replacing physical participation.'),
  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'en',2,'Activists stress that secure communication and media literacy remain essential for long-term resilience.'),
  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'bn',1,'ডিজিটাল টুলসমূহ সরাসরি অংশগ্রহণের বিকল্প না হয়ে সম্মিলিত কর্মসূচির গতি ও পরিধি বাড়িয়েছে।'),
  ((select id from public.articles where slug='streets-to-digital-platforms-evolution-of-protest'),'bn',2,'দীর্ঘমেয়াদি স্থিতিশীলতার জন্য নিরাপদ যোগাযোগ ও মিডিয়া লিটারেসি অপরিহার্য বলে কর্মীরা উল্লেখ করেন।'),

  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'en',1,'Interviews across public universities reveal shared concerns over equity, accountability, and democratic participation.'),
  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'en',2,'Participants describe solidarity as both emotional strength and a strategic framework.'),
  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'bn',1,'সরকারি বিশ্ববিদ্যালয়জুড়ে সাক্ষাৎকারে সমতা, জবাবদিহি ও গণতান্ত্রিক অংশগ্রহণ নিয়ে অভিন্ন উদ্বেগ উঠে এসেছে।'),
  ((select id from public.articles where slug='voices-of-youth-stand-against-injustice'),'bn',2,'অংশগ্রহণকারীরা সংহতিকে আবেগীয় শক্তি এবং কৌশলগত কাঠামো - দুইভাবেই দেখছেন।'),

  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'en',1,'Field volunteers are cataloging witness videos, statements, and local reports in a verifiable archive.'),
  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'en',2,'The initiative aims to prevent historical erasure and support future accountability processes.'),
  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'bn',1,'মাঠপর্যায়ের স্বেচ্ছাসেবকেরা সাক্ষীর ভিডিও, বিবৃতি ও স্থানীয় প্রতিবেদন যাচাইযোগ্য আর্কাইভে সংরক্ষণ করছেন।'),
  ((select id from public.articles where slug='citizens-recording-truth-during-crisis'),'bn',2,'ঐতিহাসিক সত্য মুছে যাওয়া ঠেকানো এবং ভবিষ্যৎ জবাবদিহি প্রক্রিয়াকে সহায়তা করাই এই উদ্যোগের লক্ষ্য।');

-- Fact-check methodology/evidence/sources for one article
insert into public.article_methodology (article_id, lang, sort_order, item)
values
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',1,'We traced the first upload timestamps and compared versions across archives.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',2,'Two independent experts reviewed location clues and editing artifacts.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'bn',1,'আমরা প্রথম আপলোডের সময়চিহ্ন ট্রেস করে আর্কাইভে সংরক্ষিত ভার্সনের সাথে মিলিয়েছি।'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'bn',2,'দুইজন স্বাধীন বিশেষজ্ঞ লোকেশন ক্লু ও এডিটিং আর্টিফ্যাক্ট পর্যালোচনা করেছেন।');

insert into public.article_evidence (article_id, lang, sort_order, item)
values
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',1,'Original photo predates the claimed event by 18 months and was captured in another district.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'en',2,'Headline text was digitally altered; metadata indicates post-production edits.'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'bn',1,'মূল ছবিটি দাবিকৃত ঘটনার ১৮ মাস আগে তোলা এবং অন্য জেলায় ধারণ করা।'),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'bn',2,'শিরোনামের টেক্সট ডিজিটালি পরিবর্তিত; মেটাডাটায় পোস্ট-প্রোডাকশন এডিটের প্রমাণ আছে।');

insert into public.article_sources (article_id, label, url, sort_order)
values
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'Reverse Image Trace Archive','https://example.com/source-archive',1),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'Expert Interview Notes','https://example.com/expert-notes',2),
  ((select id from public.articles where slug='misinformation-campaign-targets-national-unity'),'Platform Transparency Report','https://example.com/transparency-report',3);
