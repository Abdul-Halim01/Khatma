
# Khatma API Documentation

A comprehensive API for managing Quran reading sessions (Khatmas), user progress tracking, and community features.

## Table of Contents
## Table of Contents

- [Authentication](#authentication)
- [Base URL](#base-url)
- [Common Response Formats](#common-response-formats)
- [Pagination](#pagination)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication-endpoints)
  - [Khatmas](#khatmas)
  - [Reading Sessions](#reading-sessions)
  - [User Management](#user-management)
  - [Statistics](#statistics)
  - [Notifications](#notifications)
  - [Achievements](#achievements)
  - [Intentions](#intentions)
  - [Dashboard](#dashboard)
- [Data Models](#data-models)
- [Error Handling](#error-handling)

## Authentication

The API uses JWT token authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>

```

## Base URL

```
https://your-api-domain.com/api/

```

## Common Response Formats

### Success Response

```json
{
  "data": {...},
  "message": "Success message"
}

```

### Error Response

```json
{
  "error": "Error message",
  "details": {...}
}

```

## Pagination

List endpoints support pagination with the following parameters:

-   `page`: Page number (default: 1)
-   `page_size`: Items per page (default: 20, max: 100)

Response format:

```json
{
  "count": 100,
  "next": "http://api.example.com/endpoint/?page=3",
  "previous": "http://api.example.com/endpoint/?page=1",
  "results": [...]
}

```

## API Endpoints

### Authentication Endpoints

#### Register User

```
POST /auth/register/

```

**Request Body:**

```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "gender": "male",
  "phone": "+1234567890"
}

```

**Response:**

```json
{
  "id": 1,
  "fullname": "John Doe",
  "email": "john@example.com",
  "gender": "male",
  "phone": "+1234567890"
}

```

#### Login

```
POST /auth/login/

```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}

```

**Response:**

```json
{
  "access": "jwt-access-token",
  "refresh": "jwt-refresh-token",
  "user": {
    "id": 1,
    "fullname": "John Doe",
    "email": "john@example.com"
  }
}

```

### Khatmas

#### List Khatmas

```
GET /khatmas/

```

**Query Parameters:**

-   `filter`: `all`, `my_khatmas`, `public`, `joinable`, `completed`
-   `khatma_type`: `private`, `group`
-   `status`: `active`, `completed`, `paused`
-   `is_public`: `true`, `false`
-   `search`: Search term
-   `ordering`: `created_at`, `-created_at`, `start_date`, `-start_date`, `name`, `-name`

**Response:**

```json
{
  "count": 25,
  "next": "...",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Ramadan Khatma 2024",
      "description": "Complete Quran reading during Ramadan",
      "khatma_type": "group",
      "status": "active",
      "creator": {
        "id": 1,
        "fullname": "John Doe",
        "email": "john@example.com",
        "profile_picture": "https://..."
      },
      "participants_count": 15,
      "target_days": 30,
      "start_date": "2024-03-01T00:00:00Z",
      "completion_percentage": 45.5,
      "days_remaining": 12,
      "is_public": true,
      "created_at": "2024-02-25T10:00:00Z"
    }
  ]
}

```

#### Create Khatma

```
POST /khatmas/

```

**Request Body:**

```json
{
  "name": "My Personal Khatma",
  "description": "Daily Quran reading",
  "khatma_type": "private",
  "target_days": 30,
  "is_public": false
}

```

#### Get Khatma Details

```
GET /khatmas/{id}/

```

**Response:**

```json
{
  "id": 1,
  "name": "Ramadan Khatma 2024",
  "description": "Complete Quran reading during Ramadan",
  "khatma_type": "group",
  "status": "active",
  "creator": {
    "id": 1,
    "fullname": "John Doe",
    "email": "john@example.com",
    "profile_picture": "https://..."
  },
  "participants": [
    {
      "id": 1,
      "user": {
        "id": 2,
        "fullname": "Jane Smith",
        "email": "jane@example.com",
        "profile_picture": "https://..."
      },
      "joined_at": "2024-02-26T08:00:00Z",
      "is_active": true,
      "chapter_assigned": 1,
      "is_chapter_completed": true
    }
  ],
  "target_days": 30,
  "start_date": "2024-03-01T00:00:00Z",
  "end_date": null,
  "completion_percentage": 45.5,
  "days_remaining": 12,
  "is_public": true,
  "recent_sessions": [...],
  "is_participant": true,
  "can_join": false,
  "available_chapters": [2, 3, 4, ...],
  "created_at": "2024-02-25T10:00:00Z",
  "updated_at": "2024-02-25T10:00:00Z"
}

```

#### Update Khatma

```
PUT /khatmas/{id}/
PATCH /khatmas/{id}/

```

#### Delete Khatma

```
DELETE /khatmas/{id}/

```

#### Join Khatma

```
POST /khatmas/{id}/join/

```

**Response:**

```json
{
  "message": "Successfully joined khatma",
  "chapter_assigned": 5
}

```

#### Leave Khatma

```
DELETE /khatmas/{id}/leave/

```

### Reading Sessions

#### List Reading Sessions

```
GET /khatmas/{khatma_id}/sessions/

```

**Query Parameters:**

-   `user`: `me` (filter by current user)

**Response:**

```json
{
  "count": 10,
  "results": [
    {
      "id": 1,
      "user": {
        "id": 1,
        "fullname": "John Doe",
        "email": "john@example.com",
        "profile_picture": "https://..."
      },
      "chapter_assigned": 1,
      "is_completed": true,
      "reading_date": "2024-03-01T14:30:00Z",
      "created_at": "2024-03-01T14:30:00Z"
    }
  ]
}

```

#### Create Reading Session

```
POST /khatmas/{khatma_id}/sessions/

```

**Request Body:**

```json
{
  "chapter_assigned": 1,
  "is_completed": true,
  "reading_date": "2024-03-01T14:30:00Z"
}

```

### User Management

#### Get User Profile

```
GET /user/profile/

```

**Response:**

```json
{
  "id": 1,
  "fullname": "John Doe",
  "email": "john@example.com",
  "gender": "male",
  "phone": "+1234567890",
  "profile_picture": "https://...",
  "bio": "Passionate about Quran reading",
  "total_khatmas_completed": 5,
  "current_streak": 7,
  "date_joined": "2024-01-15T10:00:00Z"
}

```

#### Update User Profile

```
PUT /user/profile/
PATCH /user/profile/

```

### Statistics

#### Get User Statistics

```
GET /stats/user/
GET /stats/user/{user_id}/

```

**Response:**

```json
{
  "total_khatmas": 10,
  "completed_khatmas": 5,
  "total_chapters_read": 150,
  "current_streak": 7,
  "total_reading_time": 1800,
  "achievements_count": 8,
  "average_daily_chapters": 2.5,
  "completion_rate": 50.0,
  "total_participants": 45
}

```

#### Get Khatma Statistics

```
GET /stats/khatma/{khatma_id}/

```

**Response:**

```json
{
  "total_participants": 20,
  "total_chapters_read": 450,
  "completion_percentage": 75.0,
  "average_daily_progress": 15.0,
  "most_active_reader": {
    "id": 1,
    "fullname": "John Doe",
    "email": "john@example.com",
    "profile_picture": "https://..."
  },
  "daily_progress": [
    {
      "date": "2024-03-01",
      "chapters_read": 25,
      "participants_active": 18
    }
  ],
  "chapter_completion_status": [
    {
      "chapter": 1,
      "is_completed": true,
      "assigned_user": "John Doe",
      "user_email": "john@example.com"
    }
  ]
}

```

### Notifications

#### List Notifications

```
GET /notifications/

```

**Response:**

```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "notification_type": "khatma_invitation",
      "notification_display": "Khatma Invitation",
      "title": "You've been invited to join a Khatma",
      "message": "John Doe invited you to join 'Ramadan Khatma 2024'",
      "is_read": false,
      "related_khatma": 1,
      "related_khatma_name": "Ramadan Khatma 2024",
      "created_at": "2024-03-01T10:00:00Z"
    }
  ]
}

```

#### Mark Notification as Read

```
PATCH /notifications/{id}/read/

```

#### Mark All Notifications as Read

```
PATCH /notifications/mark-all-read/

```

### Achievements

#### List User Achievements

```
GET /achievements/
GET /achievements/user/{user_id}/

```

**Response:**

```json
[
  {
    "id": 1,
    "user": {
      "id": 1,
      "fullname": "John Doe",
      "email": "john@example.com",
      "profile_picture": "https://..."
    },
    "achievement_type": "first_khatma",
    "achievement_display": "First Khatma",
    "earned_at": "2024-02-15T10:00:00Z",
    "khatma": 1,
    "khatma_name": "My First Khatma"
  }
]

```

### Intentions

#### Get User Intentions for Khatma

```
GET /khatmas/{khatma_id}/intentions/

```

**Response:**

```json
[
  {
    "id": 1,
    "intention": ["For my family", "For guidance", "For forgiveness"],
    "created_at": "2024-03-01T10:00:00Z"
  }
]

```

#### Create Intention

```
POST /khatmas/{khatma_id}/intentions/

```

**Request Body:**

```json
{
  "intention": ["For my family", "For guidance", "For forgiveness"]
}

```

### Dashboard

#### Get Dashboard Data

```
GET /dashboard/

```

**Response:**

```json
{
  "active_khatmas": [...],
  "recent_sessions": [...],
  "unread_notifications": [...],
  "today_pages": 5,
  "weekly_pages": 35,
  "total_khatmas": 10,
  "current_streak": 7
}

```

### Search

#### Search Khatmas

```
GET /search/khatmas/

```

**Query Parameters:**

-   `q`: Search query
-   `type`: `private`, `group`

## Data Models

### Khatma Types

-   `private`: Individual Quran reading
-   `group`: Community-based reading with assigned chapters

### Khatma Status

-   `active`: Currently ongoing
-   `completed`: Successfully finished
-   `paused`: Temporarily stopped

### Notification Types

-   `khatma_invitation`: Invitation to join a Khatma
-   `khatma_completed`: Khatma completion notification
-   `daily_reminder`: Daily reading reminder
-   `achievement_earned`: Achievement unlocked
-   `chapter_assigned`: Chapter assignment notification
-   `chapter_completed`: Chapter completion notification

### Achievement Types

-   `first_khatma`: First Khatma completion
-   `streak_7`: 7-day reading streak
-   `streak_30`: 30-day reading streak
-   `fast_reader`: Fast reading achievement
-   `consistent_reader`: Consistent reading pattern
-   `chapter_master`: Completed all 30 chapters
-   `group_leader`: Led 5 group khatmas

## Error Handling

### HTTP Status Codes

-   `200`: Success
-   `201`: Created
-   `400`: Bad Request
-   `401`: Unauthorized
-   `403`: Forbidden
-   `404`: Not Found
-   `500`: Internal Server Error

### Common Error Responses

#### Validation Error

```json
{
  "error": "Validation failed",
  "details": {
    "email": ["This field is required."],
    "password": ["Password must be at least 8 characters."]
  }
}

```

#### Authentication Error

```json
{
  "error": "Authentication credentials were not provided."
}

```

#### Permission Error

```json
{
  "error": "You don't have permission to view this khatma"
}

```

#### Not Found Error

```json
{
  "error": "Khatma not found"
}

```

## Rate Limiting

The API implements rate limiting to prevent abuse:

-   **Authenticated users**: 1000 requests per hour
-   **Anonymous users**: 100 requests per hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200

```

## Best Practices

1.  **Always handle errors gracefully** in your frontend application
2.  **Use pagination** for list endpoints to improve performance
3.  **Implement proper loading states** for better UX
4.  **Cache user data** when appropriate to reduce API calls
5.  **Use optimistic updates** for better perceived performance
6.  **Implement offline support** for critical features

## Example Usage

### JavaScript/Axios Example

```javascript
const  getKhatmaDetail  = (id) => {
	fetchProtectedData(`api/khatmas/${id}/`)
	.then(setResponse)
	.catch(error  =>  setResponse({ error:  error.message }));
};

const  updateKhatma  = (id, body) => {
	fetchProtectedData(`api/khatmas/${id}/`, {
		method:  'PATCH',
		data:  body
	}).then(setResponse)
	.catch(error  =>  setResponse({ error:  error.message }));
};
const  joinKhatma  = (id) => {
	fetchProtectedData(`api/khatmas/${id}/join/`, {
		method:  'POST'
	}).then(setResponse)
	.catch(error  =>  setResponse({ error:  error.message }));
};
```

## Support

For technical support or questions about the API, please contact:

-   Email: eng.abdulhalem@gmail.com
