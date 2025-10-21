-- Terrazea Client Zone schema
-- Provision this file in Supabase SQL editor or via `supabase db push`

-- ============================================================================
-- BLOCK 1: CLEANUP - Ejecutar primero para limpiar datos existentes
-- ============================================================================

-- Deshabilitar RLS temporalmente para limpieza
alter table if exists public.project_messages disable row level security;
alter table if exists public.project_conversations disable row level security;
alter table if exists public.project_photos_summary disable row level security;
alter table if exists public.project_documents_summary disable row level security;
alter table if exists public.project_metrics disable row level security;
alter table if exists public.project_documents disable row level security;
alter table if exists public.project_photos disable row level security;
alter table if exists public.project_activity disable row level security;
alter table if exists public.project_phases disable row level security;
alter table if exists public.project_milestones disable row level security;
alter table if exists public.project_team_members disable row level security;
alter table if exists public.team_members disable row level security;
alter table if exists public.project_updates disable row level security;
alter table if exists public.projects disable row level security;
alter table if exists public.clients disable row level security;
alter table if exists public.app_users disable row level security;

-- Eliminar datos existentes (en orden correcto por foreign keys)
delete from public.project_messages;
delete from public.project_conversations;
delete from public.project_photos_summary;
delete from public.project_documents_summary;
delete from public.project_metrics;
delete from public.project_documents;
delete from public.project_photos;
delete from public.project_activity;
delete from public.project_phases;
delete from public.project_milestones;
delete from public.project_team_members;
delete from public.team_members;
delete from public.project_updates;
delete from public.projects;
delete from public.clients;
delete from public.app_users;

-- Eliminar tablas existentes
drop table if exists public.project_messages cascade;
drop table if exists public.project_conversations cascade;
drop table if exists public.project_photos_summary cascade;
drop table if exists public.project_documents_summary cascade;
drop table if exists public.project_metrics cascade;
drop table if exists public.project_documents cascade;
drop table if exists public.project_photos cascade;
drop table if exists public.project_activity cascade;
drop table if exists public.project_phases cascade;
drop table if exists public.project_milestones cascade;
drop table if exists public.project_team_members cascade;
drop table if exists public.team_members cascade;
drop table if exists public.project_updates cascade;
drop table if exists public.projects cascade;
drop table if exists public.clients cascade;
drop table if exists public.app_users cascade;

-- Eliminar tipos existentes
drop type if exists public.message_sender cascade;
drop type if exists public.document_status cascade;
drop type if exists public.activity_status cascade;
drop type if exists public.phase_status cascade;
drop type if exists public.milestone_status cascade;
drop type if exists public.update_type cascade;

-- ============================================================================
-- BLOCK 2: SCHEMA COMPLETO - Ejecutar después del bloque de limpieza
-- ============================================================================

-- Asegurar extensiones necesarias
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Core domain tables --------------------------------------------------------

create table public.clients (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Tabla de usuarios de la aplicación con autenticación
create table public.app_users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  password_hash text not null,
  full_name text not null,
  role text not null default 'client' check (role in ('admin', 'client')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients(id) on delete cascade,
  slug text not null unique,
  name text not null,
  code text,
  status text not null default 'en_progreso',
  progress_percent numeric(5,2) not null default 0,
  start_date date,
  estimated_delivery date,
  location_city text,
  location_notes text,
  total_days integer,
  remaining_days integer,
  hero_image_url text,
  created_at timestamptz not null default now()
);

create type public.update_type as enum ('success', 'info', 'warning', 'message');

create table public.project_updates (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  update_type public.update_type not null default 'info',
  occurred_at timestamptz not null default now()
);
create index project_updates_project_id_idx on public.project_updates(project_id, occurred_at desc);

create table public.team_members (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  role text not null,
  avatar_url text,
  default_status text not null default 'offline',
  created_at timestamptz not null default now()
);

create table public.project_team_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  team_member_id uuid not null references public.team_members(id) on delete cascade,
  status text not null default 'offline',
  is_primary boolean not null default false,
  primary key (project_id, team_member_id)
);

create type public.milestone_status as enum ('completed', 'in_progress', 'pending');

create table public.project_milestones (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  scheduled_start date,
  scheduled_end date,
  progress_percent integer not null default 0,
  status public.milestone_status not null default 'pending',
  sort_order integer not null default 0
);
create index project_milestones_project_id_idx on public.project_milestones(project_id, sort_order);

create type public.phase_status as enum ('completed', 'in_progress', 'pending');

create table public.project_phases (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  progress_percent integer not null default 0,
  status public.phase_status not null default 'pending',
  sort_order integer not null default 0
);
create index project_phases_project_id_idx on public.project_phases(project_id, sort_order);

create type public.activity_status as enum ('completed', 'info', 'warning');

create table public.project_activity (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  occurred_at timestamptz not null default now(),
  title text not null,
  description text,
  status public.activity_status not null default 'info'
);
create index project_activity_project_id_idx on public.project_activity(project_id, occurred_at desc);

create table public.project_photos (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  caption text,
  taken_at date,
  sort_order integer not null default 0
);
create index project_photos_project_id_idx on public.project_photos(project_id, sort_order);

create type public.document_status as enum ('aprobado', 'vigente', 'actualizado');

create table public.project_documents (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  category text not null,
  file_type text not null,
  size_label text,
  uploaded_at date,
  status public.document_status not null default 'vigente'
);
create index project_documents_project_id_idx on public.project_documents(project_id, uploaded_at desc);

create table public.project_metrics (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  metric_code text not null,
  label text not null,
  value numeric not null,
  sublabel text,
  sort_order integer not null default 0
);
create unique index project_metrics_project_id_metric_code_idx on public.project_metrics(project_id, metric_code);

create table public.project_documents_summary (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  category text not null,
  count integer not null default 0
);
create unique index project_documents_summary_project_id_category_idx on public.project_documents_summary(project_id, category);

create table public.project_photos_summary (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  total_photos integer not null default 0,
  last_update date
);

create type public.message_sender as enum ('client', 'team_member');

create table public.project_conversations (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  team_member_id uuid not null references public.team_members(id) on delete cascade,
  unread_count integer not null default 0,
  last_message_preview text,
  last_message_at timestamptz,
  created_at timestamptz not null default now()
);
create index project_conversations_project_id_idx on public.project_conversations(project_id, last_message_at desc);

create table public.project_messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.project_conversations(id) on delete cascade,
  sender_type public.message_sender not null,
  team_member_id uuid references public.team_members(id) on delete cascade,
  content text not null,
  sent_at timestamptz not null default now()
);
create index project_messages_conversation_id_idx on public.project_messages(conversation_id, sent_at);

-- Enable RLS (service role used by Next.js server bypasses policies)
alter table public.app_users enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_updates enable row level security;
alter table public.team_members enable row level security;
alter table public.project_team_members enable row level security;
alter table public.project_milestones enable row level security;
alter table public.project_phases enable row level security;
alter table public.project_activity enable row level security;
alter table public.project_photos enable row level security;
alter table public.project_documents enable row level security;
alter table public.project_metrics enable row level security;
alter table public.project_documents_summary enable row level security;
alter table public.project_photos_summary enable row level security;
alter table public.project_conversations enable row level security;
alter table public.project_messages enable row level security;

-- Seed data -----------------------------------------------------------------

-- Usuario administrador con contraseña hasheada
insert into public.app_users (id, email, password_hash, full_name, role)
values (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'aterrazea@gmail.com',
  crypt('Terraze@Gnerai123', gen_salt('bf')),
  'Administrador Terrazea',
  'admin'
)
on conflict (id) do nothing;

-- Usuarios cliente de ejemplo
insert into public.app_users (email, password_hash, full_name, role)
values 
  ('juan@example.com', crypt('password123', gen_salt('bf')), 'Juan Pérez', 'client'),
  ('maria.garcia@example.com', crypt('password123', gen_salt('bf')), 'María García', 'client'),
  ('carlos.lopez@example.com', crypt('password123', gen_salt('bf')), 'Carlos López', 'client')
on conflict (email) do nothing;

insert into public.clients (id, full_name, email)
values ('4c0a5c7d-3b6c-4dcb-ab62-81af21d8ab8c', 'Juan Pérez', 'juan@example.com')
on conflict (id) do nothing;

-- Clientes adicionales
insert into public.clients (full_name, email)
values 
  ('María García', 'maria.garcia@example.com'),
  ('Carlos López', 'carlos.lopez@example.com')
on conflict (email) do nothing;

insert into public.projects (
  id,
  client_id,
  slug,
  name,
  code,
  status,
  progress_percent,
  start_date,
  estimated_delivery,
  location_city,
  location_notes,
  total_days,
  remaining_days,
  hero_image_url
)
values (
  'dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7',
  '4c0a5c7d-3b6c-4dcb-ab62-81af21d8ab8c',
  'terraza-mediterranea-premium',
  'Terraza Mediterránea Premium',
  'TRZ-2024-089',
  'en_progreso',
  68,
  '2024-01-15',
  '2024-03-30',
  'Barcelona',
  'Zona residencial premium',
  75,
  24,
  null
)
on conflict (id) do nothing;

insert into public.project_metrics (project_id, metric_code, label, value, sublabel, sort_order)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'milestones_completed', 'Hitos Completados', 8, '12 totales', 1),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'documents_total', 'Documentos', 24, '3 nuevos esta semana', 2),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'messages_total', 'Mensajes', 5, '2 sin leer', 3),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'photos_total', 'Fotos del Progreso', 142, 'Última actualización hoy', 4)
on conflict (project_id, metric_code) do update
set value = excluded.value,
    sublabel = excluded.sublabel,
    sort_order = excluded.sort_order;

insert into public.team_members (id, full_name, role, avatar_url, default_status)
values
  ('2ea6d40a-5a1c-4b92-90fe-2f4f7888e9df', 'María González', 'Directora de Proyecto', null, 'online'),
  ('0e4d54b3-5c9e-4d2f-8bb8-3b77540182c4', 'Carlos Ruiz', 'Arquitecto Principal', null, 'online'),
  ('e83467ab-7d86-4c9f-afbe-0a0f731f8ecb', 'Ana Martínez', 'Ingeniera Estructural', null, 'offline'),
  ('9f7a2395-8e6a-4ae1-81c8-3ceabca0b4f7', 'Roberto Silva', 'Maestro de Obra', null, 'online')
on conflict (id) do nothing;

insert into public.project_team_members (project_id, team_member_id, status, is_primary)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '2ea6d40a-5a1c-4b92-90fe-2f4f7888e9df', 'online', true),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '0e4d54b3-5c9e-4d2f-8bb8-3b77540182c4', 'online', false),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'e83467ab-7d86-4c9f-afbe-0a0f731f8ecb', 'offline', false),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '9f7a2395-8e6a-4ae1-81c8-3ceabca0b4f7', 'online', false)
on conflict (project_id, team_member_id) do update
set status = excluded.status,
    is_primary = excluded.is_primary;

insert into public.project_updates (project_id, title, description, update_type, occurred_at)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Instalación de pérgola completada', 'La estructura principal de la pérgola ha sido instalada exitosamente.', 'success', now() - interval '2 hours'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Nuevo documento disponible', 'Certificado de materiales - Madera tratada para exteriores', 'info', now() - interval '5 hours'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Cambio en el cronograma', 'La instalación del sistema de riego se adelanta 2 días.', 'warning', now() - interval '1 day'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Mensaje del arquitecto', 'Propuesta de ajuste en la iluminación perimetral.', 'message', now() - interval '2 days')
on conflict do nothing;

insert into public.project_milestones (project_id, title, scheduled_start, scheduled_end, progress_percent, status, sort_order)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Instalación del sistema de riego', '2024-03-08', '2024-03-10', 85, 'in_progress', 1),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Colocación de pavimento', '2024-03-12', '2024-03-15', 30, 'in_progress', 2),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Instalación de iluminación', '2024-03-18', '2024-03-20', 0, 'pending', 3),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Plantación de vegetación', '2024-03-22', '2024-03-25', 0, 'pending', 4)
on conflict do nothing;

insert into public.project_phases (project_id, name, progress_percent, status, sort_order)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Preparación del terreno', 100, 'completed', 1),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Estructura y cimentación', 100, 'completed', 2),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Instalación de pérgola', 100, 'completed', 3),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Sistema de riego', 85, 'in_progress', 4),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Pavimentación', 30, 'in_progress', 5),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Iluminación', 0, 'pending', 6),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Plantación', 0, 'pending', 7),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Acabados finales', 0, 'pending', 8)
on conflict do nothing;

insert into public.project_activity (project_id, occurred_at, title, description, status)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', now(), 'Instalación de pérgola completada', 'La estructura principal de la pérgola ha sido instalada y asegurada. Se procederá con el tratamiento de protección.', 'completed'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', now() - interval '2 hours', 'Inspección de calidad realizada', 'El inspector certificó la correcta instalación de la estructura metálica.', 'completed'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', now() - interval '1 day', 'Materiales recibidos', 'Llegaron las baldosas de piedra natural para la pavimentación.', 'info'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', now() - interval '1 day 4 hours', 'Ajuste en cronograma', 'La instalación del sistema de riego se adelanta 2 días debido al buen clima.', 'warning')
on conflict do nothing;

insert into public.project_photos (project_id, url, caption, taken_at, sort_order)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '/outdoor-terrace-construction-progress.jpg', 'Vista general del proyecto - Semana 8', '2024-03-05', 1),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '/pergola-installation-outdoor.jpg', 'Instalación de pérgola principal', '2024-03-04', 2),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '/outdoor-paving-stones.jpg', 'Preparación de base para pavimento', '2024-03-02', 3),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '/irrigation-system-installation.jpg', 'Sistema de riego en proceso', '2024-03-01', 4)
on conflict do nothing;

insert into public.project_documents (project_id, name, category, file_type, size_label, uploaded_at, status)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Licencia de obra municipal', 'Legal', 'PDF', '2.4 MB', '2024-01-10', 'aprobado'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Plano arquitectónico - Terraza', 'Planos', 'PDF', '8.1 MB', '2024-01-12', 'vigente'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Especificaciones técnicas pérgola', 'Técnico', 'PDF', '1.2 MB', '2024-01-15', 'vigente'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Certificado materiales - Piedra', 'Certificados', 'PDF', '890 KB', '2024-01-20', 'vigente'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Presupuesto detallado', 'Financiero', 'XLSX', '456 KB', '2024-01-08', 'aprobado'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Cronograma de obra', 'Planificación', 'PDF', '1.8 MB', '2024-01-10', 'actualizado'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Informe de inspección estructural', 'Certificados', 'PDF', '3.2 MB', '2024-01-25', 'aprobado'),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'Garantía sistema de riego', 'Garantías', 'PDF', '720 KB', '2024-03-01', 'vigente')
on conflict do nothing;

insert into public.project_documents_summary (project_id, category, count)
values
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'total', 24),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'planos', 8),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'certificados', 6),
  ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'garantias', 4)
on conflict (project_id, category) do update set count = excluded.count;

insert into public.project_photos_summary (project_id, total_photos, last_update)
values ('dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 142, '2024-03-06')
on conflict (project_id) do update set total_photos = excluded.total_photos, last_update = excluded.last_update;

insert into public.project_conversations (id, project_id, team_member_id, unread_count, last_message_preview, last_message_at)
values
  ('7d6fba0c-3f49-4a0d-bcfa-4f62fd46f2c2', 'dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '2ea6d40a-5a1c-4b92-90fe-2f4f7888e9df', 2, 'El informe de progreso está listo para revisión', now() - interval '30 minutes'),
  ('a52a6ddf-0247-4e66-92de-6ffb0b54883a', 'dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '0e4d54b3-5c9e-4d2f-8bb8-3b77540182c4', 0, 'He actualizado los planos según tus comentarios', now() - interval '1 day'),
  ('30d1e7f0-9c8c-4c71-90d7-8f3a2d3af0fb', 'dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', 'e83467ab-7d86-4c9f-afbe-0a0f731f8ecb', 0, 'La inspección está programada para el viernes', now() - interval '1 day'),
  ('2df2b3c6-3c42-4a65-ba85-38db22ad3afc', 'dd0518f1-52c3-4f6c-9f7f-71fc9c94b9a7', '9f7a2395-8e6a-4ae1-81c8-3ceabca0b4f7', 1, 'Fotos del progreso de hoy adjuntas', now() - interval '2 days')
on conflict (id) do update
set unread_count = excluded.unread_count,
    last_message_preview = excluded.last_message_preview,
    last_message_at = excluded.last_message_at;

insert into public.project_messages (conversation_id, sender_type, team_member_id, content, sent_at)
values
  ('7d6fba0c-3f49-4a0d-bcfa-4f62fd46f2c2', 'team_member', '2ea6d40a-5a1c-4b92-90fe-2f4f7888e9df', 'Hola Juan, espero que estés bien. Quería informarte que hemos completado la instalación de la pérgola.', now() - interval '1 hour 15 minutes'),
  ('7d6fba0c-3f49-4a0d-bcfa-4f62fd46f2c2', 'client', null, 'Excelente noticia! ¿Cuándo podré ver el resultado?', now() - interval '1 hour 10 minutes'),
  ('7d6fba0c-3f49-4a0d-bcfa-4f62fd46f2c2', 'team_member', '2ea6d40a-5a1c-4b92-90fe-2f4f7888e9df', 'Te he enviado algunas fotos al apartado de galería. La estructura quedó perfecta y ya aplicamos el tratamiento de protección.', now() - interval '1 hour 5 minutes'),
  ('7d6fba0c-3f49-4a0d-bcfa-4f62fd46f2c2', 'client', null, 'Las fotos se ven increíbles! Estoy muy contento con el resultado.', now() - interval '1 hour'),
  ('7d6fba0c-3f49-4a0d-bcfa-4f62fd46f2c2', 'team_member', '2ea6d40a-5a1c-4b92-90fe-2f4f7888e9df', 'Me alegra mucho que te guste. Ahora comenzaremos con el sistema de riego. El informe de progreso está listo para revisión.', now() - interval '30 minutes')
on conflict do nothing;
