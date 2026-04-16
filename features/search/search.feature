Feature: Búsqueda de libros

  Scenario Outline: Buscar libros
    Given el usuario está en la página de libros
    When busca "<keyword>"
    Then el resultado debe ser "<resultado>"

  Examples:
    | keyword            | resultado        |
    | Git                | true             |
    | Programming        | true             |
    | NoExiste123        | false            |
    | ISTQB Fundamentals | false            |
