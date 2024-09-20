function formatDate(dateInput) {
    // Преобразуем входные данные в объект Date
    const date = new Date(dateInput);

    // Проверяем, является ли date корректным объектом Date
    if (isNaN(date.getTime())) {
        return 'Invalid date'; // Если дата некорректная
    }

    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (0-11) и добавляем ведущий ноль
    const year = date.getFullYear(); // Получаем год
    const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль

    return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматируем строку
}

export { formatDate };
