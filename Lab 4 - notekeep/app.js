const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const colorInput = document.getElementById("color-input");
const isPinnedInput = document.getElementById("pinned-input");

const addBtn = document.getElementById("add-button");
const notesList = document.getElementById("notes-list");

class App {
  #notesRepository;

  constructor() {
    this.#notesRepository = new NotesRepository();
  }

  init() {
    this.#notesRepository
      .getAll()
      .forEach(
        (note, index) => (notesList.innerHTML += noteComponent(note, index))
      );

    addBtn.onclick = (e) => this.handleAddNote(e);

    const editButtons = document.querySelectorAll(".edit-button");
    const removeButtons = document.querySelectorAll(".remove-button");

    removeButtons.forEach(
      (btn) => (btn.onclick = (e) => this.handleRemoveNote(e))
    );

    editButtons.forEach((btn) => (btn.onclick = (e) => this.handleEditNote(e)));
  }

  handleAddNote(e) {
    e.preventDefault();

    this.#notesRepository.add(
      new Note(
        titleInput.value,
        contentInput.value,
        colorInput.value,
        isPinnedInput.checked,
        new Date().toJSON().slice(0, 10)
      )
    );
    this.#refreshNotes();
  }

  handleRemoveNote(e) {
    e.preventDefault();

    this.#notesRepository.remove(e.target.dataset.id);
    this.#refreshNotes();
  }

  handleEditNote(e) {
    e.preventDefault();

    const titleInputNote = document.querySelectorAll(".title-note-input");
    const contentInputNote = document.querySelectorAll(".content-note-input");
    const colorInputNote = document.querySelectorAll(".color-note-input");
    const isPinnedInputNote = document.querySelectorAll(".pinned-note-input");

    const title = Array.from(titleInputNote).find(
      (input) => input.dataset.id === e.target.dataset.id
    );

    const content = Array.from(contentInputNote).find(
      (input) => input.dataset.id === e.target.dataset.id
    );

    const color = Array.from(colorInputNote).find(
      (input) => input.dataset.id === e.target.dataset.id
    );

    const pinned = Array.from(isPinnedInputNote).find(
      (input) => input.dataset.id === e.target.dataset.id
    );

    this.#notesRepository.edit(
      e.target.dataset.id,
      new Note(
        title.value,
        content.value,
        color.value,
        pinned.checked,
        new Date().toJSON().slice(0, 10)
      )
    );

    this.#refreshNotes();
  }

  #refreshNotes() {
    notesList.innerHTML = "";

    this.#notesRepository
      .getAll()
      .forEach(
        (note, index) => (notesList.innerHTML += noteComponent(note, index))
      );
  }
}

class NotesRepository {
  constructor() {
    !localStorage.getItem("notes") &&
      localStorage.setItem("notes", this.#serialize([]));
  }

  getAll() {
    return this.#toObject(localStorage.getItem("notes"));
  }

  add(note) {
    const collection = this.#toObject(localStorage.getItem("notes"));
    collection.push(note);
    localStorage.setItem("notes", this.#serialize(collection));
  }

  remove(index) {
    const collection = this.#toObject(localStorage.getItem("notes"));
    collection.splice(index, 1);
    localStorage.setItem("notes", this.#serialize(collection));
  }

  edit(index, newNote) {
    const collection = this.#toObject(localStorage.getItem("notes"));
    collection[index] = newNote;
    localStorage.setItem("notes", this.#serialize(collection));
  }

  #serialize(data) {
    return JSON.stringify(data);
  }

  #toObject(json) {
    return JSON.parse(json);
  }
}

class Note {
  constructor(title, content, color, isPinned, createdAt) {
    this.title = title;
    this.content = content;
    this.color = color;
    this.isPinned = isPinned;
    this.createdAt = createdAt;
  }
}

const noteComponent = (note, index) => `
<form class="note" style="background:${note.color};">
<span>${note.createdAt}</span>
<input
  class="input title-note-input"
  type="text"
  placeholder="title"
  value="${note.title}"
  data-id="${index}"
/>
<textarea
  class="textarea content-note-input"
  placeholder="content"
  data-id="${index}"
>
${note.content}
</textarea>
<input data-id="${index}" class="input color-note-input" type="color" value=${
  note.color
} />
<div>
pin
<input data-id="${index}" class="checkbox pinned-note-input" type="checkbox" ${
  note.isPinned ? "checked" : ""
}/>
</div>
<div class="note__actions">
  <button  data-id="${index}" class="edit-button">edit</button>
  <button  data-id="${index}" class="remove-button">remove</button>
</div>
</form>
`;

const app = new App();
app.init();
