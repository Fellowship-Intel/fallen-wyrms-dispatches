-- Fallen Wyrms Dispatches: initial schema
-- Apply via Supabase SQL editor or CLI. Review before running.

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  source text not null default 'dispatches'
);

create table if not exists reading_progress (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null,
  season text not null,
  node_id text not null,
  flags jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  unique (player_id, season)
);

create table if not exists choice_events (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null,
  season text not null,
  node_id text not null,
  choice_index int not null,
  created_at timestamptz not null default now()
);

create index if not exists choice_events_player_idx on choice_events (player_id);
create index if not exists reading_progress_player_idx on reading_progress (player_id);

alter table subscribers enable row level security;
alter table reading_progress enable row level security;
alter table choice_events enable row level security;

-- subscribers: insert-only for anon (no client reads)
create policy "anon_insert_subscribers"
  on subscribers for insert to anon
  with check (email is not null and source is not null);

-- reading_progress: anon can upsert and read rows filtered by player_id in queries
create policy "anon_insert_progress"
  on reading_progress for insert to anon
  with check (player_id is not null);

create policy "anon_update_progress"
  on reading_progress for update to anon
  using (player_id is not null)
  with check (player_id is not null);

create policy "anon_select_progress"
  on reading_progress for select to anon
  using (player_id is not null);

-- choice_events: insert-only for anon
create policy "anon_insert_choice_events"
  on choice_events for insert to anon
  with check (player_id is not null);

-- Table grants for the anon role (required alongside RLS)
grant usage on schema public to anon;
grant insert on subscribers to anon;
grant select, insert, update on reading_progress to anon;
grant insert on choice_events to anon;
