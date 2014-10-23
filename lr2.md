# Разработать запросы выборки информации из таблиц БД с различными условиями

## Оператор выборки на основе декартового произведения таблиц с условиями

### Актеры и фильмы, в которых они играли

Выбор имени, фамилии и названия фильма из таблицы фильмов с перекрестным соединением таблицы людей и перекрестным соединением таблицы актерского состава, с условием равенства идентификаторов человека из таблицы людей и актера из таблицы актерского состава, и, равенства идентификатора фильма из таблиц актерского состава и фильмов.

``` sql
SELECT Person.FirstName, Person.LastName, Film.Name FROM Film
    CROSS JOIN Person
    CROSS JOIN Cast
        WHERE Person.PersonId = Cast.ActorId AND Cast.FilmId = Film.FilmId;
```

### Пользователи и их комментарии к фильмам

Выбор логина пользователя, названия фильма и текста коментария из таблицы фильмов с перекрестным соединением таблицы пользователей и перекрестным соединением таблицы комментариев, с условием равества идентификатора фильма из таблицы комментариев и таблицы фильмов, и, равенства идентификатора пользователя из таблицы комментариев и таблицы пользователей.

``` sql
SELECT Usr.Login, Film.Name, Comment.Text FROM Film
    CROSS JOIN [User] AS Usr
    CROSS JOIN Comment
        WHERE Comment.FilmId = Film.FilmId AND Comment.UserId = Usr.UserId;
```

## Внутреннее соединение таблиц

### Режиссеры и их фильмы

Выбор имени, фамилии режиссера и названия фильма из таблицы людей со внутренним соединением таблицы фильмов по столбцу идентификатора режиссера из таблицы фильмов и идентификатора человека из таблицы людей.

``` sql
SELECT Person.FirstName, Person.LastName, Film.Name FROM Person
    INNER JOIN Film ON Film.DirectorId = Person.PersonId;
```

### Оценки пользователей к фильмам

Выбор имени, фамилии пользователя, рейтинга и названия фильма из таблицы людей со внутренним соединением таблицы пользователей по столбцу идентификатора человека, внутренним соединением таблицы рейтингов по столбцу идентификатора пользователей, и внутренним соединением таблицы фильмов по столбцу идентификатора фильма.

``` sql
SELECT Person.FirstName, Person.LastName, Rating.Value, Film.Name FROM Person
    INNER JOIN [User] AS Usr ON Usr.PersonId = Person.PersonId
    INNER JOIN Rating ON Rating.UserId = Usr.UserId
    INNER JOIN Film ON Film.FilmId = Rating.FilmId;
```

## Внешние соединения таблиц

### Люди, не являющиеся персонажами

Выбор имени, фамилии человека из таблицы людей с левосторонним соединением таблицы персонажей по столбцу идентификатора персонажа, с условием равенства идентификтора персонажа неопределенности.

``` sql
SELECT Person.FirstName, Person.LastName FROM Person
    LEFT JOIN Character ON Character.PersonId = Person.PersonId
        WHERE Character.CharacterId IS NULL;
```

## Соединение таблиц более чем по одному полю

### Фильмы, в которых режиссер был в актерском составе

Выбор всех столбцов из таблицы фильмов со внутренним соединением таблицы актерского состава по столбцам идентификатора фильма и идентификатора актера.

``` sql
SELECT DISTINCT Film.* FROM Film
    INNER JOIN Cast 
        ON Cast.FilmId = Film.FilmId AND Cast.ActorId = Film.DirectorId;
```

## Выборка информации по условию с параметрами

### Выбор американских кинокомпаний

Выбор названия кинокомпании из таблицы кинокомнаний со внутренним соединением таблицы стран по столбцу идентификатора страны, с условием равенства ISO2 кода страны коду США (US).

``` sql
SELECT Company.Name FROM Company
    INNER JOIN Country ON Country.CountryId = Company.CountryId
        WHERE Country.ISOCode = 'US';
```

## Выборка информации со специальными операторами в предикате

### Фильмы, снятые в США и Великобритании

Выбор названия фильма из таблицы фильмов со внутренним соединением таблицы фильм-страна по столбцу идентификатора фильма, внутренним соединением таблицы стран по столбцу идентификатора страны, с условием нахожения названия страны в массиве из названий стран Великобратании и США.

``` sql
SELECT Film.Name FROM Film 
    INNER JOIN FilmCountryList ON FilmCountryList.FilmId = Film.FilmId
    INNER JOIN Country ON Country.CountryId = FilmCountryList.CountryId
        WHERE Country.Name IN ('Великобритания', 'США');
```

## Получение статистической информации на основе функций агрегирования с одним полем и на основе группировки нескольких полей

### Получения списка режиссеров со средним бюджетом их фильмов

Выбор идентификатора, имени человека и средней стоимости фильмов из таблицы людей со внутренним соединением таблицы фильмов по столбцу идентификатора режиссера, с группировкой по идентификатору и имени режиссера.

``` sql
SELECT Person.PersonId, Person.FirstName, AVG(Film.Cost) FROM Person
    INNER JOIN Film ON Film.DirectorId = Person.PersonId
    GROUP BY Person.PersonId, Person.FirstName;
```

## Запросы по косвенно связанным таблицам

### Жанры, и их средние оценки по их фильмам

Выбор названия жанра, среднего рейтинга из таблицы жанров со внутренним соединением таблицы списка жанров по столбцу идентификатора жанра, внутренним соединением таблицы фильмов по столбцу идентификатора фильма и внутренним соединением таблицы рейтинга по столбцу идентификатора фильма, с группировкой по названию жанра и сортировкой по рейтингу.

``` sql
SELECT Genre.Name, AVG(Cast(Rating.Value AS float)) AS Rate FROM Genre
    INNER JOIN GenreList ON GenreList.GenreId = Genre.GenreId
    INNER JOIN Film ON Film.FilmId = GenreList.FilmId
    INNER JOIN Rating ON Rating.FilmId = Film.FilmId
    GROUP BY Genre.Name
    ORDER BY Rate DESC;
```

## Рекурсивные запросы

### Количество повторений имен в таблице людей

Выбор количества индентификаторов людей и их имен из таблицы людей со внутренним соединением таблицы людей по столбцу имени, с группировкой по имени.

``` sql
SELECT COUNT(Person1.PersonId), Person1.FirstName FROM Person AS Person1
    INNER JOIN Person AS Person2 ON Person2.FirstName = Person1.FirstName
    GROUP BY Person1.FirstName;
```

### Выбор актеров и их персонажей

Выбор имени, фамилии персонажа, имени и фамилии актера из таблицы людей со внутренним соединением таблицы персонажей по столбцу иденитификатора человека, со внутренним соединением таблицы актерского состава по столбцу идентификатора персонажа и со внутренним соединением таблицы людей по столбцу иентификатора актера.

``` sql
SELECT Chrct.FirstName, Chrct.LastName, Actor.FirstName, Actor.LastName 
    FROM Person AS Chrct
        INNER JOIN Character ON Character.PersonId = Chrct.PersonId
        INNER JOIN Cast ON Cast.CharacterId = Character.CharacterId
        INNER JOIN Person AS Actor ON Actor.PersonId = Cast.ActorId;
```

## Перекрестные запросы и запросы на объединение, пересечение и вычитание

### Список фильмов и количество их оценок, разбитые по значению оценки

Задание временно именованного результирующего набора фильм-рейтинг из выбора идентификатора, имени фильма и рейтинга из таблицы фильмов со внутренним соединением таблицы рейтинга по столбцу идентификатора фильма.
Выбор всех столбцов из набора фильм-рейтинг c повотором таблицы с выбором количества идентификаторов фильма для оценок в наборе от 0 до 10.

``` sql
WITH FilmRating AS 
    (SELECT Film.FilmId AS FilmId, Film.Name AS Name, Rating.Value AS Mark 
        FROM Film
            INNER JOIN Rating ON Rating.FilmId = Film.FilmId)
SELECT * FROM FilmRating
PIVOT
    (COUNT(FilmRating.FilmId) FOR FilmRating.Mark 
        IN ([0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10])) 
            AS RatingQty;
```

### Объединение названий кинокомпаний и стран

``` sql
SELECT Name FROM Country
UNION
SELECT Name FROM Company;
```

### Вывод тех людей, кто является режиссером и актером

Выбор имени и фамилии из таблицы людей с левосторонним соединением таблицы фильмов по столбцу иентификатора режиссера с условием не пустого столбца идентификатора режиссера; пересечение с выбором имени и фамилии из таблицы людей с левосторонним соединением таблицы актерских составов по столбцу иентификатора актера с условием не пустого столбца идентификатора актера.

``` sql
SELECT Person.FirstName, Person.LastName FROM Person
    LEFT JOIN Film ON Film.DirectorId = Person.PersonId
        WHERE Film.DirectorId IS NOT NULL
INTERSECT
SELECT Person.FirstName, Person.LastName FROM Person
    LEFT JOIN Cast ON Cast.ActorId = Person.PersonId
        WHERE Cast.ActorId IS NOT NULL;
```

### Режиссеры, не являющиеся актерами


Выбор имени и фамилии из таблицы людей с левосторонним соединением таблицы фильмов по столбцу иентификатора режиссера с условием не пустого столбца идентификатора режиссера; вычитание выбора имени и фамилии из таблицы людей с левосторонним соединением таблицы актерских составов по столбцу иентификатора актера с условием не пустого столбца идентификатора актера.

``` sql
SELECT Person.FirstName, Person.LastName FROM Person
    LEFT JOIN Film ON Film.DirectorId = Person.PersonId
        WHERE Film.DirectorId IS NOT NULL
EXCEPT
SELECT Person.FirstName, Person.LastName FROM Person
    LEFT JOIN Cast ON Cast.ActorId = Person.PersonId
        WHERE Cast.ActorId IS NOT NULL;
```

# Разработать запросы модификации данных

## Вставка новой записи в таблицу

### Добавление возрастных ограничений в таблицу

Вставка в таблицу возрастных ограничений значений PG, PG-13, R.

``` sql
INSERT INTO AgeRestriction VALUES ('PG'), ('PG-13'), ('R');
```

## Вставка множества записей в таблицу

### Добавление стран и их ISO2 кодов в таблицу стран
``` sql
INSERT INTO Country VALUES 
    ('Украина', 'UA'),
    ('Нидерланды', 'NL');
```

## Создание таблицы

### Таблица возрастных ограничений

Создание таблицы возрастных ограничений с автовозрастающим идентификатором возрастного ограничения, со значением возрастного ограничения, с первичным ключом по столбцу идентификатора возрастного ограничения.

``` sql
CREATE TABLE AgeRestriction 
(
    AgeRestrictionId INT NOT NULL IDENTITY(1, 1),
    Restriction VARCHAR(32) NOT NULL,
    CONSTRAINT PK_AgeRestriction PRIMARY KEY CLUSTERED 
    (
        AgeRestrictionId ASC
    )
);
```

## Создание таблицы на основе выборки

### Таблица с фильмами и актерами, в которых они играли
``` sql
SELECT Person.FirstName, Person.LastName, Film.Name INTO FilmActor 
    FROM Person
        INNER JOIN Cast ON Cast.ActorId = Person.PersonId
        INNER JOIN Film ON Film.FilmId = Cast.FilmId;
```

## Изменение данных в таблице

### Уменьшение рейтинга на 1 если он больше 5

Обновление таблицы рейтингов задать значение на 1 меньше при условии значения большего пяти.

``` sql
UPDATE Rating SET Value -= 1
    WHERE Value > 5;
```

## Удаление данных из таблицы

### Удаление рейтингов ниже 5

Удаление строк из таблицы рейтингов для значений, которые меньше пяти.

``` sql
DELETE FROM Rating WHERE Value < 5;
```

## Удаление таблицы

### Удаление таблицы возрастных ограничений

``` sql
DROP TABLE AgeRestriction;
```

## Изменение таблицы

### Добавление колонки для идентификатора возрастного ограничения в таблицу фильмов

Изменение таблицы фильмов с добавлением идентификатора возрастного ограничения целочисленного типа.

``` sql
ALTER TABLE Film ADD AgeRestrictionId INT NULL;
```

### Связывание таблиц фильмов и возрастных огрничений через вторичный ключ

Изменение таблицы фильмов с добавлением вторичного ключа c cсылкой на поле идентификатора возрастного ограничения таблицы возрастных ограничений, при удалении установка NULL.

``` sql
ALTER TABLE Film
    ADD CONSTRAINT FK_Film_AgeRestriction
        FOREIGN KEY (AgeRestrictionId)
        REFERENCES AgeRestriction (AgeRestrictionId)
        ON DELETE SET NULL;
```
