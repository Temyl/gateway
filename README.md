# :bell: Distributed Notification System
## Stage 4 Backend Task: Microservices & Message Queues
Team: Group 33
## :dart: Goal/Objective
Build a notification system that sends emails and push notifications using separate microservices. Each service communicates asynchronously through a message queue (RabbitMQ/Kafka).
### :dart: Performance Targets
- :white_check_mark: Handle 1,000+ notifications per minute
- :white_check_mark: API Gateway response under 100ms
- :white_check_mark: 99.5% delivery success rate
- :white_check_mark: All services support horizontal scaling
---
## :building_construction: System Architecture
### High-Level Design
### Message Queue Structure (RabbitMQ)
Exchange: notifications.direct
├── email.queue → Email Service
├── push.queue → Push Service
└── failed.queue → Dead Letter Queue (DLX)
---
## :hammer_and_wrench: Services Built
### 1. :white_check_mark: API Gateway Service
**Responsibilities:**
- Entry point for all notification requests
- Request validation and JWT authentication
- Routes messages to correct queues (email/push)
- Tracks notification status
- **Tech:** Node.js, Express, JWT
### 2. :white_check_mark: User Service
**Responsibilities:**
- Manages user contact info (email, push tokens)
- Stores notification preferences
- Handles login and permissions
- **Tech:** Node.js, Express, PostgreSQL
- **Endpoints:** `GET /users/{id}/preferences`, `GET /users/{id}/contact-info`
### 3. :white_check_mark: Email Service
**Responsibilities:**
- Reads messages from email queue
- Fills templates with variables (e.g., `{{name}}`)
- Sends emails using SMTP or SendGrid API
- Handles delivery confirmations and bounces
- **Tech:** Node.js, Nodemailer, SendGrid
### 4. :white_check_mark: Push Service
**Responsibilities:**
- Reads messages from push queue
- Sends mobile/web push notifications
- Validates device tokens
- Supports rich notifications (title, text, image, link)
- **Tech:** Node.js, Firebase Cloud Messaging (FCM)
### 5. :white_check_mark: Template Service
**Responsibilities:**
- Stores and manages notification templates
- Handles variable substitution
- Supports multiple languages
- Keeps version history for templates
- **Tech:** Node.js, Express, PostgreSQL
---
## :wrench: Key Technical Concepts Implemented
### :white_check_mark: Circuit Breaker Pattern
Prevents total system failure when external services (SMTP, FCM) go down.
### :white_check_mark: Retry System
- Exponential backoff for failed messages
- Permanent failures moved to dead-letter queue
- Maximum 5 retries with increasing delays
### :white_check_mark: Service Discovery
Docker container networking allows services to find each other dynamically.
### :white_check_mark: Health Checks
Each service has `/health` endpoint for monitoring:
```http
GET /health
Response: {"status": "healthy", "timestamp": "2024-01-15T10:30:00Z"}
:white_check_mark: Idempotency
Prevent duplicate notifications using unique request IDs:
{
  "request_id": "uuid_v4",
  "user_id": "123",
  "template_id": "welcome_email"
}
:satellite_antenna: Service Communication
Synchronous (REST)
User preference lookups
Template retrieval
Status queries
Asynchronous (Message Queue)
Notification processing
Retry handling
Status updates
:card_file_box: Data Storage Strategy
Service	Database	Purpose
User Service	PostgreSQL	User data, preferences, push tokens
Template Service	PostgreSQL	Templates, versions, variables
Shared	Redis	Caching, rate limiting, sessions
Shared	RabbitMQ	Async message queuing
Database Schema Examples
sql
-- User Preferences
CREATE TABLE user_notification_preferences (
    user_id UUID REFERENCES users(id),
    channel VARCHAR(20) NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    PRIMARY KEY (user_id, channel)
);
-- Notification Templates
CREATE TABLE templates (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    variables JSONB,
    language VARCHAR(10) DEFAULT 'en',
    version INTEGER DEFAULT 1
);
:bar_chart: API Response Format
Standardized response format across all services:
{
  "success": true,
  "data": {
    "notification_id": "notif_123",
    "status": "queued"
  },
  "error": null,
  "message": "Notification queued successfully",
  "meta": {
    "total": 1,
    "limit": 10,
    "page": 1,
    "total_pages": 1,
    "has_next": false,
    "has_previous": false
  }
}
:rocket: Deployment & CI/CD
2:44
# docker-compose.yml
version: '3.8'
services:
  api-gateway:
    build: ./services/api-gateway
    ports: ["3000:3000"]
  user-service:
    build: ./services/user-service
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/user_db
  rabbitmq:
    image: rabbitmq:3-management
    ports: ["5672:5672", "15672:15672"]
2:45
##Test the system
curl -X POST http://localhost:3000/api/v1/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_123",
    "template_id": "welcome_email",
    "channel": "email",
    "variables": {"name": "John Doe"}
  }'

##PROJECT STRICTURE
group-33-distributed-notification-system/
├── api-gateway/
├── user-service/
 ├── email-service/
├── push-service/
└── template-service/
├── docker-compose.yml
├── .github/workflows/deploy.yml
├── README.md
└── openapi.yaml
