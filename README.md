# Quiz 4 Learn

Aplicación Quiz para Aprendizaje

## Clase JavaScript Quiz.js

- **`loadQuestions(questions)`**: Carga las preguntas y mezcla las opciones automáticamente
- **`getCurrentQuestion()`**: Obtiene la pregunta actual con información adicional
- **`nextQuestion()`**: Avanza a la siguiente pregunta
- **`previousQuestion()`**: Retrocede a la pregunta anterior
- **`selectAnswer(answer)`**: Registra una respuesta y actualiza el score
- **`getStats()`**: Obtiene estadísticas completas del quiz

### Métodos adicionales útiles:

- **`goToQuestion(index)`**: Salta a una pregunta específica
- **`isCurrentQuestionAnswered()`**: Verifica si la pregunta actual ya fue respondida
- **`getCurrentAnswer()`**: Obtiene la respuesta guardada de la pregunta actual
- **`getScorePercentage()`**: Calcula el porcentaje de aciertos
- **`getProgress()`**: Muestra el progreso actual
- **`hasNextQuestion()`** / **`hasPreviousQuestion()`**: Verifica navegación disponible
- **`reset()`**: Reinicia el quiz completo
- **`finish()`**: Finaliza el quiz y retorna estadísticas

### Características:

✅ Compatible con formato OpenTrivia API  
✅ Mezcla automática de opciones  
✅ Historial completo de respuestas  
✅ Sistema de puntuación  
✅ Estadísticas detalladas  
✅ Navegación flexible entre preguntas
