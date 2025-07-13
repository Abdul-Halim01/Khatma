# Khatma Application API Documentation

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [1. Authentication Pages](#1-authentication-pages)
  - [1.1 User Registration (Signup)](#11-user-registration-signup)
  - [1.2 User Login](#12-user-login)
  - [1.3 Token Refresh](#13-token-refresh)
- [2. Dashboard Page](#2-dashboard-page)
  - [2.1 Dashboard Data](#21-dashboard-data)
  - [2.2 My Khatmas List](#22-my-khatmas-list)
- [3. Create Khatma Page](#3-create-khatma-page)
  - [3.1 Create New Khatma](#31-create-new-khatma)
- [4. Join Khatma Page](#4-join-khatma-page)
  - [4.1 List Joinable Khatmas](#41-list-joinable-khatmas)
  - [4.2 Search Khatmas](#42-search-khatmas)
  - [4.3 Join Khatma](#43-join-khatma)
- [5. Completed Khatmas Page](#5-completed-khatmas-page)
  - [5.1 List Completed Khatmas](#51-list-completed-khatmas)
- [6. Khatma Table Page](#6-khatma-table-page)
  - [6.1 Get Khatma Details](#61-get-khatma-details)
  - [6.2 Get Reading Sessions](#62-get-reading-sessions)
  - [6.3 Create Reading Session](#63-create-reading-session)
  - [6.4 Get User Intentions](#64-get-user-intentions)
  - [6.5 Create/Update Intentions](#65-createupdate-intentions)
- [7. Google Authentication](#7-google-authentication)
  - [7.1 Google Login/Check](#71-google-logincheck)
  - [7.2 Google Signup](#72-google-signup)
  - [7.3 Frontend Implementation Guide](#73-frontend-implementation-guide)
- [Error Handling](#error-handling)
- [Additional Endpoints](#additional-endpoints)
- [Notes](#notes)

---

## Overview

This document provides comprehensive API documentation for the Khatma (Quran completion) application. The API allows users to create, join, and manage Quran reading sessions individually or in groups.

## Base URL

```
https://127.0.0.1:8087/api/

```

## Authentication

All endpoints (except login/signup) require JWT authentication. Include the access token in the Authorization header:

```
Authorization: Bearer <your_access_token>

```

----------

## 1. Authentication Pages

### 1.1 User Registration (Signup)

**Endpoint:** `POST /signup/`

**Request Body:**

```json
{
    "fullname": "أحمد محمد",
    "email": "ahmed@example.com",
    "password": "securepassword123",
    "gender": "male",
    "phone": "+966501234567"
}

```

**Response (Success):**

```json
{
    "id": 1,
    "fullname": "أحمد محمد",
    "email": "ahmed@example.com",
    "gender": "male",
    "phone": "+966501234567"
}

```

### 1.2 User Login

**Endpoint:** `POST /login/`

**Request Body:**

```json
{
    "username": "ahmed@example.com",
    "password": "securepassword123"
}

```

**Response (Success):**

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

### 1.3 Token Refresh

**Endpoint:** `POST /refresh/`

**Request Body:**

```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

----------

## 2. Dashboard Page

### 2.1 Dashboard Data

**Endpoint:** `GET /dashboard/`

**Response:**

```json
{
    "active_khatmas": [
        {
            "id": 1,
            "name": "ختمة رمضان المبارك",
            "description": "ختمة جماعية لشهر رمضان",
            "khatma_type": "group",
            "status": "active",
            "creator": {
                "id": 1,
                "fullname": "أحمد محمد",
                "email": "ahmed@example.com",
                "profile_picture": null
            },
            "participants_count": 15,
            "target_days": 30,
            "start_date": "2024-03-01T00:00:00Z",
            "completion_percentage": 45.5,
            "days_remaining": 15,
            "is_public": true,
            "created_at": "2024-03-01T10:30:00Z"
        }
    ],
    "recent_sessions": [
        {
            "id": 1,
            "user": {
                "id": 1,
                "fullname": "أحمد محمد",
                "email": "ahmed@example.com",
                "profile_picture": null
            },
            "chapter_assigned": 5,
            "is_completed": true,
            "reading_date": "2024-03-15T14:30:00Z",
            "created_at": "2024-03-15T14:30:00Z"
        }
    ],
    "unread_notifications": [
        {
            "id": 1,
            "notification_type": "chapter_completed",
            "title": "تم إكمال الجزء الخامس",
            "message": "تهانينا! لقد أكملت الجزء الخامس من ختمة رمضان المبارك",
            "is_read": false,
            "related_khatma": 1,
            "related_khatma_name": "ختمة رمضان المبارك",
            "created_at": "2024-03-15T14:30:00Z"
        }
    ],
    "today_pages": 2,
    "weekly_pages": 7,
    "total_khatmas": 5,
    "current_streak": 7
}

```

### 2.2 My Khatmas List

**Endpoint:** `GET /khatmas/?filter=my_khatmas`

**Query Parameters:**

-   `filter=my_khatmas`: Get khatmas user created or joined
-   `page=1`: Pagination (20 items per page)
-   `search=search_term`: Search by name or description

**Response:**

```json
{
    "count": 25,
    "next": "http://localhost:8000/api/khatmas/?filter=my_khatmas&page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "ختمة رمضان المبارك",
            "description": "ختمة جماعية لشهر رمضان",
            "khatma_type": "group",
            "status": "active",
            "creator": {
                "id": 1,
                "fullname": "أحمد محمد",
                "email": "ahmed@example.com",
                "profile_picture": null
            },
            "participants_count": 15,
            "target_days": 30,
            "start_date": "2024-03-01T00:00:00Z",
            "completion_percentage": 45.5,
            "days_remaining": 15,
            "is_public": true,
            "created_at": "2024-03-01T10:30:00Z"
        }
    ]
}

```

----------

## 3. Create Khatma Page

### 3.1 Create New Khatma

**Endpoint:** `POST /khatmas/`

**Request Body:**

```json
{
    "name": "ختمة رمضان المبارك",
    "description": "ختمة جماعية لشهر رمضان الكريم",
    "khatma_type": "group",
    "target_days": 30,
    "is_public": true
}

```

**Response (Success):**

```json
{
    "id": 1,
    "name": "ختمة رمضان المبارك",
    "description": "ختمة جماعية لشهر رمضان الكريم",
    "khatma_type": "group",
    "target_days": 30,
    "is_public": true
}

```

**Field Validations:**

-   `name`: Required, max 200 characters
-   `description`: Optional, text field
-   `khatma_type`: Required, choices: `"private"` or `"group"`
-   `target_days`: Required, minimum value: 1
-   `is_public`: Boolean, default: false

----------

## 4. Join Khatma Page

### 4.1 List Joinable Khatmas

**Endpoint:** `GET /khatmas/?filter=joinable`

**Query Parameters:**

-   `filter=joinable`: Get public, active khatmas user hasn't joined
-   `search=search_term`: Search by name, description, or creator
-   `type=group`: Filter by khatma type (group/private)

**Response:**

```json
{
    "count": 10,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2,
            "name": "ختمة العشر الأواخر",
            "description": "ختمة جماعية للعشر الأواخر من رمضان",
            "khatma_type": "group",
            "status": "active",
            "creator": {
                "id": 2,
                "fullname": "فاطمة أحمد",
                "email": "fatima@example.com",
                "profile_picture": null
            },
            "participants_count": 8,
            "target_days": 10,
            "start_date": "2024-03-20T00:00:00Z",
            "completion_percentage": 20.0,
            "days_remaining": 8,
            "is_public": true,
            "created_at": "2024-03-20T08:00:00Z"
        }
    ]
}

```

### 4.2 Search Khatmas

**Endpoint:** `GET /search/khatmas/`

**Query Parameters:**

-   `q=search_term`: Search query
-   `type=group`: Filter by type

**Response:**

```json
[
    {
        "id": 3,
        "name": "ختمة التراويح",
        "description": "ختمة مع صلاة التراويح",
        "khatma_type": "group",
        "status": "active",
        "creator": {
            "id": 3,
            "fullname": "محمد علي",
            "email": "mohammed@example.com",
            "profile_picture": null
        },
        "participants_count": 12,
        "target_days": 30,
        "start_date": "2024-03-01T00:00:00Z",
        "completion_percentage": 30.0,
        "days_remaining": 20,
        "is_public": true,
        "created_at": "2024-03-01T09:00:00Z"
    }
]

```

### 4.3 Join Khatma

**Endpoint:** `POST /khatmas/{khatma_id}/join/`

**Response (Success):**

```json
{
    "message": "Successfully joined khatma",
    "chapter_assigned": 15
}

```

**Response (Error):**

```json
{
    "error": "All chapters are already assigned"
}

```

----------

## 5. Completed Khatmas Page

### 5.1 List Completed Khatmas

**Endpoint:** `GET /khatmas/?filter=completed`

**Response:**

```json
{
    "count": 5,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 4,
            "name": "ختمة شعبان",
            "description": "ختمة شهر شعبان",
            "khatma_type": "private",
            "status": "completed",
            "creator": {
                "id": 1,
                "fullname": "أحمد محمد",
                "email": "ahmed@example.com",
                "profile_picture": null
            },
            "participants_count": 1,
            "target_days": 30,
            "start_date": "2024-02-01T00:00:00Z",
            "completion_percentage": 100.0,
            "days_remaining": 0,
            "is_public": false,
            "created_at": "2024-02-01T10:00:00Z"
        }
    ]
}

```

----------

## 6. Khatma Table Page

### 6.1 Get Khatma Details

**Endpoint:** `GET /khatmas/{khatma_id}/`

**Response:**

```json
{
    "id": 1,
    "name": "ختمة رمضان المبارك",
    "description": "ختمة جماعية لشهر رمضان",
    "khatma_type": "group",
    "status": "active",
    "creator": {
        "id": 1,
        "fullname": "أحمد محمد",
        "email": "ahmed@example.com",
        "profile_picture": null
    },
    "participants": [
        {
            "id": 1,
            "user": {
                "id": 1,
                "fullname": "أحمد محمد",
                "email": "ahmed@example.com",
                "profile_picture": null
            },
            "joined_at": "2024-03-01T10:30:00Z",
            "is_active": true,
            "chapter_assigned": 1,
            "is_chapter_completed": true
        }
    ],
    "target_days": 30,
    "start_date": "2024-03-01T00:00:00Z",
    "end_date": null,
    "completion_percentage": 45.5,
    "days_remaining": 15,
    "is_public": true,
    "recent_sessions": [
        {
            "id": 1,
            "user": {
                "id": 1,
                "fullname": "أحمد محمد",
                "email": "ahmed@example.com",
                "profile_picture": null
            },
            "chapter_assigned": 1,
            "is_completed": true,
            "reading_date": "2024-03-15T14:30:00Z",
            "created_at": "2024-03-15T14:30:00Z"
        }
    ],
    "is_participant": true,
    "can_join": false,
    "available_chapters": [2, 3, 4, 5],
    "created_at": "2024-03-01T10:30:00Z",
    "updated_at": "2024-03-15T14:30:00Z"
}

```

### 6.2 Get Reading Sessions

**Endpoint:** `GET /khatmas/{khatma_id}/sessions/`

**Query Parameters:**

-   `user=me`: Filter sessions by current user
-   `page=1`: Pagination

**Response:**

```json
{
    "count": 50,
    "next": "http://localhost:8000/api/khatmas/1/sessions/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "user": {
                "id": 1,
                "fullname": "أحمد محمد",
                "email": "ahmed@example.com",
                "profile_picture": null
            },
            "chapter_assigned": 5,
            "is_completed": true,
            "reading_date": "2024-03-15T14:30:00Z",
            "created_at": "2024-03-15T14:30:00Z"
        }
    ]
}

```

### 6.3 Create Reading Session

**Endpoint:** `POST /khatmas/{khatma_id}/sessions/`

**Request Body:**

```json
{
    "chapter_assigned": 5,
    "is_completed": true,
    "reading_date": "2024-03-15T14:30:00Z"
}

```

**Response (Success):**

```json
{
    "id": 1,
    "user": {
        "id": 1,
        "fullname": "أحمد محمد",
        "email": "ahmed@example.com",
        "profile_picture": null
    },
    "chapter_assigned": 5,
    "is_completed": true,
    "reading_date": "2024-03-15T14:30:00Z",
    "created_at": "2024-03-15T14:30:00Z"
}

```

### 6.4 Get User Intentions

**Endpoint:** `GET /khatmas/{khatma_id}/intentions/`

**Response:**

```json
[
    {
        "id": 1,
        "intention": [
            "للوالدين",
            "لللمسلمين في بقاع الارض",
            "للشفاء من المرض"
        ],
        "created_at": "2024-03-15T10:00:00Z"
    }
]

```

### 6.5 Create/Update Intentions

**Endpoint:** `POST /khatmas/{khatma_id}/intentions/`

**Request Body:**

```json
{
    "intention": [
        "للوالدين",
        "للمسلمين في بقاع الارض",
        "للشفاء من المرض"
    ]
}

```

**Response (Success):**

```json
{
    "id": 1,
    "intention": [
        "للوالدين",
        "للمسلمين في بقاع الارض",
        "للشفاء من المرض"
    ],
    "created_at": "2024-03-15T10:00:00Z"
}

```

----------

## 7. Google Authentication

### 7.1 Google Login/Check

**Endpoint:** `POST /google-auth/`

**Request Body:**

```json
{
    "token": "google_id_token_here"
}

```

**Response (User Exists):**

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user_exists": true,
    "user_id": 1,
    "fullname": "أحمد محمد",
    "email": "ahmed@example.com",
    "message": "تم تسجيل الدخول بنجاح"
}

```

**Response (User Doesn't Exist):**

```json
{
    "user_exists": false,
    "google_data": {
        "email": "ahmed@example.com",
        "name": "أحمد محمد",
        "picture": "https://lh3.googleusercontent.com/...",
        "google_token": "google_id_token_here"
    },
    "message": "المستخدم غير موجود. يرجى إكمال بيانات التسجيل"
}

```

### 7.2 Google Signup

**Endpoint:** `POST /google-signup/`

**Request Body:**

```json
{
    "google_token": "google_id_token_here",
    "fullname": "أحمد محمد",
    "email": "ahmed@example.com",
    "gender": "male",
    "phone": "+966501234567"
}

```

**Response (Success):**

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user_id": 1,
    "fullname": "أحمد محمد",
    "email": "ahmed@example.com",
    "message": "تم إنشاء الحساب بنجاح"
}

```

### 7.3 Frontend Implementation Guide

#### Step 1: Include Google Sign-In Script

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>

```

#### Step 2: Initialize Google Sign-In

```javascript
function initializeGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleCredentialResponse
    });
    
    google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
    );
}

```

#### Step 3: Handle Google Response

```javascript
async function handleCredentialResponse(response) {
    try {
        const result = await fetch('/api/google-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: response.credential
            })
        });
        
        const data = await result.json();
        
        if (data.user_exists) {
            // User exists, login successful
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            // User doesn't exist, show signup form
            showGoogleSignupForm(data.google_data);
        }
    } catch (error) {
        console.error('Google auth error:', error);
    }
}

```

#### Step 4: Handle Google Signup

```javascript
async function handleGoogleSignup(formData) {
    try {
        const result = await fetch('/api/google-signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await result.json();
        
        if (result.ok) {
            // Signup successful
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            // Handle errors
            console.error('Signup error:', data.error);
        }
    } catch (error) {
        console.error('Google signup error:', error);
    }
}

```

----------

## Error Handling

### Common Error Responses

**401 Unauthorized:**

```json
{
    "detail": "Authentication credentials were not provided."
}

```

**403 Forbidden:**

```json
{
    "detail": "You do not have permission to perform this action."
}

```

**404 Not Found:**

```json
{
    "detail": "Not found."
}

```

**400 Bad Request:**

```json
{
    "field_name": ["This field is required."],
    "another_field": ["Invalid value."]
}

```

----------

## Additional Endpoints

### User Profile

**Endpoint:** `GET /user/me/`

### User Statistics

**Endpoint:** `GET /stats/user/`

### Khatma Statistics

**Endpoint:** `GET /stats/khatma/{khatma_id}/`

### Notifications

**Endpoint:** `GET /notifications/`

### Achievements

**Endpoint:** `GET /achievements/`

### Leave Khatma

**Endpoint:** `DELETE /khatmas/{khatma_id}/leave/`

----------

## Notes

1.  **Pagination**: Most list endpoints support pagination with `page` and `page_size` parameters
2.  **Filtering**: Use query parameters for filtering (e.g., `?filter=my_khatmas`)
3.  **Search**: Use `?search=term` for text search
4.  **Ordering**: Use `?ordering=field_name` or `?ordering=-field_name` for sorting
5.  **Date Format**: All dates are in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
6.  **JWT Tokens**: Access tokens expire after 24 hours, use refresh token to get new ones
7.  **Google Auth**: Requires valid Google Client ID configuration in Django settings
