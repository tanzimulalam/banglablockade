-- Simplified EN/BN seed for table: public.articles_content
-- Includes homepage articles + about + contact as rows

delete from public.articles_content;

insert into public.articles_content (
  slug, category, en_title, bn_title, en_excerpt, bn_excerpt, en_article, bn_article,
  en_author, bn_author, image_url, published_at, is_published
)
values
(
  'student-movement-gains-momentum',
  'Digital Investigation',
  'Student Movement Gains Momentum Across Bangladesh',
  'বাংলাদেশজুড়ে ছাত্র আন্দোলনের গতি বাড়ছে',
  'Campus coalitions are now coordinating nationwide actions for policy reform and accountability.',
  'নীতিগত সংস্কার ও জবাবদিহি নিশ্চিত করতে ক্যাম্পাসভিত্তিক জোটগুলো এখন দেশব্যাপী কর্মসূচি সমন্বয় করছে।',
  'Student alliances in multiple districts have established synchronized protest calendars and digital communication hubs.

Organizers say their strategy focuses on disciplined civic resistance, legal awareness, and transparent demands.',
  'বিভিন্ন জেলায় ছাত্রজোটগুলো সমন্বিত কর্মসূচির ক্যালেন্ডার ও ডিজিটাল যোগাযোগকেন্দ্র গড়ে তুলেছে।

আয়োজকদের ভাষ্য, তাদের কৌশল শৃঙ্খলাবদ্ধ নাগরিক প্রতিরোধ, আইনগত সচেতনতা ও স্বচ্ছ দাবির ওপর ভিত্তি করে।',
  'Editorial Desk',
  'সম্পাদকীয় ডেস্ক',
  '/brand/logo-full.png',
  '2026-04-20',
  true
),
(
  'misinformation-campaign-targets-national-unity',
  'Fact Check',
  'Misinformation Campaign Targets National Unity',
  'জাতীয় ঐক্যকে লক্ষ্য করে বিভ্রান্তিমূলক প্রচারণা',
  'A coordinated network of pages reused fabricated visuals to frame false narratives.',
  'সমন্বিত কিছু পেজ মিথ্যা বর্ণনা ছড়াতে বিকৃত ভিজ্যুয়াল পুনর্ব্যবহার করেছে।',
  'Our review found repeated use of out-of-context images and edited headlines shared in short intervals.

Fact-checking teams verified source archives and geolocation clues to debunk each major claim.',
  'আমাদের পর্যালোচনায় দেখা গেছে, প্রেক্ষাপটহীন ছবি ও সম্পাদিত শিরোনাম অল্প সময়ে বারবার শেয়ার করা হয়েছে।

ফ্যাক্ট-চেক টিম সূত্রের আর্কাইভ ও জিওলোকেশন ক্লু যাচাই করে বড় দাবিগুলো খণ্ডন করেছে।',
  'Verification Unit',
  'যাচাই ইউনিট',
  '/brand/logo-mark.png',
  '2026-04-18',
  true
),
(
  'new-dawn-ideology-of-bangla-blockade',
  'Opinion',
  'A New Dawn: The Ideology of Bangla Blockade',
  'নতুন ভোর: বাংলা ব্লকেডের আদর্শ',
  'The movement defines dignity, unity, and sacrifice as its non-negotiable political ethics.',
  'মর্যাদা, ঐক্য ও ত্যাগকে এই আন্দোলন অনড় রাজনৈতিক নৈতিকতা হিসেবে চিহ্নিত করে।',
  'Bangla Blockade positions itself as a civic movement rooted in constitutional rights and social solidarity.

Its vision links national identity with inclusive justice and equal access to opportunity.',
  'বাংলা ব্লকেড নিজেকে সংবিধানিক অধিকার ও সামাজিক সংহতিতে ভিত্তিক নাগরিক আন্দোলন হিসেবে স্থাপন করে।

এর ভিশন জাতীয় পরিচয়কে অন্তর্ভুক্তিমূলক ন্যায়বিচার ও সমান সুযোগের সাথে যুক্ত করে।',
  'Opinion Board',
  'মতামত বোর্ড',
  '/brand/logo-mark.png',
  '2026-04-16',
  true
),
(
  'streets-to-digital-platforms-evolution-of-protest',
  'Current Affairs',
  'From Streets to Digital Platforms: The Evolution of Protest',
  'রাজপথ থেকে ডিজিটাল প্ল্যাটফর্ম: প্রতিবাদের বিবর্তন',
  'Youth organizers are combining offline mobilization with encrypted communities and open-source monitoring.',
  'তরুণ সংগঠকেরা অফলাইন জনমোবিলাইজেশনকে এনক্রিপ্টেড কমিউনিটি ও ওপেন-সোর্স মনিটরিংয়ের সাথে যুক্ত করছেন।',
  'Digital tools have expanded the speed and reach of collective action without replacing physical participation.

Activists stress that secure communication and media literacy remain essential for long-term resilience.',
  'ডিজিটাল টুলসমূহ সরাসরি অংশগ্রহণের বিকল্প না হয়ে সম্মিলিত কর্মসূচির গতি ও পরিধি বাড়িয়েছে।

দীর্ঘমেয়াদি স্থিতিশীলতার জন্য নিরাপদ যোগাযোগ ও মিডিয়া লিটারেসি অপরিহার্য বলে কর্মীরা উল্লেখ করেন।',
  'Current Affairs Desk',
  'সমসাময়িক ডেস্ক',
  '/brand/logo-mark.png',
  '2026-04-14',
  true
),
(
  'voices-of-youth-stand-against-injustice',
  'Opinion',
  'Voices of the Youth: Why We Stand Against Injustice',
  'তরুণদের কণ্ঠ: কেন আমরা অন্যায়ের বিরুদ্ধে',
  'A generation-wide call for dignity and fairness is reshaping the civic language of resistance.',
  'মর্যাদা ও ন্যায্যতার দাবি তরুণ প্রজন্মের প্রতিরোধের ভাষাকে নতুনভাবে নির্মাণ করছে।',
  'Interviews across public universities reveal shared concerns over equity, accountability, and democratic participation.

Participants describe solidarity as both emotional strength and a strategic framework.',
  'সরকারি বিশ্ববিদ্যালয়জুড়ে সাক্ষাৎকারে সমতা, জবাবদিহি ও গণতান্ত্রিক অংশগ্রহণ নিয়ে অভিন্ন উদ্বেগ উঠে এসেছে।

অংশগ্রহণকারীরা সংহতিকে আবেগীয় শক্তি এবং কৌশলগত কাঠামো - দুইভাবেই দেখছেন।',
  'Community Voices',
  'জনকণ্ঠ',
  '/brand/logo-mark.png',
  '2026-04-12',
  true
),
(
  'citizens-recording-truth-during-crisis',
  'Digital Investigation',
  'Citizens Recording Truth During Crisis',
  'সংকটে সত্য লিপিবদ্ধ করছেন নাগরিকরা',
  'Open-source documentation by volunteers is preserving critical timelines and public evidence.',
  'স্বেচ্ছাসেবকদের ওপেন-সোর্স ডকুমেন্টেশন গুরুত্বপূর্ণ টাইমলাইন ও জনস্বার্থের প্রমাণ সংরক্ষণ করছে।',
  'Field volunteers are cataloging witness videos, statements, and local reports in a verifiable archive.

The initiative aims to prevent historical erasure and support future accountability processes.',
  'মাঠপর্যায়ের স্বেচ্ছাসেবকেরা সাক্ষীর ভিডিও, বিবৃতি ও স্থানীয় প্রতিবেদন যাচাইযোগ্য আর্কাইভে সংরক্ষণ করছেন।

ঐতিহাসিক সত্য মুছে যাওয়া ঠেকানো এবং ভবিষ্যৎ জবাবদিহি প্রক্রিয়াকে সহায়তা করাই এই উদ্যোগের লক্ষ্য।',
  'Research Desk',
  'গবেষণা ডেস্ক',
  '/brand/logo-circle.png',
  '2026-04-10',
  true
),
(
  'about',
  'Current Affairs',
  'About Us',
  'আমাদের সম্পর্কে',
  'Bangla Blockade is an investigative media outlet focused on transparent reporting.',
  'বাংলা Blockade একটি অনুসন্ধানী সংবাদমাধ্যম, যার কাজ প্রমাণভিত্তিক প্রতিবেদন প্রকাশ।',
  'Bangla Blockade is an investigative media outlet focused on verifying public claims with transparent evidence, sources, and context.',
  'বাংলা Blockade একটি অনুসন্ধানী সংবাদমাধ্যম। আমাদের কাজ হলো যাচাইযোগ্য দলিল, তথ্যসূত্র এবং প্রেক্ষাপটসহ জনস্বার্থের দাবি মূল্যায়ন করা।',
  'Editorial Desk',
  'সম্পাদকীয় ডেস্ক',
  '/brand/logo-mark.png',
  '2026-04-20',
  true
),
(
  'contact',
  'Current Affairs',
  'Contact',
  'যোগাযোগ',
  'Write to us for tips, verification requests, or partnership inquiries.',
  'টিপস, যাচাইয়ের অনুরোধ বা যেকোনো অনুসন্ধানের জন্য আমাদের লিখুন।',
  'Use the contact form to submit tips, verification requests, partnership inquiries, and public-interest leads.',
  'যোগাযোগ ফর্ম ব্যবহার করে টিপস, যাচাইয়ের অনুরোধ, পার্টনারশিপ প্রস্তাব এবং জনস্বার্থসংশ্লিষ্ট তথ্য পাঠান।',
  'Editorial Desk',
  'সম্পাদকীয় ডেস্ক',
  '/brand/logo-mark.png',
  '2026-04-20',
  true
);

-- Fact-check enriched fields for the fact-check article
update public.articles_content
set
  verdict = 'False',
  en_claim_origin = 'Facebook posts and copied image cards shared in local groups',
  bn_claim_origin = 'স্থানীয় গ্রুপে শেয়ার হওয়া ফেসবুক পোস্ট ও কপি করা ইমেজ কার্ড',
  en_methodology = 'We traced the first upload timestamps and compared versions across archives.
Two independent experts reviewed location clues and editing artifacts.',
  bn_methodology = 'আমরা প্রথম আপলোডের সময়চিহ্ন ট্রেস করে আর্কাইভে সংরক্ষিত ভার্সনের সাথে মিলিয়েছি।
দুইজন স্বাধীন বিশেষজ্ঞ লোকেশন ক্লু ও এডিটিং আর্টিফ্যাক্ট পর্যালোচনা করেছেন।',
  en_evidence = 'Original photo predates the claimed event by 18 months and was captured in another district.
Headline text was digitally altered; metadata indicates post-production edits.',
  bn_evidence = 'মূল ছবিটি দাবিকৃত ঘটনার ১৮ মাস আগে তোলা এবং অন্য জেলায় ধারণ করা।
শিরোনামের টেক্সট ডিজিটালি পরিবর্তিত; মেটাডাটায় পোস্ট-প্রোডাকশন এডিটের প্রমাণ আছে।',
  en_conclusion = 'The campaign relied on manipulated context and edited visuals to spread a false narrative.',
  bn_conclusion = 'মিথ্যা বয়ান ছড়াতে এই প্রচারণায় বিকৃত প্রেক্ষাপট ও সম্পাদিত ভিজ্যুয়াল ব্যবহার করা হয়েছে।',
  en_sources = '[{"label":"Reverse Image Trace Archive","url":"https://example.com/source-archive"},{"label":"Expert Interview Notes","url":"https://example.com/expert-notes"},{"label":"Platform Transparency Report","url":"https://example.com/transparency-report"}]',
  bn_sources = '[{"label":"Reverse Image Trace Archive","url":"https://example.com/source-archive"},{"label":"Expert Interview Notes","url":"https://example.com/expert-notes"},{"label":"Platform Transparency Report","url":"https://example.com/transparency-report"}]'
where slug = 'misinformation-campaign-targets-national-unity';
