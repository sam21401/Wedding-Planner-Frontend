<template>
    <section class="task-organizer-section">
      <div class="container">

  
        <!-- Widok dla zalogowanych użytkowników -->
        <transition name="fade">
          <div v-if="isLoggedIn" class="logged-in-view">
            <!-- Nagłówek i dodawanie zadań -->
            <div class="header-section">
              <h1>Organizator Zadań</h1>
              <div class="add-task">
                <input
                  type="text"
                  v-model="newTask"
                  placeholder="Dodaj nowe zadanie..."
                  @keyup.enter="addTask"
                  class="add-task-input"
                />
                <button @click="addTask" class="btn btn-primary">
                  <i class="fas fa-plus"></i> Dodaj
                </button>
              </div>
            </div>
  
            <!-- Filtry -->
            <div class="filters">
              <button
                v-for="filter in filters"
                :key="filter.id"
                @click="setFilter(filter.value)"
                :class="{ active: currentFilter === filter.value }"
                class="btn btn-filter"
              >
                {{ filter.label }}
              </button>
            </div>
  
            <!-- Lista zadań -->
            <ul class="task-list">
              <li
                v-for="task in filteredTasks"
                :key="task.id"
                :class="{ completed: task.completed }"
              >
                <div class="task-item">
                  <input
                    type="checkbox"
                    v-model="task.completed"
                    class="task-checkbox"
                  />
                  <span class="task-name" @dblclick="editTask(task)">
                    {{ task.name }}
                  </span>
                  <div class="task-actions">
                    <button
                      @click="deleteTask(task.id)"
                      class="btn btn-remove-task"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
  
          <!-- Reklama dla niezalogowanych -->
          <div v-else class="task-organizer-promo text-justify">
            <h1>Zarządzaj swoimi zadaniami z łatwością!</h1>
            <p>
              Zarejestruj się, aby korzystać z naszego organizatora zadań.
              Twórz, edytuj i śledź swoje zadania w jednym miejscu.
            </p>
            <img
              src="/images/TaskOrganizer.png"
              class="img-fluid"
              alt="Organizator zadań"
            />
          </div>
        </transition>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  
  // Symulacja logowania/wylogowania
  const isLoggedIn = ref(false);
  
  function toggleLogin() {
    isLoggedIn.value = !isLoggedIn.value;
  }
  
  // Dane zadań
  interface Task {
    id: number;
    name: string;
    completed: boolean;
  }
  
  const tasks = ref<Task[]>([
    { id: 1, name: "Zarezerwuj salę weselną", completed: true },
    { id: 2, name: "Zamów zaproszenia", completed: false },
    { id: 3, name: "Skontaktuj się z fotografem", completed: false },
  ]);
  
  const newTask = ref("");
  
  // Dodawanie zadania
  let nextTaskId = tasks.value.length + 1;
  
  function addTask() {
    if (newTask.value.trim() === "") return;
    tasks.value.push({
      id: nextTaskId,
      name: newTask.value.trim(),
      completed: false,
    });
    newTask.value = "";
    nextTaskId++;
  }
  
  // Usuwanie zadania
  function deleteTask(taskId: number) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  }
  
  // Filtry zadań
  const filters = ref([
    { id: 1, label: "Wszystkie", value: "all" },
    { id: 2, label: "Aktywne", value: "active" },
    { id: 3, label: "Ukończone", value: "completed" },
  ]);
  
  const currentFilter = ref("all");
  
  function setFilter(filter: string) {
    currentFilter.value = filter;
  }
  
  // Filtracja zadań
  const filteredTasks = computed(() => {
    if (currentFilter.value === "active") {
      return tasks.value.filter((task) => !task.completed);
    } else if (currentFilter.value === "completed") {
      return tasks.value.filter((task) => task.completed);
    } else {
      return tasks.value;
    }
  });
  
  // Edycja zadania
  function editTask(task: Task) {
    const newName = prompt("Edytuj zadanie:", task.name);
    if (newName !== null && newName.trim() !== "") {
      task.name = newName.trim();
    }
  }
  </script>
  
  <style scoped>
  .task-organizer-section {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .auth-simulation {
    margin-bottom: 20px;
    text-align: right;
  }
  
  .btn-toggle {
    background-color: #6b1c92;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-toggle:hover {
    background-color: #5a167e;
  }
  
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .add-task {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .add-task-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }
  
  .add-task-input:focus {
    border-color: #6b1c92;
    outline: none;
  }
  
  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .btn-filter {
    background-color: #ccc;
    color: #333;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-filter.active {
    background-color: #6b1c92;
    color: white;
  }
  
  .task-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: white;
    transition: background-color 0.3s ease;
  }
  
  .task-item.completed {
    text-decoration: line-through;
    background-color: #e9e9e9;
  }
  
  .task-name {
    flex: 1;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .task-actions {
    display: flex;
    gap: 5px;
  }
  
  .btn-remove-task {
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
  }
  
  .btn-remove-task:hover {
    color: #a71d2a;
  }
  
  .task-organizer-promo {
    margin-top: 40px;
    animation: fadeIn 1s ease-in-out;
  }
  
  .task-organizer-promo h1 {
    font-size: 2rem;
    color: #6b1c92;
    margin-bottom: 20px;
  }
  
  .task-organizer-promo p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: #555;
  }
  
  .img-fluid {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    background-color: #6b1c92;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .btn-secondary {
    background-color: #ccc;
    color: #333;
  }
  
  .btn-primary:hover {
    background-color: #5a167e;
  }
  
  .btn-secondary:hover {
    background-color: #b3b3b3;
  }
  </style>
  