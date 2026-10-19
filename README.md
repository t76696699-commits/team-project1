# Jamoalar va O'yinlar — Backend API

Node.js va Express yordamida yozilgan oddiy REST API.
Ro'yxatdan o'tish, tizimga kirish (JWT token) hamda jamoalar va o'yinlar uchun CRUD amallari mavjud.

## Talablar

- Node.js 18 yoki undan yuqori
- npm

## O'rnatish va ishga tushirish

```bash
cd backend
npm install
npm start
```

Server http://localhost:3000 manzilda ishga tushadi.

## API endpointlar

### Autentifikatsiya

| Metod | URL | Tavsif |
|-------|-----|--------|
| POST | /api/register | Ro'yxatdan o'tish |
| POST | /api/login | Tizimga kirish |

**POST /api/register**

So'rov:
```json
{ "username": "ali", "password": "1234" }
```
Javob (201):
```json
{ "message": "Ro'yxatdan muvaffaqiyatli o'tdingiz" }
```

**POST /api/login**

So'rov:
```json
{ "username": "ali", "password": "1234" }
```
Javob (200):
```json
{ "token": "eyJhbGciOi...", "username": "ali" }
```

### Jamoalar (/api/teams)

| Metod | URL | Tavsif | Token |
|-------|-----|--------|-------|
| GET | /api/teams | Barcha jamoalar | Yo'q |
| GET | /api/teams/:id | Bitta jamoa | Yo'q |
| POST | /api/teams | Jamoa qo'shish | Ha |
| PUT | /api/teams/:id | Jamoani yangilash | Ha |
| DELETE | /api/teams/:id | Jamoani o'chirish | Ha |

Namuna: `{ "name": "Paxtakor", "city": "Toshkent" }`

### O'yinlar (/api/games)

| Metod | URL | Tavsif | Token |
|-------|-----|--------|-------|
| GET | /api/games | Barcha o'yinlar | Yo'q |
| GET | /api/games/:id | Bitta o'yin | Yo'q |
| POST | /api/games | O'yin qo'shish | Ha |
| PUT | /api/games/:id | O'yinni yangilash | Ha |
| DELETE | /api/games/:id | O'yinni o'chirish | Ha |

Namuna: `{ "homeTeamId": 1, "awayTeamId": 2, "date": "2026-11-01", "score": "2-1" }`

Token kerak bo'lgan so'rovlarda header qo'shing:
```
Authorization: Bearer <token>
```

## Eslatma

Ma'lumotlar xotirada saqlanadi, shuning uchun server qayta ishga tushsa ma'lumotlar tozalanadi.