import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Persona {
  id: number;
  nombre: string;
  edad: number;
  email: string;
}

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent {
  // Formulario reactivo
  personaForm: FormGroup;

  // Array de personas (simulando una base de datos)
  personas: Persona[] = [];

  // Para saber si estamos editando o creando
  editMode = false;
  currentPersonaId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Método para agregar o editar una persona
  guardarPersona() {
    if (this.personaForm.invalid) {
      return;
    }

    const nuevaPersona: Persona = {
      id: this.editMode ? this.currentPersonaId! : this.personas.length + 1,
      ...this.personaForm.value
    };

    if (this.editMode) {
      const index = this.personas.findIndex(p => p.id === nuevaPersona.id);
      this.personas[index] = nuevaPersona;
    } else {
      this.personas.push(nuevaPersona);
    }

    this.resetFormulario();
  }

  // Método para editar una persona
  editarPersona(persona: Persona) {
    this.editMode = true;
    this.currentPersonaId = persona.id;
    this.personaForm.setValue({
      nombre: persona.nombre,
      edad: persona.edad,
      email: persona.email
    });
  }

  // Método para eliminar una persona
  eliminarPersona(id: number) {
    this.personas = this.personas.filter(p => p.id !== id);
  }

  // Método para reiniciar el formulario
  resetFormulario() {
    this.personaForm.reset();
    this.editMode = false;
    this.currentPersonaId = null;
  }
}