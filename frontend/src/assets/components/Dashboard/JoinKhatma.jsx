import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:8087/api'; // Change this to your Django server URL

const ApiTester = () => {
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState({});
  const [token, setToken] = useState(''); // JWT token for authentication

  // Helper function to make API requests
  const makeRequest = async (key, method, url, data = null, requiresAuth = true) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    
    try {
      let accessToken = localStorage.getItem('accessToken');

      const headers = { 
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        };
      
      const config = {
        method,
        headers,
      };

      if (data) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(`${API_BASE_URL}${url}`, config);
      const result = await response.json();
      
      setResponses(prev => ({
        ...prev,
        [key]: {
          status: response.status,
          data: result,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } catch (error) {
      setResponses(prev => ({
        ...prev,
        [key]: {
          status: 'Error',
          data: { error: error.message },
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  // Response display component
  const ResponseDisplay = ({ responseKey }) => {
    const response = responses[responseKey];
    if (!response) return null;

    return (
      <div className="mt-2 p-3 bg-gray-100 rounded text-sm">
        <div className="font-semibold">Status: {response.status} | Time: {response.timestamp}</div>
        <pre className="mt-2 whitespace-pre-wrap text-xs overflow-x-auto">
          {JSON.stringify(response.data, null, 2)}
        </pre>
      </div>
    );
  };

  // Button component
  const ApiButton = ({ onClick, children, responseKey, disabled = false }) => (
    <div className="mb-4">
      <button
        onClick={onClick}
        disabled={loading[responseKey] || disabled}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 mr-2"
      >
        {loading[responseKey] ? 'Loading...' : children}
      </button>
      <ResponseDisplay responseKey={responseKey} />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Django API Comprehensive Tester</h1>

      {/* Authentication Section */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Authentication</h2>
        
        <div className="mb-4">
          <label className="block mb-2">JWT Token:</label>
          <input
            type="text"
            value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyMjc3MTA5LCJpYXQiOjE3NTIxOTA3MDksImp0aSI6IjdkN2I0NWFiMmI4NzQ1ODc5NjE1YzkyNWExNmMwZDYzIiwidXNlcl9pZCI6M30.IAUqt9LSMcu5e9qMfjlNzDaEcCy-XQnIjAUtCWWmoLU"
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your JWT token here"
          />
        </div>

        <ApiButton
          onClick={() => makeRequest('register', 'POST', '/register/', {
            fullname: 'Test User',
            email: 'test@example.com',
            password: 'testpass123',
            gender: 'male',
            phone: '1234567890'
          }, false)}
          responseKey="register"
        >
          Register User
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('login', 'POST', '/token/', {
            username: 'test@example.com',
            password: 'testpass123'
          }, false)}
          responseKey="login"
        >
          Login (Get Token)
        </ApiButton>
      </div>

      {/* User Profile Section */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
        
        <ApiButton
          onClick={() => makeRequest('profile', 'GET', '/profile/')}
          responseKey="profile"
        >
          Get User Profile
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('user_stats', 'GET', '/users/stats/')}
          responseKey="user_stats"
        >
          Get User Stats
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('user_stats_specific', 'GET', '/users/1/stats/')}
          responseKey="user_stats_specific"
        >
          Get User Stats (ID: 1)
        </ApiButton>
      </div>

      {/* Khatma CRUD Operations */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Khatma CRUD Operations</h2>
        
        <ApiButton
          onClick={() => makeRequest('khatmas_list', 'GET', '/khatmas/')}
          responseKey="khatmas_list"
        >
          List All Khatmas
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_my', 'GET', '/khatmas/?filter=my_khatmas')}
          responseKey="khatmas_my"
        >
          List My Khatmas
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_public', 'GET', '/khatmas/?filter=public')}
          responseKey="khatmas_public"
        >
          List Public Khatmas
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_joinable', 'GET', '/khatmas/?filter=joinable')}
          responseKey="khatmas_joinable"
        >
          List Joinable Khatmas
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_completed', 'GET', '/khatmas/?filter=completed')}
          responseKey="khatmas_completed"
        >
          List Completed Khatmas
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_filtered', 'GET', '/khatmas/?khatma_type=group&status=active')}
          responseKey="khatmas_filtered"
        >
          Filter Khatmas (Group + Active)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_search', 'GET', '/khatmas/?search=test')}
          responseKey="khatmas_search"
        >
          Search Khatmas (query: "test")
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('create_khatma', 'POST', '/khatmas/', {
            name: 'Test Khatma',
            description: 'A test khatma for API testing',
            khatma_type: 'private',
            target_days: 30,
            is_public: true
          })}
          responseKey="create_khatma"
        >
          Create Khatma
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('create_group_khatma', 'POST', '/khatmas/', {
            name: 'Test Group Khatma',
            description: 'A test group khatma',
            khatma_type: 'group',
            target_days: 30,
            is_public: true
          })}
          responseKey="create_group_khatma"
        >
          Create Group Khatma
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatma_detail', 'GET', '/khatmas/9/')}
          responseKey="khatma_detail"
        >
          Get Khatma Detail (ID: 9)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('update_khatma', 'PATCH', '/khatmas/1/', {
            name: 'Updated Khatma Name',
            description: 'Updated description'
          })}
          responseKey="update_khatma"
        >
          Update Khatma (ID: 1)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('delete_khatma', 'DELETE', '/khatmas/1/')}
          responseKey="delete_khatma"
        >
          Delete Khatma (ID: 1)
        </ApiButton>
      </div>

      {/* Khatma Participation */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Khatma Participation</h2>
        
        <ApiButton
          onClick={() => makeRequest('join_khatma', 'POST', '/khatmas/5/join/')}
          responseKey="join_khatma"
        >
          Join Khatma (ID: 5)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('leave_khatma', 'DELETE', '/khatmas/1/leave/')}
          responseKey="leave_khatma"
        >
          Leave Khatma (ID: 1)
        </ApiButton>
      </div>

      {/* Reading Sessions */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Reading Sessions</h2>
        
        <ApiButton
          onClick={() => makeRequest('reading_sessions', 'GET', '/khatmas/9/sessions/')}
          responseKey="reading_sessions"
        >
          reading Sessions (Khatma ID: 9)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('reading_sessions_me', 'GET', '/khatmas/9/sessions/?user=me')}
          responseKey="reading_sessions_me"
        >
          List My Reading Sessions (Khatma ID: 9)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('create_reading_session', 'POST', '/khatmas/4/sessions/', {
            chapter_assigned: 1,
            is_completed: true,
            reading_date: new Date().toISOString()
          })}
          responseKey="create_reading_session"
        >
          Create Reading Session (Chapter 4)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('create_reading_session_2', 'POST', '/khatmas/9/sessions/', {
            chapter_assigned: 20,
            is_completed: false,
            reading_date: new Date().toISOString()
          })}
          responseKey="create_reading_session_2"
        >
          Create Reading Session (Chapter 20) khatma 9
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('create_reading_session_incomplete', 'POST', '/khatmas/9/sessions/', {
            chapter_assigned: 3,
            is_completed: false,
            reading_date: new Date().toISOString()
          })}
          responseKey="create_reading_session_incomplete"
        >
          Create Reading Session (Chapter 3 - Incomplete) Khatma 9
        </ApiButton>
      </div>

      {/* Statistics */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Statistics</h2>
        
        <ApiButton
          onClick={() => makeRequest('khatma_stats', 'GET', '/khatmas/1/stats/')}
          responseKey="khatma_stats"
        >
          Get Khatma Stats (ID: 1)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('dashboard_data', 'GET', '/dashboard/')}
          responseKey="dashboard_data"
        >
          Get Dashboard Data
        </ApiButton>
      </div>

      {/* Notifications */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        
        <ApiButton
          onClick={() => makeRequest('notifications_list', 'GET', '/notifications/')}
          responseKey="notifications_list"
        >
          List Notifications
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('mark_notification_read', 'PATCH', '/notifications/1/read/')}
          responseKey="mark_notification_read"
        >
          Mark Notification Read (ID: 1)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('mark_all_notifications_read', 'PATCH', '/notifications/mark-all-read/')}
          responseKey="mark_all_notifications_read"
        >
          Mark All Notifications Read
        </ApiButton>
      </div>

      {/* Achievements */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        
        <ApiButton
          onClick={() => makeRequest('user_achievements', 'GET', '/achievements/')}
          responseKey="user_achievements"
        >
          List User Achievements
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('user_achievements_specific', 'GET', '/users/1/achievements/')}
          responseKey="user_achievements_specific"
        >
          List User Achievements (User ID: 1)
        </ApiButton>
      </div>

      {/* Search and Discovery */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Search and Discovery</h2>
        
        <ApiButton
          onClick={() => makeRequest('search_khatmas', 'GET', '/search/?q=test')}
          responseKey="search_khatmas"
        >
          Search Khatmas (query: "test")
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('search_khatmas_type', 'GET', '/search/?q=test&type=group')}
          responseKey="search_khatmas_type"
        >
          Search Khatmas (query: "test", type: "group")
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('search_khatmas_empty', 'GET', '/search/')}
          responseKey="search_khatmas_empty"
        >
          Search Khatmas (no query)
        </ApiButton>
      </div>

      {/* Intentions */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Intentions</h2>
        
        <ApiButton
          onClick={() => makeRequest('get_intentions', 'GET', '/khatmas/4/intentions/')}
          responseKey="get_intentions"
        >
          Get Khatma Intentions (ID: 1)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('create_intention', 'POST', '/khatmas/4/intentions/', {
            intention: ['For my family', 'For guidance', 'For peace']
          })}
          responseKey="create_intention"
        >
          Create Intention (Khatma ID: 1)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('create_intention_2', 'POST', '/khatmas/4/intentions/', {
            intention: ['For health', 'For success']
          })}
          responseKey="create_intention_2"
        >
          Create Another Intention (Khatma ID: 1)
        </ApiButton>
      </div>

      {/* Pagination Tests */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Pagination Tests</h2>
        
        <ApiButton
          onClick={() => makeRequest('khatmas_page1', 'GET', '/khatmas/?page=1&page_size=5')}
          responseKey="khatmas_page1"
        >
          Get Khatmas (Page 1, Size 5)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_page2', 'GET', '/khatmas/?page=2&page_size=5')}
          responseKey="khatmas_page2"
        >
          Get Khatmas (Page 2, Size 5)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('notifications_paginated', 'GET', '/notifications/?page=1&page_size=10')}
          responseKey="notifications_paginated"
        >
          Get Notifications (Page 1, Size 10)
        </ApiButton>
      </div>

      {/* Ordering Tests */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Ordering Tests</h2>
        
        <ApiButton
          onClick={() => makeRequest('khatmas_order_name', 'GET', '/khatmas/?ordering=name')}
          responseKey="khatmas_order_name"
        >
          Order Khatmas by Name
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_order_date_desc', 'GET', '/khatmas/?ordering=-created_at')}
          responseKey="khatmas_order_date_desc"
        >
          Order Khatmas by Date (Desc)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('khatmas_order_start_date', 'GET', '/khatmas/?ordering=start_date')}
          responseKey="khatmas_order_start_date"
        >
          Order Khatmas by Start Date
        </ApiButton>
      </div>

      {/* Error Testing */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Error Testing</h2>
        
        <ApiButton
          onClick={() => makeRequest('invalid_khatma', 'GET', '/khatmas/99999/')}
          responseKey="invalid_khatma"
        >
          Get Invalid Khatma (ID: 99999)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('invalid_chapter', 'POST', '/khatmas/1/sessions/', {
            chapter_assigned: 31,
            is_completed: true
          })}
          responseKey="invalid_chapter"
        >
          Create Session with Invalid Chapter (31)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('invalid_chapter_0', 'POST', '/khatmas/1/sessions/', {
            chapter_assigned: 0,
            is_completed: true
          })}
          responseKey="invalid_chapter_0"
        >
          Create Session with Invalid Chapter (0)
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('missing_fields', 'POST', '/khatmas/', {
            name: 'Test'
            // Missing required fields
          })}
          responseKey="missing_fields"
        >
          Create Khatma with Missing Fields
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('unauthorized', 'GET', '/khatmas/', null, false)}
          responseKey="unauthorized"
        >
          Unauthorized Request (No Token)
        </ApiButton>
      </div>

      {/* Edge Cases */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Edge Cases</h2>
        
        <ApiButton
          onClick={() => makeRequest('empty_khatma_name', 'POST', '/khatmas/', {
            name: '',
            description: 'Empty name test',
            khatma_type: 'private',
            target_days: 1,
            is_public: false
          })}
          responseKey="empty_khatma_name"
        >
          Create Khatma with Empty Name
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('zero_target_days', 'POST', '/khatmas/', {
            name: 'Zero Days Khatma',
            description: 'Test with zero target days',
            khatma_type: 'private',
            target_days: 0,
            is_public: false
          })}
          responseKey="zero_target_days"
        >
          Create Khatma with Zero Target Days
        </ApiButton>

        <ApiButton
          onClick={() => makeRequest('negative_target_days', 'POST', '/khatmas/', {
            name: 'Negative Days Khatma',
            description: 'Test with negative target days',
            khatma_type: 'private',
            target_days: -5,
            is_public: false
          })}
          responseKey="negative_target_days"
        >
          Create Khatma with Negative Target Days
        </ApiButton>
      </div>
    </div>
  );
};

export default ApiTester;