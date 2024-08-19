async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'POST', // или 'POST', в зависимости от вашего API
            headers: {
                'Content-Type': 'application/json',
                // Добавьте другие заголовки, если необходимо
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Возвращаем полученные данные
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
}