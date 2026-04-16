Feature: Login en DemoQA

  @auth
  Scenario: Login exitoso
    Given el usuario navega a la página de login
    When ingresa credenciales válidas
    Then debe acceder al perfil
    
  @auth
  Scenario: Login inválido
    Given el usuario navega a la página de login
    When ingresa credenciales incorrectas
    Then debe ver un mensaje de error