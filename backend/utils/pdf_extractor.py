import fitz
import re
from pdf2image import convert_from_path
import pytesseract
from datetime import datetime

def extraer_texto_pdf(path_pdf):
    """
    Extrae todo el texto de un archivo PDF
    
    Args:
        path_pdf (str): Ruta al archivo PDF
        
    Returns:
        str: Texto extraído del PDF
    """
    try:
        # Primero intentamos extraer el texto directamente
        doc = fitz.open(path_pdf)
        texto = ""
        for pagina in doc:
            texto += pagina.get_text()
        doc.close()
        
        # Si no hay texto suficiente, usamos OCR
        if len(texto.strip()) < 100:
            imagenes = convert_from_path(path_pdf)
            texto = ""
            for imagen in imagenes:
                texto += pytesseract.image_to_string(imagen, lang='spa')
                
        return texto
    except Exception as e:
        raise Exception(f"Error al extraer texto del PDF: {str(e)}")

def extraer_datos_pdf(path_pdf):
    """
    Extrae datos específicos de un archivo PDF
    
    Args:
        path_pdf (str): Ruta al archivo PDF
        
    Returns:
        dict: Diccionario con los datos extraídos
    """
    try:
        texto = extraer_texto_pdf(path_pdf)
        
        # Patrones de búsqueda
        patrones = {
            'nombre': r'Nombre[s]?:?\s*([A-ZÁÉÍÓÚÑ\s]+)',
            'apellido_paterno': r'Apellido\s+Paterno:?\s*([A-ZÁÉÍÓÚÑ\s]+)',
            'apellido_materno': r'Apellido\s+Materno:?\s*([A-ZÁÉÍÓÚÑ\s]+)',
            'curp': r'CURP:?\s*([A-Z0-9]{18})',
            'rfc': r'RFC:?\s*([A-Z0-9]{13})',
            'fecha_nacimiento': r'Fecha\s+de\s+Nacimiento:?\s*(\d{2}/\d{2}/\d{4})',
            'email': r'[Cc]orreo\s+[Ee]lectrónico:?\s*(\S+@\S+\.\S+)',
            'telefono': r'Teléfono:?\s*(\d{10})',
            'institucion': r'Institución:?\s*([A-ZÁÉÍÓÚÑ\s]+)',
            'departamento': r'Departamento:?\s*([A-ZÁÉÍÓÚÑ\s]+)'
        }
        
        # Extraer datos
        datos = {}
        for campo, patron in patrones.items():
            match = re.search(patron, texto)
            valor = match.group(1).strip() if match else "NO DETECTADO"
            datos[campo] = valor
            
        # Procesar fecha si existe
        if datos['fecha_nacimiento'] != "NO DETECTADO":
            try:
                fecha = datetime.strptime(datos['fecha_nacimiento'], '%d/%m/%Y')
                datos['fecha_nacimiento'] = fecha.strftime('%Y-%m-%d')
            except:
                datos['fecha_nacimiento'] = None
                
        return datos
        
    except Exception as e:
        raise Exception(f"Error al extraer datos del PDF: {str(e)}") 