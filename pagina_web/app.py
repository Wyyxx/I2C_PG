from flask import Flask, request, render_template, redirect, url_for, flash
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from config.database import get_db_connection, init_db
from utils.pdf_extractor import extraer_datos_pdf

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'tu_clave_secreta_aqui'  # Necesario para los mensajes flash

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def index():
    mensaje = ""
    if request.method == 'POST':
        if 'file' not in request.files:
            mensaje = "❌ No se envió ningún archivo."
        else:
            archivos = request.files.getlist('file')
            mensajes = []

            for file in archivos:
                if file.filename == '':
                    mensajes.append("⚠️ Uno de los archivos no tiene nombre.")
                    continue
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    path_pdf = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(path_pdf)

                    # Extraer datos del PDF
                    datos = extraer_datos_pdf(path_pdf)
                    
                    # Guardar en la base de datos
                    conn = get_db_connection()
                    cur = conn.cursor()
                    
                    try:
                        # Verificar si ya existe el CURP
                        cur.execute("SELECT id FROM investigadores WHERE curp = %s", (datos.get('curp'),))
                        if cur.fetchone():
                            mensajes.append(f"❌ El CURP {datos.get('curp')} ya está registrado.")
                            continue
                        
                        # Insertar nuevo registro
                        campos = list(datos.keys())
                        valores = [datos[c] if c != 'fecha_nacimiento' else datetime.strptime(datos[c], '%Y-%m-%d') for c in campos]
                        
                        query = f"""
                            INSERT INTO investigadores ({', '.join(campos)})
                            VALUES ({', '.join(['%s' for _ in campos])})
                        """
                        cur.execute(query, tuple(valores))
                        conn.commit()
                        mensajes.append(f"✅ Registro exitoso para {filename}")
                        
                    except Exception as e:
                        mensajes.append(f"❌ Error al procesar {filename}: {str(e)}")
                    finally:
                        cur.close()
                        conn.close()
                else:
                    mensajes.append(f"⚠️ {file.filename} → Archivo no válido.")

            mensaje = "<br>".join(mensajes)

    return render_template('index.html', mensaje=mensaje)

@app.route('/eliminar/<int:id>', methods=['POST'])
def eliminar_registro(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Primero obtenemos el registro para el mensaje
        cur.execute("SELECT nombre_completo FROM investigadores WHERE id = %s", (id,))
        registro = cur.fetchone()
        
        if registro:
            # Eliminamos el registro
            cur.execute("DELETE FROM investigadores WHERE id = %s", (id,))
            conn.commit()
            mensaje = f"✅ Se eliminó exitosamente el registro de {registro[0]}"
        else:
            mensaje = "❌ No se encontró el registro a eliminar"
            
        cur.close()
        conn.close()
        
        return redirect(url_for('registros', mensaje=mensaje))
        
    except Exception as e:
        return redirect(url_for('registros', mensaje=f"❌ Error al eliminar: {str(e)}"))

@app.route('/registros')
def registros():
    mensaje = request.args.get('mensaje', '')
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, no_cvu, curp, nombre_completo, rfc, correo, nacionalidad, 
                fecha_nacimiento, empleo_actual, institucion,
                fecha_registro, nombre_archivo_pdf
        FROM investigadores
    """)
    datos = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('registros.html', datos=datos, mensaje=mensaje)

@app.route('/incompletos')
def incompletos():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, no_cvu, nombre_completo, curp, rfc, correo, nacionalidad, 
                fecha_nacimiento, empleo_actual, institucion,
                fecha_registro, nombre_archivo_pdf
        FROM investigadores
        WHERE curp = 'NO DETECTADO'
    """)
    registros = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('incompletos.html', registros=registros)

@app.route('/eliminar_multiples', methods=['POST'])
def eliminar_multiples():
    try:
        ids = request.form.getlist('ids[]')
        if not ids:
            return redirect(url_for('registros', mensaje="❌ No se seleccionaron registros para eliminar"))

        conn = get_db_connection()
        cur = conn.cursor()
        
        # Obtener los nombres de los registros que se van a eliminar
        placeholders = ','.join(['%s' for _ in ids])
        cur.execute(f"SELECT nombre_completo FROM investigadores WHERE id IN ({placeholders})", tuple(ids))
        nombres = [row[0] for row in cur.fetchall()]
        
        # Eliminar los registros
        cur.execute(f"DELETE FROM investigadores WHERE id IN ({placeholders})", tuple(ids))
        conn.commit()
        
        mensaje = f"✅ Se eliminaron exitosamente {len(ids)} registros: {', '.join(nombres)}"
        
        cur.close()
        conn.close()
        
        return redirect(url_for('registros', mensaje=mensaje))
        
    except Exception as e:
        return redirect(url_for('registros', mensaje=f"❌ Error al eliminar registros: {str(e)}"))

if __name__ == '__main__':
    init_db()
    app.run(debug=True) 