Auth Module

Implemented:
POST /auth/login
GET /auth/profile
----------------------------------------------------------

Users Module

Implemented:
POST /users
GET /users

Future:
GET /users/:id
PATCH /users/:id
PATCH /users/:id/activate
PATCH /users/:id/deactivate
DELETE /users/:id
-----------------------------------------------------------

Companies Module

Implemented:
POST /companies
GET /companies

Future:
GET /companies/:id
PATCH /companies/:id
DELETE /companies/:id
GET /companies/:id/users
GET /companies/:id/rentals
GET /companies/:id/invoices
----------------------------------------------------------

Laptops Module

Implemented:
POST /laptops
GET /laptops
GET /laptops/:id

Future:
PATCH /laptops/:id
DELETE /laptops/:id
PATCH /laptops/:id/retire
PATCH /laptops/:id/maintenance
PATCH /laptops/:id/available
-----------------------------------------------------------

Rental Orders Module

Implemented:
POST /rental-orders
GET /rental-orders
PATCH /rental-orders/:id/activate
PATCH /rental-orders/:id/return
PATCH /rental-orders/:id/cancel

Future:
GET /rental-orders/:id
GET /rental-orders/company/:companyId
GET /rental-orders/active
GET /rental-orders/returned
GET /rental-orders/cancelled
-------------------------------------------------------------------

Service Requests Module

POST /service-requests
GET /service-requests
GET /service-requests/:id
PATCH /service-requests/:id/assign
PATCH /service-requests/:id/start
PATCH /service-requests/:id/resolve
PATCH /service-requests/:id/close
GET /service-requests/open
GET /service-requests/in-progress
GET /service-requests/resolved
GET /service-requests/company/:companyId
--------------------------------------------------------------------

Invoice Module

POST /invoices
GET /invoices
GET /invoices/:id
PATCH /invoices/:id/cancel
GET /invoices/outstanding
GET /invoices/company/:companyId
GET /invoices/pending
GET /invoices/paid
GET /invoices/overdue
-------------------------------------------------------------------

Payment Module

POST /payments
GET /payments
GET /payments/:id
GET /invoices/:invoiceId/payments

Future:
POST /payments/create-order
POST /payments/webhook
-----------------------------------------------------------------

Audit Logs Module

Future:
GET /audit-logs
GET /audit-logs/:id
GET /audit-logs/entity/:entityId
GET /audit-logs/user/:userId
---------------------------------------------------------------

Dashboard Module
GET /dashboard    

Role: SUPER_ADMIN
{
  "totalCompanies": 25,
  "totalLaptops": 300,
  "availableLaptops": 120,
  "rentedLaptops": 150,
  "maintenanceLaptops": 30,
  "activeRentals": 85,
  "openTickets": 12,
  "pendingInvoices": 8,
  "outstandingAmount": 450000,
  "monthlyRevenue": 1250000
}

Role:COMPANY_ADMIN
{
  "activeRentals": 12,
  "totalLaptopsRented": 48,
  "openServiceRequests": 3,
  "pendingInvoices": 2,
  "outstandingAmount": 85000
}

Role:TECHNICIAN
{
  "assignedTickets": 7,
  "inProgressTickets": 2,
  "resolvedToday": 5,
  "pendingAssignments": 3
}

Role: DELIVERY_EXECUTIVE
{
  "todayDeliveries": 4,
  "todayReturns": 2,
  "activeAssignments": 3,
  "completedAssignments": 12
}
GET /dashboard/summary
GET /dashboard/revenue
GET /dashboard/rentals
GET /dashboard/service-requests
GET /dashboard/invoices
--------------------------------------------------------------

Reports Module

Future:
GET /reports/revenue
GET /reports/rentals
GET /reports/inventory
GET /reports/service-performance
-----------------------------------------------------------

File Upload Module

Future:
POST /uploads
GET /uploads/:id
DELETE /uploads/:id