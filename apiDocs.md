### User

```md
- name: string
- username: string, required, unique
- email: string, required, unique, isEmail
- password : string, required
- phoneNumber: string, required
- age: integer, required
- image: string
- gender: string, required
- weight: integer, required
- height: integer, required
```

### RunningHistory

```md
- coordinates: array of string
- duration: string
- UserId: integer
```

### UserRoutine

```md
- RoutineId: integer
- UserId: integer
- scheduleDate: date
```

### Routine

```md
- routineName: string
- routineDescription: string
- routineDuration: string
- routineImageStart: string
- category: array of string
- routineImageEnd: string
```

### Endpoints:

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /routines`
- `GET /routines/:id`
- `GET /routines?search=`
- `PUT /userUpdate`
- `POST /user-routines`
- `GET /user-routines`
- `GET /running-history`
- `POST /running-history`

## 1. POST /register

Request

- body:

```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "age": "integer",
  "image": "string",
  "gender": "string",
  "height": "integer",
  "weight": "integer"
}
```

Response (201 - Created)

```json
{
  "message": "Register success"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Wieght is required"
}
OR
{
  "message": "Height is required"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Age is required"
}
```

## 2. POST /login

Request

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "username": "rina",
  "email": "rina1@mail.com",
  "image": "testing",
  "age": "20",
  "gender": "female",
  "weight": "50",
  "height": "150",
  "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDZiYTA5ZTQ4ZjBiOGVjY2M2NTk3NiIsInVzZXJuYW1lIjoicmluYSIsImVtYWlsIjoicmluYTFAbWFpbC5jb20iLCJwaG9uZU51bWJlciI6IjEyMyIsImdlbmRlciI6ImZlbWFsZSIsIndlaWdodCI6IjUwIiwiaGVpZ2h0IjoiMTUwIiwiaW1hZ2UiOiJ0ZXN0aW5nIiwiYWdlIjoiMjAiLCJpYXQiOjE3MDg1NzExNTN9.owxxXgxLiiMulBvJ754nW2YwHvV6is36aY3jJPq1XWw"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

## GET /routines

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

```json
{
  "data": [
    {
      "_id": "65d5b66e54e8ba6f7d7e9a0f",
      "routineName": "Rickshaw Carry",
      "routineDescription": "This exercise involves carrying a weighted frame (rickshaw) with handles and walking for distance or time. It targets grip strength, core stability, and overall conditioning.",
      "category": "underweight",
      "routineImageStart": "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/m/742_1.jpg",
      "routineImageEnd": "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/m/742_2.jpg",
      "createdAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }",
      "updatedAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }"
    },
    {
      "_id": "65d5b66e54e8ba6f7d7e9a10",
      "routineName": "Single-Leg Press",
      "routineDescription": "Performed on a leg press machine but with one leg at a time. It targets the quadriceps, hamstrings, and glutes, and helps improve muscle imbalances.",
      "category": "normal",
      "routineImageStart": "https://www.bodybuilding.com/images/2020/xdb/cropped/xdb-50m-single-leg-leg-press-m1-square-600x600.jpg",
      "routineImageEnd": "https://www.bodybuilding.com/images/2020/xdb/cropped/xdb-50m-single-leg-leg-press-m2-square-600x600.jpg",
      "createdAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }",
      "updatedAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }"
    }
  ]
}
```

## GET /routines/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "_id": "string"
}
```

Response (200 - OK)

```json
{
  "message": "Routine retrieved successfully",
  "data": {
    "_id": "65d5b66e54e8ba6f7d7e9a0f",
    "routineName": "Rickshaw Carry",
    "routineDescription": "This exercise involves carrying a weighted frame (rickshaw) with handles and walking for distance or time. It targets grip strength, core stability, and overall conditioning.",
    "category": "underweight",
    "routineImageStart": "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/m/742_1.jpg",
    "routineImageEnd": "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/m/742_2.jpg",
    "createdAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }",
    "updatedAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }"
  }
}
```

Response (404 - Not Found)

```json
{
  "message": "Routine not found"
}
```

## GET /routines?search=

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- query:

```json
{
  "search": "string"
}
```

Response (200 - Ok)

```json
{
  "data": [
    {
      "_id": "65d6c2f454e8ba6f7dba14f6",
      "routineName": "Rickshaw Carry",
      "routineDescription": "This exercise involves carrying a weighted frame (rickshaw) with handles and walking for distance or time. It targets grip strength, core stability, and overall conditioning.",
      "category": "underweight",
      "routineImageStart": "https://assets.myworkouts.io/exercises-media/Lz8MaPh8rSSxXFTPP/rickshaw_carry_male_v9_gif_capon.gif",
      "routineImageEnd": "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/m/742_2.jpg",
      "createdAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }",
      "updatedAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }"
    }
  ]
}
```

## PUT /userUpdate

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- body:

```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "image": "string",
  "gender": "string",
  "weight": "string",
  "height": "string",
  "age": "integer",
  "updateAt": "date"
}
```

Response (200 - Ok)

```json
{
  "message": "User updated successfully"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Wieght is required"
}
OR
{
  "message": "Height is required"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "Age is required"
}
```

## POST /user-routines

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- body:

```json
{
  "scheduleDate": "2024-02-23T02:25:47.630+00:00",
  "RoutineId": "65d5b66e54e8ba6f7d7e9a12"
}
```

Response (200 - Ok)

```json
{
  "data": {
    "acknowledged": true,
    "insertedId": "65d6c35e4f3a571f0dab21a2"
  }
}
```

## GET /user-routines

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - Ok)

```json
{
        "_id": "65d5bad770242cb7a4f9e9f1",
        "username": "fiki",
        "email": "test@gmail.com",
        "password": "$2a$10$92sUtF3/Xa4Qa3Nddcryg.PFcIK4Gm5RmzSc5Przmz9BEuY3GG0kS",
        "weight": "75",
        "height": "168",
        "age": "30",
        "createdAt": "2024-02-21T08:56:55.777Z",
        "updatedAt": "2024-02-21T08:56:55.777Z",
        "gender": "male",
        "userRoutinesById": [
          {
                "_id": "65d64c656e13f0da59514070",
                "scheduleDate": "2024-02-21T19:17:59.040Z",
                "RoutineId": "65d5b66e54e8ba6f7d7e9a12",
                "UserId": "65d5bad770242cb7a4f9e9f1",
                "createdAt": "2024-02-21T19:17:57.119Z",
                "updatedAt": "2024-02-21T19:17:57.119Z"
            },
            {
                "_id": "65d64cc66e13f0da59514071",
                "scheduleDate": "2024-02-21T19:19:36.617Z",
                "RoutineId": "65d5b66e54e8ba6f7d7e9a11",
                "UserId": "65d5bad770242cb7a4f9e9f1",
                "createdAt": "2024-02-21T19:19:34.693Z",
                "updatedAt": "2024-02-21T19:19:34.693Z"
            },
            ...
        ],
        "routineData": [
          {
                "_id": "65d6c2f454e8ba6f7dba14f6",
                "routineName": "Rickshaw Carry",
                "routineDescription": "This exercise involves carrying a weighted frame (rickshaw) with handles and walking for distance or time. It targets grip strength, core stability, and overall conditioning.",
                "category": "underweight",
                "routineImageStart": "https://assets.myworkouts.io/exercises-media/Lz8MaPh8rSSxXFTPP/rickshaw_carry_male_v9_gif_capon.gif",
                "routineImageEnd": "https://www.bodybuilding.com/exercises/exerciseImages/sequences/742/Male/m/742_2.jpg",
                "createdAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }",
                "updatedAt": "{ \"$date\": \"2014-01-22T14:56:59.301Z\" }"
            },
            ...
        ]
}
```

## GET /running-history

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - Ok)

```json
{
    "data": [
        {
            "_id": "65d5f5506e13f0da59514068",
            "cordinates": [
                {
                    "latitude": "37.4220936",
                    "longitude": "-122.083922"
                },
                {
                    "latitude": "37.4220936",
                    "longitude": "-122.083922"
                },
                {
                    "latitude": "38.4220936",
                    "longitude": "-121.7145457"
                }
            ],
            "duration": "4",
            "UserId": "65d5bad770242cb7a4f9e9f1",
            "createdAt": "2024-02-21T13:06:24.180Z",
            "updatedAt": "2024-02-21T13:06:24.180Z",
            "distance": 115.81884180540739
        },
        ...
    ]
}
```

## POST /running-history

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

body:

```json
{
  "coordinate": "array",
  "duration": "integer",
  "UserId": "integer",
  "distance": "string"
}
```

Response (201 - Created)

```json
{
  "data": {
    "acknowledged": true,
    "insertedId": "65d6eae2732fa99b4fb72bca"
  }
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
