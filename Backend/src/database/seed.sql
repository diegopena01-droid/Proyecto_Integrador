INSERT INTO paises (nombre, codigo) VALUES ('Colombia', 'CO')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO departamentos (nombre, pais_id)
SELECT 'Valle del Cauca', id FROM paises WHERE codigo = 'CO'
ON CONFLICT DO NOTHING;

INSERT INTO departamentos (nombre, pais_id)
SELECT 'Cundinamarca', id FROM paises WHERE codigo = 'CO'
ON CONFLICT DO NOTHING;

INSERT INTO ciudades (nombre, departamento_id)
SELECT 'Tuluá', id FROM departamentos WHERE nombre = 'Valle del Cauca'
ON CONFLICT DO NOTHING;

INSERT INTO ciudades (nombre, departamento_id)
SELECT 'Cali', id FROM departamentos WHERE nombre = 'Valle del Cauca'
ON CONFLICT DO NOTHING;

INSERT INTO ciudades (nombre, departamento_id)
SELECT 'Buga', id FROM departamentos WHERE nombre = 'Valle del Cauca'
ON CONFLICT DO NOTHING;

INSERT INTO ciudades (nombre, departamento_id)
SELECT 'Bogotá', id FROM departamentos WHERE nombre = 'Cundinamarca'
ON CONFLICT DO NOTHING;

INSERT INTO usuarios (nombre, email, password, rol, ciudad_id) VALUES
  ('Admin Sistema', 'admin@checkevent.com', 'TEMP', 'admin',
    (SELECT id FROM ciudades WHERE nombre = 'Tuluá' LIMIT 1)),
  ('Carlos Agente', 'agente@checkevent.com', 'TEMP', 'agente',
    (SELECT id FROM ciudades WHERE nombre = 'Cali' LIMIT 1)),
  ('Diego Cliente', 'cliente@checkevent.com', 'TEMP', 'cliente',
    (SELECT id FROM ciudades WHERE nombre = 'Tuluá' LIMIT 1)),
  ('María Cliente', 'maria@checkevent.com', 'TEMP', 'cliente',
    (SELECT id FROM ciudades WHERE nombre = 'Buga' LIMIT 1))
ON CONFLICT (email) DO NOTHING;

INSERT INTO teatros (nombre, direccion, ciudad_id, capacidad) VALUES
  ('Teatro Municipal', 'Calle 25 # 10-20', (SELECT id FROM ciudades WHERE nombre = 'Tuluá' LIMIT 1), 500),
  ('Coliseo Central', 'Av. 6N # 20-30', (SELECT id FROM ciudades WHERE nombre = 'Cali' LIMIT 1), 1200),
  ('Teatro Principal', 'Carrera 8 # 5-15', (SELECT id FROM ciudades WHERE nombre = 'Buga' LIMIT 1), 300),
  ('Centro de Eventos', 'Calle 30 # 15-40', (SELECT id FROM ciudades WHERE nombre = 'Tuluá' LIMIT 1), 800),
  ('Auditorio Central', 'Calle 12 # 4-10', (SELECT id FROM ciudades WHERE nombre = 'Buga' LIMIT 1), 250);

INSERT INTO eventos (codigo, nombre, descripcion, teatro_id, ciudad_id, fecha_inicio, hora_inicio, hora_fin, capacidad, precio, estado, imagen_url, agente_id) VALUES
  ('EV001', 'Concierto de Rock', 'Una noche de música en vivo.',
    (SELECT id FROM teatros WHERE nombre = 'Teatro Municipal' LIMIT 1),
    (SELECT id FROM ciudades WHERE nombre = 'Tuluá' LIMIT 1),
    '2026-11-20', '19:00', '22:00', 500, 80000, 'Programado',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
    (SELECT id FROM usuarios WHERE email = 'agente@checkevent.com' LIMIT 1)),
  ('EV002', 'Festival de Música', 'Jornada de música y artistas.',
    (SELECT id FROM teatros WHERE nombre = 'Coliseo Central' LIMIT 1),
    (SELECT id FROM ciudades WHERE nombre = 'Cali' LIMIT 1),
    '2026-11-25', '16:00', '23:00', 1200, 120000, 'Programado',
    'https://images.unsplash.com/photo-1459749411175-047fc0d8f5f7?w=400',
    (SELECT id FROM usuarios WHERE email = 'agente@checkevent.com' LIMIT 1)),
  ('EV003', 'Obra de Teatro', 'Presentación teatral en familia.',
    (SELECT id FROM teatros WHERE nombre = 'Teatro Principal' LIMIT 1),
    (SELECT id FROM ciudades WHERE nombre = 'Buga' LIMIT 1),
    '2026-11-28', '18:00', '20:00', 300, 45000, 'Programado',
    'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400',
    (SELECT id FROM usuarios WHERE email = 'agente@checkevent.com' LIMIT 1)),
  ('EV004', 'Festival Cultural', 'Arte, cultura y tradición.',
    (SELECT id FROM teatros WHERE nombre = 'Centro de Eventos' LIMIT 1),
    (SELECT id FROM ciudades WHERE nombre = 'Tuluá' LIMIT 1),
    '2026-12-05', '14:00', '21:00', 800, 35000, 'En Boletería',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    (SELECT id FROM usuarios WHERE email = 'agente@checkevent.com' LIMIT 1)),
  ('EV005', 'Noche de Comedia', 'Humor con invitados especiales.',
    (SELECT id FROM teatros WHERE nombre = 'Teatro Municipal' LIMIT 1),
    (SELECT id FROM ciudades WHERE nombre = 'Cali' LIMIT 1),
    '2026-12-10', '20:00', '22:00', 400, 60000, 'Programado',
    'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400',
    (SELECT id FROM usuarios WHERE email = 'agente@checkevent.com' LIMIT 1)),
  ('EV006', 'Concierto Acústico', 'Experiencia musical íntima.',
    (SELECT id FROM teatros WHERE nombre = 'Auditorio Central' LIMIT 1),
    (SELECT id FROM ciudades WHERE nombre = 'Buga' LIMIT 1),
    '2026-12-15', '19:00', '21:00', 250, 55000, 'Cancelado',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
    (SELECT id FROM usuarios WHERE email = 'agente@checkevent.com' LIMIT 1))
ON CONFLICT (codigo) DO NOTHING;

INSERT INTO reservas (codigo, usuario_id, evento_id, numero_entradas, valor_total, observaciones, estado) VALUES
  ('RES-1001',
    (SELECT id FROM usuarios WHERE email = 'cliente@checkevent.com' LIMIT 1),
    (SELECT id FROM eventos WHERE codigo = 'EV001' LIMIT 1),
    2, 160000, 'Asientos preferenciales', 'Confirmada'),
  ('RES-1002',
    (SELECT id FROM usuarios WHERE email = 'maria@checkevent.com' LIMIT 1),
    (SELECT id FROM eventos WHERE codigo = 'EV002' LIMIT 1),
    4, 480000, NULL, 'Reservada'),
  ('RES-1003',
    (SELECT id FROM usuarios WHERE email = 'cliente@checkevent.com' LIMIT 1),
    (SELECT id FROM eventos WHERE codigo = 'EV003' LIMIT 1),
    1, 45000, 'Primera fila', 'Reservada')
ON CONFLICT (codigo) DO NOTHING;