-- Supabase에서 SQL Editor로 실행해주세요

create table if not exists votes (
  restaurant_id text primary key,
  up_count integer default 0,
  down_count integer default 0,
  created_at timestamptz default now()
);

-- RLS (Row Level Security) 설정
alter table votes enable row level security;

-- 누구나 읽기 가능
create policy "Anyone can read votes"
  on votes for select
  using (true);

-- 누구나 쓰기 가능 (익명 투표)
create policy "Anyone can insert votes"
  on votes for insert
  with check (true);

create policy "Anyone can update votes"
  on votes for update
  using (true);
