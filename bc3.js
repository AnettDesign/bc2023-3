const fs = require('fs');

// Читання JSON з файлу
fs.readFile('exchange_rate.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Помилка при читанні файлу:', err);
    return;
  }

  try {
    const exchangeRates = JSON.parse(data);

    // Перевірка, чи вміст має масив курсів
    if (Array.isArray(exchangeRates)) {
      // Відкриття файлу для запису результатів
      const outputFilePath = 'output.txt';
      fs.open(outputFilePath, 'w', (err, fd) => {
        if (err) {
          console.error('Помилка при відкритті файлу для запису:', err);
          return;
        }

        // Проходимося по курсах та записуємо їх у файл
        exchangeRates.forEach((rate) => {
          const date = rate.exchangedate;
          const rateValue = rate.rate;

          // Формуємо рядок для запису
          const outputLine = `${date}:${rateValue}\n`;

          // Записуємо рядок у файл
          fs.write(fd, outputLine, (err) => {
            if (err) {
              console.error('Помилка при записі до файлу:', err);
            }
          });
        });

        // Закриваємо файл після запису
        fs.close(fd, (err) => {
          if (err) {
            console.error('Помилка при закритті файлу:', err);
          } else {
            console.log(`Результати записано у файл ${outputFilePath}`);
          }
        });
      });
    } else {
      console.error('Вміст JSON не містить масиву курсів.');
    }
  } catch (parseError) {
    console.error('Помилка при парсингу JSON:', parseError);
  }
});
