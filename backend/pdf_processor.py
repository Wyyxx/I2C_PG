from utils.pdf_extractor import extraer_datos_pdf
from config.database import get_db_connection
from datetime import datetime

def guardar_en_db(datos):
    """
    Guarda los datos extraídos en la base de datos
    
    Args:
        datos (dict): Diccionario con los datos extraídos del PDF
        
    Returns:
        dict: Resultado de la operación
    """
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Verificar si ya existe el CURP
        if datos.get('curp'):
            cur.execute("SELECT id FROM investigadores WHERE curp = %s", (datos.get('curp'),))
            if cur.fetchone():
                return {
                    "success": False,
                    "duplicado": True,
                    "message": f"⚠️ El CURP {datos.get('curp')} ya está registrado en el sistema.",
                    "id": None
                }
        
        # Verificar si ya existe el correo
        if datos.get('correo'):
            cur.execute("SELECT id FROM investigadores WHERE correo = %s", (datos.get('correo'),))
            if cur.fetchone():
                return {
                    "success": False,
                    "duplicado": True,
                    "message": f"⚠️ El correo {datos.get('correo')} ya está registrado en el sistema.",
                    "id": None
                }
        
        # Preparar los campos y valores para la inserción
        campos = list(datos.keys())
        valores = [datos[c] for c in campos]
        
        query = f"""
            INSERT INTO investigadores ({', '.join(campos)})
            VALUES ({', '.join(['%s' for _ in campos])})
            RETURNING id
        """
        cur.execute(query, tuple(valores))
        resultado = cur.fetchone()
        nuevo_id = resultado[0] if resultado else None
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            "success": True,
            "duplicado": False,
            "message": "✅ Registro completado exitosamente",
            "id": nuevo_id
        }
        
    except Exception as e:
        if conn:
            conn.close()
        return {
            "success": False,
            "duplicado": False,
            "message": f"Error al guardar en la base de datos: {str(e)}",
            "id": None
        }

def procesar_pdf(path_pdf, guardar_db=False):
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
            resultado_db = guardar_en_db(datos)
            return {
                "success": resultado_db["success"],
                "data": datos,
                "message": resultado_db["message"],
                "duplicado": resultado_db.get("duplicado", False),
                "id": resultado_db.get("id")
            }
        else:
            return {
                "success": True,
                "data": datos,
                "message": "Datos extraídos exitosamente"
            }
    except Exception as e:
        return {
            "success": False,
            "data": None,
            "message": f"Error al procesar el PDF: {str(e)}"
        } 