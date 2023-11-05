# movies-explorer-api

# Бэкенд для дипломного проекта Яндекс практикум

# Описание:
Это репозиторий представляет собой сервер для дипломного проекта. API обеспечивает авторизацию и хранение информации о сохраненных фильмах.


#Реализовано:

Взвращает информацию о пользователе (email и имя)
GET /users/me

Обновляет информацию о пользователе (email и имя)
PATCH /users/me

Возвращает все сохранённые текущим пользователем фильмы
GET /movies

Создаёт фильм с переданными в теле:
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
POST /movies

Удаляет сохранённый фильм по id
DELETE /movies/_id 

Создаёт пользователя с переданными в теле
email, password и name
POST /signup

Проверяет переданные в теле почту и пароль и возвращает JWT
POST /signin 


# Ссылки на проект
IP-адрес 84.201.167.122

Backend https://api.artemiszeep.nomoredomainsrocks.ru
