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
        
        # Crear tabla de investigadores
        cur.execute("""
            CREATE TABLE IF NOT EXISTS investigadores (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100),
                apellido_paterno VARCHAR(100),
                apellido_materno VARCHAR(100),
                curp VARCHAR(18) UNIQUE,
                rfc VARCHAR(13),
                fecha_nacimiento DATE,
                email VARCHAR(100),
                telefono VARCHAR(10),
                institucion VARCHAR(200),
                departamento VARCHAR(200),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()
        cur.close()
        conn.close()
        
    except Exception as e:
        if conn:
            conn.close()
        raise Exception(f"Error al inicializar la base de datos: {str(e)}") 