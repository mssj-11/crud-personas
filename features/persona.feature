Feature: CRUD de Personas

  Scenario: Agregar una persona correctamente
    Given el usuario está en la página de personas
    When llena el formulario con "Juan Pérez", 30, "juan@example.com"
    And envía el formulario
    Then la persona "Juan Pérez" debe aparecer en la lista

  Scenario: No permitir agregar persona con datos inválidos
    Given el usuario está en la página de personas
    When llena el formulario con "5", 17, "correo-invalido"
    And envía el formulario
    Then la cantidad de personas no debe aumentar

  Scenario: Eliminar una persona de la lista
    Given el usuario ha agregado "María López" con edad 28 y email "maria@example.com"
    When elimina a "María López"
    Then la persona "María López" no debe aparecer en la lista
