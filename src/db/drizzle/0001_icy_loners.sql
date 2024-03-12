-- Custom SQL migration file, put you code below! --

-- Journal FTS.
create virtual table `fts5_journal` using fts5 (`id`, `notes`);

create trigger `tr_ad_journal`
after delete on `journal`
begin
  delete from `fts5_journal`
  where `id` = old.`id`;
end;

create trigger `tr_ai_journal`
after insert on `journal`
when new.`is_deleted` = 0
begin
  insert into `fts5_journal`(`id`, `notes`)
  values (new.`id`, new.`notes`);
end;

create trigger `tr_au_journal`
after update of `notes` on `journal`
when new.`is_deleted` = 0
begin
  update `fts5_journal`
  set `notes` = new.`notes`
  where `id` = new.`id`;
end;

-- Contacts FTS.
create virtual table `fts5_contacts` using fts5 (`id`, `title`, `nickname`, `first_name`, `last_name`);

create trigger `tr_ad_contacts`
after delete on `contacts`
begin
  delete from `fts5_contacts`
  where `id` = old.`id`;
end;

create trigger `tr_ai_contacts`
after insert on `contacts`
when new.`is_deleted` = 0
begin
  insert into `fts5_contacts`(`id`, `title`, `nickname`, `first_name`, `last_name`)
  values (new.`id`, new.`title`, new.`nickname`, new.`first_name`, new.`last_name`);
end;

create trigger `tr_au_contacts`
after update of `title`, `nickname`, `first_name`, `last_name` on `contacts`
when new.`is_deleted` = 0
begin
  update `fts5_contacts`
  set `title` = new.`title`,
      `nickname` = new.`nickname`,
      `first_name` = new.`first_name`,
      `last_name` = new.`last_name`
  where `id` = new.`id`;
end;

-- Library FTS.
create virtual table `fts5_library` using fts5 (`id`, `label`);

create trigger `tr_ad_library`
after delete on `library`
begin
  delete from `fts5_library`
  where `id` = old.`id`;
end;

create trigger `tr_ai_library`
after insert on `library`
when new.`is_deleted` = 0
begin
  insert into `fts5_library`(`id`, `label`)
  values (new.`id`, new.`label`);
end;

create trigger `tr_au_library`
after update of `label` on `library`
when new.`is_deleted` = 0
begin
  update `fts5_library`
  set `label` = new.`label`
  where `id` = new.`id`;
end;

-- Add soft delete functionality.
-- - On soft delete, add current timestamp to respective `deleted_at` column.

create trigger `tr_sd_contacts`
after update of `is_deleted` on `contacts`
when new.`is_deleted` = 1
begin
  -- Remove row from FTS table.
  delete from `fts5_contacts`
  where `id` = new.`id`;

  update `contacts`
  set `deleted_at` = (unixepoch())
  where `id` = new.`id`;
end;

create trigger `tr_sd_journal`
after update of `is_deleted` on `journal`
when new.`is_deleted` = 1
begin
  -- Remove row from FTS table.
  delete from `fts5_journal`
  where `id` = new.`id`;

  update `journal`
  set `deleted_at` = (unixepoch())
  where `id` = new.`id`;
end;

create trigger `tr_sd_library`
after update of `is_deleted` on `library`
when new.`is_deleted` = 1
begin
  update `library`
  set `deleted_at` = (unixepoch())
  where `id` = new.`id`;
end;

create trigger `tr_sd_todos_subitems`
after update of `is_deleted` on `todos_subitems`
when new.`is_deleted` = 1
begin
  update `todos_subitems`
  set `deleted_at` = (unixepoch())
  where `id` = new.`id`;
end;

create trigger `tr_sd_todos`
after update of `is_deleted` on `todos`
when new.`is_deleted` = 1
begin
  update `todos`
  set `deleted_at` = (unixepoch())
  where `id` = new.`id`;
end;

-- Add `update_at` functionality.
-- - On update, update the `updated_at` column to reflect current time of update.

create trigger `tr_ua_contacts`
after update on `contacts`
begin
  update `contacts`
  set `updated_at` = (unixepoch())
  where `id` = new.`id`;
end;

create trigger `tr_ua_journal`
after update on `journal`
begin
  update `journal`
  set `updated_at` = (unixepoch())
  where `id` = new.`id`;
end;

create trigger `tr_ua_library`
after update on `library`
begin
  update `library`
  set `updated_at` = (unixepoch())
  where `id` = new.`id`;
end;

create trigger `tr_ua_todos_subitems`
after update on `todos_subitems`
begin
  update `todos_subitems`
  set `updated_at` = (unixepoch())
  where `id` = new.`id`;
end;

create trigger `tr_ua_todos`
after update on `todos`
begin
  update `todos`
  set `updated_at` = (unixepoch())
  where `id` = new.`id`;
end;
