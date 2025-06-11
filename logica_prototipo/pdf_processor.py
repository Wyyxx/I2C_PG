from utils.pdf_extractor import extraer_datos_pdf
from config.database import get_db_connection, init_db
from datetime import datetime

def guardar_en_db(datos):
    """
    Guarda los datos extraídos en la base de datos
    
    Args:
        datos (dict): Diccionario con los datos extraídos del PDF
        
    Returns:
        bool: True si se guardó correctamente, False si hubo error
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Verificar si ya existe el CURP
        if datos.get('curp') != "NO DETECTADO":
            cur.execute("SELECT id FROM investigadores WHERE curp = %s", (datos.get('curp'),))
            if cur.fetchone():
                raise Exception(f"El CURP {datos.get('curp')} ya está registrado.")
        
        # Preparar los campos y valores para la inserción
        campos = list(datos.keys())
        valores = [datos[c] if c != 'fecha_nacimiento' else None for c in campos]
        
        query = f"""
            INSERT INTO investigadores ({', '.join(campos)})
            VALUES ({', '.join(['%s' for _ in campos])})
        """
        cur.execute(query, tuple(valores))
        conn.commit()
        
        cur.close()
        conn.close()
        return True
        
    except Exception as e:
        if conn:
            conn.close()
        raise Exception(f"Error al guardar en la base de datos: {str(e)}")

def procesar_pdf(path_pdf, guardar_db=True):
    """
    Función principal para procesar un archivo PDF y extraer sus datos
    
    Args:
        path_pdf (str): Ruta al archivo PDF a procesar
        guardar_db (bool): Si es True, guarda los datos en la base de datos
        
    Returns:
        dict: Diccionario con los datos extraídos del PDF y el resultado de la operación
    """
    try:
        datos = extraer_datos_pdf(path_pdf)
        
        if guardar_db:
            guardar_en_db(datos)
            
        return {
            "success": True,
            "data": datos,
            "message": "Procesamiento exitoso"
        }
    except Exception as e:
        return {
            "success": False,
            "data": None,
            "message": f"Error al procesar el PDF: {str(e)}"
        }

if __name__ == "__main__":
    # Ejemplo de uso
    import sys
    
    # Inicializar la base de datos
    init_db()
    
    if len(sys.argv) > 1:
        resultado = procesar_pdf(sys.argv[1])
        print("Resultado del procesamiento:")
        print(f"Éxito: {resultado['success']}")
        if resultado['success']:
            for key, value in resultado['data'].items():
                print(f"{key}: {value}")
        else:
            print(f"Error: {resultado['message']}")
    else:
        print("Por favor proporciona la ruta al archivo PDF como argumento.") 