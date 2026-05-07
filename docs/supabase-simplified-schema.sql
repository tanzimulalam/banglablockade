-- Simplified Bangla Blockade Supabase Schema
-- Table 1: admins
-- Table 2: articles_content (all EN/BN content fields in one table)

create extension if not exists "pgcrypto";

-- Clean reset (optional)
drop table if exists public.articles_content cascade;
drop table if exists public.admins cascade;

create table public.admins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text,
  email text not null unique,
  password text not null, -- store hashed password
  access_level text not null default 'editor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.articles_content (
  id bigint generated always as identity primary key,
  slug text not null unique,
  category text not null default 'Current Affairs',

  -- EN/BN titles
  en_title text not null,
  bn_title text,

  -- EN/BN short descriptions / excerpt
  en_excerpt text,
  bn_excerpt text,

  -- EN/BN full content (for articles use paragraphs separated by blank lines)
  en_article text,
  bn_article text,

  -- EN/BN author names
  en_author text,
  bn_author text,

  -- Fact-check specific fields
  verdict text, -- True / False / Misleading
  en_claim_origin text,
  bn_claim_origin text,
  en_methodology text, -- one point per line
  bn_methodology text, -- one point per line
  en_evidence text, -- one point per line
  bn_evidence text, -- one point per line
  en_conclusion text,
  bn_conclusion text,
  en_sources text, -- JSON array or one URL per line
  bn_sources text, -- optional JSON array or one URL per line

  -- Shared fields
  image_url text,
  published_at date default current_date,
  is_published boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_articles_content_published on public.articles_content(is_published, published_at desc);
create index idx_articles_content_category on public.articles_content(category);

-- Suggested RLS starter (optional; uncomment when ready)
-- alter table public.admins enable row level security;
-- alter table public.articles_content enable row level security;
-- create policy "Public can read published content" on public.articles_content
-- for select using (is_published = true);
