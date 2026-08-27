create table if not exists user_favorites (
  user_id    text not null,
  topic_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, topic_slug)
);

create table if not exists user_vocab (
  user_id    text not null,
  hanzi      text not null,
  status     text not null default 'learning',
  updated_at timestamptz not null default now(),
  primary key (user_id, hanzi)
);

create index if not exists user_favorites_user_idx on user_favorites (user_id);
create index if not exists user_vocab_user_idx on user_vocab (user_id);
