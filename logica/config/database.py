import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'prb_local'),
        user=os.getenv('DB_USER', 'soporte'),
        password=os.getenv('DB_PASSWORD', 'soporte')
    )

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Crear tabla de investigadores
    
    # Quitar el no_cvu e intercambiarlo por PU (perfil unico)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS investigadores (
            id SERIAL PRIMARY KEY,
            no_cvu VARCHAR(50),
            curp VARCHAR(18),
            nombre_completo VARCHAR(200),
            rfc VARCHAR(13),
            correo VARCHAR(100),
            nacionalidad VARCHAR(50),
            fecha_nacimiento DATE,
            empleo_actual TEXT,
            institucion TEXT,
            fecha_registro TIMESTAMP,
            nombre_archivo_pdf VARCHAR(255)
        )
    ''')
    
    # Agregar las nuevas columnas si no existen
    cur.execute('''
        DO $$
        BEGIN
            BEGIN
                ALTER TABLE investigadores ADD COLUMN institucion TEXT;
            EXCEPTION
                WHEN duplicate_column THEN NULL;
            END;
            
            BEGIN
                ALTER TABLE investigadores ADD COLUMN fecha_registro TIMESTAMP;
            EXCEPTION
                WHEN duplicate_column THEN NULL;
            END;
            
            BEGIN
                ALTER TABLE investigadores ADD COLUMN nombre_archivo_pdf VARCHAR(255);
            EXCEPTION
                WHEN duplicate_column THEN NULL;
            END;
            
            -- Eliminar la columna linea_investigacion si existe
            BEGIN
                ALTER TABLE investigadores DROP COLUMN IF EXISTS linea_investigacion;
            EXCEPTION
                WHEN undefined_column THEN NULL;
            END;
        END $$;
    ''')
    
    conn.commit()
    cur.close()
    conn.close() 