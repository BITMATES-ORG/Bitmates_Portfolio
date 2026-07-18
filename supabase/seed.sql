-- Run AFTER schema.sql
-- Admin accounts are created via Supabase Auth UI
-- This seeds default content for the CMS

INSERT INTO profiles (full_name, title, tagline, about, github, linkedin, twitter, email, whatsapp, years_of_experience)
VALUES (
  'AdelereKehinde',
  'Fullstack Developer',
  'I build scalable web and mobile applications.',
  'I''m a full-stack, mobile, and backend developer based in Lagos, currently studying computer science while shipping production apps for real clients. I care about the parts most people skip — the loading state, the empty state, the millisecond a button takes to respond.

My work spans React Native mobile apps, Next.js web platforms, and the backend systems that hold them together. I like projects with a real user on the other end, not just a demo.',
  'https://github.com/AdelereKehinde',
  'https://linkedin.com/in/AdelereKehinde',
  'https://x.com/AdelereKehinde',
  'adelerekehinde@gmail.com',
  '+2348142436225',
  5
);

INSERT INTO skills (name, category, level, sort_order) VALUES
  ('React / Next.js', 'Frontend', 92, 0),
  ('Three.js / GSAP', 'Frontend', 78, 1),
  ('Tailwind CSS', 'Frontend', 95, 2),
  ('Node / Express', 'Backend', 88, 3),
  ('FastAPI / Django', 'Backend', 74, 4),
  ('PostgreSQL', 'Databases', 85, 5),
  ('React Native', 'Mobile', 90, 6),
  ('Supabase / Firebase', 'BaaS', 82, 7),
  ('Docker / CI-CD', 'DevOps', 68, 8);

INSERT INTO work_experiences (company, role, start_date, end_date, current, description, tech_stack, responsibilities, achievements, sort_order)
VALUES
  ('Jonyx', 'Mobile & Fullstack Developer', '2026-06-01', NULL, TRUE, 'Building client-facing products end to end, from architecture through delivery, across web and mobile.',
   ARRAY['React Native', 'Next.js', 'Node.js'],
   ARRAY['Architect full-stack solutions for clients', 'Deliver cross-platform mobile apps', 'Manage deployment and CI/CD pipelines'],
   ARRAY['Shipped 3 client products in first quarter', 'Reduced build times by 30%'],
   0),
  ('Goridar', 'QA Tester & DevOps', '2025-09-01', '2026-02-01', FALSE, 'Owned quality and deployment pipelines for a rider-passenger matching platform.',
   ARRAY['CI/CD', 'Docker', 'Testing'],
   ARRAY['Maintained test suites', 'Managed deployment pipelines', 'Ensured 99.9% uptime'],
   ARRAY['Reduced regression bugs by 40%', 'Automated deployment process'],
   1),
  ('Handled Inc.', 'Fullstack & Mobile Developer', '2026-01-01', '2026-03-01', FALSE, 'Freelance contract building an ADHD-aware decision-making app from scratch.',
   ARRAY['React Native', 'Node.js'],
   ARRAY['Built mobile app from scratch', 'Developed admin dashboard', 'Implemented push notifications'],
   ARRAY['Delivered ahead of schedule', 'Positive user feedback from beta testers'],
   2);

INSERT INTO services (title, description, icon, tech_tags, sort_order)
VALUES
  ('Web Development', 'Business websites, SaaS platforms, and dashboards.', 'Globe', ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind'], 0),
  ('Mobile Development', 'React Native and cross-platform mobile apps.', 'Smartphone', ARRAY['React Native', 'Expo', 'TypeScript'], 1),
  ('Backend Development', 'APIs, auth systems, and database design.', 'Server', ARRAY['Node.js', 'PostgreSQL', 'Supabase'], 2),
  ('AI Development', 'LLM integrations, chatbots, and automations.', 'Brain', ARRAY['OpenAI', 'LangChain', 'RAG'], 3);

INSERT INTO stats (label, value, icon, sort_order) VALUES
  ('Projects Completed', 40, 'FolderKanban', 0),
  ('Happy Clients', 5, 'Users', 1),
  ('Technologies', 60, 'Code2', 2),
  ('Years Coding', 5, 'Calendar', 3);

INSERT INTO projects (title, summary, description, tech_stack, live_link, github_link, problem_solved, results, featured, published)
VALUES
  ('Earnicle', 'React Native + Supabase social app with story creation and view tracking.', 'A full-featured social platform where users can share short stories with reliable, deduplicated view counting.',
   ARRAY['React Native', 'Supabase', 'Expo'],
   'https://example.com', 'https://github.com/AdelereKehinde/earnicle',
   'Creators had no lightweight way to post short stories with reliable view counts.',
   'Shipped full auth, story creation, and a view-dedup system handling thousands of daily views.',
   TRUE, TRUE),
  ('Campux', 'Campus super-app connecting students across multiple institutions.', 'A comprehensive campus platform with social features, event management, and academic tools.',
   ARRAY['Next.js', 'Node', 'Postgres'],
   'https://example.com', 'https://github.com/AdelereKehinde/campux',
   'Students lacked a unified platform for campus life.',
   'Connected 2000+ students across 3 institutions.',
   TRUE, TRUE),
  ('Handled', 'ADHD-aware decision support platform with mobile and admin surfaces.', 'A decision-making app designed for people with ADHD, helping them break down choices and stay on track.',
   ARRAY['React Native', 'Next.js'],
   'https://example.com', 'https://github.com/AdelereKehinde/handled',
   'People with ADHD needed a tool to manage decision paralysis.',
   'Beta users reported 60% faster decision-making.',
   TRUE, TRUE);

INSERT INTO blog_posts (title, slug, content, excerpt, published, author)
VALUES
  ('Building a view-deduplication system for Earnicle', 'view-deduplication-earnicle',
   '# Building a view-deduplication system for Earnicle\n\nEvery story view needs to count once per user per day, not once per tap. Here is the schema and logic I landed on.\n\nThe fix ended up being a composite unique key on user, story, and day.',
   'How I stopped one user''s refresh spam from inflating story views.', TRUE, 'AdelereKehinde'),
  ('Why I moved my admin auth to Supabase', 'supabase-admin-auth',
   '# Why Supabase Auth\n\nAfter managing custom JWT logic, I moved to Supabase Auth for simpler session management and better security.',
   'A short breakdown of the authentication flow protecting the dashboard.', TRUE, 'AdelereKehinde'),
  ('Three.js on a budget', 'three-js-budget',
   '# Keeping it under 60kb\n\nNotes on trimming a particle scene for slow connections while keeping it visually impressive.',
   'Tips for keeping your Three.js hero scene lightweight.', TRUE, 'AdelereKehinde');

INSERT INTO testimonials (client_name, company, review, rating, published) VALUES
  ('Maya R.', 'Product Lead', 'Kehinde shipped our mobile app faster than we expected, and the quality held up under real users.', 5, TRUE),
  ('David O.', 'Founder', 'Communicative, fast, and detail-oriented. Our dashboard finally feels like a real product.', 5, TRUE),
  ('Priya S.', 'Engineering Manager', 'He caught edge cases we had not even thought about yet. Would work with him again.', 5, TRUE);
