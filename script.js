/* =========================================================
   SALUD 360
   FUNCIONALIDAD PRINCIPAL
========================================================= */

/* =========================================================
   DATOS
========================================================= */

let medications =
  JSON.parse(localStorage.getItem('salud360_medications')) || [];

let appointments =
  JSON.parse(localStorage.getItem('salud360_appointments')) || [];

let exams = JSON.parse(localStorage.getItem('salud360_exams')) || [];

let symptoms = JSON.parse(localStorage.getItem('salud360_symptoms')) || [];

/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const welcomeScreen = document.getElementById('welcomeScreen');

const appScreen = document.getElementById('appScreen');

const enterAppBtn = document.getElementById('enterAppBtn');

/* =========================================================
   ENTRAR A LA APLICACIÓN
========================================================= */

// ==========================================
// SALUD 360 - ACCESO DEMOSTRATIVO
// ==========================================

const pantallaBienvenida = document.getElementById('welcomeScreen');
const pantallaApp = document.getElementById('appScreen');

const panelLogin = document.getElementById('loginPanel');
const panelRegistro = document.getElementById('registerPanel');

const tabLogin = document.getElementById('showLoginBtn');
const tabRegistro = document.getElementById('showRegisterBtn');

// Cambiar entre las pantallas de acceso

function mostrarFormularioAcceso(modo) {
  const esRegistro = modo === 'registro';

  panelLogin.classList.toggle('hidden', esRegistro);
  panelRegistro.classList.toggle('hidden', !esRegistro);

  tabLogin.classList.toggle('active', !esRegistro);
  tabRegistro.classList.toggle('active', esRegistro);
}

tabLogin.addEventListener('click', function () {
  mostrarFormularioAcceso('login');
});

tabRegistro.addEventListener('click', function () {
  mostrarFormularioAcceso('registro');
});

document
  .getElementById('loginToRegister')
  .addEventListener('click', function () {
    mostrarFormularioAcceso('registro');
  });

document
  .getElementById('registerToLogin')
  .addEventListener('click', function () {
    mostrarFormularioAcceso('login');
  });

// Ingresar al panel principal

function entrarAlPanelSalud360(nombre) {
  const nombreFinal = nombre.trim() || 'Usuario';

  pantallaBienvenida.classList.remove('active');
  pantallaApp.classList.add('active');

  const saludo = document.querySelector('.welcome-user h2');
  const nombrePerfil = document.querySelector('.profile-card h3');
  const avatar = document.querySelector('.profile-avatar');

  if (saludo) {
    saludo.textContent = `Hola, ${nombreFinal} 👋`;
  }

  if (nombrePerfil) {
    nombrePerfil.textContent = nombreFinal;
  }

  if (avatar) {
    const iniciales = nombreFinal
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((palabra) => palabra[0].toUpperCase())
      .join('');

    avatar.textContent = iniciales || 'US';
  }

  if (typeof updateDate === 'function') {
    updateDate();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Registro simulado

document
  .getElementById('registerForm')
  .addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById('registerName').value.trim();
    const contacto = document.getElementById('registerContact').value.trim();

    const clave = document.getElementById('registerPassword').value;
    const confirmar = document.getElementById('registerPasswordConfirm').value;

    if (clave.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (clave !== confirmar) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!nombre || !contacto) {
      alert('Completa tu nombre y correo o celular.');
      return;
    }

    // Solo guardamos el nombre demostrativo en esta sesión.
    // No almacenamos la contraseña ni simulamos una cuenta real.
    sessionStorage.setItem('salud360_demo_nombre', nombre);

    alert('¡Registro de demostración completado! Bienvenido a Salud 360.');

    entrarAlPanelSalud360(nombre);
  });

// Inicio de sesión simulado

document
  .getElementById('loginForm')
  .addEventListener('submit', function (evento) {
    evento.preventDefault();

    const contacto = document.getElementById('loginIdentifier').value.trim();
    const clave = document.getElementById('loginPassword').value;

    if (!contacto || !clave) {
      alert('Ingresa tu correo o celular y tu contraseña.');
      return;
    }

    // No existe aún autenticación real.
    // Aceptamos las credenciales solo para mostrar el prototipo.
    const nombre =
      sessionStorage.getItem('salud360_demo_nombre') ||
      'Usuario de demostración';

    alert('Acceso de demostración. Estás entrando a Salud 360.');

    entrarAlPanelSalud360(nombre);
  });
/* =========================================================
   NAVEGACIÓN
========================================================= */

const navItems = document.querySelectorAll('.nav-item');

const sections = document.querySelectorAll('.app-section');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const sectionId = item.dataset.section;

    sections.forEach((section) => {
      section.classList.remove('active');
    });

    navItems.forEach((nav) => {
      nav.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');

    item.classList.add('active');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});

/* =========================================================
   PERFIL
========================================================= */

document.getElementById('profileBtn').addEventListener('click', () => {
  sections.forEach((section) => {
    section.classList.remove('active');
  });

  document.getElementById('profileSection').classList.add('active');

  navItems.forEach((item) => {
    item.classList.remove('active');
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

/* =========================================================
   FECHA ACTUAL
========================================================= */

function updateDate() {
  const element = document.getElementById('todayDate');

  const today = new Date();

  const formatter = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  element.textContent = formatter.format(today);
}

/* =========================================================
   MOSTRAR / OCULTAR FORMULARIOS
========================================================= */

const showMedicationFormBtn = document.getElementById('showMedicationFormBtn');

const medicationFormContainer = document.getElementById(
  'medicationFormContainer'
);

const cancelMedicationBtn = document.getElementById('cancelMedicationBtn');

showMedicationFormBtn.addEventListener('click', () => {
  medicationFormContainer.classList.remove('hidden');
});

cancelMedicationBtn.addEventListener('click', () => {
  medicationFormContainer.classList.add('hidden');
});

/* =========================================================
   CITAS
========================================================= */

const showAppointmentFormBtn = document.getElementById(
  'showAppointmentFormBtn'
);

const appointmentFormContainer = document.getElementById(
  'appointmentFormContainer'
);

const cancelAppointmentBtn = document.getElementById('cancelAppointmentBtn');

showAppointmentFormBtn.addEventListener('click', () => {
  appointmentFormContainer.classList.remove('hidden');
});

cancelAppointmentBtn.addEventListener('click', () => {
  appointmentFormContainer.classList.add('hidden');
});

/* =========================================================
   EXÁMENES
========================================================= */

const showExamFormBtn = document.getElementById('showExamFormBtn');

const examFormContainer = document.getElementById('examFormContainer');

const cancelExamBtn = document.getElementById('cancelExamBtn');

showExamFormBtn.addEventListener('click', () => {
  examFormContainer.classList.remove('hidden');
});

cancelExamBtn.addEventListener('click', () => {
  examFormContainer.classList.add('hidden');
});

/* =========================================================
   GUARDAR MEDICAMENTO
========================================================= */

document
  .getElementById('medicationForm')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    const medication = {
      id: Date.now(),

      name: document.getElementById('medicationName').value,

      dose: document.getElementById('medicationDose').value,

      frequency: document.getElementById('medicationFrequency').value,

      time: document.getElementById('medicationTime').value,
    };

    medications.push(medication);

    saveData();

    renderMedications();

    updateDashboard();

    document.getElementById('medicationForm').reset();

    medicationFormContainer.classList.add('hidden');

    showToast('Medicamento guardado correctamente.');
  });

/* =========================================================
   GUARDAR CITA
========================================================= */

document
  .getElementById('appointmentForm')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    const appointment = {
      id: Date.now(),

      specialty: document.getElementById('appointmentSpecialty').value,

      doctor: document.getElementById('appointmentDoctor').value,

      date: document.getElementById('appointmentDate').value,

      time: document.getElementById('appointmentTime').value,
    };

    appointments.push(appointment);

    saveData();

    renderAppointments();

    updateDashboard();

    document.getElementById('appointmentForm').reset();

    appointmentFormContainer.classList.add('hidden');

    showToast('Cita guardada correctamente.');
  });

/* =========================================================
   GUARDAR EXAMEN
========================================================= */

document.getElementById('examForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const exam = {
    id: Date.now(),

    name: document.getElementById('examName').value,

    date: document.getElementById('examDate').value,

    status: document.getElementById('examStatus').value,
  };

  exams.push(exam);

  saveData();

  renderExams();

  updateDashboard();

  document.getElementById('examForm').reset();

  examFormContainer.classList.add('hidden');

  showToast('Examen guardado correctamente.');
});

/* =========================================================
   GUARDAR SÍNTOMA
========================================================= */

document.getElementById('symptomForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const intensity = document.querySelector(
    'input[name="symptomIntensity"]:checked'
  );

  const symptom = {
    id: Date.now(),

    name: document.getElementById('symptomName').value,

    intensity: intensity ? intensity.value : '',

    description: document.getElementById('symptomDescription').value,

    date: new Date().toISOString(),
  };

  symptoms.unshift(symptom);

  saveData();

  renderSymptoms();

  updateDashboard();

  document.getElementById('symptomForm').reset();

  showToast('Síntoma registrado correctamente.');
});

/* =========================================================
   GUARDAR EN LOCALSTORAGE
========================================================= */

function saveData() {
  localStorage.setItem('salud360_medications', JSON.stringify(medications));

  localStorage.setItem('salud360_appointments', JSON.stringify(appointments));

  localStorage.setItem('salud360_exams', JSON.stringify(exams));

  localStorage.setItem('salud360_symptoms', JSON.stringify(symptoms));
}

/* =========================================================
   RENDER MEDICAMENTOS
========================================================= */

function renderMedications() {
  const container = document.getElementById('medicationsList');

  if (medications.length === 0) {
    container.innerHTML = `
            <div class="content-card">
                <div class="empty-state">
                    <div class="empty-icon">💊</div>
                    <p>No tienes medicamentos registrados.</p>
                    <span>
                        Agrega tu primer medicamento para comenzar.
                    </span>
                </div>
            </div>
        `;

    return;
  }

  container.innerHTML = medications
    .map(
      (medication) => `

                <article class="data-card">

                    <div class="data-card-header">

                        <div>

                            <h3>
                                ${escapeHTML(medication.name)}
                            </h3>

                            <div class="subtitle">
                                ${escapeHTML(medication.dose)}
                            </div>

                        </div>

                        <button
                            class="delete-button"
                            onclick="deleteMedication(${medication.id})">
                            ×
                        </button>

                    </div>


                    <div class="data-card-body">

                        <div class="detail-row">

                            <span>
                                Frecuencia
                            </span>

                            <span>
                                ${escapeHTML(medication.frequency)}
                            </span>

                        </div>


                        <div class="detail-row">

                            <span>
                                Hora
                            </span>

                            <span>
                                ${escapeHTML(medication.time)}
                            </span>

                        </div>

                    </div>

                </article>

            `
    )
    .join('');
}

/* =========================================================
   ELIMINAR MEDICAMENTO
========================================================= */

window.deleteMedication = function (id) {
  medications = medications.filter((medication) => medication.id !== id);

  saveData();

  renderMedications();

  updateDashboard();

  showToast('Medicamento eliminado.');
};

/* =========================================================
   RENDER CITAS
========================================================= */

function renderAppointments() {
  const container = document.getElementById('appointmentsList');

  if (appointments.length === 0) {
    container.innerHTML = `
            <div class="content-card">
                <div class="empty-state">
                    <div class="empty-icon">📅</div>
                    <p>No tienes citas registradas.</p>
                    <span>
                        Agrega una cita para verla aquí.
                    </span>
                </div>
            </div>
        `;

    return;
  }

  const sorted = [...appointments].sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );

  container.innerHTML = sorted
    .map(
      (appointment) => `

                <article class="data-card">

                    <div class="data-card-header">

                        <div>

                            <h3>
                                ${escapeHTML(appointment.specialty)}
                            </h3>

                            <div class="subtitle">
                                ${escapeHTML(appointment.doctor)}
                            </div>

                        </div>

                        <button
                            class="delete-button"
                            onclick="deleteAppointment(${appointment.id})">
                            ×
                        </button>

                    </div>


                    <div class="data-card-body">

                        <div class="detail-row">

                            <span>
                                Fecha
                            </span>

                            <span>
                                ${formatDate(appointment.date)}
                            </span>

                        </div>


                        <div class="detail-row">

                            <span>
                                Hora
                            </span>

                            <span>
                                ${escapeHTML(appointment.time)}
                            </span>

                        </div>

                    </div>

                </article>

            `
    )
    .join('');
}

/* =========================================================
   ELIMINAR CITA
========================================================= */

window.deleteAppointment = function (id) {
  appointments = appointments.filter((appointment) => appointment.id !== id);

  saveData();

  renderAppointments();

  updateDashboard();

  showToast('Cita eliminada.');
};

/* =========================================================
   RENDER EXÁMENES
========================================================= */

function renderExams() {
  const container = document.getElementById('examsList');

  if (exams.length === 0) {
    container.innerHTML = `
            <div class="content-card">
                <div class="empty-state">
                    <div class="empty-icon">🧪</div>
                    <p>No tienes exámenes registrados.</p>
                    <span>
                        Agrega un examen para realizar seguimiento.
                    </span>
                </div>
            </div>
        `;

    return;
  }

  container.innerHTML = exams
    .map((exam) => {
      const statusClass =
        exam.status === 'Realizado' ? 'status-complete' : 'status-pending';

      return `

                        <article class="data-card">

                            <div class="data-card-header">

                                <div>

                                    <h3>
                                        ${escapeHTML(exam.name)}
                                    </h3>

                                    <div class="subtitle">

                                        ${formatDate(exam.date)}

                                    </div>

                                </div>

                                <button
                                    class="delete-button"
                                    onclick="deleteExam(${exam.id})">
                                    ×
                                </button>

                            </div>


                            <div>

                                <span
                                    class="status-badge ${statusClass}">

                                    ${escapeHTML(exam.status)}

                                </span>

                            </div>

                        </article>

                    `;
    })
    .join('');
}

/* =========================================================
   ELIMINAR EXAMEN
========================================================= */

window.deleteExam = function (id) {
  exams = exams.filter((exam) => exam.id !== id);

  saveData();

  renderExams();

  updateDashboard();

  showToast('Examen eliminado.');
};

/* =========================================================
   RENDER SÍNTOMAS
========================================================= */

function renderSymptoms() {
  const container = document.getElementById('symptomsList');

  if (symptoms.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">❤️</div>
                <p>No tienes síntomas registrados.</p>
                <span>
                    Los registros que agregues aparecerán aquí.
                </span>
            </div>
        `;

    return;
  }

  container.innerHTML = symptoms
    .map(
      (symptom) => `

                <div class="symptom-item">

                    <div class="symptom-content">

                        <strong>
                            ${escapeHTML(symptom.name)}
                        </strong>

                        <p>
                            ${escapeHTML(
                              symptom.description || 'Sin descripción'
                            )}
                        </p>

                        <small>
                            ${formatDateTime(symptom.date)}
                        </small>

                    </div>


                    <span class="intensity">

                        ${escapeHTML(symptom.intensity)}

                    </span>

                </div>

            `
    )
    .join('');
}

/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {
  document.getElementById('homeAppointmentsCount').textContent =
    appointments.length;

  document.getElementById('homeMedicationsCount').textContent =
    medications.length;

  document.getElementById('homeExamsCount').textContent = exams.length;

  document.getElementById('homeSymptomsCount').textContent = symptoms.length;

  renderUpcomingActivities();
}

/* =========================================================
   PRÓXIMAS ACTIVIDADES
========================================================= */

function renderUpcomingActivities() {
  const container = document.getElementById('upcomingActivities');

  const activities = [];

  appointments.forEach((appointment) => {
    activities.push({
      type: 'Cita',

      icon: '📅',

      title: appointment.specialty,

      detail: appointment.doctor,

      date: appointment.date,

      time: appointment.time,
    });
  });

  medications.forEach((medication) => {
    activities.push({
      type: 'Medicamento',

      icon: '💊',

      title: medication.name,

      detail: medication.dose,

      date: null,

      time: medication.time,
    });
  });

  exams.forEach((exam) => {
    activities.push({
      type: 'Examen',

      icon: '🧪',

      title: exam.name,

      detail: exam.status,

      date: exam.date,

      time: '',
    });
  });

  if (activities.length === 0) {
    container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📋
                </div>

                <p>
                    Todavía no tienes actividades registradas.
                </p>

                <span>
                    Agrega una cita, medicamento o examen.
                </span>

            </div>

        `;

    return;
  }

  container.innerHTML = activities
    .slice(0, 6)
    .map(
      (activity) => `

                    <div class="activity-item">

                        <div class="activity-left">

                            <div class="activity-icon">
                                ${activity.icon}
                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(activity.title)}
                                </strong>

                                <span>
                                    ${escapeHTML(activity.type)}
                                    ·
                                    ${escapeHTML(activity.detail)}
                                </span>

                            </div>

                        </div>


                        <div class="activity-date">

                            ${
                              activity.date
                                ? formatDate(activity.date)
                                : activity.time
                            }

                        </div>

                    </div>

                `
    )
    .join('');
}

/* =========================================================
   UTILIDADES
========================================================= */

function formatDate(dateString) {
  if (!dateString) {
    return '';
  }

  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function formatDateTime(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
  const toast = document.getElementById('toast');

  const toastMessage = document.getElementById('toastMessage');

  toastMessage.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* =========================================================
   RENDERIZAR TODO
========================================================= */

function renderAll() {
  renderMedications();

  renderAppointments();

  renderExams();

  renderSymptoms();

  updateDashboard();
}

/* =========================================================
   INICIO
========================================================= */

updateDate();

renderAll();
// ==========================================
// SALUD 360: MODULO DE EXAMENES
// ==========================================

let examenes360 = JSON.parse(localStorage.getItem('salud360_examenes')) || [];

const botonAgregarExamen360 = document.getElementById('showExamFormBtn');

const formularioExamen360 = document.getElementById('examFormContainer');

const botonCancelarExamen360 = document.getElementById('cancelExamBtn');

const formularioDatosExamen360 = document.getElementById('examForm');

botonAgregarExamen360.addEventListener('click', function () {
  formularioExamen360.classList.remove('hidden');
});

botonCancelarExamen360.addEventListener('click', function () {
  formularioExamen360.classList.add('hidden');
});

// Guardar examen
formularioDatosExamen360.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const examen = {
    id: Date.now(),
    nombre: document.getElementById('examName').value.trim(),
    fecha: document.getElementById('examDate').value,
    estado: document.getElementById('examStatus').value,
  };

  examenes360.push(examen);

  localStorage.setItem('salud360_examenes', JSON.stringify(examenes360));

  formularioDatosExamen360.reset();
  formularioExamen360.classList.add('hidden');

  mostrarExamenes360();
  actualizarPanelInicio360();

  alert('Examen registrado correctamente.');
});

// Mostrar exámenes
function mostrarExamenes360() {
  const lista = document.getElementById('examsList');

  if (examenes360.length === 0) {
    lista.innerHTML = `
          <div class="content-card">
              <div class="empty-state">
                  <div class="empty-icon">🧪</div>
                  <p>No tienes exámenes registrados.</p>
                  <span>Agrega tu primer examen para comenzar.</span>
              </div>
          </div>`;
    return;
  }

  lista.innerHTML = examenes360
    .map(function (examen) {
      const claseEstado =
        examen.estado === 'Realizado' ? 'status-complete' : 'status-pending';

      return `
          <article class="data-card">
              <div class="data-card-header">
                  <div>
                      <h3>${escaparTexto360(examen.nombre)}</h3>
                      <div class="subtitle">
                          ${fechaLegible360(examen.fecha)}
                      </div>
                  </div>

                  <button
                      class="delete-button"
                      onclick="eliminarExamen360(${examen.id})"
                      aria-label="Eliminar examen">
                      ×
                  </button>
              </div>

              <span class="status-badge ${claseEstado}">
                  ${escaparTexto360(examen.estado)}
              </span>
          </article>`;
    })
    .join('');
}

// Eliminar examen
window.eliminarExamen360 = function (id) {
  examenes360 = examenes360.filter((examen) => examen.id !== id);

  localStorage.setItem('salud360_examenes', JSON.stringify(examenes360));

  mostrarExamenes360();
  actualizarPanelInicio360();
};

// ==========================================
// SALUD 360: MODULO DE SINTOMAS
// ==========================================

let sintomas360 = JSON.parse(localStorage.getItem('salud360_sintomas')) || [];

const formularioSintomas360 = document.getElementById('symptomForm');

// Guardar síntoma
formularioSintomas360.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const intensidadSeleccionada = document.querySelector(
    'input[name="symptomIntensity"]:checked'
  );

  if (!intensidadSeleccionada) {
    alert('Selecciona la intensidad del síntoma.');
    return;
  }

  const sintoma = {
    id: Date.now(),
    nombre: document.getElementById('symptomName').value,
    intensidad: intensidadSeleccionada.value,
    descripcion: document.getElementById('symptomDescription').value.trim(),
    fecha: new Date().toISOString(),
  };

  sintomas360.unshift(sintoma);

  localStorage.setItem('salud360_sintomas', JSON.stringify(sintomas360));

  formularioSintomas360.reset();

  mostrarSintomas360();
  actualizarPanelInicio360();

  alert('Síntoma registrado correctamente.');
});

// Mostrar síntomas
function mostrarSintomas360() {
  const lista = document.getElementById('symptomsList');

  if (sintomas360.length === 0) {
    lista.innerHTML = `
          <div class="empty-state">
              <div class="empty-icon">❤️</div>
              <p>No tienes síntomas registrados.</p>
              <span>Tus nuevos registros aparecerán aquí.</span>
          </div>`;
    return;
  }

  lista.innerHTML = sintomas360
    .map(function (sintoma) {
      return `
          <div class="symptom-item">
              <div class="symptom-content">
                  <strong>${escaparTexto360(sintoma.nombre)}</strong>

                  <p>
                      ${escaparTexto360(
                        sintoma.descripcion || 'Sin descripción'
                      )}
                  </p>

                  <small>${fechaHoraLegible360(sintoma.fecha)}</small>
              </div>

              <div>
                  <span class="intensity">
                      ${escaparTexto360(sintoma.intensidad)}
                  </span>

                  <button
                      class="delete-button"
                      onclick="eliminarSintoma360(${sintoma.id})"
                      aria-label="Eliminar síntoma">
                      ×
                  </button>
              </div>
          </div>`;
    })
    .join('');
}

// Eliminar síntoma
window.eliminarSintoma360 = function (id) {
  sintomas360 = sintomas360.filter((sintoma) => sintoma.id !== id);

  localStorage.setItem('salud360_sintomas', JSON.stringify(sintomas360));

  mostrarSintomas360();
  actualizarPanelInicio360();
};

// ==========================================
// ACTUALIZAR EL PANEL PRINCIPAL
// ==========================================

function actualizarPanelInicio360() {
  const totalCitas = typeof citas !== 'undefined' ? citas.length : 0;

  const totalMedicamentos =
    typeof medicamentos !== 'undefined' ? medicamentos.length : 0;

  document.getElementById('homeAppointmentsCount').textContent = totalCitas;

  document.getElementById('homeMedicationsCount').textContent =
    totalMedicamentos;

  document.getElementById('homeExamsCount').textContent = examenes360.length;

  document.getElementById('homeSymptomsCount').textContent = sintomas360.length;

  // Preparar las actividades próximas
  const hoy = new Date().toISOString().slice(0, 10);
  const actividades = [];

  if (typeof citas !== 'undefined') {
    citas
      .filter((cita) => cita.fecha >= hoy)
      .forEach((cita) => {
        actividades.push({
          tipo: 'Cita',
          icono: '📅',
          titulo: cita.especialidad,
          detalle: cita.profesional,
          fecha: cita.fecha,
          hora: cita.hora,
        });
      });
  }

  if (typeof medicamentos !== 'undefined') {
    medicamentos.forEach((medicamento) => {
      actividades.push({
        tipo: 'Medicamento',
        icono: '💊',
        titulo: medicamento.nombre,
        detalle: `${medicamento.dosis} · ${medicamento.frecuencia}`,
        fecha: hoy,
        hora: medicamento.hora,
      });
    });
  }

  examenes360
    .filter((examen) => examen.estado === 'Pendiente' && examen.fecha >= hoy)
    .forEach((examen) => {
      actividades.push({
        tipo: 'Examen',
        icono: '🧪',
        titulo: examen.nombre,
        detalle: examen.estado,
        fecha: examen.fecha,
        hora: '23:59',
      });
    });

  actividades.sort((a, b) =>
    `${a.fecha}T${a.hora || '23:59'}`.localeCompare(
      `${b.fecha}T${b.hora || '23:59'}`
    )
  );

  const contenedor = document.getElementById('upcomingActivities');

  if (actividades.length === 0) {
    contenedor.innerHTML = `
          <div class="empty-state">
              <div class="empty-icon">📋</div>
              <p>Todavía no tienes actividades registradas.</p>
              <span>Agrega una cita, medicamento o examen.</span>
          </div>`;
    return;
  }

  contenedor.innerHTML = actividades
    .slice(0, 6)
    .map(
      (actividad) => `
          <div class="activity-item">
              <div class="activity-left">
                  <div class="activity-icon">
                      ${actividad.icono}
                  </div>

                  <div>
                      <strong>
                          ${escaparTexto360(actividad.titulo)}
                      </strong>

                      <span>
                          ${escaparTexto360(actividad.tipo)}
                          ·
                          ${escaparTexto360(actividad.detalle)}
                      </span>
                  </div>
              </div>

              <div class="activity-date">
                  ${fechaLegible360(actividad.fecha)}
                  ${
                    actividad.hora
                      ? ' · ' + escaparTexto360(actividad.hora)
                      : ''
                  }
              </div>
          </div>`
    )
    .join('');
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

function escaparTexto360(valor) {
  return String(valor ?? '').replace(
    /[&<>"']/g,
    (caracter) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      }[caracter])
  );
}

function fechaLegible360(valor) {
  if (!valor) return '';

  const fecha = new Date(`${valor}T00:00:00`);

  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(fecha);
}

function fechaHoraLegible360(valor) {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(valor));
}

// ==========================================
// SINCRONIZAR EL RESUMEN
// ==========================================

// Mantener Inicio actualizado al guardar citas
document
  .getElementById('appointmentForm')
  .addEventListener('submit', function () {
    actualizarPanelInicio360();
  });

// Mantener Inicio actualizado al guardar medicamentos
document
  .getElementById('medicationForm')
  .addEventListener('submit', function () {
    actualizarPanelInicio360();
  });

// Actualizar Inicio cuando se elimine una cita
if (typeof window.eliminarCita === 'function') {
  const eliminarCitaAnterior360 = window.eliminarCita;

  window.eliminarCita = function (id) {
    eliminarCitaAnterior360(id);
    actualizarPanelInicio360();
  };
}

// Actualizar Inicio cuando se elimine un medicamento
if (typeof window.eliminarMedicamento === 'function') {
  const eliminarMedicamentoAnterior360 = window.eliminarMedicamento;

  window.eliminarMedicamento = function (id) {
    eliminarMedicamentoAnterior360(id);
    actualizarPanelInicio360();
  };
}

// Cargar los registros al iniciar
mostrarExamenes360();
mostrarSintomas360();
actualizarPanelInicio360();
// ==========================================
// SALUD 360 - RECORDATORIOS DE CITAS
// ==========================================

(function () {
  // Evitar duplicar el botón si ya existe
  if (document.getElementById('enableAppointmentNotificationsBtn')) {
    return;
  }

  const tarjeta = document.querySelector('.alert-card');

  if (!tarjeta) {
    console.warn('No se encontró la tarjeta de recordatorios.');
    return;
  }

  // Crear botón
  const boton = document.createElement('button');

  boton.id = 'enableAppointmentNotificationsBtn';
  boton.type = 'button';
  boton.className = 'primary-button';
  boton.textContent = 'Activar recordatorios de citas';
  boton.style.width = '100%';
  boton.style.marginTop = '14px';

  tarjeta.appendChild(boton);

  // Nota sobre el funcionamiento
  const nota = document.createElement('p');

  nota.textContent =
    'Las notificaciones de prueba requieren que la aplicación esté abierta.';

  nota.style.fontSize = '12px';
  nota.style.color = '#718096';
  nota.style.marginTop = '10px';

  tarjeta.appendChild(nota);

  // Solicitar permiso solamente después del clic del usuario
  boton.addEventListener('click', async function () {
    if (!('Notification' in window)) {
      alert(
        'Este navegador no admite notificaciones. ' +
          'Puedes seguir consultando tus citas dentro de Salud 360.'
      );
      return;
    }

    let permiso = Notification.permission;

    if (permiso !== 'granted') {
      permiso = await Notification.requestPermission();
    }

    if (permiso !== 'granted') {
      alert(
        'No se activaron las notificaciones. ' +
          'Puedes habilitarlas desde los permisos del navegador.'
      );
      return;
    }

    localStorage.setItem('salud360_notificaciones_citas', 'activadas');

    boton.textContent = '✓ Recordatorios activados';

    alert(
      '¡Listo! Salud 360 puede avisarte sobre tus citas ' +
        'mientras la aplicación permanezca abierta.'
    );
  });

  // Comprobar citas próximas
  function revisarCitas() {
    if (
      !('Notification' in window) ||
      Notification.permission !== 'granted' ||
      localStorage.getItem('salud360_notificaciones_citas') !== 'activadas'
    ) {
      return;
    }

    const citas = JSON.parse(localStorage.getItem('salud360_citas') || '[]');

    const ahora = new Date();

    citas.forEach(function (cita) {
      const fecha = cita.fecha || cita.date;
      const hora = cita.hora || cita.time;

      if (!fecha || !hora) {
        return;
      }

      const fechaCita = new Date(`${fecha}T${hora}`);

      if (Number.isNaN(fechaCita.getTime())) {
        return;
      }

      const minutosRestantes = (fechaCita.getTime() - ahora.getTime()) / 60000;

      // Avisar en la ventana de 30 minutos previos
      if (minutosRestantes > 29 && minutosRestantes <= 30) {
        const identificador = ['salud360_aviso', cita.id, fecha, hora].join(
          '_'
        );

        if (localStorage.getItem(identificador)) {
          return;
        }

        const especialidad =
          cita.especialidad || cita.specialty || 'tu cita médica';

        new Notification('Salud 360 · Próxima cita', {
          body: `Recuerda que en 30 minutos tienes: ${especialidad}.`,
          tag: identificador,
        });

        localStorage.setItem(identificador, 'enviado');
      }
    });
  }

  // Revisar cada 15 segundos mientras la página esté abierta
  if (window.salud360IntervaloCitas) {
    clearInterval(window.salud360IntervaloCitas);
  }

  window.salud360IntervaloCitas = setInterval(revisarCitas, 15000);
})();
// ==========================================
// SALUD 360 - RECORDATORIOS DE MEDICAMENTOS
// ==========================================

(function () {
  // Comprobar si el navegador admite notificaciones
  if (!('Notification' in window)) {
    console.warn('Este navegador no admite notificaciones.');
    return;
  }

  function revisarRecordatoriosMedicamentos() {
    // Solo funcionan tras conceder el permiso
    // y activar los recordatorios en Salud 360.
    if (
      Notification.permission !== 'granted' ||
      localStorage.getItem('salud360_notificaciones_citas') !== 'activadas'
    ) {
      return;
    }

    const medicamentos = JSON.parse(
      localStorage.getItem('salud360_medicamentos') || '[]'
    );

    const ahora = new Date();

    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');

    const fechaHoy = `${anio}-${mes}-${dia}`;

    const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();

    medicamentos.forEach(function (medicamento, indice) {
      const nombre = medicamento.nombre || medicamento.name || 'Medicamento';

      const dosis = medicamento.dosis || medicamento.dose || '';

      const frecuencia = medicamento.frecuencia || medicamento.frequency || '';

      const hora = medicamento.hora || medicamento.time || '';

      if (!hora || !frecuencia) {
        return;
      }

      // Convertir la frecuencia a minutos.
      // "Según indicación médica" no se programa
      // automáticamente porque no define un horario.
      let intervalo;

      if (frecuencia === 'Una vez al día') {
        intervalo = 1440;
      } else if (frecuencia === 'Cada 8 horas') {
        intervalo = 480;
      } else if (frecuencia === 'Cada 12 horas') {
        intervalo = 720;
      } else {
        return;
      }

      const partesHora = hora.split(':');

      const horaInicial = Number(partesHora[0]);
      const minutoInicial = Number(partesHora[1]);

      if (
        !Number.isInteger(horaInicial) ||
        !Number.isInteger(minutoInicial) ||
        horaInicial < 0 ||
        horaInicial > 23 ||
        minutoInicial < 0 ||
        minutoInicial > 59
      ) {
        return;
      }

      const primeraToma = horaInicial * 60 + minutoInicial;

      const numeroTomas = 1440 / intervalo;

      for (let i = 0; i < numeroTomas; i++) {
        const minutoProgramado = (primeraToma + i * intervalo) % 1440;

        // Avisar durante el primer minuto
        // del horario programado.
        if (minutosAhora !== minutoProgramado || ahora.getSeconds() >= 60) {
          continue;
        }

        const identificadorMedicamento =
          medicamento.id || nombre + '_' + indice;

        const claveAviso = [
          'salud360_medicamento_aviso',
          identificadorMedicamento,
          fechaHoy,
          String(minutoProgramado),
        ].join('_');

        // Evitar repetir la misma alerta
        if (localStorage.getItem(claveAviso)) {
          continue;
        }

        new Notification('Salud 360 · Recordatorio', {
          body:
            `Revisa tu horario programado para ${nombre}` +
            (dosis ? ` (${dosis})` : '') +
            '. Sigue la indicación de tu profesional de salud.',
          tag: claveAviso,
        });

        localStorage.setItem(claveAviso, 'enviado');
      }
    });
  }

  // Evitar crear varios temporizadores si el código
  // se ejecuta nuevamente en la misma página.
  if (window.salud360IntervaloMedicamentos) {
    clearInterval(window.salud360IntervaloMedicamentos);
  }

  revisarRecordatoriosMedicamentos();

  window.salud360IntervaloMedicamentos = setInterval(
    revisarRecordatoriosMedicamentos,
    15000
  );
})();
// ==========================================
// SALUD 360 - CALENDARIO VISUAL
// ==========================================

(function () {
  const menu = document.querySelector('.bottom-nav');
  const contenido = document.querySelector('.main-content');

  if (!menu || !contenido || document.getElementById('calendarSection')) {
    return;
  }

  // Crear el botón del calendario
  const boton = document.createElement('button');
  boton.className = 'nav-item';
  boton.dataset.section = 'calendarSection';
  boton.innerHTML = '<span>🗓️</span><small>Calendario</small>';
  menu.appendChild(boton);

  // Crear la pantalla
  const pantalla = document.createElement('section');
  pantalla.id = 'calendarSection';
  pantalla.className = 'app-section';

  pantalla.innerHTML = `
      <div class="page-title">
          <div>
              <span class="small-label">ORGANIZACIÓN</span>
              <h2>Calendario de salud</h2>
              <p>Consulta tus citas y exámenes en un solo lugar.</p>
          </div>
      </div>

      <div class="content-card">
          <div class="calendar-toolbar">
              <button id="calendarPrev" class="secondary-button"
                  aria-label="Mes anterior">‹</button>

              <h3 id="calendarMonthLabel"></h3>

              <button id="calendarNext" class="secondary-button"
                  aria-label="Mes siguiente">›</button>
          </div>

          <div class="calendar-legend">
              <span><i class="calendar-dot appointment-dot"></i> Citas</span>
              <span><i class="calendar-dot exam-dot"></i> Exámenes</span>
          </div>

          <div id="calendarGrid" class="calendar-grid"></div>
      </div>

      <div class="content-card">
          <span class="small-label">AGENDA</span>
          <h3>Actividades del mes</h3>
          <div id="calendarEventList"></div>
      </div>
  `;

  contenido.appendChild(pantalla);

  // Estilos específicos del calendario
  const estilos = document.createElement('style');

  estilos.textContent = `
      .bottom-nav .nav-item {
          max-width: 16.6667%;
      }

      .calendar-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
      }

      .calendar-toolbar h3 {
          text-align: center;
          text-transform: capitalize;
      }

      .calendar-legend {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 18px;
          font-size: 13px;
          color: var(--text-light);
      }

      .calendar-legend span {
          display: flex;
          align-items: center;
          gap: 7px;
      }

      .calendar-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
      }

      .appointment-dot {
          background: #4f86c6;
      }

      .exam-dot {
          background: #e7a23b;
      }

      .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 6px;
      }

      .calendar-weekday {
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-light);
          padding: 8px 0;
      }

      .calendar-day {
          min-width: 0;
          min-height: 88px;
          padding: 8px 5px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: #fff;
      }

      .calendar-day.empty {
          background: #f8fbfc;
          border-color: transparent;
      }

      .calendar-day.today {
          border: 2px solid var(--primary);
      }

      .calendar-day-number {
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 7px;
      }

      .calendar-chip {
          display: block;
          font-size: 10px;
          padding: 4px;
          border-radius: 5px;
          margin-top: 4px;
          overflow-wrap: anywhere;
      }

      .calendar-chip.appointment {
          background: #edf5fc;
          color: #35699a;
      }

      .calendar-chip.exam {
          background: #fff5df;
          color: #98650c;
      }

      .calendar-event-row {
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
      }

      .calendar-event-row:last-child {
          border-bottom: none;
      }

      .calendar-event-row strong {
          display: block;
          margin-bottom: 5px;
      }

      .calendar-event-row p {
          font-size: 13px;
          color: var(--text-light);
          line-height: 1.5;
      }

      @media (max-width: 680px) {
          .bottom-nav .nav-item {
              max-width: none;
              width: auto;
              flex: 1;
          }

          .calendar-grid {
              gap: 3px;
          }

          .calendar-day {
              min-height: 65px;
              padding: 4px 2px;
              border-radius: 6px;
          }

          .calendar-day-number {
              font-size: 11px;
          }

          .calendar-chip {
              font-size: 9px;
              padding: 3px 2px;
          }

          .calendar-weekday {
              font-size: 10px;
          }
      }
  `;

  document.head.appendChild(estilos);

  // Mes inicial
  let mesActual = new Date();
  mesActual = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);

  function escapar(valor) {
    return String(valor ?? '').replace(
      /[&<>"']/g,
      (letra) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;',
        }[letra])
    );
  }

  function fechaLocal(fecha) {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, '0');
    const d = String(fecha.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function fechaBonita(fecha) {
    if (!fecha) return 'Fecha no especificada';

    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${fecha}T00:00:00`));
  }

  function obtenerActividades() {
    // Leer datos de las distintas versiones de Salud 360
    function leerRegistros(claves) {
      for (const clave of claves) {
        try {
          const datos = JSON.parse(localStorage.getItem(clave) || '[]');

          if (Array.isArray(datos) && datos.length > 0) {
            return datos;
          }
        } catch (error) {
          console.warn('No se pudieron leer:', clave);
        }
      }

      return [];
    }

    const citas = leerRegistros(['salud360_citas', 'salud360_appointments']);

    const examenes = leerRegistros(['salud360_examenes', 'salud360_exams']);

    const actividadesCitas = citas.map((cita) => ({
      tipo: 'Cita',
      fecha: String(cita.fecha || cita.date || '').slice(0, 10),
      hora: cita.hora || cita.time || '',
      titulo: cita.especialidad || cita.specialty || 'Cita médica',
      detalle: cita.profesional || cita.doctor || '',
      clase: 'appointment',
    }));

    const actividadesExamenes = examenes.map((examen) => ({
      tipo: 'Examen',
      fecha: String(examen.fecha || examen.date || '').slice(0, 10),
      hora: '',
      titulo: examen.nombre || examen.name || 'Examen médico',
      detalle: examen.estado || examen.status || 'Pendiente',
      clase: 'exam',
    }));

    return [...actividadesCitas, ...actividadesExamenes].filter((actividad) =>
      /^\d{4}-\d{2}-\d{2}$/.test(actividad.fecha)
    );
  }
  function dibujarCalendario() {
    const cuadricula = document.getElementById('calendarGrid');
    const etiquetaMes = document.getElementById('calendarMonthLabel');
    const lista = document.getElementById('calendarEventList');

    const anio = mesActual.getFullYear();
    const mes = mesActual.getMonth();

    etiquetaMes.textContent = new Intl.DateTimeFormat('es-CO', {
      month: 'long',
      year: 'numeric',
    }).format(mesActual);

    const actividades = obtenerActividades();

    const inicio = (new Date(anio, mes, 1).getDay() + 6) % 7;
    const cantidadDias = new Date(anio, mes + 1, 0).getDate();
    const hoy = fechaLocal(new Date());

    let html = `
          <div class="calendar-weekday">Lun</div>
          <div class="calendar-weekday">Mar</div>
          <div class="calendar-weekday">Mié</div>
          <div class="calendar-weekday">Jue</div>
          <div class="calendar-weekday">Vie</div>
          <div class="calendar-weekday">Sáb</div>
          <div class="calendar-weekday">Dom</div>
      `;

    for (let i = 0; i < inicio; i++) {
      html += '<div class="calendar-day empty"></div>';
    }

    for (let dia = 1; dia <= cantidadDias; dia++) {
      const fecha = fechaLocal(new Date(anio, mes, dia));

      const delDia = actividades.filter(
        (actividad) => actividad.fecha === fecha
      );

      const claseHoy = fecha === hoy ? 'today' : '';

      html += `
              <div class="calendar-day ${claseHoy}">
                  <div class="calendar-day-number">${dia}</div>
                  ${delDia
                    .slice(0, 2)
                    .map(
                      (actividad) => `
                      <span class="calendar-chip ${actividad.clase}"
                          title="${escapar(actividad.titulo)}">
                          ${actividad.clase === 'appointment' ? '📅' : '🧪'}
                          ${escapar(actividad.titulo)}
                      </span>
                  `
                    )
                    .join('')}
                  ${
                    delDia.length > 2
                      ? `<span class="calendar-chip">+${
                          delDia.length - 2
                        } más</span>`
                      : ''
                  }
              </div>
          `;
    }

    cuadricula.innerHTML = html;

    const actividadesMes = actividades
      .filter((actividad) =>
        actividad.fecha.startsWith(
          `${anio}-${String(mes + 1).padStart(2, '0')}`
        )
      )
      .sort((a, b) =>
        `${a.fecha}T${a.hora}`.localeCompare(`${b.fecha}T${b.hora}`)
      );

    if (actividadesMes.length === 0) {
      lista.innerHTML = `
              <div class="empty-state">
                  <div class="empty-icon">🗓️</div>
                  <p>No hay citas ni exámenes en este mes.</p>
                  <span>Cuando registres nuevas actividades, aparecerán aquí.</span>
              </div>
          `;
      return;
    }

    lista.innerHTML = actividadesMes
      .map(
        (actividad) => `
          <div class="calendar-event-row">
              <strong>
                  ${actividad.clase === 'appointment' ? '📅' : '🧪'}
                  ${escapar(actividad.titulo)}
              </strong>
              <p>
                  ${escapar(actividad.tipo)} · ${fechaBonita(actividad.fecha)}
                  ${actividad.hora ? ' · ' + escapar(actividad.hora) : ''}
              </p>
              <p>
                  ${escapar(actividad.detalle)}
              </p>
          </div>
      `
      )
      .join('');
  }

  // Navegar al calendario
  boton.addEventListener('click', function () {
    document.querySelectorAll('.app-section').forEach((seccion) => {
      seccion.classList.remove('active');
    });

    document.querySelectorAll('.nav-item').forEach((item) => {
      item.classList.remove('active');
    });

    pantalla.classList.add('active');
    boton.classList.add('active');

    dibujarCalendario();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document
    .getElementById('calendarPrev')
    .addEventListener('click', function () {
      mesActual = new Date(
        mesActual.getFullYear(),
        mesActual.getMonth() - 1,
        1
      );
      dibujarCalendario();
    });

  document
    .getElementById('calendarNext')
    .addEventListener('click', function () {
      mesActual = new Date(
        mesActual.getFullYear(),
        mesActual.getMonth() + 1,
        1
      );
      dibujarCalendario();
    });

  dibujarCalendario();
})();
// ==========================================
// CORREGIR NAVEGACION DEL CALENDARIO
// ==========================================

document.addEventListener('click', function (evento) {
  const boton = evento.target.closest('.nav-item[data-section]');

  if (!boton) return;

  const destino = boton.dataset.section;

  setTimeout(function () {
    document.querySelectorAll('.app-section').forEach(function (seccion) {
      const activa = seccion.id === destino;

      seccion.classList.toggle('active', activa);

      // Garantizar que solamente se vea la sección elegida
      seccion.style.display = activa ? 'block' : 'none';
    });

    document.querySelectorAll('.nav-item').forEach(function (elemento) {
      elemento.classList.toggle('active', elemento === boton);
    });
  }, 0);
});
