// mover una tarea de pending a completed o viceversa
function moveTask(taskElement) {
    const targetSection = taskElement.parentElement.classList.contains('PENDING') ? '.COMPLETED' : '.PENDING'; // determinamos a que seccion moverla
    const targetContainer = document.querySelector(targetSection);
  
    taskElement.parentElement.removeChild(taskElement); // eliminamos la tarea de la seccion actual
    targetContainer.appendChild(taskElement); // añadimos la tarea a la nueva seccion
  
    adjustContainerHeight(); // ajustamos la altura de los contenedores despues de mover la tarea
}
  
// añadir una nueva tarea a la seccion pending
function addTask() {
    const taskInput = document.getElementById('newTaskInput');
    const taskText = taskInput.value.trim();
  
    if (taskText) {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      
      const taskContent = document.createElement('span');
      taskContent.textContent = taskText;
      taskElement.appendChild(taskContent); // creamos el contenido de la tarea y lo añadimos al elemento
  
      const deleteButton = document.createElement('span');
      deleteButton.classList.add('deleteButton');
      deleteButton.textContent = 'X';
      deleteButton.onclick = function() { deleteTask(taskElement); }; // asignamos la accion de eliminar la tarea
      taskElement.appendChild(deleteButton);
  
      taskElement.onclick = function () { moveTask(this); }; // al hacer clic en la tarea, la movemos
  
      const pendingSection = document.querySelector('.PENDING');
      pendingSection.appendChild(taskElement); // añadimos la nueva tarea a la seccion pending
  
      adjustContainerHeight(); // ajustamos la altura de los contenedores tras añadir la nueva tarea

      taskInput.value = ''; // limpiamos el campo de texto
    }
}
  
// eliminar una tarea de su seccion
function deleteTask(taskElement) {
    taskElement.parentElement.removeChild(taskElement); // eliminamos la tarea del dom
    adjustContainerHeight(); // ajustamos la altura de los contenedores despues de eliminar la tarea
}
  
// ajustamos la altura de las secciones pending y completed segun el contenido
function adjustContainerHeight() {
    const pendingSection = document.querySelector('.PENDING');
    const completedSection = document.querySelector('.COMPLETED');
  
    pendingSection.style.height = 'auto'; // dejamos que el contenedor se ajuste automaticamente
    completedSection.style.height = 'auto';
  
    const pendingHeight = pendingSection.scrollHeight; // obtenemos la altura del contenido de pending
    const completedHeight = completedSection.scrollHeight; // obtenemos la altura del contenido de completed
  
    pendingSection.style.height = `${pendingHeight}px`; // ajustamos la altura del contenedor de pending
    completedSection.style.height = `${completedHeight}px`; // ajustamos la altura del contenedor de completed
}
  
// alternar la visibilidad del contenido informativo en la parte inferior de la pagina
function toggleInfo() {
    const infoContent = document.getElementById('infoContent');
    infoContent.classList.toggle('active'); // añadimos o quitamos la clase active para mostrar u ocultar el contenido
}
  
// eliminar una tarea al hacer clic en el boton de eliminar
function removeTask(event) {
    event.stopPropagation(); // evitamos que se dispare el evento de mover la tarea cuando eliminamos
    event.target.parentElement.remove(); // eliminamos la tarea del dom
}
