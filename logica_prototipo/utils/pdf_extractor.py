import fitz  # PyMuPDF
import re
from datetime import datetime
from pdf2image import convert_from_path
import pytesseract

# Configuración de Tesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extraer_datos_pdf(path_pdf):
    """
    Extrae datos de un archivo PDF utilizando OCR cuando sea necesario
    """
    texto = extraer_texto(path_pdf)
    lineas = [l.strip() for l in texto.split('\n') if l.strip()]

    datos = {
        "nombre_completo": extraer_nombre_contextual(lineas),
        "curp": extraer_curp_regex(texto),
        "rfc": extraer_rfc(texto, lineas),
        "no_cvu": buscar_linea_valor(lineas, "NO.CVU"),
        "correo": extraer_email(texto),
        "fecha_registro": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "nombre_archivo_pdf": path_pdf.split("\\")[-1]
    }

    return datos

def extraer_texto(path_pdf):
    """
    Extrae texto de un PDF, usando OCR si es necesario
    """
    try:
        doc = fitz.open(path_pdf)
        texto = "\n".join([page.get_text() for page in doc])
        if len(texto.strip()) < 20:
            raise ValueError("Texto muy corto")
        return texto
    except:
        return extraer_texto_ocr(path_pdf)

def extraer_texto_ocr(path_pdf):
    """
    Extrae texto usando OCR (Tesseract)
    """
    texto_final = ""
    try:
        paginas = convert_from_path(path_pdf, dpi=300)
        for imagen in paginas:
            texto = pytesseract.image_to_string(imagen, lang='spa')
            texto_final += texto + "\n"
    except Exception as e:
        texto_final = f"OCR_FAILED: {e}"
    return texto_final

def extraer_nombre_contextual(lineas):
    """
    Extrae el nombre del investigador del texto
    """
    puestos_clave = ["TÉCNICO", "INVESTIGADOR", "TITULAR", "ASOCIADO"]
    for i, linea in enumerate(lineas):
        if "NO.CVU" in linea.upper():
            for offset in range(1, 4):
                if i - offset >= 0:
                    posible = lineas[i - offset].strip()
                    palabras = posible.split()
                    if 2 <= len(palabras) <= 6 and posible.isupper():
                        if not any(p in posible.upper() for p in puestos_clave):
                            return formatear_nombre(posible)
    return "NO DETECTADO"

def extraer_curp_regex(texto):
    """
    Extrae CURP usando expresión regular
    """
    match = re.search(r'\b([A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d)\b', texto)
    return match.group(1) if match else "NO DETECTADO"

def extraer_rfc(texto, lineas):
    """
    Extrae RFC del texto
    """
    match = re.search(r'\b[A-Z&Ñ]{3,4}\d{6}[A-Z0-9]{3}\b', texto)
    return match.group(0) if match else "NO DETECTADO"

def buscar_linea_valor(lineas, etiqueta):
    """
    Busca un valor después de una etiqueta específica
    """
    for i, linea in enumerate(lineas):
        if etiqueta in linea.upper():
            partes = linea.split(":")
            if len(partes) > 1:
                return partes[1].strip()
            elif i + 1 < len(lineas):
                return lineas[i + 1].strip()
    return "NO DETECTADO"

def extraer_email(texto):
    """
    Extrae dirección de correo electrónico
    """
    match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', texto)
    return match.group(0) if match else "NO DETECTADO"

def formatear_nombre(texto):
    """
    Formatea un nombre para tener la primera letra de cada palabra en mayúscula
    """
    return " ".join([w.capitalize() for w in texto.split()]) 