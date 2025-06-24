import os
import psycopg2
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

def get_db_connection():
    """
    Obtiene una conexión a la base de datos
    
    Returns:
        connection: Conexión a la base de datos PostgreSQL
    """
    try:
        return psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'prb_local'),
            user=os.getenv('DB_USER', 'soporte'),
            password=os.getenv('DB_PASSWORD', 'soporte')
        )
    except Exception as e:
        raise Exception(f"Error al conectar a la base de datos: {str(e)}")

def init_db():
    """
    Inicializa la base de datos creando las tablas necesarias si no existen
    """
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Crear tabla de investigadores con todos los campos del formulario
        cur.execute("""
            CREATE TABLE IF NOT EXISTS investigadores (
                id SERIAL PRIMARY KEY,
                nombre_completo VARCHAR(200),
                curp VARCHAR(18) UNIQUE,
                rfc VARCHAR(13),
                no_cvu VARCHAR(50),
                correo VARCHAR(100) UNIQUE,
                telefono VARCHAR(20),
                ultimo_grado_estudios TEXT,
                empleo_actual TEXT,
                linea_investigacion TEXT,
                nacionalidad VARCHAR(100),
                fecha_nacimiento DATE,
                password VARCHAR(255),
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                origen VARCHAR(50),
                archivo_procesado VARCHAR(255)
            )
        """)
        
        conn.commit()
        cur.close()
        conn.close()
        
    except Exception as e:
        if conn:
            conn.close()
        raise Exception(f"Error al inicializar la base de datos: {str(e)}") 