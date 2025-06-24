

# 📘 Quran Khatma Tracker API

A powerful REST API to track and manage Quran reading (Khatma) sessions collaboratively or privately.

Built with **Django Rest Framework** and supports user authentication, khatma management, session logging, achievements, statistics, and notifications.

---

## 🌐 Base URL

- Local: `http://127.0.0.1:8087/api/`
---

## 🔐 Authentication (JWT)

### 📝 Signup

**Endpoint:** `POST api/signup/`

**Request Body:**
```
{
  "fullname": "Ali Ahmed",
  "email": "ali@example.com",
  "password": "StrongPass123",
  "gender": "male",
  "phone": "01012345678"
}
```

**Response:**
```
{
  "id": 1,
  "fullname": "Ali Ahmed",
  "email": "ali@example.com",
  "gender": "male",
  "phone": "01012345678"
}
```

---

### 🔑 Login

**Endpoint:** `POST api/login/`

**Request Body:**
```
{
  "email": "ali@example.com",
  "password": "StrongPass123"
}
```

**Response:**
```
{
  "access": "your_access_token",
  "refresh": "your_refresh_token"
}
```

---

### 🔄 Refresh Token

**Endpoint:** `POST /refresh/`

**Request Body:**
```
{
  "refresh": "your_refresh_token"
}
```

**Response:**
```
{
  "access": "new_access_token"
}
```

Use the access token in all requests like this:

```
Authorization: Bearer your_access_token
```

---

## 📖 Khatmas

### 📌 Create New Khatma

**POST** `api/khatmas/`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```
{
  "name": "Ramadan Group Reading",
  "description": "Finish Quran together",
  "khatma_type": "group",
  "target_days": 30,
  "is_public": true
}
```

**Response:** Returns khatma object with ID and creator.

---

### 📋 List Khatmas

**GET** `api/khatmas/?filter=my_khatmas` or `/khatmas/?filter=public`

**Response:**
```
[
  {
    "id": 1,
    "name": "Ramadan Group Reading",
    "creator": { ... },
    "completion_percentage": 50.0,
    "participants_count": 5,
    ...
  }
]
```

---

### 📥 Join Khatma

**POST** `api/khatmas/<khatma_id>/join/`

**Response:**
```
{
  "message": "Successfully joined khatma",
  "chapter_assigned": 7
}
```

---

### 📤 Leave Khatma

**DELETE** `api/khatmas/<khatma_id>/leave/`

**Response:**
```
{
  "message": "Successfully left khatma"
}
```

---

## 📅 Reading Sessions

### 🆕 Create Reading Session

**POST** `/khatmas/<id>/sessions/`

**Body:**
```
{
  "chapter_assigned": 7,
  "is_completed": true
}
```

**Response:**
```
{
  "id": 15,
  "chapter_assigned": 7,
  "is_completed": true,
  "reading_date": "..."
}
```

---

### 📄 List Your Sessions

**GET** `api/sessions/?user=me`

Returns array of sessions by current user.

---

## 📊 Statistics

### 👤 User Stats

**GET** `/stats/user/`

**Response:**
```
{
  "total_khatmas": 3,
  "completed_khatmas": 1,
  "total_chapters_read": 27,
  "current_streak": 5,
  "achievements_count": 4,
  "completion_rate": 33.3,
  "average_daily_chapters": 0.9
}
```

---

### 📘 Khatma Stats

**GET** `api/stats/khatma/<id>/`

Shows participant count, completion %, daily activity and more.

---

## 🎖️ Achievements
**-------------------------------------**
**need to make automatically**
**-------------------------------------**

**GET** `/achievements/`

```
[
  {
    "achievement_display": "First Khatma",
    "earned_at": "...",
    "khatma_name": "Ramadan Reading"
  }
]
```

---



## 🔔 Notifications
**-------------------------------------**
**need to make automatically**
**-------------------------------------**

**GET** `api/notifications/`

**PATCH** `api/notifications/<id>/read/` or `/notifications/mark-all-read/`

---

## 🧭 Dashboard

**GET** `/dashboard/`

Returns summary for:
- Active khatmas
- Reading progress today/this week
- Recent activity

---

## 👤 Profile

**GET** `api/user/me/`

Returns detailed info about the logged-in user.

---

## 🧪 Testing & Tools

- Use [Postman](https://postman.com/) or [Insomnia](https://insomnia.rest/)
- All endpoints support `Authorization: Bearer <token>` header

---

## 🛡️ Error Codes

| Code | Meaning |
|------|---------|
| 401  | Unauthorized (Invalid or missing token) |
| 403  | Forbidden (Access denied) |
| 404  | Not Found |
| 400  | Bad Request (Validation error) |



